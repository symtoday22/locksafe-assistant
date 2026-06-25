import React, { useRef, useState, useEffect } from "react";

interface PatternRecorderProps {
  sequence: number[];
  onChange: (sequence: number[]) => void;
}

export const PatternRecorder: React.FC<PatternRecorderProps> = ({ sequence, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  // Coordinates of nodes 1 to 9 on a 300x300 canvas
  const nodeCoords = Array.from({ length: 9 }, (_, i) => {
    const id = i + 1;
    const row = Math.floor(i / 3);
    const col = i % 3;
    return {
      id,
      x: 50 + col * 100,
      y: 50 + row * 100,
    };
  });

  // Calculate distance
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  // Convert client coordinates to SVG viewport coordinates
  const getSvgCoords = (clientX: number, clientY: number) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 300;
    return { x, y };
  };

  const handleStart = (clientX: number, clientY: number) => {
    const coords = getSvgCoords(clientX, clientY);
    if (!coords) return;

    for (const node of nodeCoords) {
      if (getDistance(coords.x, coords.y, node.x, node.y) < 30) {
        setIsDrawing(true);
        onChange([node.id]);
        setCursorPos(coords);
        return;
      }
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const coords = getSvgCoords(clientX, clientY);
    if (!coords) return;

    setCursorPos(coords);

    // Check if near any other node to connect
    for (const node of nodeCoords) {
      if (getDistance(coords.x, coords.y, node.x, node.y) < 30) {
        if (!sequence.includes(node.id)) {
          onChange([...sequence, node.id]);
        }
      }
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setCursorPos(null);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => {
      if (isDrawing) {
        handleEnd();
      }
    };
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchend", handleGlobalUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isDrawing]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 shadow-xl select-none touch-none w-full max-w-[280px] aspect-square flex items-center justify-center cursor-crosshair overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 300 300"
          className="w-full h-full select-none"
        >
          {/* Grid connection lines */}
          {sequence.length > 0 && Array.from({ length: sequence.length - 1 }, (_, i) => {
            const startNode = nodeCoords.find((n) => n.id === sequence[i]);
            const endNode = nodeCoords.find((n) => n.id === sequence[i + 1]);
            if (!startNode || !endNode) return null;
            return (
              <line
                key={`line-${i}`}
                x1={startNode.x}
                y1={startNode.y}
                x2={endNode.x}
                y2={endNode.y}
                className="stroke-amber-400 stroke-[8] stroke-linecap-round stroke-linejoin-round opacity-90 animate-pulse"
              />
            );
          })}

          {/* Line to current cursor */}
          {isDrawing && sequence.length > 0 && cursorPos && (
            (() => {
              const lastNode = nodeCoords.find((n) => n.id === sequence[sequence.length - 1]);
              if (!lastNode) return null;
              return (
                <line
                  x1={lastNode.x}
                  y1={lastNode.y}
                  x2={cursorPos.x}
                  y2={cursorPos.y}
                  className="stroke-amber-400/60 stroke-[6] stroke-linecap-round stroke-linejoin-round"
                />
              );
            })()
          )}

          {/* Grid nodes */}
          {nodeCoords.map((node) => {
            const isActive = sequence.includes(node.id);
            const isLast = sequence[sequence.length - 1] === node.id;
            return (
              <g key={node.id}>
                {/* Outer transparent sensor trigger ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="35"
                  className="fill-transparent stroke-transparent cursor-pointer"
                />
                
                {/* Node halo ring on active */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    className={`stroke-amber-400/40 fill-amber-400/10 stroke-2 transition-all duration-150 ${isLast ? "scale-110" : ""}`}
                  />
                )}

                {/* Main dot circle representing grid node */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? "10" : "8"}
                  className={`transition-all duration-200 ${
                    isActive 
                      ? "fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" 
                      : "fill-slate-700 stroke-slate-800 stroke-[5]"
                  }`}
                />

                {/* Mini inner core circle inside dot */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="3"
                    className="fill-slate-950"
                  />
                )}
                
                {/* Node numbering */}
                <text
                  x={node.x}
                  y={node.y - 14}
                  textAnchor="middle"
                  className={`text-[9px] font-mono select-none font-bold ${
                    isActive ? "fill-amber-400" : "fill-slate-500"
                  }`}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between w-full max-w-[280px]">
        <button
          type="button"
          onClick={() => onChange([])}
          className="text-[11px] font-mono text-slate-500 hover:text-slate-800 transition py-1 px-2.5 rounded-lg border border-slate-200 bg-white"
        >
          Reset Gesture
        </button>
        <span className="text-[10px] font-mono font-semibold text-slate-400">
          Nodes: {sequence.length} / 9
        </span>
      </div>
    </div>
  );
};
