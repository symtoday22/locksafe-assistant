import React from "react";

interface PatternPreviewProps {
  sequence: number[];
  revealed?: boolean;
}

export const PatternPreview: React.FC<PatternPreviewProps> = ({ sequence, revealed = true }) => {
  // Coordinates of nodes 1 to 9 on a 120x120 canvas
  const nodeCoords = Array.from({ length: 9 }, (_, i) => {
    const id = i + 1;
    const row = Math.floor(i / 3);
    const col = i % 3;
    return {
      id,
      x: 20 + col * 40,
      y: 20 + row * 40,
    };
  });

  return (
    <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-2.5 shadow-md flex items-center justify-center w-28 h-28 shrink-0 overflow-hidden select-none">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
      >
        {/* Draw connection lines ONLY when revealed */}
        {revealed && sequence.length > 1 && Array.from({ length: sequence.length - 1 }, (_, i) => {
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
              className="stroke-amber-400 stroke-[3.5] stroke-linecap-round stroke-linejoin-round opacity-90"
            />
          );
        })}

        {/* Draw nodes */}
        {nodeCoords.map((node) => {
          const isActive = revealed && sequence.includes(node.id);
          const isStart = revealed && sequence[0] === node.id;
          const isEnd = revealed && sequence[sequence.length - 1] === node.id;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? "4" : "2.5"}
                className={`${
                  isActive 
                    ? isStart 
                      ? "fill-emerald-400" 
                      : isEnd 
                        ? "fill-red-400" 
                        : "fill-amber-400" 
                    : "fill-slate-800"
                }`}
              />
              {/* Subtle indicator rings */}
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  className="stroke-amber-400/20 fill-none stroke-[1]"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* If obfuscated, render a blurred grid and lock icon inside */}
      {!revealed && (
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[3px] flex items-center justify-center">
          <div className="p-1 px-2 bg-slate-900 border border-slate-800 rounded-lg text-amber-500/90 flex items-center gap-1 scale-90">
            <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Secure</span>
          </div>
        </div>
      )}
    </div>
  );
};
