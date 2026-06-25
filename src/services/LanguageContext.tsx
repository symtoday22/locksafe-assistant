import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "zh" | "es" | "ja";

export interface Translations {
  "nav.dashboard": string;
  "nav.hints": string;
  "nav.contacts": string;
  "nav.recovery": string;
  "nav.settings": string;
  "nav.localVault": string;
  "nav.secureLink": string;

  "header.securedBadge": string;
  "header.keysExpire": string;
  "header.dashboardTitle": string;
  "header.dashboardSubtitle": string;
  "header.hintsTitle": string;
  "header.hintsSubtitle": string;
  "header.contactsTitle": string;
  "header.contactsSubtitle": string;
  "header.recoveryTitle": string;
  "header.recoverySubtitle": string;
  "header.settingsTitle": string;
  "header.settingsSubtitle": string;
  "header.portalTitle": string;
  "header.portalSubtitle": string;

  "gate.shieldActive": string;
  "gate.initializeMaster": string;
  "gate.provideMaster": string;
  "gate.defineSecureOption": string;
  "gate.passphraseLabel": string;
  "gate.newKeyLabel": string;
  "gate.choosePassphrasePlaceholder": string;
  "gate.errorEmpty": string;
  "gate.errorIncorrect": string;
  "gate.decryptBtn": string;
  "gate.initializeChamberBtn": string;
  "gate.sandrockActive": string;

  "dashboard.keyspaceHints": string;
  "dashboard.keyspaceDesc": string;
  "dashboard.decryptHintRegistry": string;
  "dashboard.guardians": string;
  "dashboard.guardiansDesc": string;
  "dashboard.manageSafetyRings": string;
  "dashboard.guides": string;
  "dashboard.threatHandbook": string;
  "dashboard.threatHandbookDesc": string;
  "dashboard.loadContingencySheets": string;
  "dashboard.auditTitle": string;
  "dashboard.masterVault": string;
  "dashboard.masterVaultDesc": string;
  "dashboard.cluesRegistered": string;
  "dashboard.cluesRegisteredDesc": string;
  "dashboard.trustRing": string;
  "dashboard.trustRingDesc": string;
  "dashboard.securedStatus": string;
  "dashboard.configRequiredStatus": string;
  "dashboard.populatedStatus": string;
  "dashboard.emptyStatus": string;
  "dashboard.onlineStatus": string;
  "dashboard.noGuardiansStatus": string;
  "dashboard.sandboxLog": string;
  "dashboard.ramBuffer": string;
  "dashboard.noLogs": string;
  "dashboard.localEndpointAlert": string;
  "dashboard.forceRefresh": string;

  "hints.addNewSec": string;
  "hints.clueTab": string;
  "hints.gestureTab": string;
  "hints.labelField": string;
  "hints.labelPlaceholder": string;
  "hints.clueField": string;
  "hints.cluePlaceholder": string;
  "hints.clueWarning": string;
  "hints.drawGridLabel": string;
  "hints.drawGridWarning": string;
  "hints.tempPatternCode": string;
  "hints.catalogCueBtn": string;
  "hints.howWorkTitle": string;
  "hints.howWorkDesc": string;
  "hints.cluesDir": string;
  "hints.searchPlaceholder": string;
  "hints.noCluesYet": string;
  "hints.noCluesDesc": string;
  "hints.gestureBadge": string;
  "hints.gestureSeq": string;
  "hints.gestureDiagramTip": string;
  "hints.revealTooltip": string;
  "hints.obfuscateTooltip": string;
  "hints.deleteTooltip": string;
  "hints.savedLocksCount": string;
  "hints.memTransfersOnly": string;

  "contacts.mapGuardian": string;
  "contacts.nameLabel": string;
  "contacts.namePlaceholder": string;
  "contacts.relationLabel": string;
  "contacts.relationPlaceholder": string;
  "contacts.phoneLabel": string;
  "contacts.phonePlaceholder": string;
  "contacts.emailLabel": string;
  "contacts.emailPlaceholder": string;
  "contacts.noteLabel": string;
  "contacts.notePlaceholder": string;
  "contacts.registerAnchorBtn": string;
  "contacts.ringUtilityTitle": string;
  "contacts.ringUtilityDesc": string;
  "contacts.matrixTitle": string;
  "contacts.searchPlaceholder": string;
  "contacts.noContacts": string;
  "contacts.noContactsDesc": string;
  "contacts.eraseGuardianTooltip": string;
  "contacts.registeredCompanions": string;
  "contacts.shardsOperated": string;

  "recovery.threatPlaybooks": string;
  "recovery.contingencySuffix": string;
  "recovery.reviewSecPlaybook": string;
  "recovery.checklistTitle": string;
  "recovery.threatVectorTitle": string;
  "recovery.offlineThreatDrill": string;
  "recovery.verCode": string;

  "settings.activeSessionCard": string;
  "settings.activeSessionDesc": string;
  "settings.revokeBtn": string;
  "settings.purgeConsole": string;
  "settings.purgeDesc": string;
  "settings.purgeBtn": string;
  "settings.purgeConfirmTitle": string;
  "settings.purgeConfirmDesc": string;
  "settings.purgeConfirmYes": string;
  "settings.purgeConfirmNo": string;
  "settings.localSpecificationsTitle": string;
  "settings.specData": string;
  "settings.specNetwork": string;
  "settings.specAccess": string;
  "settings.practiceCoordinates": string;
  "settings.practiceCanvas": string;
  "settings.gridIdle": string;
  "settings.gridIdleDesc": string;
  "settings.totalNodes": string;
  "settings.practiceMatched": string;
  "settings.practiceMatchedDesc": string;
  "settings.practiceGoal": string;
  "settings.drawSequence": string;
  "settings.targetVisual": string;
  "settings.clearPresetSelection": string;
  "settings.trainingPresetsTitle": string;
  "settings.trainingPresetsDesc": string;
  "settings.nodesCountLabel": string;

  "hints.resetGestureBtn": string;
  "hints.patternMinError": string;
  "hints.patternGesturePrefix": string;
  "hints.gesturePathLabel": string;

  "settings.sessionLogTerminated": string;
  "settings.playgroundLogSuccess": string;
  "settings.gridLabel": string;

  "settings.preset.z-lock.name": string;
  "settings.preset.z-lock.description": string;
  "settings.preset.s-loop.name": string;
  "settings.preset.s-loop.description": string;
  "settings.preset.hourglass.name": string;
  "settings.preset.hourglass.description": string;
  "settings.preset.house-guard.name": string;
  "settings.preset.house-guard.description": string;
  "settings.preset.m-helix.name": string;
  "settings.preset.m-helix.description": string;
  "settings.preset.n-symmetric.name": string;
  "settings.preset.n-symmetric.description": string;

  "dashboard.manualLogTrigger": string;

  "recovery.guide.sim.title": string;
  "recovery.guide.sim.short": string;
  "recovery.guide.sim.step1": string;
  "recovery.guide.sim.step2": string;
  "recovery.guide.sim.step3": string;
  "recovery.guide.sim.step4": string;
  "recovery.guide.sim.tip1": string;
  "recovery.guide.sim.tip2": string;

  "recovery.guide.email.title": string;
  "recovery.guide.email.short": string;
  "recovery.guide.email.step1": string;
  "recovery.guide.email.step2": string;
  "recovery.guide.email.step3": string;
  "recovery.guide.email.step4": string;
  "recovery.guide.email.tip1": string;
  "recovery.guide.email.tip2": string;

  "recovery.guide.hardware.title": string;
  "recovery.guide.hardware.short": string;
  "recovery.guide.hardware.step1": string;
  "recovery.guide.hardware.step2": string;
  "recovery.guide.hardware.step3": string;
  "recovery.guide.hardware.step4": string;
  "recovery.guide.hardware.tip1": string;
  "recovery.guide.hardware.tip2": string;

  "recovery.guide.estate.title": string;
  "recovery.guide.estate.short": string;
  "recovery.guide.estate.step1": string;
  "recovery.guide.estate.step2": string;
  "recovery.guide.estate.step3": string;
  "recovery.guide.estate.step4": string;
  "recovery.guide.estate.tip1": string;
  "recovery.guide.estate.tip2": string;
  "app.footerDisclaimer": string;
}

const translations: Record<Language, Translations> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.hints": "Reminders & Hints",
    "nav.contacts": "Emergency Ring",
    "nav.recovery": "Recovery Playbook",
    "nav.settings": "Security & Key",
    "nav.localVault": "LOCAL VAULT SYSTEM",
    "nav.secureLink": "SECURE SHIELD LINK",

    "header.securedBadge": "VAULT CONTAINER SECURED",
    "header.keysExpire": "KEYS EXPIRE IN {time}",
    "header.dashboardTitle": "Personal Safety Dashboard",
    "header.dashboardSubtitle": "Summary of local reminders, quick checklists, and action protocols.",
    "header.hintsTitle": "Encrypted Password Reminders",
    "header.hintsSubtitle": "Store clever, non-obvious hints that remind only you of your keys.",
    "header.contactsTitle": "Safety Circles & Trusted Contacts",
    "header.contactsSubtitle": "Core numbers, support personnel, and delegated device recovery lines.",
    "header.recoveryTitle": "Ultimate Account Recovery Playbook",
    "header.recoverySubtitle": "Pre-planned directions for recovering secondary credentials when locked out.",
    "header.settingsTitle": "Device Vault Configurations",
    "header.settingsSubtitle": "Manage security layers, wipe local caches, or alter master encryption codes.",
    "header.portalTitle": "LockSafe Portal",
    "header.portalSubtitle": "Local offline emergency assistant.",

    "gate.shieldActive": "Access Shield Active",
    "gate.initializeMaster": "Initialize Master Token",
    "gate.provideMaster": "Provide your master secret code combination to unlock and decrypt hints. LockSafe calculates memory registers strictly in-browser.",
    "gate.defineSecureOption": "Define a secure, offline master passphrase to isolate and encrypt your clue directories. Zero data leaves your computer.",
    "gate.passphraseLabel": "Master Passphrase",
    "gate.newKeyLabel": "New Secure Key Code",
    "gate.choosePassphrasePlaceholder": "Choose a robust passphrase",
    "gate.errorEmpty": "Passphrase cannot be empty",
    "gate.errorIncorrect": "Incorrect safety master code. Try again.",
    "gate.decryptBtn": "Decrypt & Open Directory",
    "gate.initializeChamberBtn": "Initialize Safety Chamber",
    "gate.sandrockActive": "Encrypted Sandlocked Sandbox Active",

    "dashboard.keyspaceHints": "Keyspace Hints",
    "dashboard.keyspaceDesc": "Memorable, cryptic password indexes created to recall complex hardware or root codes safely offline.",
    "dashboard.decryptHintRegistry": "Decrypt hint registry",
    "dashboard.guardians": "Guardians",
    "dashboard.guardiansDesc": "Trusted emergency companions, key-shard holders, or support circles configured for distress protocols.",
    "dashboard.manageSafetyRings": "Manage safety rings",
    "dashboard.guides": "Guides",
    "dashboard.threatHandbook": "Threat Handbook",
    "dashboard.threatHandbookDesc": "Step-by-step physical recovery blueprints to rescue secondary credentials during cellular SIM lockouts.",
    "dashboard.loadContingencySheets": "Load contingency sheets",
    "dashboard.auditTitle": "Vault Operational Audit Check",
    "dashboard.masterVault": "Master Key Vault Initialized",
    "dashboard.masterVaultDesc": "Encryption engine locked in safe physical sandbox. Cleaves database components from plain-text exposure.",
    "dashboard.cluesRegistered": "Obfuscated Clues Registered",
    "dashboard.cluesRegisteredDesc": "Cryptographic reminders populated. Enables your muscle and association memory to bypass digital lockouts.",
    "dashboard.trustRing": "Emergency Trust Ring",
    "dashboard.trustRingDesc": "Safety ring defined. Keeps primary contacts accessible on-disk without needing cloud network lookup.",
    "dashboard.securedStatus": "SECURED",
    "dashboard.configRequiredStatus": "CONFIG REQUIRED",
    "dashboard.populatedStatus": "POPULATED",
    "dashboard.emptyStatus": "EMPTY",
    "dashboard.onlineStatus": "ONLINE",
    "dashboard.noGuardiansStatus": "NO GUARDIANS",
    "dashboard.sandboxLog": "Local Secure Sandbox Log",
    "dashboard.ramBuffer": "RAM BUFFER ACTIVE",
    "dashboard.noLogs": "No storage events recorded yet.",
    "dashboard.localEndpointAlert": "* ENTRIES SAVED AND OPERATED STRICTLY ON LOCAL ENDPOINT",
    "dashboard.forceRefresh": "Force Refresh",

    "hints.addNewSec": "Add New Security Hint",
    "hints.clueTab": "Memorable Clue",
    "hints.gestureTab": "Security Gesture",
    "hints.labelField": "Service or Category Label",
    "hints.labelPlaceholder": "e.g. Primary Email Account, Laptop PIN",
    "hints.clueField": "Your Obfuscated Password Hint",
    "hints.cluePlaceholder": "e.g. High school pet name spelled backwards + summer of '08",
    "hints.clueWarning": "Security Rule: Do not write plain-text passwords. Formulate memory hooks that only your mind can correlate.",
    "hints.drawGridLabel": "Record 3x3 Security Gesture",
    "hints.drawGridWarning": "Instructions: Click or touch a starting node on the 3x3 grid, then drag across circles to draw your secret path.",
    "hints.tempPatternCode": "Temporary Pattern Code",
    "hints.catalogCueBtn": "Catalog Security Cue",
    "hints.howWorkTitle": "How LockSafe Reminders Work",
    "hints.howWorkDesc": "By avoiding the storage of raw digital sequences, you mitigate the effects of centralized server breaches. Even when unlocked by authorized agents, this vault provides only clever cognitive associations.",
    "hints.cluesDir": "Locked Password Clues Directory",
    "hints.searchPlaceholder": "Filter clues...",
    "hints.noCluesYet": "No clues cataloged yet",
    "hints.noCluesDesc": "Define your first obfuscated password hint in the launcher form to begin establishing recovery safeguards.",
    "hints.gestureBadge": "Gesture",
    "hints.gestureSeq": "Gesture Sequence",
    "hints.gestureDiagramTip": "Use the diagram on the left showing visual connect segments from green (start) to red (end).",
    "hints.revealTooltip": "Reveal obfuscated text",
    "hints.obfuscateTooltip": "Obfuscate clue",
    "hints.deleteTooltip": "Purge clue from storage",
    "hints.savedLocksCount": "SAVED LOCKS IN LOCAL SYSTEM: {count}",
    "hints.memTransfersOnly": "MEM_REG TRANSFERS ONLY",

    "contacts.mapGuardian": "Map Emergency Companion",
    "contacts.nameLabel": "Guardian Full Name",
    "contacts.namePlaceholder": "e.g. Sarah Connor",
    "contacts.relationLabel": "Relation or Role",
    "contacts.relationPlaceholder": "e.g. Spouse, Attorney, IA",
    "contacts.phoneLabel": "Phone Hotkey",
    "contacts.phonePlaceholder": "e.g. 555-0129",
    "contacts.emailLabel": "Email Offset (Optional)",
    "contacts.emailPlaceholder": "e.g. sarah@cyberdyne.net",
    "contacts.noteLabel": "Specific Recovery Instructions (Optional)",
    "contacts.notePlaceholder": "e.g. She holds the dual-signature USB token inside the fireproof safe.",
    "contacts.registerAnchorBtn": "Register Safety Anchor",
    "contacts.ringUtilityTitle": "Emergency Ring Utility",
    "contacts.ringUtilityDesc": "By mapping trusted backup circles, you gain decentralized physical fail-safes. These contacts represent offline guardians who can help execute dual-auth checks, verify recovery claims, or keep backup key resources safely isolated.",
    "contacts.matrixTitle": "Guardian Circle Matrix",
    "contacts.searchPlaceholder": "Search contacts...",
    "contacts.noContacts": "No contacts registered",
    "contacts.noContactsDesc": "Add designated emergency contacts to represent your security circle.",
    "contacts.eraseGuardianTooltip": "Erase guardian",
    "contacts.registeredCompanions": "REGISTERED COMPANIONS: {count}",
    "contacts.shardsOperated": "SHARDS OPERATED ENTIRELY LOCAL",

    "recovery.threatPlaybooks": "Threat Playbooks",
    "recovery.contingencySuffix": "Contingency",
    "recovery.reviewSecPlaybook": "Review this sequence of safeguards and execute them to harden your authentication perimeters offline.",
    "recovery.checklistTitle": "Checklist & Field Reminders",
    "recovery.threatVectorTitle": "Crucial Threat Vector Notes",
    "recovery.offlineThreatDrill": "OFFLINE THREAT DRILL",
    "recovery.verCode": "SECURITY BLUEPRINT v2.5",

    "settings.activeSessionCard": "Active Session State",
    "settings.activeSessionDesc": "LockSafe stores decrypted keys pointers inside local memory arrays only. Revoking the session or reloading locks secure features instantly.",
    "settings.revokeBtn": "Revoke Decryption Session",
    "settings.purgeConsole": "System Purge Console",
    "settings.purgeDesc": "Destructive wipe action. Erases your local hints index, registered emergency circle, configurations, and keys permanently from physical disk space.",
    "settings.purgeBtn": "Initiate System Purge",
    "settings.purgeConfirmTitle": "Erasing Master Key",
    "settings.purgeConfirmDesc": "Confirming erases all local state records. This container cannot undo a write-wipe claim.",
    "settings.purgeConfirmYes": "Yes, Purge",
    "settings.purgeConfirmNo": "Cancel",
    "settings.localSpecificationsTitle": "Local Storage Specifications",
    "settings.specData": "Data System: Sandlocked local browser storage.",
    "settings.specNetwork": "Network Links: Absent. Zero external requests made.",
    "settings.specAccess": "Access Controls: Decrypted files kept in virtual RAM blocks.",
    "settings.practiceCoordinates": "Live Sequence Coordinates",
    "settings.practiceCanvas": "Practice Canvas",
    "settings.gridIdle": "Grid Idle",
    "settings.gridIdleDesc": "Trace nodes on the canvas grid to record coordinate lines.",
    "settings.totalNodes": "Total nodes:",
    "settings.practiceMatched": "Preset Code Matched!",
    "settings.practiceMatchedDesc": "Excellent precision. Your trace matches the select target code combination perfectly.",
    "settings.practiceGoal": "Goal: Match {presetName}",
    "settings.drawSequence": "Draw sequence:",
    "settings.targetVisual": "Target visual:",
    "settings.clearPresetSelection": "Clear Preset Selection",
    "settings.trainingPresetsTitle": "Training Presets Catalog",
    "settings.trainingPresetsDesc": "Select any Android gesture layout preset below to trace on the grid, learn drawing geometry, and construct muscular associations.",
    "settings.nodesCountLabel": "{count} Nodes",

    "hints.resetGestureBtn": "Reset Gesture",
    "hints.patternMinError": "Please connect at least 2 nodes to register your security gesture.",
    "hints.patternGesturePrefix": "Pattern Gesture: ",
    "hints.gesturePathLabel": "Path: ",

    "settings.sessionLogTerminated": "Authorized session terminated / logged out",
    "settings.playgroundLogSuccess": "Playground security check successful: Traced and verified '{presetName}' pattern",
    "settings.gridLabel": "Interactive Grid Board",

    "settings.preset.z-lock.name": "Classic Z-Helix",
    "settings.preset.z-lock.description": "Android typical Z-pattern connecting the bounds with diagonals",
    "settings.preset.s-loop.name": "Symmetric 'S' Loop",
    "settings.preset.s-loop.description": "Spans all perimeter nodes in an S-like snake lock",
    "settings.preset.hourglass.name": "The Hourglass Star",
    "settings.preset.hourglass.description": "A highly complex cross-connect pattern intersecting in node 5",
    "settings.preset.house-guard.name": "House Guard Outline",
    "settings.preset.house-guard.description": "Traces the walls and pointed roof resembling a cottage profile",
    "settings.preset.m-helix.name": "M-Helix Pattern",
    "settings.preset.m-helix.description": "Traces an 'M' sequence across the columns",
    "settings.preset.n-symmetric.name": "N-Symmetric Gate",
    "settings.preset.n-symmetric.description": "A secure 'N' sequence spanning the corners",

    "dashboard.manualLogTrigger": "Triggered manual log inspection sequence",

    "recovery.guide.sim.title": "SIM Swap & SMS Lockout Shielding",
    "recovery.guide.sim.short": "SIM Swap",
    "recovery.guide.sim.step1": "Contact cellular carrier and require a separate PIN/password for any porting or SIM modifications.",
    "recovery.guide.sim.step2": "Remove SMS/Phone-based two-factor authentication (2FA) from primary brokerages and emails.",
    "recovery.guide.sim.step3": "Configure an eSIM with cellular locking codes enabled to protect hardware extraction.",
    "recovery.guide.sim.step4": "Map a secondary recovery line (like Google Voice associated with a separate Google Account with security keys) for highly confidential bypasses.",
    "recovery.guide.sim.tip1": "SIM swapping is the quickest vector hackers use to hijack identities.",
    "recovery.guide.sim.tip2": "Prefer Authenticator apps (e.g., Google Authenticator) or physical Security Keys over text message codes.",

    "recovery.guide.email.title": "Primary Email Total Recovery Contingency",
    "recovery.guide.email.short": "Email Lockout",
    "recovery.guide.email.step1": "Download and print 10-12 backup recovery codes for your Google or Microsoft Account.",
    "recovery.guide.email.step2": "Place printed recovery keys inside physically distinct fireproof lockboxes.",
    "recovery.guide.email.step3": "Establish an isolated secondary backup email that is only accessed via dedicated credentials, not linked dynamically in app clients.",
    "recovery.guide.email.step4": "Configure trusted recovery circles (configured inside Google's Account Inactive Manager or peer recovery models).",
    "recovery.guide.email.tip1": "Your primary email is the master key to your entire digital existence; if it is compromised, password resets can be forced on every other registry.",
    "recovery.guide.email.tip2": "Test your printed recovery codes once a year to verify they remain unexpired.",

    "recovery.guide.hardware.title": "Physical FIDO Keys Loss Backups",
    "recovery.guide.hardware.short": "FIDO Key Loss",
    "recovery.guide.hardware.step1": "Always enroll at least two distinct security hardware keys (e.g. YubiKeys) for any account.",
    "recovery.guide.hardware.step2": "Designate one key as the primary on your keychain, and keep the backup key inside a secured home safe.",
    "recovery.guide.hardware.step3": "Carry a compact USB-C adapter or NFC-compatible keys to enable logins on mobile devices during sudden outages.",
    "recovery.guide.hardware.step4": "Register a passcode manager emergency access protocol so trusted family can request credentials after verified delays.",
    "recovery.guide.hardware.tip1": "Hardware security keys are virtually immune to remote phishing scams.",
    "recovery.guide.hardware.tip2": "If you lose your only registered hardware key, some service hosts require weeks-long identity verification holding queues to regain access.",

    "recovery.guide.estate.title": "Legacy Accession & Heritage Delivery",
    "recovery.guide.estate.short": "Digital Estate",
    "recovery.guide.estate.step1": "Write a structured, physical emergency document directing heirs how to locate hardware keys and decipher clues.",
    "recovery.guide.estate.step2": "Use multi-signature cryptographic custody options (like split-words) so no single individual can steal funds prematurely.",
    "recovery.guide.estate.step3": "Configure Google's Inactive Account Manager to share file access after 3-6 months of total inactivity.",
    "recovery.guide.estate.step4": "Deliver instructions to your primary trusted counselor or lawyer to be released only upon confirmed death or major medical disability.",
    "recovery.guide.estate.tip1": "Do not write down explicit plain-text passwords in wills; describe where the hints notebook can be found.",
    "recovery.guide.estate.tip2": "Combine local offline backups with cryptographic indices to protect financial and private digital inheritance.",
    "app.footerDisclaimer": "LockSafe Assistant - Local Memory Aid Only. This app cannot hack or bypass device security.",
  },
  zh: {
    "nav.dashboard": "仪表盘",
    "nav.hints": "记忆提醒与线索",
    "nav.contacts": "紧急圈子",
    "nav.recovery": "恢复指南",
    "nav.settings": "安全与主密钥",
    "nav.localVault": "本地保险箱系统",
    "nav.secureLink": "安全屏蔽链路",

    "header.securedBadge": "保险箱容器已安全锁定",
    "header.keysExpire": "密钥将在 {time} 后失效",
    "header.dashboardTitle": "个人安全控制台",
    "header.dashboardSubtitle": "本地提醒、快速检查清单和防护协议日志摘要。",
    "header.hintsTitle": "加密密码提醒",
    "header.hintsSubtitle": "存储巧妙、非显而易见的提示，只有你自己能联想起密码的主键。",
    "header.contactsTitle": "安全联系人与紧急信托圈",
    "header.contactsSubtitle": "核心紧急电话，支持人员，以及托管的离线备用恢复链路。",
    "header.recoveryTitle": "终极账户恢复实操指南",
    "header.recoverySubtitle": "针对遭遇电信SIM卡锁定、手机丢失等状态下的多维物理备用恢复教程。",
    "header.settingsTitle": "设备保险箱配置参数",
    "header.settingsSubtitle": "管理安全隔离层、清理物理缓存或更改主控密钥参数。",
    "header.portalTitle": "LockSafe 安全门户",
    "header.portalSubtitle": "本地离线应急安全助理。",

    "gate.shieldActive": "访问屏蔽门已启用",
    "gate.initializeMaster": "初始化主安全令牌",
    "gate.provideMaster": "请输入您的主密码密码组合以解密获取提示线索。LockSafe 完全在浏览器沙箱内运算。",
    "gate.defineSecureOption": "定义安全、离线的硬主控哈希码，以此隔离并加密您的提示。没有任何数据会传离您的电脑。",
    "gate.passphraseLabel": "主解密密码",
    "gate.newKeyLabel": "新建高强度密钥令牌",
    "gate.choosePassphrasePlaceholder": "选择一个坚固的离线主密码",
    "gate.errorEmpty": "主密钥文内容不能为空",
    "gate.errorIncorrect": "安全主密钥检验失败。请重试。",
    "gate.decryptBtn": "解密并打开文件目录",
    "gate.initializeChamberBtn": "初始化安全保险腔体",
    "gate.sandrockActive": "本地沙箱高强度隔离加密已生效",

    "dashboard.keyspaceHints": "密码记忆点",
    "dashboard.keyspaceDesc": "存储在本地的防泄漏密码线索，启发你的本能反射以重新拼凑复杂的硬件主密钥。",
    "dashboard.decryptHintRegistry": "解密并查看提示注册表",
    "dashboard.guardians": "守护人信托",
    "dashboard.guardiansDesc": "受托紧急伙伴、密钥分片持有人，或用于应对极端情况的安全联合支持中心。",
    "dashboard.manageSafetyRings": "管理紧急信托圈",
    "dashboard.guides": "防护指南",
    "dashboard.threatHandbook": "物理威胁防护指南",
    "dashboard.threatHandbookDesc": "包含针对SIM卡劫持、离线硬编码等物理场景的安全屏障逐步恢复计划。",
    "dashboard.loadContingencySheets": "打开应急计划清单",
    "dashboard.auditTitle": "机密保险库状态合规审计",
    "dashboard.masterVault": "主密码哈希已初始化",
    "dashboard.masterVaultDesc": "哈希机制已被本地封锁，严密防范明文库被撞库或物理拷贝风险。",
    "dashboard.cluesRegistered": "混淆密码线索已注册",
    "dashboard.cluesRegisteredDesc": "记忆启发密码点数量已录入。激发神经网眼和条件反射，杜绝硬写入泄漏。",
    "dashboard.trustRing": "紧急备份信任圈",
    "dashboard.trustRingDesc": "已建立离线伙伴。遇到突发状况可以直接读取保存在本地的联系人卡片，无需云端查询。",
    "dashboard.securedStatus": "安全运行中",
    "dashboard.configRequiredStatus": "待配置",
    "dashboard.populatedStatus": "已有资产",
    "dashboard.emptyStatus": "无记录",
    "dashboard.onlineStatus": "信托就绪",
    "dashboard.noGuardiansStatus": "未设置守护人",
    "dashboard.sandboxLog": "本地保险箱安全日志",
    "dashboard.ramBuffer": "内存缓冲区处于活跃状态",
    "dashboard.noLogs": "暂无由于数据变动触发的安全事件日志。",
    "dashboard.localEndpointAlert": "* 检测日志所有行为均在本地设备运行与暂存，绝无云端截流",
    "dashboard.forceRefresh": "强制刷新日志",

    "hints.addNewSec": "添加全新安全提示",
    "hints.clueTab": "密码启发提示",
    "hints.gestureTab": "图形轨迹手势",
    "hints.labelField": "服务或资产分类标签",
    "hints.labelPlaceholder": "例如：网银主账号、笔记本操作系统登录 PIN",
    "hints.clueField": "混淆式高强度密码提示",
    "hints.cluePlaceholder": "例如：初中时最喜欢的宠物的英文字母倒写 + 08年北京奥运会开幕式日期",
    "hints.clueWarning": "安全警告：绝对不可以直接填写明文密码！请编写只有你自己能心领神会的模糊密码线索。",
    "hints.drawGridLabel": "录制 3x3 图形手势轨迹",
    "hints.drawGridWarning": "操作指南：在 3x3 九宫格内点击或触摸一个起点，然后通过连线滑过其他圆圈以绘制专属于您的安全手势轨迹。",
    "hints.tempPatternCode": "临时手势编码值",
    "hints.catalogCueBtn": "备份至安全索引项",
    "hints.howWorkTitle": "LockSafe 启发提示工作原理",
    "hints.howWorkDesc": "避开传统密文托管数据库（如明文文本或容易被撞库还原的单向MD5），我们不存密码本身。哪怕系统被攻破，别人也只能看到一堆谜题，只有你本人的大脑能解开连结。",
    "hints.cluesDir": "已加锁的个人密码线索名录",
    "hints.searchPlaceholder": "检索我的线索...",
    "hints.noCluesYet": "密文库当前为空",
    "hints.noCluesDesc": "请在左侧表单中选择“密码启发提示”或“九宫格轨迹”录入您的第一条安全存储吧。",
    "hints.gestureBadge": "手势轨迹",
    "hints.gestureSeq": "手势轨迹路径值",
    "hints.gestureDiagramTip": "请参考左侧由绿色（起始点）过渡到红色（结束点）的轨迹线连结图绘制。",
    "hints.revealTooltip": "点按展开发送明文启发",
    "hints.obfuscateTooltip": "重新模糊遮罩内容",
    "hints.deleteTooltip": "从物理存储中彻底抹除",
    "hints.savedLocksCount": "本地系统已存储的密码安全点: {count} 个",
    "hints.memTransfersOnly": "仅在 volatile 存储流转",

    "contacts.mapGuardian": "建立受托备用守护人",
    "contacts.nameLabel": "守护人完整姓名/机构名",
    "contacts.namePlaceholder": "例如：小王、信托律师",
    "contacts.relationLabel": "社会学关联或特定角色",
    "contacts.relationPlaceholder": "例如：配偶、直系亲属、法定顾问",
    "contacts.phoneLabel": "离线拨打号码",
    "contacts.phonePlaceholder": "例如：138-0000-0000",
    "contacts.emailLabel": "辅助安全邮箱 (可选)",
    "contacts.emailPlaceholder": "例如：helper@provider.com",
    "contacts.noteLabel": "灾备时具体的物理托付要求 (可选)",
    "contacts.notePlaceholder": "例如：其保管着存有我加密数据硬件备份 USB 钥匙的二号保险柜钥匙。",
    "contacts.registerAnchorBtn": "确认封存在本地",
    "contacts.ringUtilityTitle": "伙伴紧急互信环用途",
    "contacts.ringUtilityDesc": "设定可以托付硬件或验证身份的自然人。多签验证、紧急物理分片保管，都在安全防护范畴，无需网络。这里的数据能够防止由于你本人失联带来的账户彻底锁死丢失。",
    "contacts.matrixTitle": "守护人紧急联系网格",
    "contacts.searchPlaceholder": "筛选联系人...",
    "contacts.noContacts": "守护人网格为空",
    "contacts.noContactsDesc": "录入您的紧急守护伙伴。未雨绸缪，避免单点故障。",
    "contacts.eraseGuardianTooltip": "物理注销联系人",
    "contacts.registeredCompanions": "已注册的互信监护成员: {count} 人",
    "contacts.shardsOperated": "物理分片完全本地化运算",

    "recovery.threatPlaybooks": "威胁实战演练手册",
    "recovery.contingencySuffix": "专项防御方案",
    "recovery.reviewSecPlaybook": "全面核对这些操作步骤。在突发失联、硬件锁定等物理困境下，指导您和信托代理人按步骤恢复数字主权。",
    "recovery.checklistTitle": "实操沙盘步骤验证",
    "recovery.threatVectorTitle": "特别研判要塞分析",
    "recovery.offlineThreatDrill": "离线物理安全防御推演",
    "recovery.verCode": "推演协议版本 v2.5",

    "settings.activeSessionCard": "当前解密内存状态",
    "settings.activeSessionDesc": "密码安全提示在通过主校验后以解密态仅动态存在于 RAM 中。主动退出或刷新页面将彻底销毁所有临时会话解密钥匙，不留下留存文件。",
    "settings.revokeBtn": "主动销毁会话并回锁",
    "settings.purgeConsole": "整机高阶数据擦除终端",
    "settings.purgeDesc": "此动作不可逆。这将物理抹除保存在本地的密码提示列表、联系人列表、主解密哈希验证点以及系统产生的全部审计日志。",
    "settings.purgeBtn": "发起整机数据格式化",
    "settings.purgeConfirmTitle": "擦除主密钥",
    "settings.purgeConfirmDesc": "您确认清除吗？该行为将触发空字节覆盖，浏览器没有回收站功能。",
    "settings.purgeConfirmYes": "确认立即擦除",
    "settings.purgeConfirmNo": "保留数据并返回",
    "settings.localSpecificationsTitle": "物理隔离容器沙箱规格",
    "settings.specData": "数据存储: 使用浏览器安全域本地存储隔离区。",
    "settings.specNetwork": "外连请求: 全停。不允许建立任何网络 API 流量组。",
    "settings.specAccess": "数据访问: 所有的解密重组动作仅在易失主内存中瞬间完成。",
    "settings.practiceCoordinates": "轨迹序列坐标动态反馈",
    "settings.practiceCanvas": "九宫格练习画布",
    "settings.gridIdle": "格点静默中",
    "settings.gridIdleDesc": "请用鼠标或手指通过划线连结九宫格的点以获取路径反馈结果。",
    "settings.totalNodes": "已连结格点总数:",
    "settings.practiceMatched": "轨迹吻合度 100%!",
    "settings.practiceMatchedDesc": "轨迹录入匹配绝对精准，已和预设的安卓防护手势完全校验通过。",
    "settings.practiceGoal": "当前模拟靶标: 练习【{presetName}】",
    "settings.drawSequence": "标准连结顺序:",
    "settings.targetVisual": "预设轨迹透视图:",
    "settings.clearPresetSelection": "退出模拟练习模式",
    "settings.trainingPresetsTitle": "经典安卓手势训练库",
    "settings.trainingPresetsDesc": "在下方选中任意一种手势模板，并在右侧的九宫格点阵画板上进行练习，建立您的指尖肌肉记忆。",
    "settings.nodesCountLabel": "{count} 个划过节点",

    "hints.resetGestureBtn": "重置手势",
    "hints.patternMinError": "请连接至少 2 个点以注册您的安全图形手势。",
    "hints.patternGesturePrefix": "图形手势：",
    "hints.gesturePathLabel": "绘制路径：",

    "settings.sessionLogTerminated": "已终止授信安全会话 / 主动登出",
    "settings.playgroundLogSuccess": "沙盒手势演练成功：已精准完成“{presetName}”轨迹绘制与验证",
    "settings.gridLabel": "互动九宫格画框",

    "settings.preset.z-lock.name": "经典 Z 形轨迹",
    "settings.preset.z-lock.description": "最经典的安卓手势连接对角边缘",
    "settings.preset.s-loop.name": "Symmetric 'S' Loop",
    "settings.preset.s-loop.description": "以类 S 的形状滑过外围圆圈形成连接",
    "settings.preset.hourglass.name": "沙漏对角星",
    "settings.preset.hourglass.description": "在中心节点 5 处交叉相连的高复杂度手势",
    "settings.preset.house-guard.name": "守卫小屋轮廓",
    "settings.preset.house-guard.description": "连结底壁与尖顶绘制房屋形状的手势结构",
    "settings.preset.m-helix.name": "双柱 M 形螺旋",
    "settings.preset.m-helix.description": "跨列绘制高纵横比的 M 形图形轨道",
    "settings.preset.n-symmetric.name": "对称 N 形密码锁",
    "settings.preset.n-symmetric.description": "一种安全平滑连结四角的极简 N 形轨迹",

    "dashboard.manualLogTrigger": "触发了手动日志检查程序",

    "recovery.guide.sim.title": "防范 SIM 卡劫持与短信重置",
    "recovery.guide.sim.short": "SIM 卡劫持",
    "recovery.guide.sim.step1": "联系移动运营商，要求对任何携号转网或 SIM 卡修改设置单独的密码/PIN 码。",
    "recovery.guide.sim.step2": "从主要的金融机构账户和电子邮箱中移除基于短信/电话输入的两步验证 (2FA)。",
    "recovery.guide.sim.step3": "配置启用蜂窝锁密码 of eSIM，防止物理取出或芯片读取。",
    "recovery.guide.sim.step4": "建立辅助性质的专用虚拟回流热线（如配合安全密钥的独立 Google Account 的 Google Voice 账号）用于最高机密的绕行验证。",
    "recovery.guide.sim.tip1": "SIM 卡劫持是黑客用来盗取网络身份的最迅速、最高效的途径。",
    "recovery.guide.sim.tip2": "推荐优先使用身份验证器组件（如 Google Authenticator）或 FIDO2 物理安全密钥，不要过度依赖短信动态码。",

    "recovery.guide.email.title": "主电子邮箱终极恢复应急预案",
    "recovery.guide.email.short": "主邮箱锁死",
    "recovery.guide.email.step1": "下载并打印用于您的 Google 或 Microsoft 账户的 10-12 个备用静态恢复验证码。",
    "recovery.guide.email.step2": "将打印出的纸质恢复私钥妥善封存在物理隔离、防火防水的安全小保险箱中。",
    "recovery.guide.email.step3": "建立一条彻底隔离的第二备用辅助通道，仅能通过独立特定的凭据登入，绝对不要在日常的客户端中动态挂载关联。",
    "recovery.guide.email.step4": "设置可信的信托关系恢复链路（如 Google 的闲置账户管理员或同行互认联合授权机制）。",
    "recovery.guide.email.tip1": "您的主邮箱是掌控您整个数字资产和网络生活的总开关；该开关一旦失控，黑客即可对您关联的各大服务点一键强推密码重设。",
    "recovery.guide.email.tip2": "建议每年离线审查或核对一次您的纸面静态恢复码，确保对应系统参数未发生变更或失效。",

    "recovery.guide.hardware.title": "物理 FIDO2 硬件密钥丢失冷备份",
    "recovery.guide.hardware.short": "物理密钥丢失",
    "recovery.guide.hardware.step1": "为相同核心账户注册时，请终生保留两个或以上完全不同的硬件安全密钥（如 YubiKey）。",
    "recovery.guide.hardware.step2": "将其中一把钥匙挂在随身钥匙链上充当常用入口，而将备用应急二号钥匙冷锁在室内安全隐蔽处。",
    "recovery.guide.hardware.step3": "随身配备迷你 USB-C 转接头或具有 NFC 近场功能的高兼容性鑰匙，应对极端突发时的多设备连接。",
    "recovery.guide.hardware.step4": "设定高阶密码库中附带延时释出的紧急访问协议，容许受托家属在法定等待限期并完成多重身份校核后继承凭证。",
    "recovery.guide.hardware.tip1": "实体物理安全硬件密钥基本上能以 100% 的概率完全杜绝一切来自远程的钓鱼诈骗和中间人网络截流。",
    "recovery.guide.hardware.tip2": "如果您丢掉了日常唯一注册的硬件 FIDO 等级安全塞，部分顶级系统会要求经历长达数周的高严苛纯人工多重身份复核和锁单排队才能撤销解绑。",

    "recovery.guide.estate.title": "数字遗产规划与安全安全继承",
    "recovery.guide.estate.short": "数字遗产",
    "recovery.guide.estate.step1": "整理一份条理严明、写在实体密信里的家庭灾备指南，引导您指定的法定继承人前往何处起获硬件以及如何看懂密码线索。",
    "recovery.guide.estate.step2": "部署多签、拆散根密匙或使用分段式碎片字（例如助记词分三份、需要集齐两分才能还原）的加密信托形式，防止单人起贪念私吞私发。",
    "recovery.guide.estate.step3": "预拨 Google 的闲置账户管理器，让其感应并探知到您的账号在完全断电失联 3-6 个月后，自动发送指定的私密云盘共享给最亲近的家庭成员。",
    "recovery.guide.estate.step4": "将物理应急文件的另一组检索密码或说明直接寄存投放在您终生合作、绝对可靠的法定律师或公证部门，规定必须在符合医学鉴定标准的不可抗力因素下解冻递付。",
    "recovery.guide.estate.tip1": "切记绝不可以让您的注册遗嘱公文里公然曝露任何具体的明文密码参数；仅需要告诉他们去哪取得藏有秘密画册的抽屉钥匙即可。",
    "recovery.guide.estate.tip2": "将本地脱网的纯实体备份与带高强度的隔离密本相结合，确保未来子孙顺利接盘财务权益与无可估量的无形资产安全。",
    "app.footerDisclaimer": "LockSafe 助手 - 仅限本地记事备忘。此应用无法破解或绕过设备安全防护。",
  },
  es: {
    "nav.dashboard": "Panel de Control",
    "nav.hints": "Recordatorios y Pistas",
    "nav.contacts": "Círculo de Emergencia",
    "nav.recovery": "Manual de Recuperación",
    "nav.settings": "Seguridad y Clave Maestra",
    "nav.localVault": "SISTEMA DE BÓVEDA LOCAL",
    "nav.secureLink": "ENLACE DE ESCUDO SEGURO",

    "header.securedBadge": "CONTENEDOR DE BÓVEDA ASEGURADO",
    "header.keysExpire": "LAS CLAVES EXPIRAN EN {time}",
    "header.dashboardTitle": "Panel de Seguridad Personal",
    "header.dashboardSubtitle": "Resumen de pistas locales, lista de auditoría rápida y protocolos de contingencia.",
    "header.hintsTitle": "Recordatorios de Contraseñas Encriptados",
    "header.hintsSubtitle": "Guarde pistas astutas y no obvias para recordar sus contraseñas de forma segura.",
    "header.contactsTitle": "Círculos de Seguridad y Contactos de Confianza",
    "header.contactsSubtitle": "Contactos clave, guardianes y líneas delegadas de recuperación física de dispositivos.",
    "header.recoveryTitle": "Manual Definitivo de Recuperación de Cuentas",
    "header.recoverySubtitle": "Instrucciones de contingencia planificadas para recuperar accesos durante bloqueos físicos.",
    "header.settingsTitle": "Configuraciones de la Bóveda del Dispositivo",
    "header.settingsSubtitle": "Configure capas de seguridad, purgue caches locales o edite contraseñas maestras.",
    "header.portalTitle": "Portal LockSafe",
    "header.portalSubtitle": "Asistente de emergencia local sin conexión.",

    "gate.shieldActive": "Escudo de Acceso Activo",
    "gate.initializeMaster": "Inicializar Clave Maestra",
    "gate.provideMaster": "Introduzca su código maestro secreto para desbloquear y desencriptar las pistas. LockSafe procesa la memoria estrictamente en el navegador.",
    "gate.defineSecureOption": "Defina una frase de contraseña maestra segura y sin conexión para aislar y encriptar sus pistas. Ningún dato sale de su computadora.",
    "gate.passphraseLabel": "Frase de Contraseña Maestra",
    "gate.newKeyLabel": "Nuevo Código Maestre de Seguridad",
    "gate.choosePassphrasePlaceholder": "Elija una frase de contraseña segura",
    "gate.errorEmpty": "La frase de contraseña no puede estar vacía",
    "gate.errorIncorrect": "Código maestro secreto incorrecto. Intente de nuevo.",
    "gate.decryptBtn": "Desencriptar y Abrir Directorio",
    "gate.initializeChamberBtn": "Inicializar Cámara de Seguridad",
    "gate.sandrockActive": "Sandbox Encriptado Fuertemente Activo",

    "dashboard.keyspaceHints": "Pistas de Contraseñas",
    "dashboard.keyspaceDesc": "Índices de contraseñas crípticos y memorables para reconstruir accesos sofisticados de hardware sin conexión.",
    "dashboard.decryptHintRegistry": "Desencriptar registro de pistas",
    "dashboard.guardians": "Guardianes",
    "dashboard.guardiansDesc": "Compañeros de confianza, custodios de fragments de claves o círculos de apoyo en caso de emergencia.",
    "dashboard.manageSafetyRings": "Gestionar círculos de seguridad",
    "dashboard.guides": "Guías",
    "dashboard.threatHandbook": "Manual de Amenazas",
    "dashboard.threatHandbookDesc": "Planes de acción paso a paso para rescatar credenciales secundarias durante SIM swaps o bloqueos cellular.",
    "dashboard.loadContingencySheets": "Cargar planes de contingencia",
    "dashboard.auditTitle": "Plan de Auditoría Operativa de la Bóveda",
    "dashboard.masterVault": "Bóveda de Clave Maestra Inicializada",
    "dashboard.masterVaultDesc": "Motor de encriptación asegurado localmente. Previene la exposición directa de pistas críticas en texto plano.",
    "dashboard.cluesRegistered": "Pistas Obscurecidas Registradas",
    "dashboard.cluesRegisteredDesc": "Recordatorios cognitivos listos. Despiertan su memoria de asociación y evitan almacenamiento inseguro.",
    "dashboard.trustRing": "Círculo de Confianza de Emergencia",
    "dashboard.trustRingDesc": "Contactos de emergencia listos para consulta local inmediata, independiente de la red o servicios en la nube.",
    "dashboard.securedStatus": "OPERANDO SEGURO",
    "dashboard.configRequiredStatus": "CONFIGURACIÓN REQUERIDA",
    "dashboard.populatedStatus": "CON DATOS",
    "dashboard.emptyStatus": "VACÍO",
    "dashboard.onlineStatus": "ACTIVO",
    "dashboard.noGuardiansStatus": "SIN ANCLAS",
    "dashboard.sandboxLog": "Registro Seguro de la Bóveda Local",
    "dashboard.ramBuffer": "BUFFER RAM ACTIVO",
    "dashboard.noLogs": "No hay eventos de almacenamiento registrados aún.",
    "dashboard.localEndpointAlert": "* ENTRADAS GUARDADAS Y OPERADAS ESTRICTAMENTE EN SU DISPOSITIVO LOCAL",
    "dashboard.forceRefresh": "Forzar Actualización",

    "hints.addNewSec": "Añadir Nueva Pista de Seguridad",
    "hints.clueTab": "Clave Memorable",
    "hints.gestureTab": "Gesto de Patrón",
    "hints.labelField": "Etiqueta de Servicio o Categoría",
    "hints.labelPlaceholder": "Ej: Correo Principal, PIN de Computadora",
    "hints.clueField": "Su Pista de Contraseña Ofuscada",
    "hints.cluePlaceholder": "Ej: Nombre de mascota de secundaria al revés + verano del 2008",
    "hints.clueWarning": "Regla de Seguridad: No guarde contraseñas en texto plano. Diseñe pistas que solo usted pueda interpretar.",
    "hints.drawGridLabel": "Grabar Gesto 3x3 de Seguridad",
    "hints.drawGridWarning": "Instrucciones: Toque un nodo inicial en la cuadrícula 3x3 y arrastre para conectar los círculos de su patrón secreto.",
    "hints.tempPatternCode": "Código de Patrón Temporal",
    "hints.catalogCueBtn": "Registrar Pista de Seguridad",
    "hints.howWorkTitle": "Cómo Funcionan las Pistas de LockSafe",
    "hints.howWorkDesc": "Al evitar almacenar claves binarias crudas, inutiliza los hackeos e intrusiones a servidores centralizados. Incluso si es accedido físicamente, solo muestra asociaciones para su cerebro.",
    "hints.cluesDir": "Directorio de Pistas de Contraseñas Bloqueadas",
    "hints.searchPlaceholder": "Filtrar pistas...",
    "hints.noCluesYet": "No hay pistas catalogadas aún",
    "hints.noCluesDesc": "Defina su primer recordatorio de contraseña en el formulario lateral para comenzar a proteger sus accesos.",
    "hints.gestureBadge": "Patrón",
    "hints.gestureSeq": "Secuencia del Gesto",
    "hints.gestureDiagramTip": "Utilice el diagrama a la izquierda que indica el recorrido de verde (inicio) a rojo (fin).",
    "hints.revealTooltip": "Revelar pista oculta",
    "hints.obfuscateTooltip": "Ofuscar pista",
    "hints.deleteTooltip": "Eliminar de forma permanente",
    "hints.savedLocksCount": "CONEXIONES DE SEGURIDAD LOCALES: {count}",
    "hints.memTransfersOnly": "SÓLO REGISTROS DE MEMORIA",

    "contacts.mapGuardian": "Asociar Compañero de Emergencia",
    "contacts.nameLabel": "Nombre Completo del Guardián",
    "contacts.namePlaceholder": "Ej: Sarah Connor",
    "contacts.relationLabel": "Relación o Rol",
    "contacts.relationPlaceholder": "Ej: Esposo, Abogada, Familiar",
    "contacts.phoneLabel": "Teléfono de Emergencia",
    "contacts.phonePlaceholder": "Ej: 555-0129",
    "contacts.emailLabel": "Correo de Respaldo (Opcional)",
    "contacts.emailPlaceholder": "Ej: sarah@resistencia.net",
    "contacts.noteLabel": "Instrucciones Específicas de Recuperación (Opcional)",
    "contacts.notePlaceholder": "Ej: Custodia la llave física USB de respaldo doble firma en la caja fuerte.",
    "contacts.registerAnchorBtn": "Registrar Guardián de Emergencia",
    "contacts.ringUtilityTitle": "Utilidad de Contactos de Emergencia",
    "contacts.ringUtilityDesc": "Mapear anclas físicas de confianza le brinda un seguro descentralizado. Representan guardianes locales que pueden resguardar respaldos, llaves físicas o ayudarle a verificar su identidad cara a cara.",
    "contacts.matrixTitle": "Matriz del Círculo de Guardianes",
    "contacts.searchPlaceholder": "Buscar contactos...",
    "contacts.noContacts": "No hay contactos registrados",
    "contacts.noContactsDesc": "Añada contactos de emergencia de confianza para estructurar su círculo de seguridad.",
    "contacts.eraseGuardianTooltip": "Eliminar guardián",
    "contacts.registeredCompanions": "GUARDIANES REGISTRADOS: {count}",
    "contacts.shardsOperated": "REGISTROS OPERADOS LOCALMENTE",

    "recovery.threatPlaybooks": "Manual de Amenazas",
    "recovery.contingencySuffix": "Contingencia",
    "recovery.reviewSecPlaybook": "Examine detenidamente estos planes de acción y ejecútelos sistemáticamente para blindar sus credenciales fuera de la red.",
    "recovery.checklistTitle": "Listas de Comprobación",
    "recovery.threatVectorTitle": "Estrategias de Contingencia Críticas",
    "recovery.offlineThreatDrill": "MEDIDA FIEL DE CONFIANZA",
    "recovery.verCode": "VERSION DE PLAN DE ACCION v2.5",

    "settings.activeSessionCard": "Estado de la Sesión en Memoria",
    "settings.activeSessionDesc": "LockSafe mantiene las contraseñas desencriptadas en la RAM fugaz. Cerrar sesión o recargar la página destruye el estado de sesión de inmediato de forma segura.",
    "settings.revokeBtn": "Bloquear Sesión y Destruir Accesos",
    "settings.purgeConsole": "Consola de Purga de Datos",
    "settings.purgeDesc": "Destrucción total irreversible. Elimina contraseñas, pistas, contactos de emergencia, registros y clave de encriptación maestra del disco local permanentemente.",
    "settings.purgeBtn": "Iniciar Purga del Sistema",
    "settings.purgeConfirmTitle": "Confirmar Eliminación",
    "settings.purgeConfirmDesc": "Confirmar borrará de manera irrecuperable toda su información local. No hay vuelta atrás.",
    "settings.purgeConfirmYes": "Eliminar todo permanentemente",
    "settings.purgeConfirmNo": "Cancelar",
    "settings.localSpecificationsTitle": "Especificaciones Técnicas del Sandbox",
    "settings.specData": "Almacenamiento: Datos guardados de forma segura con aislamiento del navegador local.",
    "settings.specNetwork": "Conexiones: Ninguna. Cero llamadas HTTP a servidores externos.",
    "settings.specAccess": "Acceso: Datos descifrados exclusivamente dentro del búfer de memoria volatil.",
    "settings.practiceCoordinates": "Coordenadas del Patrón en Vivo",
    "settings.practiceCanvas": "Lienzo de Práctica del Gesto",
    "settings.gridIdle": "Parada del Patrón",
    "settings.gridIdleDesc": "Trace un patrón deslizando sobre los nodos para comenzar el feedback.",
    "settings.totalNodes": "Nodos conectados:",
    "settings.practiceMatched": "¡Coincidencia de Patrón lograda!",
    "settings.practiceMatchedDesc": "Precisión excelente. El patrón trazado coincide exactamente con la plantilla de aprendizaje seleccionada.",
    "settings.practiceGoal": "Objetivo: Imitar {presetName}",
    "settings.drawSequence": "Secuencia estándar:",
    "settings.targetVisual": "Guía visual del objetivo:",
    "settings.clearPresetSelection": "Limpiar Selección de Patrón",
    "settings.trainingPresetsTitle": "Banco de Patrones de Aprendizaje",
    "settings.trainingPresetsDesc": "Seleccione cualquier plantilla clásica de Android a continuación para entrenar su memoria manual de gestos táctiles mediante el dibujo.",
    "settings.nodesCountLabel": "{count} Nodos",

    "hints.resetGestureBtn": "Reiniciar Gesto",
    "hints.patternMinError": "Por favor, conecte al menos 2 nodos para registrar su gesto de seguridad.",
    "hints.patternGesturePrefix": "Gesto de patrón: ",
    "hints.gesturePathLabel": "Camino: ",

    "settings.sessionLogTerminated": "Sesión de autorización terminada / Cierre de sesión",
    "settings.playgroundLogSuccess": "Prueba de seguridad del sandbox exitosa: Gesto '{presetName}' trazado y verificado",
    "settings.gridLabel": "Panel de Cuadrícula de Feedback",

    "settings.preset.z-lock.name": "Cercado Clásico en Z",
    "settings.preset.z-lock.description": "Dibujo clásico en Z de Android que conecta las esquinas con diagonales",
    "settings.preset.s-loop.name": "Bucle en S Simétrico",
    "settings.preset.s-loop.description": "Abarca todos los nodos del perímetro en un patrón de serpiente en S",
    "settings.preset.hourglass.name": "La Estrella del Reloj de Arena",
    "settings.preset.hourglass.description": "Patrón complejo de conexión cruzada que intersecta en el nodo central 5",
    "settings.preset.house-guard.name": "Perfil de la Casa de Guardia",
    "settings.preset.house-guard.description": "Dibuja las paredes y el techo puntiagudo como una cabaña",
    "settings.preset.m-helix.name": "Patrón de Hélice en M",
    "settings.preset.m-helix.description": "Dibuja una secuencia de 'M' a través de las columnas",
    "settings.preset.n-symmetric.name": "Puerta de N Simétrica",
    "settings.preset.n-symmetric.description": "Secuencia segura en 'N' que abarca las esquinas del panel",

    "dashboard.manualLogTrigger": "Secuencia de inspección de registro manual activada",

    "recovery.guide.sim.title": "Protección contra SIM Swap y Bloqueo de SMS",
    "recovery.guide.sim.short": "SIM Swap",
    "recovery.guide.sim.step1": "Comuníquese con su operador de telefonía y exija un PIN de seguridad por separado para cualquier cambio de chip.",
    "recovery.guide.sim.step2": "Elimine la autenticación de dos factores (2FA) por SMS/teléfono de sus correos electrónicos y cuentas bancarias principales.",
    "recovery.guide.sim.step3": "Configure una eSIM con código de bloqueo celular habilitado para protegerla contra extracción física.",
    "recovery.guide.sim.step4": "Establezca una línea de recuperación privada (como un número virtual protegido con llaves de seguridad física) para desvíos altamente confidenciales.",
    "recovery.guide.sim.tip1": "El SIM swapping is el vector más rápido que usan los hackers para secuestrar identidades.",
    "recovery.guide.sim.tip2": "Prefiera aplicaciones de autenticación (como Google Authenticator) o llaves de seguridad físicas antes que mensajes de texto.",

    "recovery.guide.email.title": "Plan de Contingencia para Recuperación de Correo Principal",
    "recovery.guide.email.short": "Correo Bloqueado",
    "recovery.guide.email.step1": "Descargue e imprima de 10 a 12 códigos de recuperación de respaldo para su cuenta de Google o Microsoft.",
    "recovery.guide.email.step2": "Coloque las claves de recuperación impresas dentro de cajas de seguridad ignífugas físicamente separadas.",
    "recovery.guide.email.step3": "Defina un correo electrónico de respaldo aislado al que solo se acceda con credenciales independientes y que no esté cargado activamente en apps móviles.",
    "recovery.guide.email.step4": "Configure círculos de recuperación de confianza (como el planificador de cuentas inactivas de Google o modelos de recuperación entre pares).",
    "recovery.guide.email.tip1": "Su correo electrónico principal es la llave maestra de su vida digital. Si se ve comprometido, se pueden forzar restablecimientos de contraseña en todas partes.",
    "recovery.guide.email.tip2": "Pruebe sus códigos de recuperación impresos una vez al año para verificar que no hayan caducado.",

    "recovery.guide.hardware.title": "Respaldos por Pérdida de Llaves Físicas FIDO",
    "recovery.guide.hardware.short": "Llave FIDO",
    "recovery.guide.hardware.step1": "Siempre registre al menos dos llaves de seguridad física independientes (ej. YubiKeys) para cualquier cuenta.",
    "recovery.guide.hardware.step2": "Designe una llave como la principal en su llavero y guarde la llave de repuesto dentro de una caja fuerte en su hogar.",
    "recovery.guide.hardware.step3": "Lleve un adaptador USB-C compacto o llaves compatibles con NFC para permitir inicios de sesión en dispositivos móviles durante cualquier caida.",
    "recovery.guide.hardware.step4": "Registre un protocolo de acceso de emergencia en un gestor de contraseñas para que familiares de confianza soliciten credenciales tras demoras verificadas.",
    "recovery.guide.hardware.tip1": "Las llaves de seguridad de hardware son prácticamente inmunes a las estafas de phishing remoto.",
    "recovery.guide.hardware.tip2": "Si pierde su única llave física registrada, algunos hostings de servicios requieren colas de verificación de identidad de varias semanas para recuperar el acceso.",

    "recovery.guide.estate.title": "Planificación y Entrega de Herencia Digital",
    "recovery.guide.estate.short": "Herencia",
    "recovery.guide.estate.step1": "Escriba un documento de emergencia estructurado y físico en el que indique a sus herederos dónde encontrar llaves físicas y comprender las pistas.",
    "recovery.guide.estate.step2": "Utilice esquemas de custodia criptográfica de firmas múltiples (como palabras semilla divididas) para evitar que una sola persona malverse recursos antes de tiempo.",
    "recovery.guide.estate.step3": "Configure el Planificador de Cuentas Inactivas de Google para compartir accesos tras 3 a 12 meses de inactividad total detectada.",
    "recovery.guide.estate.step4": "Entregue instrucciones finales a su asesor legal o notario de confianza para que las libere tras comprobaciones médicas o defunción.",
    "recovery.guide.estate.tip1": "No anote contraseñas explícitas en texto plano en testamentos; describa en su lugar dónde encontrar el cuaderno de pistas o memorias de acceso.",
    "recovery.guide.estate.tip2": "Combine copias de seguridad locales fuera de línea con índices criptográficos para blindar eficazmente su patrimonio financiero e intimidad digital.",
    "app.footerDisclaimer": "Asistente LockSafe - Solo como ayuda de memoria local. Esta aplicación no puede hackear ni eludir la seguridad del dispositivo.",
  },
  ja: {
    "nav.dashboard": "ダッシュボード",
    "nav.hints": "記憶ヒント管理",
    "nav.contacts": "緊急連絡網",
    "nav.recovery": "復旧ガイド",
    "nav.settings": "マスターキー設定",
    "nav.localVault": "ローカル暗号保管庫システム",
    "nav.secureLink": "安全な暗号化リンク",

    "header.securedBadge": "暗号化コンテナを安全に保護中",
    "header.keysExpire": "キーは {time} 後に自動廃棄されます",
    "header.dashboardTitle": "パーソナル安全管理ボード",
    "header.dashboardSubtitle": "オフラインに暗号化保存された記憶鍵、合規確認リスト、保護行動ログのまとめ。",
    "header.hintsTitle": "暗号化パスワードヒント",
    "header.hintsSubtitle": "直接パスワードを保存せず、あなただけの条件反射を刺激する記憶のヒントを蓄積します。",
    "header.contactsTitle": "緊急信頼パートナー登録",
    "header.contactsSubtitle": "有事に備え、ハードウェアキーの分散保管者、認証代理人のオフライン緊急連絡網を構築します。",
    "header.recoveryTitle": "アカウント復旧実操マニュアル",
    "header.recoverySubtitle": "携帯SIMスワップや、スマートフォン紛失トラブル時のデジタル主権の復旧ガイド。",
    "header.settingsTitle": "保管庫ハードウェア設定",
    "header.settingsSubtitle": "安全隔離レベルの管理、一時解読キャッシュの消去、マスター暗号鍵の変更を行います。",
    "header.portalTitle": "LockSafe ポータル",
    "header.portalSubtitle": "ローカルオフライン緊急事態アシスタント。",

    "gate.shieldActive": "セキュリティゲート稼働中",
    "gate.initializeMaster": "マスター暗号キーの設定",
    "gate.provideMaster": "ヒントを復号・展開するためにマスターパスフレーズを入力してください。LockSafeはブラウザ内メインメモリのみで演算されます。",
    "gate.defineSecureOption": "データベースを暗号化するために、強固なオフラインマスターパスワードを設定してください。データは一切ネットワークに送信されません。",
    "gate.passphraseLabel": "マスター解読キー",
    "gate.newKeyLabel": "新規高強度パスコード",
    "gate.choosePassphrasePlaceholder": "安全なマスターパスフレーズを入力",
    "gate.errorEmpty": "キー内容を空にすることはできません",
    "gate.errorIncorrect": "マスターキーの確認に失敗しました。再試行してください。",
    "gate.decryptBtn": "キーを復号してディレクトリを開く",
    "gate.initializeChamberBtn": "安全隔離チャンバーの初期化",
    "gate.sandrockActive": "サンドボックスによる暗号化保護が有効化されています",

    "dashboard.keyspaceHints": "暗号記憶ポイント",
    "dashboard.keyspaceDesc": "複雑なマスターキーや物理キーの配列を本能的に連想するための、暗号化された記憶のヒントリスト。",
    "dashboard.decryptHintRegistry": "記憶ポイントを復号して閲覧",
    "dashboard.guardians": "緊急支援ネットワーク",
    "dashboard.guardiansDesc": "いざという時、アカウント凍結や認証手続を物理的に支援する信頼のおけるガーディアンの一覧。",
    "dashboard.manageSafetyRings": "緊急連絡網の管理",
    "dashboard.guides": "復旧マニュアル",
    "dashboard.threatHandbook": "物理脅威対策ハンドブック",
    "dashboard.threatHandbookDesc": "SIM乗っ取り攻撃や通信遮断環境下で段階的にログイン主権を取り戻すための物理的計画。",
    "dashboard.loadContingencySheets": "復旧チェックリストを読み込む",
    "dashboard.auditTitle": "機密保管庫の自己監査状況",
    "dashboard.masterVault": "暗号化検証哈希設定済み",
    "dashboard.masterVaultDesc": "ハッシュコードは厳重に保護空間にロック。平文のままでの流出を物理的に防ぎます。",
    "dashboard.cluesRegistered": "連想ヒント記述あり",
    "dashboard.cluesRegisteredDesc": "パスワードを暗示する情報の保持。脳の連想力を活用してデジタルロックアウトに抗います。",
    "dashboard.trustRing": "緊急信頼メンバー",
    "dashboard.trustRingDesc": "ローカル保存された連絡先リスト。クラウドの回線復旧を待つことなく有事の連絡が可能です。",
    "dashboard.securedStatus": "安全に保護中",
    "dashboard.configRequiredStatus": "未初期化",
    "dashboard.populatedStatus": "登録済み",
    "dashboard.emptyStatus": "未登録",
    "dashboard.onlineStatus": "信託認証済",
    "dashboard.noGuardiansStatus": "連絡者なし",
    "dashboard.sandboxLog": "保管庫ローカル安全ログ",
    "dashboard.ramBuffer": "揮発性メモリのみで動作中",
    "dashboard.noLogs": "現在、記録された安全運用イベントはありません。",
    "dashboard.localEndpointAlert": "* 本システムのログはすべて内部端末ローカルで実行され、外部送信はされません",
    "dashboard.forceRefresh": "ログを強制同期更新",

    "hints.addNewSec": "新しい安全ヒントを追加",
    "hints.clueTab": "記憶連想の記述",
    "hints.gestureTab": "图形連繋アクション",
    "hints.labelField": "対象サービス / アセット分類",
    "hints.labelPlaceholder": "例: メイン受信用メール、PCのOS管理者ログイン PIN",
    "hints.clueField": "パスワードを暗示する条件記述",
    "hints.cluePlaceholder": "例: 中学校の時のペットの名前を反転英数字 + 2008年北京オリンピック開幕日",
    "hints.clueWarning": "安全規則：生パスワードは絶対記述しないでください！あなただけがわかる連想ゲーム形式の記述にします。",
    "hints.drawGridLabel": "3x3 の軌跡パターンを録画",
    "hints.drawGridWarning": "操作手順：9つのドットの中で始点となる点をクリックまたはスワイプし、他のドットを線でつないで固有手勢を記録してください。",
    "hints.tempPatternCode": "一時的な入力コード値",
    "hints.catalogCueBtn": "暗号化インデックスに登録",
    "hints.howWorkTitle": "LockSafe 記憶ヒントの強力な意義",
    "hints.howWorkDesc": "パスワードそのものは保存しないため、世界中どこからサーバー侵入を受けてもあなたのアカウントは破られません。鍵は外部データベースでなく、あなたの脳細胞にだけ存在します。",
    "hints.cluesDir": "保護された暗号化ヒント一覧",
    "hints.searchPlaceholder": "ヒントを検索...",
    "hints.noCluesYet": "保管庫内は空です",
    "hints.noCluesDesc": "左側のフォームから暗号記憶ヒントやAndroid手勢を録画して、初の資産データ保護を行ってください。",
    "hints.gestureBadge": "手勢軌跡",
    "hints.gestureSeq": "手勢パターン数値",
    "hints.gestureDiagramTip": "左側の図を参考に、緑色（スタート）から赤色（ゴール）の通りに接続スワイプ練習をしてください。",
    "hints.revealTooltip": "点按してヒントを開示",
    "hints.obfuscateTooltip": "表示部分を再マスキング",
    "hints.deleteTooltip": "物理ストレージから完全に削除",
    "hints.savedLocksCount": "システム認証された保護アイテム数: {count} 件",
    "hints.memTransfersOnly": "メモリ上のデータ遷移のみ",

    "contacts.mapGuardian": "緊急信頼メンバーの紐付け",
    "contacts.nameLabel": "ガーディアンのフルネーム / 代理者",
    "contacts.namePlaceholder": "例: 信頼できる家族、指定信託弁護士",
    "contacts.relationLabel": "身分関係または特定役割",
    "contacts.relationPlaceholder": "例: 配偶者、顧問司法書士、IA",
    "contacts.phoneLabel": "緊急時オフライン連絡電話",
    "contacts.phonePlaceholder": "例: 090-0000-0000",
    "contacts.emailLabel": "補助予備メール (任意)",
    "contacts.emailPlaceholder": "例: helper@digital-trust.jp",
    "contacts.noteLabel": "有事の具体的なハード委託詳細 (任意)",
    "contacts.notePlaceholder": "例: 本人は、私のハードウェア暗号化USBの保管位置(金庫コードなど)を知る唯一の証人です。",
    "contacts.registerAnchorBtn": "緊急安全コンパニオンとして固定する",
    "contacts.ringUtilityTitle": "物理ガーディアン登録の意義",
    "contacts.ringUtilityDesc": "ご自身の他、緊急時に身の回りや物理セキュリティキー、パスワード帳を托管・検証可能な支援メンバーを構築します。これにより、予期せぬ本人失踪時に家族全員でアカウント喪失状態になるのを防ぎます。",
    "contacts.matrixTitle": "ガーディアンオフラインマトリクス",
    "contacts.searchPlaceholder": "連絡先を検索...",
    "contacts.noContacts": "ガーディアンのリストが空です",
    "contacts.noContactsDesc": "有事への備えとして、暗号認証に必要な協力者を紐付けてください。",
    "contacts.eraseGuardianTooltip": "物理連絡人を抹消",
    "contacts.registeredCompanions": "登録済みのガーディアン数: {count} 名",
    "contacts.shardsOperated": "物理的な分散完全ローカル指向",

    "recovery.threatPlaybooks": "脅威復旧実践ハンドブック",
    "recovery.contingencySuffix": "緊急対策",
    "recovery.reviewSecPlaybook": "以下にリストアップされた防犯・復旧手段を実践し、あらゆるオフラインハッキング脅威に立ち向かう術を解説します。",
    "recovery.checklistTitle": "行動ステップの検証進捗",
    "recovery.threatVectorTitle": "実地セキュリティ分析の要点",
    "recovery.offlineThreatDrill": "自立安全・オフライン物理防御プロトコル",
    "recovery.verCode": "推演プロトコルバージョン v2.5",

    "settings.activeSessionCard": "メモリ解読キーの有効期限",
    "settings.activeSessionDesc": "認証されたヒントは揮発性RAMバッファにのみ常駐します。ログアウトやブラウザのリロードで。ディスクに解読のログを残さず完全に自滅します。",
    "settings.revokeBtn": "セッションの安全強制遮断",
    "settings.purgeConsole": "物理アセット初期化（強制フォーマット）",
    "settings.purgeDesc": "この操作は巻き戻せません！これはシステムに登録されたすべてのヒント、お気に入り、連絡先、監査ログ、マスター身分ハッシュを完封パージします。",
    "settings.purgeBtn": "オールデータの物理消去を発動",
    "settings.purgeConfirmTitle": "データの消去確認",
    "settings.purgeConfirmDesc": "完全に削除しますか？本ローカルシステムには復元不可能な消去方式を採用しています。",
    "settings.purgeConfirmYes": "データを完全に消去する",
    "settings.purgeConfirmNo": "保有を継続して戻る",
    "settings.localSpecificationsTitle": "物理隔離沙箱仕様",
    "settings.specData": "データストレージ: ブラウザ隔離ローカルセキュリティ領域を使用。",
    "settings.specNetwork": "外部サーバ接続: 全遮断。どんなネットワーク通信APIトラフィックも行いません。",
    "settings.specAccess": "データアクセス: すべての複合重合・編集処理は揮発メインメモリ内のみで完結。",
    "settings.practiceCoordinates": "入力軌跡座標動態フィードバック",
    "settings.practiceCanvas": "九宮格ジェスチャーゲーム画板",
    "settings.gridIdle": "格点静止状態",
    "settings.gridIdleDesc": "ドット同士を直線でつなぎ、現在の手勢パターンの出力確認が行えます。",
    "settings.totalNodes": "合計接続ノード点数:",
    "settings.practiceMatched": "手勢パターン一致率 100%!",
    "settings.practiceMatchedDesc": "指先の筋肉記憶のトレースに成功しました。Android標準プリセットとのパス検証に通過しました。",
    "settings.practiceGoal": "練習中のターゲット: 【{presetName}】",
    "settings.drawSequence": "標準の接続座標軸:",
    "settings.targetVisual": "参考用プレビュー手勢図:",
    "settings.clearPresetSelection": "練習ターゲットから抜ける",
    "settings.trainingPresetsTitle": "代表的 Android 防御パターン群",
    "settings.trainingPresetsDesc": "以下のプリセットを参考に右側のドット画板を繰り返し引くことで、指先そのものの反応連繋を磨きます。",
    "settings.nodesCountLabel": "{count} 個の連なる点",

    "hints.resetGestureBtn": "手勢リセット",
    "hints.patternMinError": "安全手勢を登録するには、少なくとも2つのドットを接続してください。",
    "hints.patternGesturePrefix": "パターンジェスチャー: ",
    "hints.gesturePathLabel": "接続経路: ",

    "settings.sessionLogTerminated": "検証済み安全セッションが終了しました / ログアウト",
    "settings.playgroundLogSuccess": "画板検証試験成功：パターン「{presetName}」のトレース一致・確認を完了",
    "settings.gridLabel": "九宮格インタラクティブ画板",

    "settings.preset.z-lock.name": "定番 Z型パターン",
    "settings.preset.z-lock.description": "対角線の頂点同士を結ぶ、もっとも代表的なAndroid用Z型手勢パターン",
    "settings.preset.s-loop.name": "対称 S型スネークパターン",
    "settings.preset.s-loop.description": "外周ドットを滑らかに縫うように巡る、美しく強固なS字蛇口手勢",
    "settings.preset.hourglass.name": "砂時計・ダブルクロス",
    "settings.preset.hourglass.description": "中央のドット5番を中心に複雑な交差を描く、難解な砂時計型軌跡",
    "settings.preset.house-guard.name": "ハウス・プロテクト",
    "settings.preset.house-guard.description": "壁と尖った屋根のような、家（コテージ）の輪郭を模倣する手勢",
    "settings.preset.m-helix.name": "M字ヘリックス",
    "settings.preset.m-helix.description": "左右の列をまたいで起伏に富む M の字を描き抜くパターン",
    "settings.preset.n-symmetric.name": "N字シンメトリックゲート",
    "settings.preset.n-symmetric.description": "四隅ドットを幾何学的に直線横断する、信頼のN字型手勢",

    "dashboard.manualLogTrigger": "手動ログ監査プロセスを起動しました",

    "recovery.guide.sim.title": "SIMスワップ乗っ取り・SMS認証の防御",
    "recovery.guide.sim.short": "SIMスワップ",
    "recovery.guide.sim.step1": "携帯キャリアに連絡し、SIM情報の変更や転出（MNP）手続き用に専用パスコード（PIN）の設定を義務付けてください。",
    "recovery.guide.sim.step2": "主要なメールアカウントや取引口座から、セキュリティの脆弱なSMS認証（電話番号による2要素認証）を排除してください。",
    "recovery.guide.sim.step3": "物理的な盗難・挿し替え工作を防ぐため、eSIMに移行するか、SIMカードの暗号化ロック（SIM PIN）を有効化してください。",
    "recovery.guide.sim.step4": "最高機密の管理エリア用に、物理セキュリティキーで厳重保護された別アカウント配下のGoogle Voiceなどの予備復旧回線を利用してください。",
    "recovery.guide.sim.tip1": "SIMカードの複製や乗っ取りは、第三者があなたのオンラインアカウント群（SNSや銀行など）を丸ごと奪うための最速の手法です。",
    "recovery.guide.sim.tip2": "SMSを介した使い捨てコード（OTP）を止め、Google Authenticatorなどの認証アプリ、またはFIDO2準拠の物理キーを推奨します。",

    "recovery.guide.email.title": "マスターアカウント電子メールの総復旧手順",
    "recovery.guide.email.short": "メール乗っ取り",
    "recovery.guide.email.step1": "GoogleやMicrosoftアカウントの、ログイン不能時に備えた一回限り有効なオフライン復旧用コード（10〜12個）をダウンロードして印刷してください。",
    "recovery.guide.email.step2": "印刷された紙のバックアップコード類は、自宅などの耐火防水ミニ金庫等に厳重かつ別々に分散保管してください。",
    "recovery.guide.email.step3": "常用機器やスマホのメーラーに登録していない、他から独立した予備（サブ）メールアドレスを別に作り、認証用アドレスとして登録します。",
    "recovery.guide.email.step4": "一定期間ログインがない場合に家族へ通知・自動開示するデジタル遺品設定（Googleの「非アクティブ アカウント マネージャー」など）をセットします。",
    "recovery.guide.email.tip1": "日常的に使う主メールアドレスはあなたのデジタル人生の特権キーです。これが奪われると、すべての関連サービスでパスワードの強制リセットが可能になります。",
    "recovery.guide.email.tip2": "システム設定変更などによりコードが失効していないか、年に1度はバックアップ書類の有効性をテストしてください。",

    "recovery.guide.hardware.title": "物理セキュリティキー紛失に備えるコールドバックアップ",
    "recovery.guide.hardware.short": "物理キー紛失",
    "recovery.guide.hardware.step1": "どのような口座・アカウントでも、認証キーとしては常に2つ以上の物理セキリュティキー（例：YubiKey）を同時ペアリング・登録してください。",
    "recovery.guide.hardware.step2": "1つは常用としてキーホルダーに装着し、もう1つのスペアキーは自宅のセーフティボックス等にコールドストレージとして隔離保管します。",
    "recovery.guide.hardware.step3": "スマートフォンの有事認証時にも差し込めるよう、コンパクトなUSB-Cアダプターや、NFC（非接触タイプ）に対応するキーを持ち歩きます。",
    "recovery.guide.hardware.step4": "あなたに健康上の理由等が生じた際、パスワードマネージャー内のデータアクセス権を検証プロセス・指定待機時間を経て家族へ移譲する機能を設定します。",
    "recovery.guide.hardware.tip1": "物理的なセキリュティキーは、あらゆる形のリモートフィッシング攻撃（詐欺サイト誘導）に対して完全な免疫を持ちます。",
    "recovery.guide.hardware.tip2": "予備キーの登録がないまま登録したセキュリティキーを失うと、多くの主要プロバイダでは、アクセス回復に何週間もの厳しい本人確認フローが必要になります。",

    "recovery.guide.estate.title": "デジタル資産の安全な死後承継・遺産整理プロトコル",
    "recovery.guide.estate.short": "遺産承継",
    "recovery.guide.estate.step1": "あなたの相続人が金庫キーの場所を特定し、保管された謎解きヒントを解読できるよう、構造化された物理的メモブック（エンディングノート）を作ってください。",
    "recovery.guide.estate.step2": "金銭関係の根キーを扱う場合、ニーモニックを3グループ（A, B, C）に分割し「2つが揃えば解読可能」とするような、多署名（マルチシグ）的分割保管を活用します。",
    "recovery.guide.estate.step3": "アカウントが3〜6ヶ月以上にわたって生存シグナルを出さなくなった時に、特定のGoogleドライブを配偶者などの特定受信人にシェアする設定を行います。",
    "recovery.guide.estate.step4": "有事の指示書（解読ガイダンス）の最終開封キーは、正式な法律事務所等に遺言公正証書として預け、死亡または意思決定不能の診断が確定した場合のみ公開するよう手配します。",
    "recovery.guide.estate.tip1": "遺言書内にパスワードの生の数字やフレーズを書くことは避けてください。代わりに関連する記憶ノートや、ヒントを記した小冊子の場所を記します。",
    "recovery.guide.estate.tip2": "ローカルオフライン物理保管（金庫内書籍）と高度な暗号化インデックスを統合し、個人情報やウォレット資産を含むデジタル遺産の相続権を守ります。",
    "app.footerDisclaimer": "LockSafe アシスタント - ローカルの記憶補助用のみ。このアプリはデバイスのセキュリティをハッキングまたはバイパスすることはできません。",
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, variables?: Record<string, string | number>) => string;
  formatDateTime: (timestampMs: number) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("locksafe_language");
    if (saved === "en" || saved === "zh" || saved === "es" || saved === "ja") {
      return saved as Language;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("locksafe_language", lang);
  };

  const t = (key: keyof Translations, variables?: Record<string, string | number>): string => {
    const dict = translations[language];
    let text = dict[key] || translations["en"][key] || String(key);
    
    if (variables) {
      Object.entries(variables).forEach(([vKey, vVal]) => {
        text = text.replace(`{${vKey}}`, String(vVal));
      });
    }
    return text;
  };

  const formatDateTime = (timestampMs: number): string => {
    try {
      const locales: Record<Language, string> = {
        en: "en-US",
        zh: "zh-CN",
        es: "es-ES",
        ja: "ja-JP"
      };
      
      const locale = locales[language];
      const formatter = new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "medium"
      });
      
      // Extract original timezone name or display native local time
      const timeStr = formatter.format(new Date(timestampMs));
      
      // Let's add precise timezone display
      const tzFormatter = new Intl.DateTimeFormat(locale, { timeZoneName: "short" });
      const tzPart = tzFormatter.formatToParts(new Date(timestampMs)).find(part => part.type === "timeZoneName")?.value || "";
      
      return tzPart ? `${timeStr} (${tzPart})` : timeStr;
    } catch {
      return new Date(timestampMs).toLocaleString();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatDateTime }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
