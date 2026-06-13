const attributes = [
  { name: "赤", bg: "#fff0e6", color: "#b54708", monster: "#ef7654", horn: "#ffd166" },
  { name: "緑", bg: "#e8f7ee", color: "#067647", monster: "#58bd83", horn: "#d6e870" },
  { name: "青", bg: "#e7f2ff", color: "#175cd3", monster: "#65a7e8", horn: "#b9e8ff" },
  { name: "白", bg: "#fff9df", color: "#806800", monster: "#eadb86", horn: "#ffffff" },
  { name: "黒", bg: "#eeeaf8", color: "#5b3aa4", monster: "#7661c8", horn: "#c8b6ff" },
  { name: "無", bg: "#f1f0eb", color: "#6b5f4a", monster: "#aaa391", horn: "#f0dfb2" }
];
const moves = {
  caramelStrike: { name: "カラメルストライク", attribute: "無", gauge: 3, multiplier: 1.3, effect: "1.3倍ダメージ＋30%で盲目" },
  roll: { name: "転がる", attribute: "緑", gauge: 2, multiplier: 1.1, effect: "1.1倍ダメージ。使う度に倍率が0.1増える" },
  burn: { name: "焼く", attribute: "赤", gauge: 2, multiplier: 1.2, effect: "1.2倍ダメージ＋20%で火傷" },
  soak: { name: "濡らす", attribute: "青", gauge: 3, multiplier: 1.3, effect: "1.3倍ダメージ＋50%でパワーダウン" },
  gnaw: { name: "かじる", attribute: "黒", gauge: 2, multiplier: 1.2, effect: "1.2倍ダメージ＋20%で怯み" },
  shine: { name: "光る", attribute: "白", gauge: 3, multiplier: 1, effect: "スターを2段階上げる" },
  drain: { name: "吸う", attribute: "赤", gauge: 2, multiplier: 1.2, effect: "1.2倍ダメージ＋与ダメージの1/4だけHP回復" },
  grow: { name: "光合成", attribute: "緑", gauge: 4, multiplier: 1, effect: "スターの値×2だけHP回復" },
  cling: { name: "溶ける", attribute: "青", gauge: 3, multiplier: 1, effect: "5ターンの間、被ダメージを1/2にする" },
  bite: { name: "ダーク", attribute: "黒", gauge: 2, multiplier: 1.4, effect: "1.4倍ダメージ＋相手のゲージを1増やす" },
  flash: { name: "ライト", attribute: "白", gauge: 2, multiplier: 1.1, effect: "1.1倍ダメージ＋ラッシュ時に全体攻撃" }
};
const monsterSpecies = [
  { no: 1, name: "プリンスライム", rank: "G", attribute: "無", hp: 35, power: 10, star: 10, expTable: "A", passive: null, leftMove: moves.caramelStrike },
  { no: 2, name: "ワラボン", rank: "G", attribute: "緑", hp: 25, power: 7, star: 15, expTable: "A", passive: { name: "名称未設定", effect: "回避率10%" }, leftMove: moves.roll },
  { no: 3, name: "アカシャマ", rank: "G", attribute: "赤", hp: 27, power: 13, star: 10, expTable: "A", passive: { name: "焼きたがり", effect: "相手が火傷ならダメージ倍増" }, leftMove: moves.burn },
  { no: 4, name: "シズク", rank: "G", attribute: "青", hp: 31, power: 10, star: 3, expTable: "A", passive: { name: "名称未設定", effect: "バトルで最初に受けるダメージを1/2にする" }, leftMove: moves.soak },
  { no: 5, name: "クロダンゴ", rank: "G", attribute: "黒", hp: 32, power: 10, star: 10, expTable: "A", passive: { name: "甘々", effect: "戦闘開始時、相手のパワーを1段階下げる" }, leftMove: moves.gnaw },
  { no: 6, name: "ミルフィ", rank: "G", attribute: "白", hp: 27, power: 6, star: 18, expTable: "A", passive: { name: "甘々", effect: "場に出た時、相手のパワーを1段階下げる" }, leftMove: moves.shine },
  { no: 7, name: "ボヤモト", rank: "G", attribute: "赤", hp: 24, power: 12, star: 12, expTable: "A", passive: { name: "ヤニ", effect: "ゲージを消費する度、HPを1/8回復" }, leftMove: moves.drain },
  { no: 8, name: "キュコン", rank: "G", attribute: "緑", hp: 40, power: 7, star: 8, expTable: "A", passive: { name: "根気", effect: "HPが0になる時、一度HP1で耐える" }, leftMove: moves.grow },
  { no: 9, name: "スライム", rank: "G", attribute: "青", hp: 35, power: 5, star: 10, expTable: "A", passive: { name: "ぷるぷる", effect: "30%の確率で相手からのダメージを1/4にする" }, leftMove: moves.cling },
  { no: 10, name: "スカルビット", rank: "G", attribute: "黒", hp: 30, power: 11, star: 9, expTable: "A", passive: { name: "怨念", effect: "倒された時、相手のゲージを0にする" }, leftMove: moves.bite },
  { no: 11, name: "デンキュ", rank: "G", attribute: "白", hp: 26, power: 8, star: 20, expTable: "A", passive: { name: "発光", effect: "回避率10%" }, leftMove: moves.flash },
  { no: 12, name: "ゾンビキッズ", rank: "G", attribute: "黒", hp: 36, power: 12, star: 8, expTable: "A", passive: { name: "根気", effect: "HPが0になる時、一度HP1で耐える" }, leftMove: moves.bite },
  { no: 13, name: "ナメナメラ", rank: "G", attribute: "青", hp: 42, power: 8, star: 12, expTable: "A", passive: { name: "ぷるぷる", effect: "30%の確率で相手からのダメージを1/4にする" }, leftMove: moves.cling },
  { no: 14, name: "シャド", rank: "G", attribute: "黒", hp: 45, power: 15, star: 20, expTable: "A", passive: { name: "怨念", effect: "倒された時、相手のゲージを0にする" }, leftMove: moves.gnaw }
];
const monsterRanks = [
  { name: "G", hp: 30, power: 10, star: 10, weight: 38, color: "#59636b", bg: "#edf0f2" },
  { name: "F", hp: 60, power: 20, star: 20, weight: 28, color: "#347c67", bg: "#e4f4ed" },
  { name: "E", hp: 120, power: 40, star: 40, weight: 18, color: "#3776a8", bg: "#e5f1fa" },
  { name: "D", hp: 250, power: 80, star: 80, weight: 8, color: "#7358a6", bg: "#eee9f8" },
  { name: "C", hp: 500, power: 160, star: 160, weight: 4.5, color: "#b06e14", bg: "#fff1d9" },
  { name: "B", hp: 900, power: 300, star: 300, weight: 2, color: "#b94747", bg: "#fde7e7" },
  { name: "A", hp: 1600, power: 550, star: 550, weight: 1, color: "#a52d74", bg: "#f9e3f0" },
  { name: "S", hp: 3000, power: 1000, star: 1000, weight: 0.5, color: "#8a6800", bg: "#fff4bd" }
];
const MAX_FRIENDS = 100;
const CAGE_PRICE = 100;
const EXP_DRINK_PRICE = 200;
const EXP_DRINK_AMOUNT = 500;
const OUTGOING_MATCH_REFRESH_MS = 6 * 60 * 60 * 1000;
const SAVE_VERSION = 1;
const AUTOSAVE_KEY = "monmachi.save.autosave";
const MANUAL_SAVE_PREFIX = "monmachi.save.slot.";
const MANUAL_SAVE_SLOT_COUNT = 5;
const AUTOSAVE_DELAY_MS = 250;
const PLAYER_RANK_UNLOCKS = [
  { level: 1, rank: "G" },
  { level: 3, rank: "F" },
  { level: 5, rank: "E" },
  { level: 8, rank: "D" },
  { level: 12, rank: "C" },
  { level: 17, rank: "B" },
  { level: 23, rank: "A" },
  { level: 30, rank: "S" }
];
const MAX_BATTLE_GAUGE = 10;
const BATTLE_SPEED_OPTIONS = [1, 2, 3, 5, 7];
const DEFAULT_BATTLE_SPEED = 3;
const STAT_STAGE_MULTIPLIERS = {
  power: {
    "-4": 0.4, "-3": 0.5, "-2": 0.65, "-1": 0.75,
    "0": 1,
    "1": 1.25, "2": 1.5, "3": 1.75, "4": 2
  },
  star: {
    "-4": 0.05, "-3": 0.25, "-2": 0.5, "-1": 0.75,
    "0": 1,
    "1": 1.5, "2": 2, "3": 2.5, "4": 3
  },
  damage: {
    "-4": 0.4, "-3": 0.5, "-2": 0.65, "-1": 0.75,
    "0": 1,
    "1": 1.25, "2": 1.5, "3": 1.75, "4": 2
  }
};
const STATUS_CONFIG = {
  burn: { label: "火傷", icon: "炎", className: "burn", turns: 5 },
  poison: { label: "毒", icon: "毒", className: "poison", turns: 5 },
  paralysis: { label: "麻痺", icon: "雷", className: "paralysis", turns: 5 },
  freeze: { label: "凍結", icon: "氷", className: "freeze", minTurns: 1, maxTurns: 4 },
  sleep: { label: "眠り", icon: "眠", className: "sleep", minTurns: 2, maxTurns: 3 },
  flinch: { label: "怯み", icon: "止", className: "flinch", turns: 1 },
  blind: { label: "盲目", icon: "盲", className: "blind", turns: 3 },
  shield: { label: "溶解防御", icon: "盾", className: "shield" }
};
const GROWTH_CONFIG = {
  trainingDivisor: 7,
  levelDivisor: 25,
  talentCoefficient: 0.065,
  talentExponent: 0.6
};
const EXPERIENCE_TABLES = {
  A: 7.6,
  B: 10.7,
  C: 15.2,
  D: 22.8,
  E: 28.9
};
const DUNGEON_CONFIG = {
  warawara: {
    number: "01",
    category: "general",
    name: "ワラワラの森",
    baseExperience: 10,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 10,
    requestTables: [
      { name: "A", baseRate: 50, monsters: [{ species: 2, level: 1, weight: 100 }] },
      { name: "B", baseRate: 30, monsters: [{ species: 2, level: 2, weight: 100 }] },
      { name: "C", baseRate: 20, monsters: [{ species: 2, level: 3, weight: 100 }] }
    ],
    rushes: [
      { species: [2, 2, 2], level: 1, hpMultiplier: 0.5 },
      { species: [2, 2, 1], level: 1, hpMultiplier: 0.75 }
    ],
    bosses: [{ species: 2, level: 1, hpMultiplier: 1 }]
  },
  beginner: {
    number: "02",
    category: "general",
    unlockAfter: "warawara",
    name: "初心者の館",
    baseExperience: 15,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 10,
    requestTables: [
      {
        name: "A",
        baseRate: 65,
        monsters: [2, 3, 4].map((species) => ({ species, level: 3, weight: 1 }))
      },
      {
        name: "B",
        baseRate: 30,
        monsters: [1, 3, 4].map((species) => ({ species, level: 4, weight: 1 }))
      },
      {
        name: "C",
        baseRate: 5,
        monsters: [3, 4].map((species) => ({ species, level: 5, weight: 1 }))
      }
    ],
    rushes: [
      { speciesPool: [2, 3, 4], count: 3, level: 2, hpMultiplier: 1 },
      { speciesPool: [2, 3, 4], count: 3, level: 2, hpMultiplier: 1 }
    ],
    bosses: [{ species: 1, level: 3, hpMultiplier: 1 }]
  },
  plain: {
    number: "03",
    category: "general",
    unlockAfter: "beginner",
    name: "単なる平原",
    baseExperience: 17,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 13,
    requestTables: [
      { name: "A", baseRate: 60, monsters: [9, 8].map((species) => ({ species, level: 3, weight: 1 })) },
      { name: "B", baseRate: 30, monsters: [9, 8].map((species) => ({ species, level: 5, weight: 1 })) },
      { name: "C", baseRate: 10, monsters: [{ species: 9, level: 6, weight: 1 }] }
    ],
    rushes: [
      { speciesPool: [2, 9, 8], count: 3, level: 3, hpMultiplier: 1 },
      { speciesPool: [2, 9, 8], count: 3, level: 3, hpMultiplier: 1 }
    ],
    bosses: [{ species: 9, level: 5, hpMultiplier: 1 }]
  },
  sweetHome: {
    number: "04",
    category: "general",
    unlockAfter: "plain",
    name: "あま〜いお家",
    baseExperience: 20,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 15,
    requestTables: [
      { name: "A", baseRate: 45, monsters: [{ species: 1, level: 4, weight: 1 }] },
      { name: "B", baseRate: 40, monsters: [6, 5].map((species) => ({ species, level: 4, weight: 1 })) },
      { name: "C", baseRate: 15, monsters: [6, 5].map((species) => ({ species, level: 6, weight: 1 })) }
    ],
    rushes: [
      { species: [6, 1, 1], level: 4, hpMultiplier: 1 },
      { species: [5, 1, 1, 1], level: 4, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 6, level: 5, hpMultiplier: 1 },
      { species: 5, level: 5, hpMultiplier: 1 }
    ]
  },
  alley: {
    number: "05",
    category: "general",
    unlockAfter: "sweetHome",
    name: "細長い裏路地",
    baseExperience: 25,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 18,
    requestTables: [
      { name: "A", baseRate: 60, monsters: [7, 11].map((species) => ({ species, level: 5, weight: 1 })) },
      { name: "B", baseRate: 30, monsters: [7, 11, 10].map((species) => ({ species, level: 6, weight: 1 })) },
      { name: "C", baseRate: 10, monsters: [{ species: 10, level: 7, weight: 1 }] }
    ],
    rushes: [
      { species: [7, 7, 7], level: 5, hpMultiplier: 1 },
      { species: [11, 11, 11], level: 5, hpMultiplier: 1 }
    ],
    bosses: [{ species: 10, level: 8, hpMultiplier: 1 }]
  },
  trial2: {
    number: "Lv2",
    category: "trial",
    name: "昇格戦 Lv2",
    baseExperience: 15,
    rewardPlayerLevel: 2,
    rushes: [
      { species: [6, 1, 1], level: 3, hpMultiplier: 1 },
      { species: [5, 4, 2], level: 3, hpMultiplier: 1 }
    ],
    bosses: [{ species: 3, level: 5, hpMultiplier: 1 }]
  },
  trial3: {
    number: "Lv3",
    category: "trial",
    requiredPlayerLevel: 2,
    name: "昇格戦 Lv3",
    baseExperience: 20,
    rewardPlayerLevel: 3,
    rushes: [
      { species: [9, 9, 9], level: 5, hpMultiplier: 1 },
      { species: [7, 8, 8], level: 5, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 10, level: 7, hpMultiplier: 1 },
      { species: 11, level: 8, hpMultiplier: 1 }
    ]
  },
  trial4: {
    number: "Lv4",
    category: "trial",
    requiredPlayerLevel: 3,
    name: "昇格戦 Lv4",
    baseExperience: 25,
    rewardPlayerLevel: 4,
    rushes: [
      { species: [12, 12, 12], level: 7, hpMultiplier: 1 },
      { species: [13, 13, 13], level: 8, hpMultiplier: 1 },
      { species: [5, 5, 5], level: 10, hpMultiplier: 1 }
    ],
    bosses: [{ species: 14, level: 15, hpMultiplier: 1 }]
  }
};
const RANK_EXPERIENCE_MULTIPLIERS = {
  G: 1,
  F: 1.2,
  E: 1.4,
  D: 1.6,
  C: 1.8,
  B: 2,
  A: 2.3,
  S: 2.6
};
const DAMAGE_CONFIG = {
  randomMin: 0.8,
  randomMax: 1.2,
  criticalMultiplier: 2,
  criticalSlope: 1,
  minimumCriticalRate: 0.05
};
const TYPE_EFFECTIVENESS = {
  "赤": { strong: ["緑", "白"], weak: ["青", "黒"] },
  "緑": { strong: ["赤", "白"], weak: ["赤", "黒"] },
  "青": { strong: ["青", "白"], weak: ["緑", "黒"] },
  "白": { strong: ["黒", "無"], weak: ["赤", "緑", "青"] },
  "黒": { strong: ["赤", "緑", "青"], weak: ["白"] },
  "無": { strong: [], weak: ["白"] }
};

const state = {
  playerLevel: 1,
  playerName: "プレイヤー",
  gold: 320,
  cages: 1,
  expDrinks: 0,
  friends: [],
  friendSequence: 0,
  collectionSort: "newest",
  collectionAttributeFilter: "all",
  partyPickerSort: "newest",
  partyPickerAttributeFilter: "all",
  outgoingCandidates: [],
  outgoingGeneratedAt: 0,
  outgoingApplied: false,
  outgoingTimer: null,
  pendingOutgoingMonsterId: null,
  discoveredSpecies: new Set([1, 2, 3, 4, 5, 6]),
  profileMonsterIds: [],
  editingProfileMonsterIds: [],
  editingProfileSlot: 0,
  partyIds: [],
  partyPresets: [[], [], []],
  activePresetIndex: 0,
  editingPartySlot: 0,
  partyEditorMode: "dungeon",
  selectedDungeon: "warawara",
  clearedDungeons: new Set(),
  currentView: "partyView",
  homeTab: "monsters",
  dungeonCategory: "general",
  battleIndex: 0,
  rushBattleSpeed: DEFAULT_BATTLE_SPEED,
  bossBattleSpeed: DEFAULT_BATTLE_SPEED,
  dungeonPartyStarAverage: 0,
  rushTimer: null,
  statusPausedRush: false,
  rushSide: "ally",
  allies: [],
  enemies: [],
  bossQueue: [],
  defeatedBosses: [],
  activeAllyIndex: 0,
  allyPartyGauge: 0,
  enemyPartyGauge: 0,
  rushAllyGauge: 0,
  rushEnemyGauge: 0,
  awaitingReplacement: false,
  selectedBenchIndex: null,
  battleHistory: [],
  battleLocked: false,
  battleDragging: false,
  battleDragAxis: null,
  battleStartX: 0,
  battleStartY: 0,
  battleDx: 0,
  moveTooltipTimer: null,
  moveTooltipButton: null,
  moveTooltipStartX: 0,
  moveTooltipStartY: 0,
  suppressMoveClickUntil: 0,
  requests: [],
  requestIndex: 0,
  tutorialStage: "intro",
  tutorialMatchedCount: 0,
  tutorialPrinceId: null,
  tutorialContinue: null,
  pendingRecruit: null,
  matchAnimationActive: false,
  matchAnimationTimers: [],
  experienceContinue: null,
  detailMode: "view",
  detailMonsterId: null,
  detailMonsterRef: null,
  requestLocked: false,
  dragging: false,
  dragAxis: null,
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0
};

const els = {};
let saveRuntimeReady = false;
let autosaveTimer = null;
let suppressAutosaveOnUnload = false;

function cacheElements() {
  [
    "friends", "gold", "homeButton", "headerPlayerName", "headerPlayerLevel",
    "optionsButton", "optionsDialog", "closeOptions", "rushSpeedSelect", "bossSpeedSelect",
    "developerSaveButton", "developerSaveDialog", "closeDeveloperSave",
    "autosaveStatus", "developerSaveSlots", "developerNewGame",
    "partyView", "battleView", "matchView",
    "tutorialSkipButton", "tutorialOverlay", "tutorialText", "tutorialContinueButton",
    "testClearButton", "openBattleStatus", "battleStatusDialog",
    "closeBattleStatus", "battleStatusContent",
    "benchActionDialog", "benchActionName", "benchActionMonster",
    "closeBenchAction", "benchDetailButton", "benchSwitchButton",
    "monsterHomePanel", "dungeonHomePanel", "trainingHomePanel", "matchHomePanel", "shopHomePanel",
    "dungeonCategoryTabs", "generalDungeonList", "trialDungeonList",
    "monsterTabButton", "dungeonTabButton", "trainingTabButton", "matchTabButton", "shopTabButton",
    "shopGold", "shopCageCount", "buyCageButton", "shopFeedback",
    "shopExpDrinkCount", "buyExpDrinkButton", "useExpDrinkButton",
    "expDrinkDialog", "closeExpDrinkDialog", "expDrinkRoster",
    "collectionCount", "collectionGrid", "collectionSort", "collectionAttributeFilter",
    "openPartyEditorButton",
    "partyDialog", "closePartyDialog", "selectedDungeonName",
    "presetTabs", "partyTotalSp", "partyPickerDialog", "closePartyPicker", "pickerTitle",
    "partyPickerSort", "partyPickerAttributeFilter",
    "partyCount", "partySlots", "requestInbox", "requestInboxTitle", "requestInboxCopy",
    "inboxCount", "requestTabBadge", "playerLevel", "matchMenuHeading", "matchMenuCaption",
    "matchMenuList", "openProfileButton", "matchProfileName",
    "outgoingMatchButton", "outgoingCountLabel", "outgoingUnlockCopy", "outgoingMatchView",
    "closeOutgoingMatch", "refreshOutgoingMatch", "outgoingRefreshTimer",
    "outgoingPlayerName", "unlockedRankLabel", "matchProfileMonsters", "outgoingMatchFeedback",
    "outgoingMonsterList",
    "profileDialog", "closeProfileDialog", "playerNameInput", "profileEditorSlots",
    "saveProfileButton", "profilePickerDialog", "profilePickerTitle",
    "closeProfilePicker", "profilePickerRoster",
    "cageSelectDialog", "closeCageSelect", "standardCageChoice",
    "outgoingCageCount", "confirmOutgoingApplication",
    "roster", "diveButton", "battleKind", "battleTitle",
    "battleSpeedButton", "battleSpeedValue",
    "battleDots", "rushBattleArea", "rushEnemyHpList", "rushAllyHpList",
    "rushBattleLog", "bossBattleArea", "manualBattleField",
    "enemyName", "enemyHp", "enemyGauge", "enemyGaugeValue",
    "enemyMonster", "enemyStatusIcons", "allyName", "allyHp", "allyGauge", "allyGaugeValue",
    "allyStatusIcons",
    "allyMonster", "leftMoveCallout", "rightMoveCallout",
    "leftMoveButton", "rightMoveButton", "leftMoveGuide", "rightMoveGuide",
    "leftMoveTooltip", "rightMoveTooltip",
    "bench", "battleLog", "bossEffectText",
    "requestProgress", "card", "imagePanel", "monsterArt", "sp", "matchHp", "matchPower", "matchStar", "name",
    "levelBadge", "rankBadge", "attribute",
    "leftMove", "leftMove2", "leftMove2Button", "rightMove", "trait", "matchAbilityList", "matchAbilityInfo",
    "ivHp", "ivAtk", "ivSense",
    "ivHpValue", "ivAtkValue", "ivSenseValue", "skipBadge",
    "friendBadge", "skipButton", "keepButton", "matchCageStatus", "matchCageLabel", "matchCageCount",
    "replaceDialog", "replaceList",
    "cancelReplace", "detailDialog", "detailVisual", "detailName",
    "detailAttribute", "detailRank", "detailLevel", "detailTalent", "detailExp",
    "detailSp", "detailHp", "detailPower", "detailStar", "detailLeftMove", "detailRightMove", "detailTrait",
    "detailLeftMove2", "detailLeftMove2Button", "detailAbilityList", "detailAbilityInfo",
    "detailIvHp", "detailIvAtk", "detailIvSense",
    "detailIvHpValue", "detailIvAtkValue", "detailIvSenseValue",
    "detailSelectActions", "confirmPartyMonster",
    "matchOverlay", "matchMonster",
    "matchedName", "experienceOverlay", "experienceTitle", "experienceAmount",
    "experienceList", "experienceContinueButton",
    "exitRequestsButton", "rejectAllRequestsButton", "rejectAllDialog",
    "cancelRejectAll", "confirmRejectAll", "resultOverlay", "resultMark", "resultTitle", "resultCopy",
    "resultHomeButton", "resultLogButton", "battleHistoryDialog", "battleHistoryList",
    "closeBattleHistory"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedPick(items, weightKey = "weight") {
  const totalWeight = items.reduce(
    (sum, item) => sum + Math.max(0, Number(item[weightKey]) || 0),
    0
  );
  if (totalWeight <= 0) return items[0];
  let roll = Math.random() * totalWeight;
  return items.find((item) => {
    roll -= Math.max(0, Number(item[weightKey]) || 0);
    return roll <= 0;
  }) ?? items.at(-1);
}

function chooseMonsterRank(boost = 0) {
  const totalWeight = monsterRanks.reduce((sum, rank) => sum + rank.weight, 0);
  let roll = Math.random() * totalWeight;
  let rankIndex = 0;
  for (let index = 0; index < monsterRanks.length; index += 1) {
    roll -= monsterRanks[index].weight;
    if (roll <= 0) {
      rankIndex = index;
      break;
    }
  }
  const boostSteps = Math.floor(Math.max(0, boost) / 5);
  return monsterRanks[Math.min(monsterRanks.length - 1, rankIndex + boostSteps)];
}

function individualMultiplier(individualValue) {
  return 1 + individualValue * 0.05;
}

function talentMultiplier(talent) {
  return 1 + GROWTH_CONFIG.talentCoefficient
    * Math.pow(Math.max(0, talent), GROWTH_CONFIG.talentExponent);
}

function calculateMonsterStats(monster) {
  const growth = 1 + ((monster.level - 1) / GROWTH_CONFIG.levelDivisor)
    * talentMultiplier(monster.talent);
  const statKeys = [
    ["hp", "hp"],
    ["power", "atk"],
    ["star", "sense"]
  ];
  const initialStats = {};
  const finalStats = {};

  statKeys.forEach(([statKey, ivKey]) => {
    initialStats[statKey] = (
      monster.baseStats[statKey] + monster.trainingBonus[statKey]
    ) * individualMultiplier(monster.iv[ivKey]);
    finalStats[statKey] = initialStats[statKey] * growth + (monster.level - 1);
  });

  return { initialStats, finalStats, growth };
}

function applyCalculatedStats(monster) {
  const calculated = calculateMonsterStats(monster);
  monster.initialStats = calculated.initialStats;
  monster.finalStats = calculated.finalStats;
  monster.growthMultiplier = calculated.growth;
  monster.hp = Math.max(1, Math.round(calculated.finalStats.hp));
  monster.power = Math.max(1, Math.round(calculated.finalStats.power));
  monster.star = Math.max(1, Math.round(calculated.finalStats.star));
  monster.sp = monster.hp + monster.power + monster.star;
  return monster;
}

function calculateTrainingBonus(parentA, parentB) {
  return {
    hp: (parentA.finalStats.hp + parentB.finalStats.hp) / GROWTH_CONFIG.trainingDivisor,
    power: (parentA.finalStats.power + parentB.finalStats.power) / GROWTH_CONFIG.trainingDivisor,
    star: (parentA.finalStats.star + parentB.finalStats.star) / GROWTH_CONFIG.trainingDivisor
  };
}

function combinedTalent(parentA, parentB) {
  return parentA.talent + parentB.talent;
}

function nextLevelExperience(monster) {
  const coefficient = EXPERIENCE_TABLES[monster.expTable] ?? EXPERIENCE_TABLES.A;
  return Math.round(10 + coefficient * monster.level ** 2);
}

function experienceLevelMultiplier(level) {
  return 1 + (level * level / 100);
}

function experienceLevelDifferenceCorrection(enemyMonster, recipientMonster) {
  void enemyMonster;
  void recipientMonster;
  return 1;
}

function calculateDefeatExperience(enemyMonster, recipientMonster) {
  const dungeon = DUNGEON_CONFIG[state.selectedDungeon] ?? DUNGEON_CONFIG.warawara;
  const rankMultiplier = RANK_EXPERIENCE_MULTIPLIERS[enemyMonster.rank.name] ?? 1;
  const levelMultiplier = experienceLevelMultiplier(enemyMonster.level);
  const levelDifferenceCorrection = experienceLevelDifferenceCorrection(
    enemyMonster,
    recipientMonster
  );
  const specialMultiplier = dungeon.specialExperienceMultiplier ?? 1;
  return Math.max(1, Math.round(
    dungeon.baseExperience
      * rankMultiplier
      * levelMultiplier
      * levelDifferenceCorrection
      * specialMultiplier
  ));
}

function calculatePartyExperience(defeatedEnemies) {
  return new Map(state.allies.map((fighter) => {
    const amount = defeatedEnemies.reduce(
      (total, enemy) => total + calculateDefeatExperience(enemy.monster, fighter.monster),
      0
    );
    return [fighter.id, amount];
  }));
}

function calculateBattleGold(defeatedEnemies) {
  return defeatedEnemies.reduce(
    (total, enemy) => total + Math.round(enemy.monster.sp / 2),
    0
  );
}

function grantExperience(monster, amount) {
  const before = {
    level: monster.level,
    hp: monster.hp,
    power: monster.power,
    star: monster.star
  };
  monster.experience += amount;

  while (monster.experience >= monster.nextLevelExperience) {
    monster.experience -= monster.nextLevelExperience;
    monster.level += 1;
    applyCalculatedStats(monster);
    monster.nextLevelExperience = nextLevelExperience(monster);
  }

  return {
    monster,
    leveledUp: monster.level > before.level,
    before,
    gains: {
      hp: monster.hp - before.hp,
      power: monster.power - before.power,
      star: monster.star - before.star
    }
  };
}

function syncFighterAfterGrowth(fighter) {
  const previousMaxHp = fighter.maxHp;
  const wasDefeated = fighter.hp <= 0;
  fighter.maxHp = fighter.monster.hp;
  fighter.hp = wasDefeated
    ? 0
    : Math.min(fighter.maxHp, fighter.hp + Math.max(0, fighter.maxHp - previousMaxHp));
  fighter.power = fighter.monster.power;
  fighter.star = fighter.monster.star;
}

function showExperienceReward(experienceAwards, title, onContinue) {
  const rewards = state.allies.map((fighter) => {
    const amount = experienceAwards.get(fighter.id) ?? 0;
    const reward = grantExperience(fighter.monster, amount);
    syncFighterAfterGrowth(fighter);
    return { ...reward, amount };
  });

  els.experienceTitle.textContent = title;
  const awardedAmounts = rewards.map((reward) => reward.amount);
  const minimumAward = Math.min(...awardedAmounts);
  const maximumAward = Math.max(...awardedAmounts);
  els.experienceAmount.textContent = minimumAward === maximumAward
    ? `各 +${minimumAward} EXP`
    : `${minimumAward}〜${maximumAward} EXP`;
  els.experienceList.innerHTML = rewards.map((reward) => {
    const levelUp = reward.leveledUp
      ? `<div class="level-up-result">
          <div class="level-up-banner">
            <strong>LEVEL UP!</strong>
            <div class="level-change">
              <span>Lv ${reward.before.level}</span>
              <i>→</i>
              <b>Lv ${reward.monster.level}</b>
            </div>
          </div>
          <div class="growth-stat">
            <span>HP</span>
            <strong>+${reward.gains.hp}</strong>
            <small>${reward.before.hp} → ${reward.monster.hp}</small>
          </div>
          <div class="growth-stat">
            <span>パワー</span>
            <strong>+${reward.gains.power}</strong>
            <small>${reward.before.power} → ${reward.monster.power}</small>
          </div>
          <div class="growth-stat">
            <span>スター</span>
            <strong>+${reward.gains.star}</strong>
            <small>${reward.before.star} → ${reward.monster.star}</small>
          </div>
        </div>`
      : `<div class="experience-progress">
          <strong>Lv ${reward.monster.level}</strong>
          <span>${reward.monster.experience} / ${reward.monster.nextLevelExperience} EXP</span>
        </div>`;
    return `
      <div class="experience-row${reward.leveledUp ? " leveled-up" : ""}">
        <div class="reward-monster-head">
          <div class="mini-monster" style="${monsterStyle(reward.monster)}"></div>
          <strong>${reward.monster.name}</strong>
          <span class="reward-exp">+${reward.amount} EXP</span>
        </div>
        <div class="experience-monster-copy">
          ${levelUp}
        </div>
      </div>`;
  }).join("");
  state.experienceContinue = onContinue;
  els.experienceOverlay.hidden = false;
  renderParty();
}

function continueAfterExperience() {
  if (els.experienceOverlay.hidden) return;
  els.experienceOverlay.hidden = true;
  const callback = state.experienceContinue;
  state.experienceContinue = null;
  callback?.();
}

function rankStyle(rank) {
  return `--rank-color:${rank.color};--rank-bg:${rank.bg}`;
}

function normalAttack(attributeName) {
  return {
    name: "アタック",
    attribute: attributeName,
    gauge: 0,
    multiplier: 1,
    effect: "使用者の属性で通常攻撃"
  };
}

function randomSample(items, count) {
  const pool = [...items];
  const selected = [];
  while (pool.length && selected.length < count) {
    selected.push(pool.splice(randomInt(0, pool.length - 1), 1)[0]);
  }
  return selected;
}

function createMonster(boost = 0, speciesNo = null, levelOverride = null, options = {}) {
  const species = speciesNo
    ? monsterSpecies.find((candidate) => candidate.no === speciesNo)
    : pick(monsterSpecies);
  const attr = attributes.find((candidate) => candidate.name === species.attribute);
  const speciesRank = monsterRanks.find((candidate) => candidate.name === species.rank);
  const rank = monsterRanks.find((candidate) => candidate.name === options.rankName)
    ?? speciesRank;
  const rankScale = {
    hp: rank.hp / speciesRank.hp,
    power: rank.power / speciesRank.power,
    star: rank.star / speciesRank.star
  };
  const level = levelOverride ?? Math.max(1, 1 + Math.floor(boost / 2) + randomInt(0, 2));
  const fixedIv = Number.isInteger(options.fixedIv) ? options.fixedIv : null;
  const iv = {
    hp: fixedIv ?? randomInt(0, 5),
    atk: fixedIv ?? randomInt(0, 5),
    sense: fixedIv ?? randomInt(0, 5)
  };
  const rightMoveCandidates = species.rightMoves ?? [normalAttack(species.attribute)];
  const leftMoveCandidates = species.leftMoves ?? [species.leftMove].filter(Boolean);
  const passiveCandidates = species.passives ?? [species.passive].filter(Boolean);
  const rightMove = pick(rightMoveCandidates);
  const selectedLeftMoves = randomSample(leftMoveCandidates, 2);
  const leftMove = selectedLeftMoves[0];
  const selectedPassive = passiveCandidates.length ? pick(passiveCandidates) : null;
  const monster = applyCalculatedStats({
    id: crypto.randomUUID(),
    speciesNo: species.no,
    name: species.name,
    attr,
    rank,
    expTable: species.expTable,
    experience: 0,
    level,
    talent: 0,
    baseStats: {
      hp: species.hp * rankScale.hp,
      power: species.power * rankScale.power,
      star: species.star * rankScale.star
    },
    trainingBonus: {
      hp: 0,
      power: 0,
      star: 0
    },
    leftMove: leftMove.name,
    leftMoveMultiplier: leftMove.multiplier,
    leftMoves: selectedLeftMoves,
    rightMove: rightMove.name,
    rightMoveMultiplier: rightMove.multiplier,
    rightMoveAttribute: rightMove.attribute,
    rightMoveGauge: rightMove.gauge,
    rightMoveEffect: rightMove.effect,
    leftMoveAttribute: leftMove.attribute,
    leftMoveGauge: leftMove.gauge,
    leftMoveEffect: leftMove.effect,
    trait: selectedPassive?.name ?? "なし",
    traitEffect: selectedPassive?.effect ?? "パッシブなし",
    iv,
    bodyRadius: `${randomInt(38, 58)}% ${randomInt(42, 62)}% ${randomInt(38, 58)}% ${randomInt(42, 62)}% / ${randomInt(45, 65)}% ${randomInt(45, 65)}% ${randomInt(35, 55)}% ${randomInt(35, 55)}%`,
    hornTilt: `${randomInt(-18, 18)}deg`,
    hornTop: `${randomInt(8, 26)}px`
  });
  monster.nextLevelExperience = nextLevelExperience(monster);
  return monster;
}

function serializeMonster(monster) {
  return {
    ...monster,
    rankName: monster.rank?.name ?? monster.rankName ?? "G",
    attr: undefined,
    rank: undefined,
    initialStats: undefined,
    finalStats: undefined,
    growthMultiplier: undefined
  };
}

function hydrateMonster(savedMonster) {
  if (!savedMonster?.speciesNo) return null;
  const species = monsterSpecies.find((candidate) => candidate.no === savedMonster.speciesNo);
  if (!species) return null;
  const rank = monsterRanks.find((candidate) => candidate.name === savedMonster.rankName)
    ?? monsterRanks.find((candidate) => candidate.name === savedMonster.rank?.name)
    ?? monsterRanks.find((candidate) => candidate.name === species.rank)
    ?? monsterRanks[0];
  const attr = attributes.find((candidate) => candidate.name === species.attribute)
    ?? attributes[0];
  const fallbackLeftMove = species.leftMove;
  const monster = {
    ...savedMonster,
    id: savedMonster.id || crypto.randomUUID(),
    name: savedMonster.name || species.name,
    attr,
    rank,
    rankName: rank.name,
    expTable: savedMonster.expTable || species.expTable || "A",
    experience: Math.max(0, Number(savedMonster.experience) || 0),
    level: Math.max(1, Number(savedMonster.level) || 1),
    talent: Math.max(0, Number(savedMonster.talent) || 0),
    baseStats: savedMonster.baseStats ?? {
      hp: species.hp,
      power: species.power,
      star: species.star
    },
    trainingBonus: savedMonster.trainingBonus ?? { hp: 0, power: 0, star: 0 },
    iv: savedMonster.iv ?? { hp: 0, atk: 0, sense: 0 },
    leftMoves: savedMonster.leftMoves?.length
      ? savedMonster.leftMoves
      : [fallbackLeftMove].filter(Boolean),
    bodyRadius: savedMonster.bodyRadius || "50%",
    hornTilt: savedMonster.hornTilt || "0deg",
    hornTop: savedMonster.hornTop || "16px"
  };
  const primaryLeftMove = monster.leftMoves[0] ?? fallbackLeftMove;
  if (primaryLeftMove) {
    monster.leftMove = savedMonster.leftMove || primaryLeftMove.name;
    monster.leftMoveMultiplier = savedMonster.leftMoveMultiplier ?? primaryLeftMove.multiplier;
    monster.leftMoveAttribute = savedMonster.leftMoveAttribute || primaryLeftMove.attribute;
    monster.leftMoveGauge = savedMonster.leftMoveGauge ?? primaryLeftMove.gauge;
    monster.leftMoveEffect = savedMonster.leftMoveEffect || primaryLeftMove.effect;
  }
  applyCalculatedStats(monster);
  monster.nextLevelExperience = nextLevelExperience(monster);
  return monster;
}

function createSaveData() {
  return {
    saveVersion: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    playerLevel: state.playerLevel,
    playerName: state.playerName,
    gold: state.gold,
    cages: state.cages,
    expDrinks: state.expDrinks,
    friends: state.friends.map(serializeMonster),
    friendSequence: state.friendSequence,
    collectionSort: state.collectionSort,
    collectionAttributeFilter: state.collectionAttributeFilter,
    partyPickerSort: state.partyPickerSort,
    partyPickerAttributeFilter: state.partyPickerAttributeFilter,
    outgoingCandidates: state.outgoingCandidates.map(serializeMonster),
    outgoingGeneratedAt: state.outgoingGeneratedAt,
    outgoingApplied: state.outgoingApplied,
    discoveredSpecies: [...state.discoveredSpecies],
    profileMonsterIds: [...state.profileMonsterIds],
    partyPresets: state.partyPresets.map((preset) => [...preset]),
    activePresetIndex: state.activePresetIndex,
    selectedDungeon: state.selectedDungeon,
    clearedDungeons: [...state.clearedDungeons],
    homeTab: state.homeTab,
    dungeonCategory: state.dungeonCategory,
    rushBattleSpeed: state.rushBattleSpeed,
    bossBattleSpeed: state.bossBattleSpeed,
    requests: state.requests.slice(state.requestIndex).map(serializeMonster),
    tutorialStage: "done"
  };
}

function migrateSaveData(savedData) {
  if (!savedData || typeof savedData !== "object") return null;
  const migrated = { ...savedData };
  if (!migrated.saveVersion) migrated.saveVersion = 1;
  if (migrated.saveVersion > SAVE_VERSION) return null;
  migrated.saveVersion = SAVE_VERSION;
  return migrated;
}

function readSave(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? migrateSaveData(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeSave(key) {
  if (isTutorialActive()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(createSaveData()));
    return true;
  } catch {
    return false;
  }
}

function scheduleAutosave() {
  if (!saveRuntimeReady || isTutorialActive()) return;
  window.clearTimeout(autosaveTimer);
  autosaveTimer = window.setTimeout(() => {
    writeSave(AUTOSAVE_KEY);
    autosaveTimer = null;
    if (els.developerSaveDialog.open) renderDeveloperSaveSlots();
  }, AUTOSAVE_DELAY_MS);
}

function validMonsterIds() {
  return new Set(state.friends.map((monster) => monster.id));
}

function sanitizePartyPreset(preset, validIds) {
  return [...new Set(Array.isArray(preset) ? preset : [])]
    .filter((id) => validIds.has(id))
    .slice(0, 3);
}

function applySaveData(rawSave) {
  const saved = migrateSaveData(rawSave);
  if (!saved) return false;
  const friends = (saved.friends ?? []).map(hydrateMonster).filter(Boolean);
  const validIds = new Set(friends.map((monster) => monster.id));

  saveRuntimeReady = false;
  state.playerLevel = Math.max(1, Number(saved.playerLevel) || 1);
  state.playerName = saved.playerName || "プレイヤー";
  state.gold = Math.max(0, Number(saved.gold) || 0);
  state.cages = Math.max(0, Number(saved.cages) || 0);
  state.expDrinks = Math.max(0, Number(saved.expDrinks) || 0);
  state.friends = friends;
  state.friendSequence = Math.max(
    Number(saved.friendSequence) || 0,
    ...friends.map((monster) => Number(monster.acquiredOrder) || 0),
    0
  );
  state.collectionSort = saved.collectionSort || "newest";
  state.collectionAttributeFilter = saved.collectionAttributeFilter || "all";
  state.partyPickerSort = saved.partyPickerSort || "newest";
  state.partyPickerAttributeFilter = saved.partyPickerAttributeFilter || "all";
  state.outgoingCandidates = (saved.outgoingCandidates ?? []).map(hydrateMonster).filter(Boolean);
  state.outgoingGeneratedAt = Number(saved.outgoingGeneratedAt) || 0;
  state.outgoingApplied = Boolean(saved.outgoingApplied);
  state.discoveredSpecies = new Set(saved.discoveredSpecies ?? friends.map((monster) => monster.speciesNo));
  state.profileMonsterIds = (saved.profileMonsterIds ?? []).filter((id) => validIds.has(id)).slice(0, 3);
  state.partyPresets = Array.from({ length: 3 }, (_, index) => (
    sanitizePartyPreset(saved.partyPresets?.[index], validIds)
  ));
  state.activePresetIndex = Math.max(0, Math.min(2, Number(saved.activePresetIndex) || 0));
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  state.selectedDungeon = DUNGEON_CONFIG[saved.selectedDungeon]
    ? saved.selectedDungeon
    : "warawara";
  state.clearedDungeons = new Set(
    (saved.clearedDungeons ?? []).filter((id) => DUNGEON_CONFIG[id])
  );
  state.homeTab = ["monsters", "dungeon", "training", "match", "shop"].includes(saved.homeTab)
    ? saved.homeTab
    : "monsters";
  if (state.homeTab === "training" && state.playerLevel < 6) {
    state.homeTab = "monsters";
  }
  state.dungeonCategory = saved.dungeonCategory === "trial" ? "trial" : "general";
  state.rushBattleSpeed = BATTLE_SPEED_OPTIONS.includes(Number(saved.rushBattleSpeed))
    ? Number(saved.rushBattleSpeed)
    : DEFAULT_BATTLE_SPEED;
  state.bossBattleSpeed = BATTLE_SPEED_OPTIONS.includes(Number(saved.bossBattleSpeed))
    ? Number(saved.bossBattleSpeed)
    : DEFAULT_BATTLE_SPEED;
  state.requests = (saved.requests ?? []).map(hydrateMonster).filter(Boolean);
  state.requestIndex = 0;
  state.tutorialStage = "done";
  state.tutorialMatchedCount = 0;
  state.currentView = "partyView";
  state.battleIndex = 0;
  state.allies = [];
  state.enemies = [];
  state.bossQueue = [];
  state.defeatedBosses = [];

  els.tutorialSkipButton.hidden = true;
  els.tutorialOverlay.hidden = true;
  els.matchOverlay.hidden = true;
  els.experienceOverlay.hidden = true;
  els.resultOverlay.hidden = true;
  showView("partyView");
  closeOutgoingMatch();
  els.collectionSort.value = state.collectionSort;
  els.collectionAttributeFilter.value = state.collectionAttributeFilter;
  els.partyPickerSort.value = state.partyPickerSort;
  els.partyPickerAttributeFilter.value = state.partyPickerAttributeFilter;
  renderParty();
  setHomeTab(state.homeTab);
  updateResources();
  saveRuntimeReady = true;
  scheduleAutosave();
  return true;
}

function monsterStyle(monster) {
  return `--mini-bg:${monster.attr.bg};--mini-color:${monster.attr.monster};--mini-radius:${monster.bodyRadius}`;
}

function addFriendDirect(monster) {
  state.friendSequence += 1;
  monster.acquiredOrder = state.friendSequence;
  state.friends.push(monster);
  return monster;
}

function setDefaultPartyFromFriends() {
  state.partyPresets = [
    state.friends.slice(0, 3).map((monster) => monster.id),
    [],
    []
  ];
  state.partyIds = [...state.partyPresets[0]];
  if (state.profileMonsterIds.length !== 3) {
    state.profileMonsterIds = state.friends.slice(0, 3).map((monster) => monster.id);
  }
}

function isTutorialActive() {
  return state.tutorialStage !== "done";
}

function showTutorialMessage(message, onContinue, buttonLabel = "次へ") {
  state.tutorialContinue = onContinue;
  els.tutorialText.textContent = message;
  els.tutorialContinueButton.textContent = buttonLabel;
  els.tutorialOverlay.hidden = false;
}

function continueTutorialMessage() {
  if (els.tutorialOverlay.hidden) return;
  els.tutorialOverlay.hidden = true;
  const callback = state.tutorialContinue;
  state.tutorialContinue = null;
  callback?.();
}

function tutorialCandidateRequests() {
  return [2, 3, 4, 6, 5].map((speciesNo) => createMonster(0, speciesNo, 1));
}

function prepareTutorialPrince() {
  const prince = createMonster(0, 1, 3);
  state.tutorialPrinceId = prince.id;
  state.requests = [prince];
  state.requestIndex = 0;
  showView("matchView");
  renderCurrentRequest();
}

function startTutorial() {
  state.playerLevel = 1;
  state.playerName = "プレイヤー";
  state.gold = 320;
  state.cages = 1;
  state.expDrinks = 0;
  state.friends = [];
  state.friendSequence = 0;
  state.partyPresets = [[], [], []];
  state.partyIds = [];
  state.profileMonsterIds = [];
  state.clearedDungeons = new Set();
  state.selectedDungeon = "warawara";
  state.homeTab = "monsters";
  state.dungeonCategory = "general";
  state.tutorialStage = "intro";
  state.tutorialMatchedCount = 0;
  els.tutorialSkipButton.hidden = false;
  prepareTutorialPrince();
  renderParty();
  showView("matchView");
  showTutorialMessage(
    "モンスターからあなたにマッチ申請が届いているよ！\n右スワイプでマッチ承認してモンスターを仲間にしよう！",
    () => {
      state.tutorialStage = "prince";
      updateResources();
    },
    "やってみる"
  );
}

function beginTutorialRecruiting() {
  state.tutorialStage = "recruiting";
  state.tutorialMatchedCount = 0;
  state.requests = tutorialCandidateRequests();
  state.requestIndex = 0;
  showView("matchView");
  renderCurrentRequest();
  updateResources();
}

function afterTutorialPrinceMatched() {
  state.cages = 2;
  state.requests = [];
  state.requestIndex = 0;
  state.tutorialStage = "recruitIntro";
  updateResources();
  showTutorialMessage(
    "モンスターを仲間にするにはケージが必要！\nあと2つケージをあげるから2体仲間にしてみよう！\n\n見送る場合は左にスワイプしてね！\n（お金が手に入ります）",
    beginTutorialRecruiting,
    "2体探す"
  );
}

function resetTutorialRecruitment() {
  const prince = state.friends.find((monster) => monster.id === state.tutorialPrinceId);
  state.gold = 320;
  state.cages = 2;
  state.friends = prince ? [prince] : [];
  state.friendSequence = prince ? 1 : 0;
  if (prince) prince.acquiredOrder = 1;
  state.partyPresets = [[prince?.id].filter(Boolean), [], []];
  state.partyIds = [...state.partyPresets[0]];
  state.profileMonsterIds = [prince?.id].filter(Boolean);
  state.tutorialMatchedCount = 0;
  state.requests = [];
  state.requestIndex = 0;
  renderParty();
  showTutorialMessage(
    "パーティーは3体から編成できるよ！\nまずは3体仲間にしよう！",
    beginTutorialRecruiting,
    "もう一度探す"
  );
}

function completeTutorialRecruitment() {
  state.requests = [];
  state.requestIndex = 0;
  setDefaultPartyFromFriends();
  renderParty();
  showView("partyView");
  showTutorialMessage(
    "ダンジョンに潜るとまたモンスターから\nマッチ申請が届くことがあるよ！",
    () => {
      state.tutorialStage = "done";
      els.tutorialSkipButton.hidden = true;
      setHomeTab("dungeon");
      updateResources();
    },
    "ダンジョンを見る"
  );
}

function skipTutorial() {
  state.matchAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  state.matchAnimationTimers = [];
  state.matchAnimationActive = false;
  els.matchOverlay.hidden = true;
  els.tutorialOverlay.hidden = true;
  state.gold = 320;
  state.cages = 0;
  state.expDrinks = 0;
  state.friends = [];
  state.friendSequence = 0;
  addFriendDirect(createMonster(0, 1, 3));
  addFriendDirect(createMonster(0, 3, 1));
  addFriendDirect(createMonster(0, 5, 1));
  state.requests = [];
  state.requestIndex = 0;
  state.tutorialStage = "done";
  setDefaultPartyFromFriends();
  els.tutorialSkipButton.hidden = true;
  showView("partyView");
  setHomeTab("dungeon");
  renderParty();
}

function updateResources() {
  els.playerLevel.textContent = state.playerLevel;
  els.headerPlayerName.textContent = state.playerName;
  els.headerPlayerLevel.textContent = state.playerLevel;
  els.matchProfileName.textContent = state.playerName;
  els.outgoingPlayerName.textContent = state.playerName;
  const outgoingUnlocked = state.playerLevel >= 3;
  els.outgoingMatchButton.disabled = !outgoingUnlocked;
  els.outgoingMatchButton.classList.toggle("locked", !outgoingUnlocked);
  els.outgoingUnlockCopy.textContent = outgoingUnlocked
    ? "一覧から選んでマッチ申請を送る"
    : "プレイヤーLv3で解放";
  els.outgoingCountLabel.textContent = outgoingUnlocked
    ? `${3 + state.playerLevel}体`
    : "Lv3";
  const trainingUnlocked = state.playerLevel >= 6;
  els.trainingTabButton.classList.toggle("locked", !trainingUnlocked);
  els.trainingTabButton.querySelector(".tab-lock-label").hidden = trainingUnlocked;
  els.friends.textContent = state.friends.length;
  els.gold.textContent = state.gold;
  els.shopGold.textContent = state.gold;
  els.shopCageCount.textContent = state.cages;
  els.outgoingCageCount.textContent = state.cages;
  els.shopExpDrinkCount.textContent = state.expDrinks;
  els.matchCageCount.textContent = state.cages;
  els.buyCageButton.disabled = state.gold < CAGE_PRICE;
  els.buyExpDrinkButton.disabled = state.gold < EXP_DRINK_PRICE;
  els.useExpDrinkButton.disabled = state.expDrinks <= 0 || state.friends.length === 0;
  els.keepButton.disabled = state.cages <= 0;
  els.skipButton.disabled = state.tutorialStage === "prince";
  els.rejectAllRequestsButton.disabled = isTutorialActive();
  els.exitRequestsButton.disabled = isTutorialActive();
  els.matchCageStatus.classList.toggle("empty", state.cages <= 0);
  els.matchCageLabel.textContent = state.cages > 0 ? "ケージ" : "ケージがありません";
  els.matchCageCount.hidden = state.cages <= 0;
  updateRequestInbox();
  scheduleAutosave();
}

function formatSaveTimestamp(savedAt) {
  if (!savedAt) return "未保存";
  const date = new Date(savedAt);
  if (Number.isNaN(date.getTime())) return "日時不明";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

function saveSummary(saved) {
  if (!saved) return "空きスロット";
  const friendCount = Array.isArray(saved.friends) ? saved.friends.length : 0;
  return `Lv${saved.playerLevel ?? 1} / 仲間${friendCount}体 / ${saved.gold ?? 0} Gold`;
}

function renderDeveloperSaveSlots() {
  const autosave = readSave(AUTOSAVE_KEY);
  els.autosaveStatus.textContent = autosave
    ? `${formatSaveTimestamp(autosave.savedAt)}・${saveSummary(autosave)}`
    : "未保存";
  els.developerSaveSlots.innerHTML = Array.from(
    { length: MANUAL_SAVE_SLOT_COUNT },
    (_, index) => {
      const slotNumber = index + 1;
      const storedSave = readSave(`${MANUAL_SAVE_PREFIX}${slotNumber}`);
      const saved = storedSave?.friends?.length ? storedSave : null;
      return `
        <section class="developer-save-slot">
          <div class="developer-save-slot-copy">
            <strong>スロット ${slotNumber}</strong>
            <span>${saved
              ? `${formatSaveTimestamp(saved.savedAt)}・${saveSummary(saved)}`
              : "空きスロット"}</span>
          </div>
          <div class="developer-save-slot-actions">
            <button type="button" data-save-slot="${slotNumber}" ${isTutorialActive() ? "disabled" : ""}>保存</button>
            <button class="load" type="button" data-load-slot="${slotNumber}">${saved ? "読込" : "新規"}</button>
            <button class="delete" type="button" data-delete-slot="${slotNumber}" ${saved ? "" : "disabled"}>削除</button>
          </div>
        </section>`;
    }
  ).join("");
}

function openDeveloperSaveDialog() {
  renderDeveloperSaveSlots();
  els.developerSaveDialog.showModal();
}

function saveToManualSlot(slotNumber) {
  const key = `${MANUAL_SAVE_PREFIX}${slotNumber}`;
  if (readSave(key) && !window.confirm(`スロット${slotNumber}を上書きしますか？`)) return;
  writeSave(key);
  renderDeveloperSaveSlots();
}

function loadFromManualSlot(slotNumber) {
  const storedSave = readSave(`${MANUAL_SAVE_PREFIX}${slotNumber}`);
  const saved = storedSave?.friends?.length ? storedSave : null;
  if (!saved) {
    if (!window.confirm(`空きスロット${slotNumber}から新しく始めますか？\n現在の状態は自動保存へ残りません。`)) return;
    beginNewGame();
    return;
  }
  if (!window.confirm(`スロット${slotNumber}を読み込みますか？\n現在の状態は自動保存されます。`)) return;
  writeSave(AUTOSAVE_KEY);
  els.developerSaveDialog.close();
  applySaveData(saved);
}

function deleteManualSlot(slotNumber) {
  if (!window.confirm(`スロット${slotNumber}を削除しますか？`)) return;
  localStorage.removeItem(`${MANUAL_SAVE_PREFIX}${slotNumber}`);
  renderDeveloperSaveSlots();
}

function resetAllSaveData() {
  if (!window.confirm("自動保存と開発者スロットをすべて削除して、最初から始めますか？")) return;
  for (let slot = 1; slot <= MANUAL_SAVE_SLOT_COUNT; slot += 1) {
    localStorage.removeItem(`${MANUAL_SAVE_PREFIX}${slot}`);
  }
  beginNewGame();
}

function beginNewGame() {
  suppressAutosaveOnUnload = true;
  saveRuntimeReady = false;
  window.clearTimeout(autosaveTimer);
  localStorage.removeItem(AUTOSAVE_KEY);
  sessionStorage.setItem("monmachi.forceNewGame", "1");
  window.location.reload();
}

function pendingRequestCount() {
  return Math.max(0, state.requests.length - state.requestIndex);
}

function updateRequestInbox() {
  const count = pendingRequestCount();
  els.requestInbox.disabled = count === 0;
  els.requestInbox.classList.toggle("empty", count === 0);
  els.inboxCount.textContent = count;
  els.requestInboxTitle.textContent = count > 0
    ? "マッチ申請が届いています"
    : "届いたマッチ申請";
  els.requestInboxCopy.textContent = count > 0
    ? "タップして確認"
    : "現在、新しい申請はありません";
  els.requestTabBadge.hidden = count === 0;
  els.requestTabBadge.textContent = count;
}

function unlockedRanksForPlayer() {
  const unlockedNames = PLAYER_RANK_UNLOCKS
    .filter((unlock) => state.playerLevel >= unlock.level)
    .map((unlock) => unlock.rank);
  return monsterRanks.filter((rank) => unlockedNames.includes(rank.name));
}

function chooseUnlockedRank() {
  const unlocked = unlockedRanksForPlayer();
  const totalWeight = unlocked.reduce((sum, rank) => sum + rank.weight, 0);
  let roll = Math.random() * totalWeight;
  return unlocked.find((rank) => {
    roll -= rank.weight;
    return roll <= 0;
  }) ?? unlocked[0];
}

function profileMonsters() {
  return state.profileMonsterIds
    .map((id) => state.friends.find((monster) => monster.id === id))
    .filter(Boolean)
    .slice(0, 3);
}

function profileStarAverage() {
  const profile = profileMonsters();
  if (profile.length !== 3) return 0;
  return profile.reduce((sum, monster) => sum + monster.star, 0) / profile.length;
}

function outgoingMatchRate(monster) {
  const averageStar = profileStarAverage();
  const opponentAverageStat = Math.max(1, monster.sp / 3);
  return Math.min(100, Math.max(1, 40 * (averageStar / opponentAverageStat)));
}

function outgoingDifficulty(rate) {
  if (rate >= 75) return 1;
  if (rate >= 55) return 2;
  if (rate >= 35) return 3;
  if (rate >= 15) return 4;
  return 5;
}

function outgoingSpeciesPool() {
  const discovered = monsterSpecies.filter((species) => state.discoveredSpecies.has(species.no));
  if (Math.random() < 0.12 || discovered.length === 0) return monsterSpecies;
  return discovered;
}

function generateOutgoingCandidates() {
  const count = 3 + state.playerLevel;
  const usedSpecies = new Set();
  state.outgoingCandidates = Array.from({ length: count }, () => {
    let pool = outgoingSpeciesPool().filter((species) => !usedSpecies.has(species.no));
    if (pool.length === 0) {
      usedSpecies.clear();
      pool = outgoingSpeciesPool();
    }
    const species = pick(pool);
    usedSpecies.add(species.no);
    const rank = chooseUnlockedRank();
    const level = randomInt(1, Math.max(1, state.playerLevel));
    return createMonster(0, species.no, level, { rankName: rank.name });
  });
  state.outgoingGeneratedAt = Date.now();
  state.outgoingApplied = false;
  els.outgoingMatchFeedback.hidden = true;
  renderOutgoingMatch();
}

function renderMatchProfile() {
  const profile = profileMonsters();
  const unlockedRanks = unlockedRanksForPlayer();
  els.unlockedRankLabel.textContent = `ランク${unlockedRanks.at(-1).name}まで`;
  els.matchProfileMonsters.innerHTML = Array.from({ length: 3 }, (_, index) => {
    const monster = profile[index];
    if (!monster) return `<span class="profile-monster-empty">?</span>`;
    return `
      <span class="profile-monster" title="${monster.name} / スター ${monster.star}">
        <i class="mini-monster" style="${monsterStyle(monster)}"></i>
        <b>${monster.star}</b>
      </span>`;
  }).join("");
}

function outgoingCandidateMarkup(monster) {
  const rate = outgoingMatchRate(monster);
  const profileReady = profileMonsters().length === 3;
  return `
    <article class="outgoing-monster-card" data-outgoing-detail-id="${monster.id}"
      style="--candidate-bg:${monster.attr.bg}" tabindex="0">
      <div class="outgoing-monster-visual">
        <span class="mini-monster" style="${monsterStyle(monster)}"></span>
      </div>
      <div class="outgoing-monster-copy">
        <span class="outgoing-level">Lv ${monster.level}</span>
        <div class="outgoing-monster-title">
          <strong>${monster.name}</strong>
          <i class="inline-rank" style="${rankStyle(monster.rank)}">ランク ${monster.rank.name}</i>
        </div>
        <span class="sp-chip">SP ${monster.sp}</span>
      </div>
      <button class="outgoing-apply-button" data-outgoing-id="${monster.id}" type="button"
        ${state.outgoingApplied || !profileReady || state.cages <= 0 ? "disabled" : ""}>
        <span>マッチ申請</span>
        <strong>${Math.round(rate)}%</strong>
      </button>
    </article>`;
}

function renderOutgoingMatch() {
  renderMatchProfile();
  els.outgoingMonsterList.innerHTML = state.outgoingCandidates
    .map(outgoingCandidateMarkup)
    .join("");
  if (!state.outgoingApplied && profileMonsters().length !== 3) {
    els.outgoingMatchFeedback.textContent = "プロフィールに3体設定するとマッチ申請できます。";
    els.outgoingMatchFeedback.className = "outgoing-match-feedback warning";
    els.outgoingMatchFeedback.hidden = false;
  } else if (!state.outgoingApplied && state.cages <= 0) {
    els.outgoingMatchFeedback.textContent = "ケージがありません。ショップで購入すると申請できます。";
    els.outgoingMatchFeedback.className = "outgoing-match-feedback warning";
    els.outgoingMatchFeedback.hidden = false;
  }
  updateOutgoingRefreshTimer();
}

function updateOutgoingRefreshTimer() {
  if (!state.outgoingGeneratedAt) {
    els.outgoingRefreshTimer.textContent = "更新可";
    els.refreshOutgoingMatch.disabled = false;
    return;
  }
  const remaining = Math.max(
    0,
    OUTGOING_MATCH_REFRESH_MS - (Date.now() - state.outgoingGeneratedAt)
  );
  if (remaining === 0) {
    els.outgoingRefreshTimer.textContent = "更新可";
    els.refreshOutgoingMatch.disabled = false;
    return;
  }
  els.refreshOutgoingMatch.disabled = true;
  const totalSeconds = Math.ceil(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  els.outgoingRefreshTimer.textContent = `${hours}:${minutes}:${seconds}`;
}

function refreshOutgoingCandidates() {
  const expired = !state.outgoingGeneratedAt
    || Date.now() - state.outgoingGeneratedAt >= OUTGOING_MATCH_REFRESH_MS;
  if (expired) generateOutgoingCandidates();
}

function openOutgoingMatch() {
  if (state.playerLevel < 3) return;
  els.matchMenuHeading.hidden = true;
  els.matchMenuCaption.hidden = true;
  els.matchMenuList.hidden = true;
  els.outgoingMatchView.hidden = false;
  const expired = Date.now() - state.outgoingGeneratedAt >= OUTGOING_MATCH_REFRESH_MS;
  if (state.outgoingCandidates.length === 0 || expired) {
    generateOutgoingCandidates();
  } else {
    renderOutgoingMatch();
  }
  if (!state.outgoingTimer) {
    state.outgoingTimer = window.setInterval(updateOutgoingRefreshTimer, 1000);
  }
}

function closeOutgoingMatch() {
  els.outgoingMatchView.hidden = true;
  els.matchMenuHeading.hidden = false;
  els.matchMenuCaption.hidden = false;
  els.matchMenuList.hidden = false;
}

function openCageSelection(monsterId) {
  if (state.outgoingApplied || profileMonsters().length !== 3 || state.cages <= 0) return;
  state.pendingOutgoingMonsterId = monsterId;
  els.standardCageChoice.classList.add("selected");
  els.confirmOutgoingApplication.disabled = false;
  els.cageSelectDialog.showModal();
}

function cageSuccessMultiplier(cageType = "standard") {
  void cageType;
  return 1;
}

function applyOutgoingMatch() {
  if (state.outgoingApplied || profileMonsters().length !== 3 || state.cages <= 0) return;
  const monsterId = state.pendingOutgoingMonsterId;
  const monster = state.outgoingCandidates.find((candidate) => candidate.id === monsterId);
  if (!monster) return;
  const rate = Math.min(100, outgoingMatchRate(monster) * cageSuccessMultiplier("standard"));
  const success = Math.random() * 100 < rate;
  state.cages -= 1;
  state.outgoingApplied = true;
  state.pendingOutgoingMonsterId = null;
  els.cageSelectDialog.close();
  els.outgoingMatchFeedback.className = `outgoing-match-feedback ${success ? "success" : "failure"}`;
  if (success && state.friends.length < MAX_FRIENDS) {
    addFriendDirect(monster);
    state.discoveredSpecies.add(monster.speciesNo);
    els.outgoingMatchFeedback.textContent = `マッチ成功！ ${monster.name}が仲間になりました。`;
    renderParty();
    setHomeTab("match");
  } else if (success) {
    els.outgoingMatchFeedback.textContent = "マッチしましたが、仲間が上限に達しています。";
  } else {
    els.outgoingMatchFeedback.textContent = `マッチ不成立。${monster.name}から返事はありませんでした。`;
  }
  els.outgoingMatchFeedback.hidden = false;
  updateResources();
  renderOutgoingMatch();
}

function showView(viewId) {
  ["partyView", "battleView", "matchView"].forEach((id) => {
    els[id].classList.toggle("active", id === viewId);
  });
  state.currentView = viewId;
}

function renderParty() {
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  const selected = state.partyIds.map((id) => state.friends.find((monster) => monster.id === id)).filter(Boolean);
  els.partyCount.textContent = `${selected.length} / 3`;
  els.diveButton.disabled = selected.length !== 3;

  els.partySlots.innerHTML = Array.from({ length: 3 }, (_, index) => {
    const monsterId = state.partyIds[index];
    const monster = state.friends.find((friend) => friend.id === monsterId);
    if (!monster) {
      return `<button class="party-slot" data-party-slot="${index}" type="button"><span class="party-number">0${index + 1}</span>モンスターを選ぶ</button>`;
    }
    return `
      <button class="party-slot filled" data-party-slot="${index}" type="button" style="--slot-bg:${monster.attr.bg}">
        <span class="party-number">0${index + 1}</span>
        <div class="mini-monster" style="${monsterStyle(monster)}"></div>
        <strong>${monster.name}</strong>
        <span class="level-chip">Lv ${monster.level}</span>
        <span class="sp-chip compact">SP ${monster.sp}</span>
      </button>`;
  }).join("");

  els.partyTotalSp.textContent = selected.reduce((sum, monster) => sum + monster.sp, 0);
  els.presetTabs.querySelectorAll("[data-preset-index]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.presetIndex) === state.activePresetIndex);
  });
  renderPartyPicker();
  renderCollection();
  renderHomeTab();
  updateResources();
}

function renderPartyPicker() {
  const monsters = getFilteredSortedFriends(
    state.partyPickerSort,
    state.partyPickerAttributeFilter
  );
  els.roster.innerHTML = monsters.length
    ? monsters.map((monster) => monsterListCardMarkup(
        monster,
        "monster-id",
        state.partyIds.indexOf(monster.id)
      )).join("")
    : `<p class="collection-empty">該当するモンスターはいません。</p>`;
}

function getFilteredSortedFriends(sortKey, attributeFilter) {
  const filtered = state.friends.filter((monster) => (
    attributeFilter === "all"
      || monster.attr.name === attributeFilter
  ));
  const sortValue = (monster) => {
    if (sortKey === "ivHp") return monster.iv.hp;
    if (sortKey === "ivPower") return monster.iv.atk;
    if (sortKey === "ivStar") return monster.iv.sense;
    if (sortKey === "ivTotal") {
      return monster.iv.hp + monster.iv.atk + monster.iv.sense;
    }
    return monster[sortKey] ?? 0;
  };
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === "newest") {
      return (b.acquiredOrder ?? 0) - (a.acquiredOrder ?? 0);
    }
    const difference = sortValue(b) - sortValue(a);
    return difference || (b.acquiredOrder ?? 0) - (a.acquiredOrder ?? 0);
  });
  return sorted;
}

function renderCollection() {
  const sorted = getFilteredSortedFriends(
    state.collectionSort,
    state.collectionAttributeFilter
  );
  els.collectionCount.textContent = state.collectionAttributeFilter === "all"
    ? `${state.friends.length}体`
    : `${sorted.length} / ${state.friends.length}体`;
  els.collectionGrid.innerHTML = sorted.length
    ? sorted.map((monster) => (
    monsterListCardMarkup(monster, "collection-id")
      )).join("")
    : `<p class="collection-empty">該当するモンスターはいません。</p>`;
}

function monsterListCardMarkup(monster, dataAttribute, selectedSlot = -1) {
  const selected = selectedSlot >= 0;
  return `
    <button class="monster-list-card${selected ? " selected" : ""}"
      data-${dataAttribute}="${monster.id}" type="button">
      <span class="monster-list-visual" style="--list-bg:${monster.attr.bg}">
        <span class="mini-monster" style="${monsterStyle(monster)}"></span>
      </span>
      <span class="monster-list-info">
        <strong class="monster-list-name">${monster.name}</strong>
        <span class="monster-list-meta">
          <i class="level-chip">Lv ${monster.level}</i>
          <i class="inline-rank" style="${rankStyle(monster.rank)}">ランク ${monster.rank.name}</i>
          <i class="attribute-chip" style="--attr-bg:${monster.attr.bg};--attr-color:${monster.attr.color}">${monster.attr.name}</i>
        </span>
        <span class="sp-chip monster-list-sp">SP ${monster.sp}</span>
      </span>
      ${selected ? `<span class="selected-slot">${selectedSlot + 1}</span>` : ""}
    </button>`;
}

function setHomeTab(tab) {
  if (tab === "training" && state.playerLevel < 6) return;
  if (tab !== "match" && !els.outgoingMatchView.hidden) {
    closeOutgoingMatch();
  }
  state.homeTab = tab;
  renderHomeTab();
  scheduleAutosave();
}

function renderHomeTab() {
  const monsters = state.homeTab === "monsters";
  const dungeon = state.homeTab === "dungeon";
  const training = state.homeTab === "training";
  const match = state.homeTab === "match";
  const shop = state.homeTab === "shop";
  els.monsterHomePanel.hidden = !monsters;
  els.dungeonHomePanel.hidden = !dungeon;
  els.trainingHomePanel.hidden = !training;
  els.matchHomePanel.hidden = !match;
  els.shopHomePanel.hidden = !shop;
  els.monsterTabButton.classList.toggle("active", monsters);
  els.dungeonTabButton.classList.toggle("active", dungeon);
  els.trainingTabButton.classList.toggle("active", training);
  els.matchTabButton.classList.toggle("active", match);
  els.shopTabButton.classList.toggle("active", shop);
  renderDungeonLists();
}

function isDungeonUnlocked(dungeon) {
  if (dungeon.category === "trial") {
    return state.playerLevel >= (dungeon.requiredPlayerLevel ?? 1);
  }
  return !dungeon.unlockAfter || state.clearedDungeons.has(dungeon.unlockAfter);
}

function dungeonCardMarkup(dungeonId, dungeon) {
  const isTrial = dungeon.category === "trial";
  const rushCount = dungeon.rushes.length;
  const bossCount = dungeon.bosses.length;
  const numberLabel = isTrial ? dungeon.number : String(dungeon.number).padStart(2, "0");
  const tutorialClass = dungeonId === "warawara" ? " tutorial-dungeon-target" : "";
  return `
    <button class="dungeon-card${tutorialClass}" data-dungeon-id="${dungeonId}" type="button">
      <span class="dungeon-art ${isTrial ? "trial-art" : "forest-art"}">${numberLabel}</span>
      <span class="dungeon-copy">
        <small>${isTrial ? "PROMOTION TRIAL" : "DUNGEON"} ${numberLabel}</small>
        <strong>${dungeon.name}</strong>
        <span>基礎EXP ${dungeon.baseExperience} / ラッシュ${rushCount}戦 / ボス${bossCount}体</span>
        ${isTrial ? `<b>報酬 プレイヤーLv${dungeon.rewardPlayerLevel}</b>` : ""}
      </span>
      <span aria-hidden="true">›</span>
    </button>`;
}

function renderDungeonLists() {
  const entries = Object.entries(DUNGEON_CONFIG);
  const generalDungeons = entries.filter(([, dungeon]) => (
    dungeon.category === "general" && isDungeonUnlocked(dungeon)
  ));
  const trialDungeons = entries.filter(([, dungeon]) => (
    dungeon.category === "trial" && isDungeonUnlocked(dungeon)
  ));

  els.generalDungeonList.innerHTML = generalDungeons
    .map(([id, dungeon]) => dungeonCardMarkup(id, dungeon))
    .join("");
  els.trialDungeonList.innerHTML = trialDungeons.length
    ? trialDungeons.map(([id, dungeon]) => dungeonCardMarkup(id, dungeon)).join("")
    : `<p class="dungeon-list-empty">挑戦できる試練はまだありません</p>`;

  const showGeneral = state.dungeonCategory === "general";
  els.generalDungeonList.hidden = !showGeneral;
  els.trialDungeonList.hidden = showGeneral;
  els.dungeonCategoryTabs.querySelectorAll("[data-dungeon-category]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.dungeonCategory === state.dungeonCategory
    );
  });
}

function buyCage() {
  if (state.gold < CAGE_PRICE) {
    els.shopFeedback.textContent = "ゴールドが足りません";
    return;
  }
  state.gold -= CAGE_PRICE;
  state.cages += 1;
  els.shopFeedback.textContent = "ケージを1個購入しました";
  updateResources();
}

function buyExpDrink() {
  if (state.gold < EXP_DRINK_PRICE) {
    els.shopFeedback.textContent = "ゴールドが足りません。";
    return;
  }
  state.gold -= EXP_DRINK_PRICE;
  state.expDrinks += 1;
  els.shopFeedback.textContent = "経験値500ドリンクを購入しました。";
  updateResources();
}

function openExpDrinkDialog() {
  if (state.expDrinks <= 0 || state.friends.length === 0) return;
  els.expDrinkRoster.innerHTML = state.friends.map((monster) => (
    monsterListCardMarkup(monster, "drink-target")
  )).join("");
  els.expDrinkDialog.showModal();
}

function showDrinkExperienceReward(monster) {
  const reward = grantExperience(monster, EXP_DRINK_AMOUNT);
  els.experienceTitle.textContent = `${monster.name}にドリンク使用`;
  els.experienceAmount.textContent = `+${EXP_DRINK_AMOUNT} EXP`;
  const result = reward.leveledUp
    ? `<div class="level-up-result">
        <div class="level-up-banner">
          <strong>LEVEL UP!</strong>
          <div class="level-change"><span>Lv ${reward.before.level}</span><i>→</i><b>Lv ${monster.level}</b></div>
        </div>
        <div class="growth-stat"><span>HP</span><strong>+${reward.gains.hp}</strong><small>${reward.before.hp} → ${monster.hp}</small></div>
        <div class="growth-stat"><span>パワー</span><strong>+${reward.gains.power}</strong><small>${reward.before.power} → ${monster.power}</small></div>
        <div class="growth-stat"><span>スター</span><strong>+${reward.gains.star}</strong><small>${reward.before.star} → ${monster.star}</small></div>
      </div>`
    : `<div class="experience-progress">
        <strong>Lv ${monster.level}</strong>
        <span>${monster.experience} / ${monster.nextLevelExperience} EXP</span>
      </div>`;
  els.experienceList.innerHTML = `
    <div class="experience-row${reward.leveledUp ? " leveled-up" : ""}">
      <div class="reward-monster-head">
        <div class="mini-monster" style="${monsterStyle(monster)}"></div>
        <strong>${monster.name}</strong>
        <span class="reward-exp">+${EXP_DRINK_AMOUNT} EXP</span>
      </div>
      <div class="experience-monster-copy">${result}</div>
    </div>`;
  state.experienceContinue = () => {
    renderParty();
    setHomeTab("shop");
  };
  els.experienceOverlay.hidden = false;
  renderParty();
}

function useExpDrinkOnMonster(monsterId) {
  if (state.expDrinks <= 0) return;
  const monster = state.friends.find((friend) => friend.id === monsterId);
  if (!monster) return;
  state.expDrinks -= 1;
  els.expDrinkDialog.close();
  updateResources();
  showDrinkExperienceReward(monster);
}

function renderProfileEditor() {
  els.profileEditorSlots.innerHTML = Array.from({ length: 3 }, (_, index) => {
    const monster = state.friends.find(
      (friend) => friend.id === state.editingProfileMonsterIds[index]
    );
    if (!monster) {
      return `
        <button class="profile-editor-slot" data-profile-slot="${index}" type="button">
          <span>${index + 1}</span>
          <strong>モンスターを選ぶ</strong>
        </button>`;
    }
    return `
      <button class="profile-editor-slot filled" data-profile-slot="${index}" type="button">
        <span class="mini-monster" style="${monsterStyle(monster)}"></span>
        <span class="profile-slot-copy">
          <strong>${monster.name}</strong>
          <small>Lv ${monster.level}・スター ${monster.star}</small>
        </span>
      </button>`;
  }).join("");
  els.saveProfileButton.disabled = state.editingProfileMonsterIds.filter(Boolean).length !== 3;
}

function openProfileEditor() {
  state.editingProfileMonsterIds = [...state.profileMonsterIds];
  while (state.editingProfileMonsterIds.length < 3) {
    state.editingProfileMonsterIds.push(null);
  }
  els.playerNameInput.value = state.playerName;
  renderProfileEditor();
  els.profileDialog.showModal();
}

function openProfilePicker(slotIndex) {
  state.editingProfileSlot = slotIndex;
  els.profilePickerTitle.textContent = `プロフィール${slotIndex + 1}を選択`;
  els.profilePickerRoster.innerHTML = state.friends.map((monster) => (
    monsterListCardMarkup(
      monster,
      "profile-monster-id",
      state.editingProfileMonsterIds.indexOf(monster.id)
    )
  )).join("");
  els.profilePickerDialog.showModal();
}

function selectProfileMonster(monsterId) {
  const currentIndex = state.editingProfileMonsterIds.indexOf(monsterId);
  if (currentIndex >= 0 && currentIndex !== state.editingProfileSlot) {
    const displaced = state.editingProfileMonsterIds[state.editingProfileSlot];
    state.editingProfileMonsterIds[currentIndex] = displaced;
  }
  state.editingProfileMonsterIds[state.editingProfileSlot] = monsterId;
  els.profilePickerDialog.close();
  renderProfileEditor();
}

function saveProfile() {
  if (state.editingProfileMonsterIds.filter(Boolean).length !== 3) return;
  state.playerName = els.playerNameInput.value.trim() || "プレイヤー";
  state.profileMonsterIds = [...state.editingProfileMonsterIds];
  els.profileDialog.close();
  updateResources();
  renderOutgoingMatch();
}

function selectPartyMonster(id) {
  const preset = state.partyPresets[state.activePresetIndex];
  const currentIndex = preset.indexOf(id);
  if (currentIndex >= 0 && currentIndex !== state.editingPartySlot) {
    const displaced = preset[state.editingPartySlot];
    preset[currentIndex] = displaced;
  }
  preset[state.editingPartySlot] = id;
  state.partyIds = [...preset];
  els.partyPickerDialog.close();
  renderParty();
}

function openDungeonPartyEditor(dungeonId) {
  const dungeon = DUNGEON_CONFIG[dungeonId];
  if (!dungeon || !isDungeonUnlocked(dungeon)) return;
  state.partyEditorMode = "dungeon";
  state.selectedDungeon = dungeonId;
  els.selectedDungeonName.textContent = dungeon.name;
  els.diveButton.hidden = false;
  renderParty();
  els.partyDialog.showModal();
}

function openPartyManager() {
  state.partyEditorMode = "manage";
  els.selectedDungeonName.textContent = "パーティー編成";
  els.diveButton.hidden = true;
  renderParty();
  els.partyDialog.showModal();
}

function openPartyPicker(slotIndex) {
  state.editingPartySlot = slotIndex;
  els.pickerTitle.textContent = `スロット${slotIndex + 1}を選択`;
  renderPartyPicker();
  els.partyPickerDialog.showModal();
}

function clickedDialogBackdrop(event, dialog) {
  if (event.target !== dialog) return false;
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left
    || event.clientX > rect.right
    || event.clientY < rect.top
    || event.clientY > rect.bottom;
}

function makeFighter(monster, enemy = false, boss = false) {
  const maxHp = monster.hp;
  return {
    id: monster.id,
    name: monster.name,
    monster,
    maxHp,
    hp: maxHp,
    power: monster.power,
    star: monster.star,
    gauge: 0,
    powerStage: 0,
    starStage: 0,
    damageStage: 0,
    statuses: {},
    rollUses: 0,
    firstDamageTaken: false,
    endured: false,
    enemy,
    boss
  };
}

function stageMultiplier(stat, stage) {
  const clampedStage = Math.max(-4, Math.min(4, stage));
  return STAT_STAGE_MULTIPLIERS[stat][String(clampedStage)] ?? 1;
}

function effectivePower(fighter) {
  const burnMultiplier = fighter.statuses.burn ? 0.5 : 1;
  return Math.max(1, fighter.power * stageMultiplier("power", fighter.powerStage) * burnMultiplier);
}

function effectiveStar(fighter) {
  return Math.max(1, fighter.star * stageMultiplier("star", fighter.starStage));
}

function criticalRate(attackerStar, defenderStar) {
  const safeDefenderStar = Math.max(1, Number(defenderStar) || 1);
  const ratio = (Number(attackerStar) || 1) / safeDefenderStar;
  const rawRate = (ratio - 1) * DAMAGE_CONFIG.criticalSlope;
  return Math.min(1, Math.max(DAMAGE_CONFIG.minimumCriticalRate, rawRate));
}

function typeEffectiveness(moveAttribute, defenderAttribute) {
  const matchup = TYPE_EFFECTIVENESS[moveAttribute];
  if (matchup?.strong.includes(defenderAttribute)) return 1.5;
  if (matchup?.weak.includes(defenderAttribute)) return 0.66;
  return 1;
}

function calculateDamage(attacker, defender, moveMultiplier = 1, moveAttribute = "無") {
  const randomMultiplier = DAMAGE_CONFIG.randomMin
    + Math.random() * (DAMAGE_CONFIG.randomMax - DAMAGE_CONFIG.randomMin);
  const paralysisBonus = defender.statuses.paralysis ? 0.5 : 0;
  const chance = Math.min(
    1,
    criticalRate(effectiveStar(attacker), effectiveStar(defender)) + paralysisBonus
  );
  const critical = Math.random() < chance;
  const criticalMultiplier = critical ? DAMAGE_CONFIG.criticalMultiplier : 1;
  const effectiveness = typeEffectiveness(moveAttribute, defender.monster.attr.name);
  const damage = Math.max(1, Math.round(
    effectivePower(attacker) * moveMultiplier * randomMultiplier * criticalMultiplier * effectiveness
  ));
  return { damage, critical, criticalRate: chance, randomMultiplier, effectiveness };
}

function moveKey(moveName) {
  return {
    "カラメルストライク": "caramelStrike",
    "転がる": "roll",
    "焼く": "burn",
    "濡らす": "soak",
    "かじる": "gnaw",
    "光る": "shine",
    "吸う": "drain",
    "光合成": "grow",
    "溶ける": "cling",
    "ダーク": "bite",
    "ライト": "flash"
  }[moveName] ?? "attack";
}

function traitKey(fighter) {
  return {
    "名称未設定": fighter.monster.speciesNo === 4 ? "firstGuard" : "dodge",
    "焼きたがり": "burnHunter",
    "甘々": "sweet",
    "ヤニ": "resin",
    "根気": "grit",
    "ぷるぷる": "jelly",
    "怨念": "grudge",
    "発光": "dodge"
  }[fighter.monster.trait] ?? "none";
}

function changeStage(fighter, stat, amount) {
  const key = stat === "power"
    ? "powerStage"
    : stat === "star"
      ? "starStage"
      : "damageStage";
  const before = fighter[key];
  fighter[key] = Math.max(-4, Math.min(4, before + amount));
  const changed = fighter[key] - before;
  if (changed !== 0) {
    const statName = stat === "power" ? "パワー" : stat === "star" ? "スター" : "被ダメ率";
    appendBattleLog(
      `${fighterLogName(fighter)}の${statName}が${changed > 0 ? "上がった" : "下がった"}（${fighter[key] > 0 ? "+" : ""}${fighter[key]}段階）`,
      changed > 0 ? "status-up" : "status-down"
    );
    showBattleStatusEffect(fighter, changed > 0 ? `${statName}↑` : `${statName}↓`, changed > 0 ? "buff" : "debuff");
  }
}

function addStatus(fighter, status, turns = null) {
  const config = STATUS_CONFIG[status];
  if (!config) return;
  const duration = turns
    ?? config.turns
    ?? (config.minTurns && config.maxTurns
      ? randomInt(config.minTurns, config.maxTurns)
      : true);
  fighter.statuses[status] = duration;
  appendBattleLog(`${fighterLogName(fighter)}は${config.label}状態になった`, `status ${config.className}`);
  showBattleStatusEffect(fighter, config.label, config.className);
  renderBattleStatuses();
}

function healFighter(fighter, amount, source) {
  if (fighter.hp <= 0) return 0;
  const healed = Math.max(0, Math.min(fighter.maxHp - fighter.hp, Math.round(amount)));
  fighter.hp += healed;
  if (healed > 0) {
    appendBattleLog(`${fighterLogName(fighter)}は${source}でHPを${healed}回復`, "healing");
    showBattleStatusEffect(fighter, `+${healed}`, "healing");
  }
  return healed;
}

function gaugeKeyForFighter(fighter, rush = false) {
  const enemy = fighterSideLabel(fighter) === "敵";
  if (rush) return enemy ? "rushEnemyGauge" : "rushAllyGauge";
  return enemy ? "enemyPartyGauge" : "allyPartyGauge";
}

function gainGaugeAfterAction(fighter) {
  const gaugeKey = gaugeKeyForFighter(
    fighter,
    state.battleIndex < rushBattleCount()
  );
  state[gaugeKey] = Math.min(MAX_BATTLE_GAUGE, state[gaugeKey] + 1);
}

function gainGaugeAfterDamage(fighter) {
  const gaugeKey = gaugeKeyForFighter(
    fighter,
    state.battleIndex < rushBattleCount()
  );
  state[gaugeKey] = Math.min(MAX_BATTLE_GAUGE, state[gaugeKey] + 1);
}

function onGaugeSpent(fighter, rush = false) {
  if (traitKey(fighter) === "resin") {
    healFighter(fighter, fighter.maxHp / 8, "特性「ヤニ」");
    if (rush) renderRushHp();
    else renderBattleHp();
  }
}

function resetBattleEffects() {
  [...state.allies, ...state.enemies].forEach((fighter) => {
    fighter.powerStage = 0;
    fighter.starStage = 0;
    fighter.damageStage = 0;
    fighter.statuses = {};
    fighter.rollUses = 0;
    fighter.firstDamageTaken = false;
    fighter.endured = false;
  });
}

function triggerEntryTrait(fighter, opponents) {
  if (!fighter || traitKey(fighter) !== "sweet") return;
  appendBattleLog(`${fighterLogName(fighter)}の特性「甘々」が発動`, "trait");
  living(opponents).forEach((opponent) => changeStage(opponent, "power", -1));
}

function applyBattleEntryTraits(mode) {
  resetBattleEffects();
  if (mode === "rush") {
    living(state.allies).forEach((fighter) => triggerEntryTrait(fighter, state.enemies));
    living(state.enemies).forEach((fighter) => triggerEntryTrait(fighter, state.allies));
    return;
  }
  triggerEntryTrait(state.allies[state.activeAllyIndex], state.enemies);
  triggerEntryTrait(state.enemies[0], [state.allies[state.activeAllyIndex]]);
}

function actionBlocked(fighter) {
  const blockingStatus = ["freeze", "sleep", "flinch"].find(
    (status) => fighter.statuses[status]
  );
  if (blockingStatus) {
    const config = STATUS_CONFIG[blockingStatus];
    appendBattleLog(
      `${fighterLogName(fighter)}は${config.label}で動けない`,
      `status ${config.className}`
    );
    showBattleStatusEffect(fighter, config.label, config.className);
    renderBattleStatuses();
    return true;
  }
  return false;
}

function moveMissed(attacker) {
  if (!attacker.statuses.blind || Math.random() < 0.25) return false;
  appendBattleLog(`${fighterLogName(attacker)}は盲目で攻撃を外した`, "status blind");
  showBattleStatusEffect(attacker, "MISS", "blind");
  return true;
}

function applyDamageDefenses(attacker, defender, result) {
  if (traitKey(defender) === "dodge" && Math.random() < 0.1) {
    return { ...result, damage: 0, avoided: "回避" };
  }
  let damage = result.damage;
  if (traitKey(defender) === "firstGuard" && !defender.firstDamageTaken) {
    damage = Math.max(1, Math.round(damage / 2));
    defender.firstDamageTaken = true;
  }
  if (defender.statuses.shield) {
    damage = Math.max(1, Math.round(damage / 2));
  }
  if (traitKey(defender) === "jelly" && Math.random() < 0.3) {
    damage = Math.max(1, Math.round(damage / 4));
  }
  if (traitKey(attacker) === "burnHunter" && defender.statuses.burn) {
    damage *= 2;
  }
  damage *= stageMultiplier("damage", defender.damageStage);
  return { ...result, damage: Math.max(1, Math.round(damage)) };
}

function inflictDamage(attacker, defender, result) {
  const defended = applyDamageDefenses(attacker, defender, result);
  if (defended.avoided) {
    appendBattleLog(`${fighterLogName(defender)}は攻撃を回避した`, "status dodge");
    showBattleStatusEffect(defender, "回避", "dodge");
    return defended;
  }
  const wasAlive = defender.hp > 0;
  defender.hp = Math.max(0, defender.hp - defended.damage);
  if (wasAlive && defended.damage > 0) {
    gainGaugeAfterDamage(defender);
  }
  if (
    wasAlive
    && defender.hp <= 0
    && traitKey(defender) === "grit"
    && !defender.endured
  ) {
    defender.hp = 1;
    defender.endured = true;
    appendBattleLog(`${fighterLogName(defender)}は特性「根気」でHP1耐えた`, "status grit");
    showBattleStatusEffect(defender, "根気", "grit");
  }
  if (wasAlive && defender.hp <= 0 && traitKey(defender) === "grudge") {
    const gaugeKey = gaugeKeyForFighter(attacker, state.battleIndex < rushBattleCount());
    state[gaugeKey] = 0;
    appendBattleLog(`${fighterLogName(defender)}の「怨念」で相手ゲージが0になった`, "status grudge");
  }
  return defended;
}

function applyMoveEffects(attacker, target, move, result, rush = false) {
  const key = moveKey(move.name);
  if (key === "roll") attacker.rollUses += 1;
  if (result.missed) return;
  if (key === "caramelStrike" && Math.random() < 0.3) addStatus(target, "blind");
  if (key === "burn" && Math.random() < 0.2) addStatus(target, "burn");
  if (key === "soak" && Math.random() < 0.5) changeStage(target, "power", -1);
  if (key === "gnaw" && Math.random() < 0.2) addStatus(target, "flinch");
  if (key === "shine") changeStage(attacker, "star", 2);
  if (key === "drain") healFighter(attacker, result.damage / 4, "「吸う」");
  if (key === "grow") healFighter(attacker, effectiveStar(attacker) * 2, "「光合成」");
  if (key === "cling") addStatus(attacker, "shield", 6);
  if (key === "bite") {
    const gaugeKey = gaugeKeyForFighter(target, rush);
    state[gaugeKey] = Math.min(MAX_BATTLE_GAUGE, state[gaugeKey] + 1);
    appendBattleLog(`${fighterLogName(target)}のゲージが1増えた`, "status gauge");
  }
}

function finishFighterAction(fighter) {
  gainGaugeAfterAction(fighter);
  if (fighter.statuses.burn && fighter.hp > 0) {
    const damage = Math.max(1, Math.round(fighter.maxHp * 0.04));
    fighter.hp = Math.max(0, fighter.hp - damage);
    gainGaugeAfterDamage(fighter);
    appendBattleLog(`${fighterLogName(fighter)}は火傷で${damage}ダメージ`, "status burn");
    showBattleStatusEffect(fighter, `-${damage}`, "burn");
  }
  if (fighter.statuses.poison && fighter.hp > 0) {
    const damage = Math.max(1, Math.round(fighter.maxHp * 0.1));
    fighter.hp = Math.max(0, fighter.hp - damage);
    gainGaugeAfterDamage(fighter);
    appendBattleLog(`${fighterLogName(fighter)}は毒で${damage}ダメージ`, "status poison");
    showBattleStatusEffect(fighter, `-${damage}`, "poison");
  }
  if (fighter.hp <= 0) {
    appendBattleLog(`${fighterLogName(fighter)}は状態異常のダメージで倒れた`, "knockout");
  }
  Object.keys(fighter.statuses).forEach((status) => {
    if (!Number.isInteger(fighter.statuses[status])) return;
    fighter.statuses[status] -= 1;
    if (fighter.statuses[status] > 0) return;
    delete fighter.statuses[status];
    const label = STATUS_CONFIG[status]?.label ?? status;
    appendBattleLog(`${fighterLogName(fighter)}の${label}が解除された`, "status-recover");
    showBattleStatusEffect(fighter, `${label}解除`, "recover");
  });
  renderBattleStatuses();
}

function resetFighterStatChanges(fighter) {
  if (!fighter) return;
  fighter.powerStage = 0;
  fighter.starStage = 0;
  fighter.damageStage = 0;
}

function chooseRushMove(fighter, side) {
  const gaugeKey = side === "ally" ? "rushAllyGauge" : "rushEnemyGauge";
  const cost = fighter.monster.leftMoveGauge;
  if (!fighter.statuses.paralysis && state[gaugeKey] >= cost) {
    state[gaugeKey] -= cost;
    onGaugeSpent(fighter, true);
    const key = moveKey(fighter.monster.leftMove);
    const rollBonus = key === "roll" ? fighter.rollUses * 0.1 : 0;
    return {
      name: fighter.monster.leftMove,
      multiplier: fighter.monster.leftMoveMultiplier + rollBonus,
      attribute: fighter.monster.leftMoveAttribute,
      special: true
    };
  }
  return {
    name: fighter.monster.rightMove,
    multiplier: fighter.monster.rightMoveMultiplier,
    attribute: fighter.monster.rightMoveAttribute,
    special: false
  };
}

function startDungeon() {
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  const party = state.partyIds.map((id) => state.friends.find((monster) => monster.id === id)).filter(Boolean);
  if (party.length !== 3) return;
  if (els.partyDialog.open) els.partyDialog.close();
  state.dungeonPartyStarAverage = party.reduce(
    (sum, monster) => sum + monster.star,
    0
  ) / party.length;
  state.battleIndex = 0;
  state.battleHistory = [];
  state.allies = party.map((monster) => makeFighter(monster));
  state.activeAllyIndex = 0;
  state.allyPartyGauge = 0;
  state.enemyPartyGauge = 0;
  state.awaitingReplacement = false;
  showView("battleView");
  startBattleRound();
}

function configuredEnemy(speciesNo, level, hpMultiplier = 1, boss = false) {
  state.discoveredSpecies.add(speciesNo);
  const monster = createMonster(0, speciesNo, level, { fixedIv: 0 });
  if (boss) monster.name = `ヌシ・${monster.name}`;
  const fighter = makeFighter(monster, true, boss);
  fighter.maxHp = Math.max(1, Math.round(fighter.maxHp * hpMultiplier));
  fighter.hp = fighter.maxHp;
  return fighter;
}

function currentDungeon() {
  return DUNGEON_CONFIG[state.selectedDungeon] ?? DUNGEON_CONFIG.warawara;
}

function rushBattleCount() {
  return currentDungeon().rushes.length;
}

function totalBattleCount() {
  return rushBattleCount() + 1;
}

function battleMode() {
  return state.battleIndex < rushBattleCount() ? "rush" : "boss";
}

function battleSpeed(mode = battleMode()) {
  return mode === "rush" ? state.rushBattleSpeed : state.bossBattleSpeed;
}

function battleDuration(milliseconds, mode = battleMode()) {
  return Math.max(20, Math.round(milliseconds * DEFAULT_BATTLE_SPEED / battleSpeed(mode)));
}

function battleTimeout(callback, milliseconds, mode = battleMode()) {
  return window.setTimeout(callback, battleDuration(milliseconds, mode));
}

function updateBattleSpeedButton() {
  const mode = battleMode();
  const speed = battleSpeed(mode);
  els.battleSpeedValue.textContent = `×${speed}`;
  els.battleView.style.setProperty(
    "--battle-duration-scale",
    String(DEFAULT_BATTLE_SPEED / speed)
  );
  els.battleSpeedButton.setAttribute(
    "aria-label",
    `${mode === "rush" ? "ラッシュ" : "ボス"}バトル速度 ${speed}倍`
  );
}

function startRushTimer() {
  window.clearInterval(state.rushTimer);
  state.rushTimer = window.setInterval(
    rushBattleTick,
    battleDuration(260, "rush")
  );
}

function cycleBattleSpeed() {
  const mode = battleMode();
  const stateKey = mode === "rush" ? "rushBattleSpeed" : "bossBattleSpeed";
  const currentIndex = BATTLE_SPEED_OPTIONS.indexOf(state[stateKey]);
  state[stateKey] = BATTLE_SPEED_OPTIONS[
    (currentIndex + 1) % BATTLE_SPEED_OPTIONS.length
  ];
  updateBattleSpeedButton();
  if (mode === "rush" && state.currentView === "battleView" && !state.battleLocked) {
    startRushTimer();
  }
  scheduleAutosave();
}

function syncOptionsControls() {
  els.rushSpeedSelect.value = String(state.rushBattleSpeed);
  els.bossSpeedSelect.value = String(state.bossBattleSpeed);
}

function openOptionsDialog() {
  syncOptionsControls();
  els.optionsDialog.showModal();
}

function setBattleSpeedFromOption(mode, value) {
  const speed = Number(value);
  if (!BATTLE_SPEED_OPTIONS.includes(speed)) return;
  if (mode === "rush") {
    state.rushBattleSpeed = speed;
    if (
      state.currentView === "battleView"
      && battleMode() === "rush"
      && !state.battleLocked
      && !state.statusPausedRush
    ) {
      startRushTimer();
    }
  } else {
    state.bossBattleSpeed = speed;
  }
  if (state.currentView === "battleView") updateBattleSpeedButton();
  scheduleAutosave();
}

function startBattleRound() {
  const boss = state.battleIndex === rushBattleCount();
  const dungeon = currentDungeon();
  window.clearInterval(state.rushTimer);
  if (!boss) {
    startRushBattle();
    return;
  }
  state.bossQueue = dungeon.bosses.map((bossConfig) => configuredEnemy(
    bossConfig.species,
    bossConfig.level,
    bossConfig.hpMultiplier,
    true
  ));
  state.defeatedBosses = [];
  state.enemies = [state.bossQueue.shift()];
  state.allyPartyGauge = 0;
  state.enemyPartyGauge = 0;
  state.awaitingReplacement = false;
  state.allies.forEach((fighter) => {
    fighter.hp = Math.min(fighter.maxHp, fighter.hp + Math.round(fighter.maxHp * 0.32));
  });
  if (state.allies[state.activeAllyIndex].hp <= 0) {
    state.activeAllyIndex = state.allies.findIndex((fighter) => fighter.hp > 0);
  }
  state.battleLocked = false;
  updateBattleSpeedButton();
  els.rushBattleArea.hidden = true;
  resetBossBattleVisualState();
  els.bossBattleArea.hidden = false;
  clearBattleLog(els.battleLog);
  renderBattle();
  appendBattleLog("ボスバトル開始", "section");
  appendBattleLog(`味方パーティー：${state.allies.map((fighter) => fighter.name).join(" / ")}`, "lineup ally");
  appendBattleLog(`敵パーティー：${state.enemies.map((fighter) => fighter.name).join(" / ")}`, "lineup enemy");
  applyBattleEntryTraits("boss");
  appendBattleLog("ページを左右にスワイプして技を選ぶ");
  renderBattleStatuses();
}

function resetBossBattleVisualState() {
  state.battleDragging = false;
  state.battleDragAxis = null;
  state.battleDx = 0;
  els.manualBattleField.style.transition = "none";
  els.manualBattleField.style.transform = "translateX(0) rotate(0)";
  els.manualBattleField.style.opacity = "1";
  els.allyMonster.classList.remove("ally-attack", "enemy-attack", "boss-hit");
  els.enemyMonster.classList.remove("ally-attack", "enemy-attack", "boss-hit");
  els.allyMonster.style.animation = "none";
  els.enemyMonster.style.animation = "none";
  els.leftMoveCallout.style.opacity = "0";
  els.rightMoveCallout.style.opacity = "0";
  els.leftMoveCallout.style.transform = "";
  els.rightMoveCallout.style.transform = "";
  window.requestAnimationFrame(() => {
    els.allyMonster.style.animation = "";
    els.enemyMonster.style.animation = "";
    els.manualBattleField.style.transition = "";
  });
}

function living(fighters) {
  return fighters.filter((fighter) => fighter.hp > 0);
}

function startRushBattle() {
  const dungeon = currentDungeon();
  const rushConfig = dungeon.rushes[state.battleIndex];
  const speciesNumbers = rushConfig.species
    ?? Array.from(
      { length: rushConfig.count },
      () => pick(rushConfig.speciesPool)
    );
  state.enemies = speciesNumbers.map((speciesNo) => configuredEnemy(
    speciesNo,
    rushConfig.level,
    rushConfig.hpMultiplier,
    false
  ));
  state.allies.forEach((fighter) => {
    fighter.hp = Math.min(fighter.maxHp, fighter.hp + Math.round(fighter.maxHp * 0.32));
  });
  state.rushAllyGauge = 0;
  state.rushEnemyGauge = 0;
  els.rushBattleArea.hidden = false;
  els.bossBattleArea.hidden = true;
  els.testClearButton.textContent = "TEST: ラッシュ突破";
  state.battleLocked = false;
  updateBattleSpeedButton();
  state.rushSide = "ally";
  renderRushBattle();
  clearBattleLog(els.rushBattleLog);
  appendBattleLog(
    `ラッシュバトル ${state.battleIndex + 1} / ${rushBattleCount()} 開始`,
    "section"
  );
  appendBattleLog(`味方パーティー：${state.allies.map((fighter) => fighter.name).join(" / ")}`, "lineup ally");
  appendBattleLog(`敵パーティー：${state.enemies.map((fighter) => fighter.name).join(" / ")}`, "lineup enemy");
  applyBattleEntryTraits("rush");
  appendBattleLog("モンスターたちが一斉に駆け出した");
  renderBattleStatuses();
  startRushTimer();
}

function rushBattleTick() {
  const attackers = state.rushSide === "ally" ? living(state.allies) : living(state.enemies);
  const targets = state.rushSide === "ally" ? living(state.enemies) : living(state.allies);
  if (!attackers.length || !targets.length) {
    resolveRushBattle();
    return;
  }

  const attacker = pick(attackers);
  const target = pick(targets);
  const attackingSide = state.rushSide;
  if (actionBlocked(attacker)) {
    finishFighterAction(attacker);
    state.rushSide = state.rushSide === "ally" ? "enemy" : "ally";
    renderRushHp();
    resolveRushBattle();
    return;
  }
  const move = chooseRushMove(attacker, attackingSide);
  const key = moveKey(move.name);
  const nonDamageMove = ["shine", "grow", "cling"].includes(key);
  const missed = !nonDamageMove && moveMissed(attacker);
  const result = missed
    ? { damage: 0, critical: false, effectiveness: 1, missed: true }
    : calculateDamage(attacker, target, move.multiplier, move.attribute);
  animateRushAttack(attacker, target, state.rushSide, () => {
    const affectedTargets = key === "flash" ? [...targets] : [target];
    const knockedOutTargets = [];
    let primaryResult = result;
    affectedTargets.forEach((affectedTarget) => {
      const targetWasAlive = affectedTarget.hp > 0;
      const finalResult = nonDamageMove || missed
        ? result
        : inflictDamage(attacker, affectedTarget, result);
      if (affectedTarget.id === target.id) primaryResult = finalResult;
      if (!nonDamageMove && !missed) {
        showRushDamage(affectedTarget, finalResult);
        showEffectiveness(affectedTarget, finalResult, "rush");
      }
      if (targetWasAlive && affectedTarget.hp <= 0) {
        knockedOutTargets.push(affectedTarget);
      }
    });
    appendBattleLog(
      nonDamageMove
        ? `${fighterLogName(attacker)}が「${move.name}」を使用`
        : missed
          ? `${fighterLogName(attacker)}の「${move.name}」は外れた`
          : formatAttackLog(attacker, target, move, primaryResult)
    );
    knockedOutTargets.forEach((knockedOutTarget) => {
      appendKnockoutLog(attacker, knockedOutTarget);
    });
    applyMoveEffects(
      attacker,
      target,
      move,
      { ...primaryResult, nonDamage: nonDamageMove, missed },
      true
    );
    finishFighterAction(attacker);
    renderRushHp();
    resolveRushBattle();
  });
  state.rushSide = state.rushSide === "ally" ? "enemy" : "ally";
}

function animateRushAttack(attacker, target, side, onHit) {
  const attackerElement = document.querySelector(`[data-rush-monster="${attacker.id}"]`);
  const targetElement = document.querySelector(`[data-rush-monster="${target.id}"]`);
  if (!attackerElement || !targetElement) {
    onHit();
    return;
  }
  attackerElement.classList.remove("ally-strike", "enemy-strike", "rush-hit");
  targetElement.classList.remove("ally-strike", "enemy-strike", "rush-hit");
  void attackerElement.offsetWidth;
  attackerElement.classList.add(side === "ally" ? "ally-strike" : "enemy-strike");
  battleTimeout(() => {
    targetElement.classList.add("rush-hit");
    onHit();
  }, 100, "rush");
}

function showRushDamage(target, result) {
  if (result.damage <= 0) return;
  const targetElement = document.querySelector(`[data-rush-monster="${target.id}"]`);
  const fighterElement = targetElement?.closest(".rush-fighter");
  if (!fighterElement) return;
  const popup = document.createElement("span");
  popup.className = `rush-damage-number${result.critical ? " critical" : ""}`;
  popup.textContent = `-${result.damage}`;
  fighterElement.appendChild(popup);
  battleTimeout(() => popup.remove(), 420, "rush");
}

function resolveRushBattle() {
  if (state.battleLocked) return;
  if (!living(state.allies).length) {
    state.battleLocked = true;
    window.clearInterval(state.rushTimer);
    appendBattleLog("敵パーティーに味方パーティーを全滅させられた", "wipeout");
    finishDungeon(false);
  } else if (!living(state.enemies).length) {
    state.battleLocked = true;
    window.clearInterval(state.rushTimer);
    appendBattleLog("敵パーティーを全滅させた", "victory");
    const defeatedMonsterCount = state.enemies.length;
    const experienceAwards = calculatePartyExperience(state.enemies);
    const battleGold = calculateBattleGold(state.enemies);
    state.gold += battleGold;
    appendBattleLog(`${battleGold} Goldを獲得した`, "reward");
    updateResources();
    const finalRushCleared = state.battleIndex + 1 === rushBattleCount();
    appendBattleLog(
      finalRushCleared
        ? "ラッシュ突破。ボスの気配がする"
        : "ラッシュ突破。次の群れへ",
      "result"
    );
    state.battleIndex += 1;
    battleTimeout(() => {
      showExperienceReward(
        experienceAwards,
        "ラッシュ勝利",
        startBattleRound
      );
    }, 420, "rush");
  }
}

function renderRushBattle() {
  els.battleKind.textContent = "RUSH BATTLE";
  els.battleTitle.textContent = `ラッシュバトル ${state.battleIndex + 1} / ${rushBattleCount()}`;
  renderBattleDots();
  els.rushEnemyHpList.innerHTML = state.enemies.map((fighter) => rushHpMarkup(fighter, false)).join("");
  els.rushAllyHpList.innerHTML = state.allies.map((fighter) => rushHpMarkup(fighter, true)).join("");
  renderRushHp();
}

function rushHpMarkup(fighter, ally) {
  const name = `<span class="rush-hp-name">${fighter.name}</span>`;
  const bar = `<div class="hp-track"><i class="hp-fill" data-rush-id="${fighter.id}"></i></div>`;
  const monster = `<div class="rush-monster ${ally ? "rush-ally-monster" : "rush-enemy-monster"}"
    data-rush-monster="${fighter.id}" style="${monsterStyle(fighter.monster)}"></div>`;
  return `<div class="rush-fighter ${ally ? "rush-ally-fighter" : "rush-enemy-fighter"}">
    ${monster}
    <div class="fighter-status-icons rush-status-icons" data-status-for="${fighter.id}"></div>
    <div class="rush-hp-row">${bar}${name}</div>
  </div>`;
}

function renderRushHp() {
  [...state.allies, ...state.enemies].forEach((fighter) => {
    const fill = document.querySelector(`.hp-fill[data-rush-id="${fighter.id}"]`);
    if (fill) setHpBar(fill, fighter);
  });
  renderBattleStatuses();
}

function renderBattleDots() {
  els.battleDots.innerHTML = Array.from({ length: totalBattleCount() }, (_, index) => {
    const className = index < state.battleIndex ? "done" : index === state.battleIndex ? "current" : "";
    return `<i class="battle-dot ${className}"></i>`;
  }).join("");
}

function renderBattle() {
  els.testClearButton.textContent = "TEST: ボス撃破";
  els.battleKind.textContent = "BOSS BATTLE";
  const dungeon = currentDungeon();
  els.battleTitle.textContent = `${dungeon.name}のヌシ`;
  renderBattleDots();
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  els.enemyName.textContent = enemy.name;
  els.allyName.textContent = ally.name;
  els.leftMoveCallout.textContent = `${ally.monster.leftMove} G${ally.monster.leftMoveGauge}`;
  els.rightMoveCallout.textContent = `${ally.monster.rightMove} ×${ally.monster.rightMoveMultiplier}`;
  els.leftMoveGuide.textContent = `${ally.monster.leftMove} G${ally.monster.leftMoveGauge}`;
  els.rightMoveGuide.textContent = ally.monster.rightMove;
  const leftMove = ally.monster.leftMoves?.[0];
  els.leftMoveTooltip.textContent = [
    `属性 ${leftMove?.attribute ?? ally.monster.leftMoveAttribute}`,
    `消費G ${leftMove?.gauge ?? ally.monster.leftMoveGauge}`,
    leftMove?.effect ?? ally.monster.leftMoveEffect
  ].join(" / ");
  els.rightMoveTooltip.textContent = [
    `属性 ${ally.monster.rightMoveAttribute}`,
    "消費G 0",
    ally.monster.rightMoveEffect
  ].join(" / ");
  els.leftMoveButton.setAttribute(
    "aria-label",
    `${ally.monster.leftMove}。${els.leftMoveTooltip.textContent}`
  );
  els.rightMoveButton.setAttribute(
    "aria-label",
    `${ally.monster.rightMove}。${els.rightMoveTooltip.textContent}`
  );
  applyBattleMonsterStyle(els.enemyMonster, enemy.monster);
  applyBattleMonsterStyle(els.allyMonster, ally.monster);
  const leftMoveReady = !ally.statuses.paralysis
    && state.allyPartyGauge >= ally.monster.leftMoveGauge;
  els.leftMoveGuide.parentElement.classList.toggle("move-ready", leftMoveReady);
  els.leftMoveGuide.parentElement.classList.toggle("move-disabled", Boolean(ally.statuses.paralysis));
  els.leftMoveButton.disabled = Boolean(ally.statuses.paralysis);
  els.rightMoveButton.disabled = false;
  els.leftMoveCallout.classList.toggle("move-ready", leftMoveReady);
  els.leftMoveCallout.classList.toggle("move-disabled", Boolean(ally.statuses.paralysis));
  renderBench();
  renderBattleHp();
}

function applyBattleMonsterStyle(element, monster) {
  element.style.setProperty("--battle-color", monster.attr.monster);
  element.style.setProperty("--battle-radius", monster.bodyRadius);
}

function renderBattleHp() {
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  setHpBar(els.allyHp, ally);
  setHpBar(els.enemyHp, enemy);
  setBattleGauge(els.allyGauge, els.allyGaugeValue, state.allyPartyGauge);
  setBattleGauge(els.enemyGauge, els.enemyGaugeValue, state.enemyPartyGauge);
  renderBench();
  renderBattleStatuses();
}

function setBattleGauge(fill, label, value) {
  const gauge = Math.max(0, Math.min(MAX_BATTLE_GAUGE, value ?? 0));
  fill.style.width = `${(gauge / MAX_BATTLE_GAUGE) * 100}%`;
  label.textContent = `${gauge} / ${MAX_BATTLE_GAUGE}`;
}

function clearBattleLog(element) {
  element.innerHTML = "";
}

function appendLogEntry(element, message, type = "normal") {
  if (!element) return;
  const nearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 28;
  const entry = document.createElement("div");
  entry.className = `battle-log-entry ${type}`;
  entry.innerHTML = formatBattleHistoryMessage(message);
  element.appendChild(entry);
  if (nearBottom) element.scrollTop = element.scrollHeight;
}

function appendBattleLog(message, type = "normal") {
  state.battleHistory.push({ message, type });
  const target = state.battleIndex < rushBattleCount() ? els.rushBattleLog : els.battleLog;
  appendLogEntry(target, message, type);
}

function fighterSideLabel(fighter) {
  if (state.allies.some((candidate) => candidate.id === fighter.id)) return "味方";
  if (state.enemies.some((candidate) => candidate.id === fighter.id)) return "敵";
  return "不明";
}

function fighterLogName(fighter) {
  return `【${fighterSideLabel(fighter)}】${fighter.name}`;
}

function appendKnockoutLog(attacker, target) {
  appendBattleLog(
    `${fighterLogName(attacker)}が${fighterLogName(target)}を倒した`,
    fighterSideLabel(attacker) === "味方" ? "knockout ally" : "knockout enemy"
  );
}

function effectivenessText(result) {
  if (result.effectiveness > 1) return "効果は抜群！";
  if (result.effectiveness < 1) return "効果はいまひとつ";
  return "";
}

function formatAttackLog(attacker, target, move, result) {
  if (result.missed) return `${fighterLogName(attacker)}の${move.name}は外れた`;
  if (result.nonDamage) return `${fighterLogName(attacker)}が${move.name}を使用`;
  if (result.avoided) {
    return `${fighterLogName(attacker)}の${move.name} / ${fighterLogName(target)}は回避`;
  }
  const parts = [
    `${fighterLogName(attacker)}の${move.name}`,
    `${fighterLogName(target)}に${result.damage}ダメージ`
  ];
  if (move.special) parts.push("左技");
  if (result.critical) parts.push("クリティカル！");
  const effectiveness = effectivenessText(result);
  if (effectiveness) parts.push(effectiveness);
  return parts.join(" / ");
}

function showEffectiveness(target, result, mode) {
  const text = effectivenessText(result);
  if (!text) return;
  if (mode === "rush") {
    const monster = document.querySelector(`[data-rush-monster="${target.id}"]`);
    const fighter = monster?.closest(".rush-fighter");
    if (!fighter) return;
    const popup = document.createElement("span");
    popup.className = `effectiveness-popup ${result.effectiveness > 1 ? "strong" : "weak"}`;
    popup.textContent = text;
    fighter.appendChild(popup);
    battleTimeout(() => popup.remove(), 720, "rush");
    return;
  }
  els.bossEffectText.hidden = false;
  els.bossEffectText.className = `battle-effect-text ${result.effectiveness > 1 ? "strong" : "weak"}`;
  els.bossEffectText.textContent = text;
  window.clearTimeout(state.effectivenessTimer);
  state.effectivenessTimer = battleTimeout(() => {
    els.bossEffectText.hidden = true;
  }, 850, "boss");
}

function fighterStatusMarkup(fighter) {
  const statusChips = Object.entries(fighter.statuses).map(([key, value]) => {
    const config = STATUS_CONFIG[key];
    if (!config) return "";
    const turns = Number.isInteger(value) ? `<small>${value}</small>` : "";
    return `<span class="fighter-status-chip ${config.className}" title="${config.label}">
      <b>${config.icon}</b>${turns}
    </span>`;
  }).join("");
  const stageChips = [
    fighter.powerStage !== 0
      ? `<span class="fighter-status-chip ${fighter.powerStage > 0 ? "buff" : "debuff"}" title="パワー${fighter.powerStage > 0 ? "上昇" : "下降"}"><b>P</b><small>${fighter.powerStage > 0 ? "+" : ""}${fighter.powerStage}</small></span>`
      : "",
    fighter.starStage !== 0
      ? `<span class="fighter-status-chip ${fighter.starStage > 0 ? "buff" : "debuff"}" title="スター${fighter.starStage > 0 ? "上昇" : "下降"}"><b>S</b><small>${fighter.starStage > 0 ? "+" : ""}${fighter.starStage}</small></span>`
      : "",
    fighter.damageStage !== 0
      ? `<span class="fighter-status-chip ${fighter.damageStage > 0 ? "debuff" : "buff"}" title="被ダメ率${fighter.damageStage > 0 ? "上昇" : "下降"}"><b>D</b><small>${fighter.damageStage > 0 ? "+" : ""}${fighter.damageStage}</small></span>`
      : ""
  ].join("");
  return statusChips + stageChips;
}

function renderBattleStatuses() {
  [...state.allies, ...state.enemies].forEach((fighter) => {
    const rushContainer = document.querySelector(`[data-status-for="${fighter.id}"]`);
    if (rushContainer) rushContainer.innerHTML = fighterStatusMarkup(fighter);
  });
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  if (els.allyStatusIcons) els.allyStatusIcons.innerHTML = ally ? fighterStatusMarkup(ally) : "";
  if (els.enemyStatusIcons) els.enemyStatusIcons.innerHTML = enemy ? fighterStatusMarkup(enemy) : "";
  if (els.battleStatusDialog.open) renderBattleStatusDialog();
}

function showBattleStatusEffect(fighter, text, className) {
  const rushMonster = document.querySelector(`[data-rush-monster="${fighter.id}"]`);
  const anchor = rushMonster?.closest(".rush-fighter")
    ?? (fighterSideLabel(fighter) === "味方" ? els.allyMonster : els.enemyMonster);
  if (!anchor) return;
  const popup = document.createElement("span");
  popup.className = `status-effect-popup ${className}`;
  popup.textContent = text;
  anchor.appendChild(popup);
  battleTimeout(() => popup.remove(), 820);
}

function fighterStatusDescription(fighter) {
  const statuses = Object.entries(fighter.statuses).map(([key, value]) => {
    const config = STATUS_CONFIG[key];
    if (!config) return "";
    const visibleTurns = key === "shield" ? Math.min(5, value) : value;
    return `<i class="status-text ${config.className}">${config.label}${Number.isInteger(value) ? ` 残り${visibleTurns}` : ""}</i>`;
  }).filter(Boolean);
  if (fighter.powerStage) {
    statuses.push(`<i class="status-change ${fighter.powerStage > 0 ? "up" : "down"}">パワー${fighter.powerStage > 0 ? "↑" : "↓"}${Math.abs(fighter.powerStage)}</i>`);
  }
  if (fighter.starStage) {
    statuses.push(`<i class="status-change ${fighter.starStage > 0 ? "up" : "down"}">スター${fighter.starStage > 0 ? "↑" : "↓"}${Math.abs(fighter.starStage)}</i>`);
  }
  if (fighter.damageStage) {
    statuses.push(`<i class="status-change ${fighter.damageStage > 0 ? "down" : "up"}">被ダメ${fighter.damageStage > 0 ? "↑" : "↓"}${Math.abs(fighter.damageStage)}</i>`);
  }
  return statuses.length
    ? `<span class="status-change-list">${statuses.join("")}</span>`
    : `<span class="status-none">変化なし</span>`;
}

function renderBattleStatusDialog() {
  const activeStatusKeys = new Set(
    [...state.allies, ...state.enemies].flatMap((fighter) => Object.keys(fighter.statuses))
  );
  const statusRules = {
    burn: "毎ターンHP-4%・パワー1/2",
    poison: "毎ターンHP-10%",
    paralysis: "左技使用不可・相手クリティカル率+50%",
    freeze: "行動不可",
    sleep: "行動不可",
    flinch: "行動不可",
    blind: "命中率25%",
    shield: "被ダメージ1/2"
  };
  const activeStatusLegend = [...activeStatusKeys].map((key) => {
    const config = STATUS_CONFIG[key];
    return config
      ? `<span class="active-status-rule ${config.className}"><b>${config.icon}</b><strong>${config.label}</strong><small>${statusRules[key]}</small></span>`
      : "";
  }).join("");
  const section = (title, fighters, side) => `
    <section class="battle-status-side ${side}">
      <h3>${title}</h3>
      ${fighters.map((fighter) => `
        <article class="battle-status-row">
          <span class="mini-monster" style="${monsterStyle(fighter.monster)}"></span>
          <span class="battle-status-copy">
            <strong>${fighter.name}</strong>
            <small>HP ${fighter.hp} / ${fighter.maxHp}</small>
            <span>${fighterStatusDescription(fighter)}</span>
          </span>
          <span class="battle-effective-stats">
            <small>パワー</small><b class="${fighter.powerStage > 0 ? "stat-up" : fighter.powerStage < 0 || fighter.statuses.burn ? "stat-down" : ""}">${Math.round(effectivePower(fighter))}</b>
            <small>スター</small><b class="${fighter.starStage > 0 ? "stat-up" : fighter.starStage < 0 ? "stat-down" : ""}">${Math.round(effectiveStar(fighter))}</b>
            <small>被ダメ</small><b class="${fighter.damageStage < 0 ? "stat-up" : fighter.damageStage > 0 ? "stat-down" : ""}">${Math.round(stageMultiplier("damage", fighter.damageStage) * 100)}%</b>
          </span>
        </article>`).join("")}
    </section>`;
  els.battleStatusContent.innerHTML = [
    `<div class="field-status-summary"><span>場の状態</span><strong>なし</strong></div>`,
    activeStatusLegend
      ? `<div class="active-status-rules">${activeStatusLegend}</div>`
      : "",
    section("味方", state.allies, "ally"),
    section("相手", state.enemies, "enemy")
  ].join("");
}

function openBattleStatusDialog() {
  if (state.battleIndex < rushBattleCount() && !state.battleLocked) {
    window.clearInterval(state.rushTimer);
    state.statusPausedRush = true;
  }
  renderBattleStatusDialog();
  els.battleStatusDialog.showModal();
}

function closeBattleStatusDialog() {
  els.battleStatusDialog.close();
  if (state.statusPausedRush && !state.battleLocked && state.currentView === "battleView") {
    startRushTimer();
  }
  state.statusPausedRush = false;
}

function setHpBar(element, fighter) {
  const percent = Math.max(0, (fighter.hp / fighter.maxHp) * 100);
  element.style.width = `${percent}%`;
  element.className = `hp-fill ${percent <= 0 ? "down" : percent < 25 ? "critical" : percent < 50 ? "low" : ""}`;
}

function renderBench() {
  els.bench.innerHTML = state.allies.map((fighter, index) => {
    const active = index === state.activeAllyIndex;
    const percent = Math.max(0, Math.round((fighter.hp / fighter.maxHp) * 100));
    const selectableReplacement = state.awaitingReplacement && !active && fighter.hp > 0;
    const disabled = fighter.hp <= 0
      || active
      || (state.battleLocked && !selectableReplacement);
    return `
      <button class="bench-button ${active ? "active" : ""} ${selectableReplacement ? "replacement-choice" : ""}"
        data-bench-index="${index}" type="button" ${disabled ? "disabled" : ""}>
        <div class="mini-monster" style="${monsterStyle(fighter.monster)}"></div>
        <span class="bench-copy">
          <strong>${fighter.name}</strong>
          <span>${selectableReplacement ? "次に出す" : `HP ${percent}%`}</span>
        </span>
      </button>`;
  }).join("");
}

function openBenchActions(index) {
  const fighter = state.allies[index];
  if (!fighter || fighter.hp <= 0 || index === state.activeAllyIndex) return;
  if (state.battleLocked && !state.awaitingReplacement) return;
  state.selectedBenchIndex = index;
  els.benchActionName.textContent = fighter.name;
  els.benchActionMonster.innerHTML = `
    <span class="mini-monster" style="${monsterStyle(fighter.monster)}"></span>
    <span>
      <strong>Lv ${fighter.monster.level}・SP ${fighter.monster.sp}</strong>
      <small>HP ${fighter.hp} / ${fighter.maxHp}</small>
      <small>${fighterStatusDescription(fighter)}</small>
    </span>`;
  els.benchSwitchButton.textContent = state.awaitingReplacement ? "このモンスターを出す" : "交代する";
  els.benchActionDialog.showModal();
}

function closeBenchActions() {
  state.selectedBenchIndex = null;
  els.benchActionDialog.close();
}

function showSelectedBenchDetail() {
  const fighter = state.allies[state.selectedBenchIndex];
  if (!fighter) return;
  els.benchActionDialog.close();
  openMonsterDetail(fighter.monster, "battleView");
}

function switchSelectedBenchMonster() {
  const index = state.selectedBenchIndex;
  if (!Number.isInteger(index)) return;
  els.benchActionDialog.close();
  state.selectedBenchIndex = null;
  switchAlly(index);
}

function setBattleMessage(message) {
  appendBattleLog(message);
}

function closeBattleMoveTooltip() {
  window.clearTimeout(state.moveTooltipTimer);
  state.moveTooltipTimer = null;
  state.moveTooltipButton?.classList.remove("tooltip-open");
  state.moveTooltipButton = null;
}

function beginBattleMoveLongPress(event) {
  const button = event.currentTarget;
  closeBattleMoveTooltip();
  state.moveTooltipButton = button;
  state.moveTooltipStartX = event.clientX;
  state.moveTooltipStartY = event.clientY;
  state.moveTooltipTimer = window.setTimeout(() => {
    button.classList.add("tooltip-open");
    state.suppressMoveClickUntil = Date.now() + 700;
    state.moveTooltipTimer = null;
  }, 380);
  event.stopPropagation();
}

function trackBattleMoveLongPress(event) {
  if (!state.moveTooltipTimer || event.currentTarget !== state.moveTooltipButton) return;
  const moved = Math.hypot(
    event.clientX - state.moveTooltipStartX,
    event.clientY - state.moveTooltipStartY
  );
  if (moved > 12) {
    window.clearTimeout(state.moveTooltipTimer);
    state.moveTooltipTimer = null;
  }
  event.stopPropagation();
}

function endBattleMoveLongPress(event) {
  window.clearTimeout(state.moveTooltipTimer);
  state.moveTooltipTimer = null;
  if (event.currentTarget.classList.contains("tooltip-open")) {
    state.suppressMoveClickUntil = Date.now() + 500;
  }
  event.stopPropagation();
}

function useBattleMoveFromButton(direction) {
  if (Date.now() < state.suppressMoveClickUntil) return;
  closeBattleMoveTooltip();
  useMove(direction);
}

function useMove(direction) {
  if (state.battleLocked) return;
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  if (!ally || ally.hp <= 0 || !enemy || enemy.hp <= 0) return;
  if (actionBlocked(ally)) {
    state.battleLocked = true;
    finishFighterAction(ally);
    renderBattleHp();
    if (ally.hp <= 0) {
      const nextIndex = state.allies.findIndex((fighter) => fighter.hp > 0);
      if (nextIndex < 0) {
        battleTimeout(() => finishDungeon(false), 520, "boss");
      } else {
        state.awaitingReplacement = true;
        renderBench();
        setBattleMessage("味方：次に出すモンスターを選んでください");
      }
    } else {
      battleTimeout(enemyTurn, 520, "boss");
    }
    return;
  }

  const right = direction === "right";
  const moveName = right ? ally.monster.rightMove : ally.monster.leftMove;
  const key = moveKey(moveName);
  const rollBonus = !right && key === "roll" ? ally.rollUses * 0.1 : 0;
  const multiplier = right
    ? ally.monster.rightMoveMultiplier
    : ally.monster.leftMoveMultiplier + rollBonus;
  const moveAttribute = right ? ally.monster.rightMoveAttribute : ally.monster.leftMoveAttribute;
  const gaugeCost = right ? 0 : ally.monster.leftMoveGauge;
  if (!right && ally.statuses.paralysis) {
    settleBossSwipe(() => {
      setBattleMessage("麻痺しているため左技を使用できない");
      showBattleStatusEffect(ally, "左技不可", "paralysis");
    });
    return;
  }
  if (state.allyPartyGauge < gaugeCost) {
    settleBossSwipe(() => {
      setBattleMessage(`ゲージ不足：${moveName}にはG${gaugeCost}必要`);
    });
    return;
  }
  state.battleLocked = true;
  if (!right) {
    state.allyPartyGauge -= gaugeCost;
    onGaugeSpent(ally);
  }
  renderBench();
  const nonDamageMove = ["shine", "grow", "cling"].includes(key);
  const missed = !nonDamageMove && moveMissed(ally);
  const result = missed
    ? { damage: 0, critical: false, effectiveness: 1, missed: true }
    : calculateDamage(ally, enemy, multiplier, moveAttribute);
  settleBossSwipe(() => {
    setBattleMessage(`${fighterLogName(ally)}が「${moveName}」を使用`);
    animateBossMonster(els.allyMonster, "ally-attack");
    battleTimeout(() => {
      const enemyWasAlive = enemy.hp > 0;
      const finalResult = nonDamageMove || missed
        ? result
        : inflictDamage(ally, enemy, result);
      if (!nonDamageMove && !missed) {
        animateBossMonster(els.enemyMonster, "boss-hit");
        showEffectiveness(enemy, finalResult, "boss");
      }
      applyMoveEffects(
        ally,
        enemy,
        { name: moveName },
        { ...finalResult, nonDamage: nonDamageMove, missed }
      );
      finishFighterAction(ally);
      setBattleMessage(formatAttackLog(
        ally,
        enemy,
        { name: moveName, special: !right },
        { ...finalResult, nonDamage: nonDamageMove }
      ));
      if (enemyWasAlive && enemy.hp <= 0) {
        appendKnockoutLog(ally, enemy);
      }
      renderBattleHp();
      if (enemy.hp <= 0) {
        battleTimeout(advanceBossBattle, 700, "boss");
      } else if (ally.hp <= 0) {
        const nextIndex = state.allies.findIndex((fighter) => fighter.hp > 0);
        if (nextIndex < 0) {
          appendBattleLog("味方パーティーが全滅した", "wipeout");
          battleTimeout(() => finishDungeon(false), 700, "boss");
        } else {
          state.awaitingReplacement = true;
          state.battleLocked = true;
          renderBench();
          setBattleMessage("火傷で倒れた。次に出すモンスターを選んでください");
        }
      } else {
        battleTimeout(enemyTurn, 700, "boss");
      }
    }, 330, "boss");
  });
}

function enemyTurn() {
  const enemy = state.enemies[0];
  const ally = state.allies[state.activeAllyIndex];
  if (!enemy || enemy.hp <= 0 || !ally) return;
  if (actionBlocked(enemy)) {
    finishFighterAction(enemy);
    renderBattleHp();
    if (enemy.hp <= 0) {
      battleTimeout(advanceBossBattle, 520, "boss");
      return;
    }
    state.battleLocked = false;
    setBattleMessage("相手は怯んで動けなかった。あなたのターン");
    return;
  }
  const canUseLeftMove = !enemy.statuses.paralysis
    && state.enemyPartyGauge >= enemy.monster.leftMoveGauge;
  const useLeftMove = canUseLeftMove && Math.random() < 0.42;
  const move = useLeftMove
    ? {
        name: enemy.monster.leftMove,
        multiplier: enemy.monster.leftMoveMultiplier,
        attribute: enemy.monster.leftMoveAttribute,
        special: true,
        gaugeCost: enemy.monster.leftMoveGauge
      }
    : {
        name: enemy.monster.rightMove,
        multiplier: enemy.monster.rightMoveMultiplier,
        attribute: enemy.monster.rightMoveAttribute,
        special: false,
        gaugeCost: 0
      };
  if (useLeftMove) {
    state.enemyPartyGauge -= move.gaugeCost;
    onGaugeSpent(enemy);
  }
  const key = moveKey(move.name);
  if (key === "roll") move.multiplier += enemy.rollUses * 0.1;
  const nonDamageMove = ["shine", "grow", "cling"].includes(key);
  const missed = !nonDamageMove && moveMissed(enemy);
  const result = missed
    ? { damage: 0, critical: false, effectiveness: 1, missed: true }
    : calculateDamage(enemy, ally, move.multiplier, move.attribute);
  setBattleMessage(`${fighterLogName(enemy)}が「${move.name}」を使用`);
  animateBossMonster(els.enemyMonster, "enemy-attack");
  battleTimeout(() => {
    const allyWasAlive = ally.hp > 0;
    const finalResult = nonDamageMove || missed
      ? result
      : inflictDamage(enemy, ally, result);
    if (!nonDamageMove && !missed) {
      animateBossMonster(els.allyMonster, "boss-hit");
      showEffectiveness(ally, finalResult, "boss");
    }
    applyMoveEffects(
      enemy,
      ally,
      move,
      { ...finalResult, nonDamage: nonDamageMove, missed }
    );
    finishFighterAction(enemy);
    setBattleMessage(formatAttackLog(
      enemy,
      ally,
      move,
      { ...finalResult, nonDamage: nonDamageMove }
    ));
    if (allyWasAlive && ally.hp <= 0) {
      appendKnockoutLog(enemy, ally);
    }
    renderBattleHp();

    if (enemy.hp <= 0) {
      battleTimeout(advanceBossBattle, 700, "boss");
    } else if (ally.hp <= 0) {
      const nextIndex = state.allies.findIndex((fighter) => fighter.hp > 0);
      if (nextIndex < 0) {
        appendBattleLog("敵パーティーに味方パーティーを全滅させられた", "wipeout");
        battleTimeout(() => finishDungeon(false), 700, "boss");
        return;
      }
      battleTimeout(() => {
        state.awaitingReplacement = true;
        state.battleLocked = true;
        renderBench();
        setBattleMessage("味方：次に出すモンスターを選んでください");
      }, 700, "boss");
    } else {
      battleTimeout(() => {
        state.battleLocked = false;
        renderBench();
        setBattleMessage("あなたのターン");
      }, 520, "boss");
    }
  }, 300, "boss");
}

function switchAlly(index) {
  const fighter = state.allies[index];
  if (!fighter || index === state.activeAllyIndex || fighter.hp <= 0) return;
  const outgoingFighter = state.allies[state.activeAllyIndex];
  resetFighterStatChanges(outgoingFighter);
  if (state.awaitingReplacement) {
    state.activeAllyIndex = index;
    state.awaitingReplacement = false;
    state.battleLocked = false;
    renderBattle();
    setBattleMessage(`【味方】${fighter.name}を繰り出した`);
    triggerEntryTrait(fighter, state.enemies);
    renderBattleHp();
    return;
  }
  if (state.battleLocked) return;
  state.battleLocked = true;
  state.activeAllyIndex = index;
  renderBattle();
  setBattleMessage(`【味方】${fighter.name}に交代した`);
  triggerEntryTrait(fighter, state.enemies);
  renderBattleHp();
  battleTimeout(enemyTurn, 600, "boss");
}

function advanceBossBattle() {
  const defeatedBoss = state.enemies[0];
  if (defeatedBoss && !state.defeatedBosses.includes(defeatedBoss)) {
    state.defeatedBosses.push(defeatedBoss);
  }
  if (!state.bossQueue.length) {
    appendBattleLog("敵パーティーを全滅させた", "victory");
    winBattleRound();
    return;
  }

  const nextBoss = state.bossQueue.shift();
  state.enemies = [nextBoss];
  state.battleLocked = false;
  appendBattleLog(`次のボス、${fighterLogName(nextBoss)}が現れた`, "section");
  renderBattle();
  triggerEntryTrait(nextBoss, [state.allies[state.activeAllyIndex]]);
  renderBattleHp();
  setBattleMessage("あなたのターン");
}

function winBattleRound() {
  const defeatedBosses = state.defeatedBosses.length ? state.defeatedBosses : state.enemies;
  const experienceAwards = calculatePartyExperience(defeatedBosses);
  const battleGold = calculateBattleGold(defeatedBosses);
  state.battleIndex += 1;
  if (state.battleIndex >= totalBattleCount()) {
    appendBattleLog("ボスバトル勝利", "result");
    state.gold += battleGold;
    appendBattleLog(`${battleGold} Goldを獲得した`, "reward");
    updateResources();
    showExperienceReward(experienceAwards, "ボス撃破", () => finishDungeon(true));
  } else {
    setBattleMessage("戦闘勝利。次の区画へ進む");
    battleTimeout(startBattleRound, 850, "boss");
  }
}

function adjustedDungeonRequestTables(dungeon, partyStarAverage) {
  const tables = dungeon.requestTables ?? [];
  if (tables.length === 0) return [];
  const referenceStar = Math.max(1, dungeon.requestReferenceStar ?? 1);
  const stage = Math.max(0, partyStarAverage / referenceStar);
  const adjusted = tables.map((table) => ({ ...table, adjustedRate: 0 }));
  let remainingRate = 100;

  for (let index = adjusted.length - 1; index >= 1; index -= 1) {
    const tableRate = Math.min(
      remainingRate,
      Math.max(0, stage * adjusted[index].baseRate)
    );
    adjusted[index].adjustedRate = tableRate;
    remainingRate -= tableRate;
    if (remainingRate <= 0) break;
  }
  adjusted[0].adjustedRate = Math.max(0, remainingRate);
  return adjusted;
}

function createDungeonMatchRequest(dungeon) {
  const adjustedTables = adjustedDungeonRequestTables(
    dungeon,
    state.dungeonPartyStarAverage
  );
  const selectedTable = weightedPick(
    adjustedTables.map((table) => ({ ...table, weight: table.adjustedRate }))
  );
  if (!selectedTable) return null;
  const selectedMonster = weightedPick(selectedTable.monsters ?? []);
  if (!selectedMonster) return null;
  const monster = createMonster(
    0,
    selectedMonster.species,
    selectedMonster.level,
    selectedMonster.rank ? { rankName: selectedMonster.rank } : {}
  );
  monster.requestTable = selectedTable.name;
  monster.requestDungeon = dungeon.name;
  monster.requestPartyStarAverage = state.dungeonPartyStarAverage;
  return monster;
}

function generateDungeonMatchRequests(count) {
  const dungeon = DUNGEON_CONFIG[state.selectedDungeon] ?? DUNGEON_CONFIG.warawara;
  return Array.from({ length: count }, () => createDungeonMatchRequest(dungeon))
    .filter(Boolean);
}

function settleBossSwipe(onSettled) {
  const duration = battleDuration(220, "boss");
  els.manualBattleField.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
  els.manualBattleField.style.transform = "translateX(0) rotate(0)";
  els.manualBattleField.style.opacity = "1";
  els.leftMoveCallout.style.opacity = "0";
  els.rightMoveCallout.style.opacity = "0";
  els.leftMoveCallout.style.transform = "";
  els.rightMoveCallout.style.transform = "";
  battleTimeout(onSettled, 240, "boss");
}

function animateBossMonster(element, className) {
  element.classList.remove("ally-attack", "enemy-attack", "boss-hit");
  void element.offsetWidth;
  element.classList.add(className);
}

function onBattlePointerDown(event) {
  if (
    state.battleIndex !== rushBattleCount()
    || state.battleLocked
    || !event.target.closest(".manual-battle-field")
    || event.target.closest("button")
    || event.target.closest(".battle-monster")
  ) return;
  state.battleDragging = true;
  state.battleDragAxis = null;
  state.battleStartX = event.clientX;
  state.battleStartY = event.clientY;
  state.battleDx = 0;
  els.manualBattleField.style.transition = "";
}

function onBattlePointerMove(event) {
  if (!state.battleDragging) return;
  const dx = event.clientX - state.battleStartX;
  const dy = event.clientY - state.battleStartY;
  if (!state.battleDragAxis && Math.max(Math.abs(dx), Math.abs(dy)) >= 8) {
    state.battleDragAxis = Math.abs(dx) > Math.abs(dy) * 1.15 ? "x" : "y";
    if (state.battleDragAxis === "x") {
      els.battleView.setPointerCapture(event.pointerId);
    }
  }
  if (state.battleDragAxis !== "x") return;
  event.preventDefault();
  state.battleDx = dx;
  const confidence = Math.min(Math.abs(state.battleDx) / 72, 1);
  els.manualBattleField.style.transform = `translateX(${state.battleDx}px) rotate(${state.battleDx / 48}deg)`;
  els.leftMoveCallout.style.opacity = state.battleDx < 0 ? String(confidence) : "0";
  els.rightMoveCallout.style.opacity = state.battleDx > 0 ? String(confidence) : "0";
  els.leftMoveCallout.style.transform = state.battleDx < 0
    ? `translateX(${-state.battleDx}px) rotate(-8deg)`
    : "";
  els.rightMoveCallout.style.transform = state.battleDx > 0
    ? `translateX(${-state.battleDx}px) rotate(8deg)`
    : "";
}

function onBattlePointerUp(event) {
  if (!state.battleDragging) return;
  state.battleDragging = false;
  const wasHorizontal = state.battleDragAxis === "x";
  state.battleDragAxis = null;
  if (event.type === "pointercancel" || !wasHorizontal) {
    els.manualBattleField.style.transition = "transform 160ms ease";
    els.manualBattleField.style.transform = "translateX(0) rotate(0)";
    els.leftMoveCallout.style.opacity = "0";
    els.rightMoveCallout.style.opacity = "0";
    els.leftMoveCallout.style.transform = "";
    els.rightMoveCallout.style.transform = "";
    return;
  }
  if (Math.abs(state.battleDx) >= 72) {
    useMove(state.battleDx > 0 ? "right" : "left");
  } else {
    els.manualBattleField.style.transition = "transform 160ms ease";
    els.manualBattleField.style.transform = "translateX(0) rotate(0)";
    els.leftMoveCallout.style.opacity = "0";
    els.rightMoveCallout.style.opacity = "0";
    els.leftMoveCallout.style.transform = "";
    els.rightMoveCallout.style.transform = "";
  }
}

function finishDungeon(cleared) {
  window.clearInterval(state.rushTimer);
  state.statusPausedRush = false;
  if (els.battleStatusDialog.open) els.battleStatusDialog.close();
  appendBattleLog(
    cleared ? "ダンジョンクリア" : "ダンジョン攻略失敗",
    cleared ? "dungeon-clear" : "dungeon-failed"
  );
  if (cleared) {
    state.clearedDungeons.add(state.selectedDungeon);
  }
  const dungeon = currentDungeon();
  const promoted = Boolean(
    cleared
      && dungeon.category === "trial"
      && dungeon.rewardPlayerLevel
      && state.playerLevel < dungeon.rewardPlayerLevel
  );
  if (promoted) {
    state.playerLevel = dungeon.rewardPlayerLevel;
    appendBattleLog(
      `昇格戦クリア。プレイヤーLv${state.playerLevel}になった`,
      "reward"
    );
  }
  const requestedCount = cleared && dungeon.category === "general" ? totalBattleCount() : 0;
  const newRequests = requestedCount ? generateDungeonMatchRequests(requestedCount) : [];
  state.requests.push(...newRequests);
  updateResources();

  els.resultMark.textContent = cleared ? "CLEAR" : "RETREAT";
  els.resultTitle.textContent = cleared ? "ダンジョンクリア" : "今回はここまで";
  els.resultCopy.textContent = !cleared
    ? "今回は新しいマッチ申請は届きませんでした。"
    : promoted
      ? `プレイヤーLv${state.playerLevel}に昇格しました。新しい試練が解放されます。`
      : `${newRequests.length}体から新着申請。未確認は合計${pendingRequestCount()}体です。`;
  renderBattleHistory();
  els.resultOverlay.hidden = false;
}

function escapeLogHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatBattleHistoryMessage(message) {
  return escapeLogHtml(message)
    .replace(/【味方】([^/]+?)(?=の|が|に|を|へ|\/|$)/g, '<strong class="history-ally">【味方】$1</strong>')
    .replace(/【敵】([^/]+?)(?=の|が|に|を|へ|\/|$)/g, '<strong class="history-enemy">【敵】$1</strong>')
    .replace(/^味方パーティー：/, '<strong class="history-ally">味方パーティー：</strong>')
    .replace(/^敵パーティー：/, '<strong class="history-enemy">敵パーティー：</strong>');
}

function renderBattleHistory() {
  els.battleHistoryList.innerHTML = state.battleHistory.length
    ? state.battleHistory.map((entry, index) => {
        const log = typeof entry === "string" ? { message: entry, type: "normal" } : entry;
        return `
        <div class="battle-history-entry ${log.type}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${formatBattleHistoryMessage(log.message)}</p>
        </div>`;
      }).join("")
    : `<p class="empty-battle-history">記録されたログはありません。</p>`;
}

function openBattleHistory() {
  renderBattleHistory();
  els.battleHistoryDialog.showModal();
}

function testClearBattle() {
  if (state.currentView !== "battleView") return;
  if (state.battleIndex < rushBattleCount()) {
    window.clearInterval(state.rushTimer);
    state.battleIndex = rushBattleCount();
    state.allies.forEach((fighter) => {
      fighter.hp = Math.max(1, fighter.maxHp);
    });
    state.activeAllyIndex = 0;
    startBattleRound();
    return;
  }
  state.battleLocked = true;
  finishDungeon(true);
}

function beginRequests() {
  if (pendingRequestCount() === 0) return;
  showView("matchView");
  renderCurrentRequest();
}

function returnHome() {
  window.clearInterval(state.rushTimer);
  els.resultOverlay.hidden = true;
  if (els.battleHistoryDialog.open) els.battleHistoryDialog.close();
  showView("partyView");
  renderParty();
}

function exitRequests() {
  if (state.requestLocked || isTutorialActive()) return;
  returnHome();
}

function openRejectAllConfirmation() {
  if (state.requestLocked || isTutorialActive() || pendingRequestCount() === 0) return;
  els.rejectAllDialog.showModal();
}

function rejectAllRequests() {
  const rejectedRequests = state.requests.slice(state.requestIndex);
  state.gold += rejectedRequests.reduce(
    (total, monster) => total + Math.round(monster.sp / 2),
    0
  );
  state.requests = [];
  state.requestIndex = 0;
  els.rejectAllDialog.close();
  returnHome();
}

function abilityDetail(monster, kind) {
  if (!monster) return "";
  if (kind === "right") {
    return `${monster.rightMove}\n属性：${monster.rightMoveAttribute}　消費G：0\n${monster.rightMoveEffect}`;
  }
  if (kind === "left1") {
    const move = monster.leftMoves?.[0];
    return move
      ? `${move.name}\n属性：${move.attribute}　消費G：${move.gauge}\n${move.effect}`
      : "";
  }
  if (kind === "left2") {
    const move = monster.leftMoves?.[1];
    return move
      ? `${move.name}\n属性：${move.attribute}　消費G：${move.gauge}\n${move.effect}`
      : "左技2はありません";
  }
  return `${monster.trait}\n${monster.traitEffect}`;
}

function renderAbilityNames(monster, prefix = "") {
  const target = prefix === "detail" ? {
    right: els.detailRightMove,
    left1: els.detailLeftMove,
    left2: els.detailLeftMove2,
    left2Button: els.detailLeftMove2Button,
    trait: els.detailTrait,
    info: els.detailAbilityInfo
  } : {
    right: els.rightMove,
    left1: els.leftMove,
    left2: els.leftMove2,
    left2Button: els.leftMove2Button,
    trait: els.trait,
    info: els.matchAbilityInfo
  };
  const secondLeftMove = monster.leftMoves?.[1];
  target.right.textContent = monster.rightMove;
  target.left1.textContent = monster.leftMoves?.[0]?.name ?? monster.leftMove;
  target.left2.textContent = secondLeftMove?.name ?? "なし";
  target.left2Button.classList.toggle("empty", !secondLeftMove);
  target.trait.textContent = monster.trait;
  target.info.textContent = "技や特性をタップすると詳細を表示します";
}

function showAbilityInfo(container, monster, kind) {
  const info = container === els.detailAbilityList ? els.detailAbilityInfo : els.matchAbilityInfo;
  const detail = abilityDetail(monster, kind);
  if (detail) info.textContent = detail;
}

function currentDetailMonster() {
  return state.detailMonsterRef
    ?? state.friends.find((monster) => monster.id === state.detailMonsterId)
    ?? state.requests.find((monster) => monster.id === state.detailMonsterId);
}

function handleAbilityInteraction(container, monsterProvider, event) {
  const button = event.target.closest("[data-ability-kind]");
  if (!button || !container.contains(button)) return;
  showAbilityInfo(container, monsterProvider(), button.dataset.abilityKind);
}

function renderCurrentRequest() {
  const monster = state.requests[state.requestIndex];
  if (!monster) {
    finishRequests();
    return;
  }
  els.requestProgress.textContent = `${state.requestIndex + 1} / ${state.requests.length}`;
  els.name.textContent = monster.name;
  els.levelBadge.textContent = `Lv ${monster.level}`;
  els.rankBadge.textContent = `ランク ${monster.rank.name}`;
  els.rankBadge.setAttribute("style", rankStyle(monster.rank));
  els.attribute.textContent = monster.attr.name;
  els.sp.textContent = monster.sp;
  els.matchHp.textContent = monster.hp;
  els.matchPower.textContent = monster.power;
  els.matchStar.textContent = monster.star;
  renderAbilityNames(monster);
  els.ivHp.style.width = `${monster.iv.hp * 20}%`;
  els.ivAtk.style.width = `${monster.iv.atk * 20}%`;
  els.ivSense.style.width = `${monster.iv.sense * 20}%`;
  els.ivHpValue.textContent = monster.iv.hp;
  els.ivAtkValue.textContent = monster.iv.atk;
  els.ivSenseValue.textContent = monster.iv.sense;
  els.imagePanel.style.setProperty("--monster-bg", monster.attr.bg);
  els.card.style.setProperty("--monster-color", monster.attr.monster);
  els.card.style.setProperty("--horn-color", monster.attr.horn);
  els.card.style.setProperty("--body-radius", monster.bodyRadius);
  els.card.style.setProperty("--horn-tilt", monster.hornTilt);
  els.card.style.setProperty("--horn-top", monster.hornTop);
  els.attribute.style.setProperty("--attr-bg", monster.attr.bg);
  els.attribute.style.setProperty("--attr-color", monster.attr.color);
  state.requestLocked = false;
  resetCard();
  els.card.classList.remove("enter");
  requestAnimationFrame(() => els.card.classList.add("enter"));
}

function resetCard() {
  state.dx = 0;
  state.dy = 0;
  els.card.style.transition = "";
  els.card.style.opacity = "1";
  els.card.style.transform = "translate(0, 0) rotate(0deg)";
  els.skipBadge.style.opacity = "0";
  els.friendBadge.style.opacity = "0";
}

function snapCardBack() {
  state.dx = 0;
  state.dy = 0;
  els.card.style.transition = "transform 180ms ease, opacity 180ms ease";
  els.card.style.opacity = "1";
  els.card.style.transform = "translate(0, 0) rotate(0deg)";
  els.skipBadge.style.opacity = "0";
  els.friendBadge.style.opacity = "0";
}

function decideRequest(keep) {
  if (state.requestLocked) return;
  const monster = state.requests[state.requestIndex];
  if (!monster) return;
  if (state.tutorialStage === "prince" && !keep) {
    snapCardBack();
    return;
  }
  if (keep && state.cages <= 0) {
    snapCardBack();
    els.matchCageStatus.classList.remove("notice");
    void els.matchCageStatus.offsetWidth;
    els.matchCageStatus.classList.add("notice");
    return;
  }
  if (keep && state.friends.length >= MAX_FRIENDS) {
    state.pendingRecruit = monster;
    snapCardBack();
    openReplaceDialog();
    return;
  }
  state.requestLocked = true;
  animateCardOut(keep);
  if (keep) {
    addFriendDirect(monster);
    state.cages -= 1;
    if (state.tutorialStage === "recruiting") {
      state.tutorialMatchedCount += 1;
    }
  } else {
    state.gold += Math.round(monster.sp / 2);
  }
  renderParty();
  if (keep) {
    showMatchAnimation(monster);
  } else {
    nextRequest();
  }
}

function animateCardOut(keep) {
  els.card.style.transition = "transform 250ms ease, opacity 250ms ease";
  els.card.style.transform = `translate(${keep ? 520 : -520}px, ${state.dy * 0.3}px) rotate(${keep ? 22 : -22}deg)`;
  els.card.style.opacity = "0";
  els.friendBadge.style.opacity = keep ? "1" : "0";
  els.skipBadge.style.opacity = keep ? "0" : "1";
}

function nextRequest(delay = 270) {
  const nextIndex = state.requestIndex + 1;
  if (
    state.tutorialStage === "recruiting"
    && state.tutorialMatchedCount + (state.requests.length - nextIndex) < 2
  ) {
    window.setTimeout(resetTutorialRecruitment, delay);
    return;
  }
  state.requestIndex = nextIndex;
  window.setTimeout(renderCurrentRequest, delay);
}

function showMatchAnimation(monster) {
  state.matchAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  state.matchAnimationTimers = [];
  state.matchAnimationActive = true;
  els.matchOverlay.style.setProperty("--match-bg", monster.attr.bg);
  els.matchMonster.setAttribute("style", monsterStyle(monster));
  els.matchedName.textContent = monster.name;
  state.matchAnimationTimers.push(window.setTimeout(() => {
    els.matchOverlay.hidden = false;
  }, 180));
  state.matchAnimationTimers.push(window.setTimeout(completeMatchAnimation, 1350));
}

function completeMatchAnimation() {
  if (!state.matchAnimationActive) return;
  state.matchAnimationActive = false;
  state.matchAnimationTimers.forEach((timer) => window.clearTimeout(timer));
  state.matchAnimationTimers = [];
  els.matchOverlay.hidden = true;
  if (state.tutorialStage === "prince") {
    afterTutorialPrinceMatched();
    return;
  }
  if (state.tutorialStage === "recruiting" && state.tutorialMatchedCount >= 2) {
    completeTutorialRecruitment();
    return;
  }
  nextRequest(0);
}

function openMonsterDetail(monster = state.requests[state.requestIndex], mode = "view") {
  if (!monster || (state.currentView === "matchView" && state.requestLocked)) return;
  state.detailMode = mode;
  state.detailMonsterId = monster.id;
  state.detailMonsterRef = monster;
  els.detailSelectActions.hidden = mode !== "partySelect";
  els.detailName.textContent = monster.name;
  els.detailLevel.textContent = `Lv ${monster.level}`;
  els.detailTalent.textContent = monster.talent;
  els.detailExp.textContent = `${monster.experience} / ${monster.nextLevelExperience}`;
  els.detailRank.textContent = `ランク ${monster.rank.name}`;
  els.detailRank.setAttribute("style", rankStyle(monster.rank));
  els.detailAttribute.textContent = monster.attr.name;
  els.detailSp.textContent = monster.sp;
  els.detailHp.textContent = monster.hp;
  els.detailPower.textContent = monster.power;
  els.detailStar.textContent = monster.star;
  renderAbilityNames(monster, "detail");
  els.detailIvHp.style.width = `${monster.iv.hp * 20}%`;
  els.detailIvAtk.style.width = `${monster.iv.atk * 20}%`;
  els.detailIvSense.style.width = `${monster.iv.sense * 20}%`;
  els.detailIvHpValue.textContent = monster.iv.hp;
  els.detailIvAtkValue.textContent = monster.iv.atk;
  els.detailIvSenseValue.textContent = monster.iv.sense;
  els.detailVisual.style.setProperty("--detail-bg", monster.attr.bg);
  els.detailVisual.style.setProperty("--detail-color", monster.attr.monster);
  els.detailVisual.style.setProperty("--detail-horn", monster.attr.horn);
  els.detailVisual.style.setProperty("--detail-radius", monster.bodyRadius);
  els.detailVisual.style.setProperty("--detail-tilt", monster.hornTilt);
  els.detailVisual.style.setProperty("--detail-horn-top", monster.hornTop);
  els.detailAttribute.style.setProperty("--attr-bg", monster.attr.bg);
  els.detailAttribute.style.setProperty("--attr-color", monster.attr.color);
  if (mode === "partySelect" && els.partyPickerDialog.open) {
    els.partyPickerDialog.close();
  }
  els.detailDialog.showModal();
}

function closeMonsterDetail(returnToPicker = true) {
  const reopenPicker = returnToPicker && state.detailMode === "partySelect";
  state.detailMode = "view";
  state.detailMonsterId = null;
  state.detailMonsterRef = null;
  els.detailSelectActions.hidden = true;
  if (els.detailDialog.open) els.detailDialog.close();
  if (reopenPicker && els.partyDialog.open && !els.partyPickerDialog.open) {
    renderPartyPicker();
    els.partyPickerDialog.showModal();
  }
}

function confirmPartyMonsterSelection() {
  if (state.detailMode !== "partySelect" || !state.detailMonsterId) return;
  const monsterId = state.detailMonsterId;
  closeMonsterDetail(false);
  selectPartyMonster(monsterId);
}

function openReplaceDialog() {
  els.replaceList.innerHTML = state.friends.map((monster) => `
    <button class="replace-item" data-replace-id="${monster.id}" type="button">
      <div class="mini-monster" style="${monsterStyle(monster)}"></div>
      <span class="roster-copy"><strong>${monster.name} <i class="inline-rank" style="${rankStyle(monster.rank)}">ランク ${monster.rank.name}</i></strong><span class="sp-chip">SP ${monster.sp}</span><small>HP ${monster.hp} / パワー ${monster.power} / スター ${monster.star}</small></span>
    </button>`).join("");
  els.replaceDialog.showModal();
}

function replaceFriend(id) {
  const index = state.friends.findIndex((monster) => monster.id === id);
  if (index < 0 || !state.pendingRecruit) return;
  const matchedMonster = state.pendingRecruit;
  state.friendSequence += 1;
  matchedMonster.acquiredOrder = state.friendSequence;
  state.friends[index] = matchedMonster;
  state.cages -= 1;
  state.partyPresets = state.partyPresets.map((preset) => preset.map((monsterId) => monsterId === id ? null : monsterId));
  state.profileMonsterIds = state.profileMonsterIds.map((monsterId) => monsterId === id ? null : monsterId);
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  state.pendingRecruit = null;
  els.replaceDialog.close();
  state.requestLocked = true;
  animateCardOut(true);
  renderParty();
  showMatchAnimation(matchedMonster);
}

function finishRequests() {
  if (state.tutorialStage === "recruiting") {
    resetTutorialRecruitment();
    return;
  }
  state.partyPresets = state.partyPresets.map((preset) => preset.map((id) => (
    id && state.friends.some((monster) => monster.id === id) ? id : null
  )));
  state.profileMonsterIds = state.profileMonsterIds.filter((id) => (
    id && state.friends.some((monster) => monster.id === id)
  ));
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  state.requests = [];
  state.requestIndex = 0;
  returnHome();
}

function setCardPosition(dx, dy) {
  const confidence = Math.min(Math.abs(dx) / 110, 1);
  els.card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 16}deg)`;
  els.skipBadge.style.opacity = dx < 0 ? String(confidence) : "0";
  els.friendBadge.style.opacity = dx > 0 ? String(confidence) : "0";
}

function onPointerDown(event) {
  if (state.currentView !== "matchView" || state.requestLocked || event.target.closest("button")) return;
  state.dragging = true;
  state.dragAxis = null;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.dx = 0;
  state.dy = 0;
  els.card.style.transition = "";
}

function onPointerMove(event) {
  if (!state.dragging) return;
  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;
  if (!state.dragAxis && Math.max(Math.abs(dx), Math.abs(dy)) >= 8) {
    state.dragAxis = Math.abs(dx) > Math.abs(dy) * 1.15 ? "x" : "y";
    if (state.dragAxis === "x") {
      els.card.setPointerCapture(event.pointerId);
    }
  }
  if (state.dragAxis !== "x") return;
  event.preventDefault();
  state.dx = dx;
  state.dy = dy;
  if (state.tutorialStage === "prince") {
    state.dx = Math.max(0, state.dx);
  }
  setCardPosition(state.dx, state.dy);
}

function onPointerUp(event) {
  if (!state.dragging) return;
  state.dragging = false;
  const dragAxis = state.dragAxis;
  state.dragAxis = null;
  if (event.type === "pointercancel") {
    snapCardBack();
    return;
  }
  if (dragAxis === "x" && Math.abs(state.dx) > 72) {
    if (state.tutorialStage === "prince" && state.dx < 0) {
      snapCardBack();
      return;
    }
    decideRequest(state.dx > 0);
  } else if (!dragAxis && Math.abs(state.dx) < 8 && Math.abs(state.dy) < 8) {
    snapCardBack();
    openMonsterDetail();
  } else {
    snapCardBack();
  }
}

function bindEvents() {
  els.tutorialSkipButton.addEventListener("click", skipTutorial);
  els.optionsButton.addEventListener("click", openOptionsDialog);
  els.closeOptions.addEventListener("click", () => els.optionsDialog.close());
  els.optionsDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.optionsDialog)) els.optionsDialog.close();
  });
  els.rushSpeedSelect.addEventListener("change", () => {
    setBattleSpeedFromOption("rush", els.rushSpeedSelect.value);
  });
  els.bossSpeedSelect.addEventListener("change", () => {
    setBattleSpeedFromOption("boss", els.bossSpeedSelect.value);
  });
  els.developerSaveButton.addEventListener("click", openDeveloperSaveDialog);
  els.closeDeveloperSave.addEventListener("click", () => els.developerSaveDialog.close());
  els.developerSaveDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.developerSaveDialog)) {
      els.developerSaveDialog.close();
      return;
    }
    const saveButton = event.target.closest("[data-save-slot]");
    if (saveButton) {
      saveToManualSlot(Number(saveButton.dataset.saveSlot));
      return;
    }
    const loadButton = event.target.closest("[data-load-slot]");
    if (loadButton) {
      loadFromManualSlot(Number(loadButton.dataset.loadSlot));
      return;
    }
    const deleteButton = event.target.closest("[data-delete-slot]");
    if (deleteButton) deleteManualSlot(Number(deleteButton.dataset.deleteSlot));
  });
  els.developerNewGame.addEventListener("click", resetAllSaveData);
  els.tutorialContinueButton.addEventListener("click", continueTutorialMessage);
  els.monsterTabButton.addEventListener("click", () => setHomeTab("monsters"));
  els.dungeonTabButton.addEventListener("click", () => setHomeTab("dungeon"));
  els.trainingTabButton.addEventListener("click", () => setHomeTab("training"));
  els.matchTabButton.addEventListener("click", () => setHomeTab("match"));
  els.shopTabButton.addEventListener("click", () => setHomeTab("shop"));
  els.dungeonCategoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dungeon-category]");
    if (!button) return;
    state.dungeonCategory = button.dataset.dungeonCategory;
    renderDungeonLists();
    scheduleAutosave();
  });
  els.buyCageButton.addEventListener("click", buyCage);
  els.buyExpDrinkButton.addEventListener("click", buyExpDrink);
  els.useExpDrinkButton.addEventListener("click", openExpDrinkDialog);
  els.closeExpDrinkDialog.addEventListener("click", () => els.expDrinkDialog.close());
  els.expDrinkDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.expDrinkDialog)) els.expDrinkDialog.close();
  });
  els.expDrinkRoster.addEventListener("click", (event) => {
    const button = event.target.closest("[data-drink-target]");
    if (button) useExpDrinkOnMonster(button.dataset.drinkTarget);
  });
  els.openPartyEditorButton.addEventListener("click", openPartyManager);
  els.collectionSort.addEventListener("change", () => {
    state.collectionSort = els.collectionSort.value;
    renderCollection();
    scheduleAutosave();
  });
  els.collectionAttributeFilter.addEventListener("change", () => {
    state.collectionAttributeFilter = els.collectionAttributeFilter.value;
    renderCollection();
    scheduleAutosave();
  });
  els.partyPickerSort.addEventListener("change", () => {
    state.partyPickerSort = els.partyPickerSort.value;
    renderPartyPicker();
    scheduleAutosave();
  });
  els.partyPickerAttributeFilter.addEventListener("change", () => {
    state.partyPickerAttributeFilter = els.partyPickerAttributeFilter.value;
    renderPartyPicker();
    scheduleAutosave();
  });
  els.collectionGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collection-id]");
    if (!button) return;
    const monster = state.friends.find((friend) => friend.id === button.dataset.collectionId);
    openMonsterDetail(monster);
  });
  els.dungeonHomePanel.addEventListener("click", (event) => {
    const dungeonButton = event.target.closest("[data-dungeon-id]");
    if (dungeonButton) openDungeonPartyEditor(dungeonButton.dataset.dungeonId);
  });
  els.presetTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset-index]");
    if (!button) return;
    state.activePresetIndex = Number(button.dataset.presetIndex);
    renderParty();
  });
  els.partySlots.addEventListener("click", (event) => {
    const slot = event.target.closest("[data-party-slot]");
    if (slot) openPartyPicker(Number(slot.dataset.partySlot));
  });
  els.roster.addEventListener("click", (event) => {
    const button = event.target.closest("[data-monster-id]");
    if (!button) return;
    const monster = state.friends.find((friend) => friend.id === button.dataset.monsterId);
    openMonsterDetail(monster, "partySelect");
  });
  els.closePartyDialog.addEventListener("click", () => els.partyDialog.close());
  els.closePartyPicker.addEventListener("click", () => els.partyPickerDialog.close());
  els.partyDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.partyDialog)) els.partyDialog.close();
  });
  els.partyPickerDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.partyPickerDialog)) els.partyPickerDialog.close();
  });
  els.diveButton.addEventListener("click", startDungeon);
  els.testClearButton.addEventListener("click", testClearBattle);
  els.battleSpeedButton.addEventListener("click", cycleBattleSpeed);
  els.openBattleStatus.addEventListener("click", openBattleStatusDialog);
  els.closeBattleStatus.addEventListener("click", closeBattleStatusDialog);
  els.battleStatusDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.battleStatusDialog)) {
      closeBattleStatusDialog();
    }
  });
  els.battleStatusDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeBattleStatusDialog();
  });
  els.requestInbox.addEventListener("click", beginRequests);
  els.openProfileButton.addEventListener("click", openProfileEditor);
  els.closeProfileDialog.addEventListener("click", () => els.profileDialog.close());
  els.profileDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.profileDialog)) els.profileDialog.close();
  });
  els.profileEditorSlots.addEventListener("click", (event) => {
    const slot = event.target.closest("[data-profile-slot]");
    if (slot) openProfilePicker(Number(slot.dataset.profileSlot));
  });
  els.closeProfilePicker.addEventListener("click", () => els.profilePickerDialog.close());
  els.profilePickerDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.profilePickerDialog)) els.profilePickerDialog.close();
  });
  els.profilePickerRoster.addEventListener("click", (event) => {
    const button = event.target.closest("[data-profile-monster-id]");
    if (button) selectProfileMonster(button.dataset.profileMonsterId);
  });
  els.saveProfileButton.addEventListener("click", saveProfile);
  els.outgoingMatchButton.addEventListener("click", openOutgoingMatch);
  els.closeOutgoingMatch.addEventListener("click", closeOutgoingMatch);
  els.refreshOutgoingMatch.addEventListener("click", refreshOutgoingCandidates);
  els.outgoingMonsterList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-outgoing-id]");
    if (button) {
      openCageSelection(button.dataset.outgoingId);
      return;
    }
    const card = event.target.closest("[data-outgoing-detail-id]");
    if (!card) return;
    const monster = state.outgoingCandidates.find(
      (candidate) => candidate.id === card.dataset.outgoingDetailId
    );
    openMonsterDetail(monster, "outgoingView");
  });
  els.closeCageSelect.addEventListener("click", () => {
    state.pendingOutgoingMonsterId = null;
    els.cageSelectDialog.close();
  });
  els.cageSelectDialog.addEventListener("click", (event) => {
    if (!clickedDialogBackdrop(event, els.cageSelectDialog)) return;
    state.pendingOutgoingMonsterId = null;
    els.cageSelectDialog.close();
  });
  els.confirmOutgoingApplication.addEventListener("click", applyOutgoingMatch);
  els.battleView.addEventListener("pointerdown", onBattlePointerDown);
  els.battleView.addEventListener("pointermove", onBattlePointerMove);
  els.battleView.addEventListener("pointerup", onBattlePointerUp);
  els.battleView.addEventListener("pointercancel", onBattlePointerUp);
  [els.leftMoveButton, els.rightMoveButton].forEach((button) => {
    button.addEventListener("pointerdown", beginBattleMoveLongPress);
    button.addEventListener("pointermove", trackBattleMoveLongPress);
    button.addEventListener("pointerup", endBattleMoveLongPress);
    button.addEventListener("pointercancel", endBattleMoveLongPress);
  });
  els.leftMoveButton.addEventListener("click", () => useBattleMoveFromButton("left"));
  els.rightMoveButton.addEventListener("click", () => useBattleMoveFromButton("right"));
  els.battleView.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".battle-move-button")) closeBattleMoveTooltip();
  });
  els.allyMonster.addEventListener("click", () => {
    const fighter = state.allies[state.activeAllyIndex];
    if (fighter) openMonsterDetail(fighter.monster, "battleView");
  });
  els.enemyMonster.addEventListener("click", () => {
    const fighter = state.enemies[0];
    if (fighter) openMonsterDetail(fighter.monster, "battleView");
  });
  [els.allyMonster, els.enemyMonster].forEach((element) => {
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      element.click();
    });
  });
  els.bench.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bench-index]");
    if (button) openBenchActions(Number(button.dataset.benchIndex));
  });
  els.closeBenchAction.addEventListener("click", closeBenchActions);
  els.benchActionDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.benchActionDialog)) closeBenchActions();
  });
  els.benchActionDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeBenchActions();
  });
  els.benchDetailButton.addEventListener("click", showSelectedBenchDetail);
  els.benchSwitchButton.addEventListener("click", switchSelectedBenchMonster);
  els.resultHomeButton.addEventListener("click", returnHome);
  els.resultLogButton.addEventListener("click", openBattleHistory);
  els.closeBattleHistory.addEventListener("click", () => els.battleHistoryDialog.close());
  els.battleHistoryDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.battleHistoryDialog)) els.battleHistoryDialog.close();
  });
  els.experienceContinueButton.addEventListener("click", continueAfterExperience);
  els.exitRequestsButton.addEventListener("click", exitRequests);
  els.rejectAllRequestsButton.addEventListener("click", openRejectAllConfirmation);
  els.cancelRejectAll.addEventListener("click", () => els.rejectAllDialog.close());
  els.confirmRejectAll.addEventListener("click", rejectAllRequests);
  els.rejectAllDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.rejectAllDialog)) els.rejectAllDialog.close();
  });
  els.skipButton.addEventListener("click", () => decideRequest(false));
  els.keepButton.addEventListener("click", () => decideRequest(true));
  els.card.addEventListener("pointerdown", onPointerDown);
  els.card.addEventListener("pointermove", onPointerMove);
  els.card.addEventListener("pointerup", onPointerUp);
  els.card.addEventListener("pointercancel", onPointerUp);
  els.matchOverlay.addEventListener("click", completeMatchAnimation);
  ["click", "pointerover", "focusin"].forEach((eventName) => {
    els.matchAbilityList.addEventListener(eventName, (event) => {
      handleAbilityInteraction(
        els.matchAbilityList,
        () => state.requests[state.requestIndex],
        event
      );
    });
    els.detailAbilityList.addEventListener(eventName, (event) => {
      handleAbilityInteraction(els.detailAbilityList, currentDetailMonster, event);
    });
  });
  els.confirmPartyMonster.addEventListener("click", confirmPartyMonsterSelection);
  els.detailDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.detailDialog)) closeMonsterDetail();
  });
  els.detailDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeMonsterDetail();
  });
  els.cancelReplace.addEventListener("click", () => {
    state.pendingRecruit = null;
    els.replaceDialog.close();
    snapCardBack();
  });
  els.replaceList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-replace-id]");
    if (button) replaceFriend(button.dataset.replaceId);
  });
  els.homeButton.addEventListener("click", () => {
    if (isTutorialActive()) return;
    if (state.currentView === "partyView") return;
    if (state.currentView === "matchView" && state.requestLocked) return;
    returnHome();
  });
  window.addEventListener("beforeunload", () => {
    window.clearTimeout(autosaveTimer);
    if (!suppressAutosaveOnUnload && saveRuntimeReady && !isTutorialActive()) {
      writeSave(AUTOSAVE_KEY);
    }
  });
}

cacheElements();
bindEvents();
const forceNewGame = sessionStorage.getItem("monmachi.forceNewGame") === "1";
if (forceNewGame) {
  sessionStorage.removeItem("monmachi.forceNewGame");
  localStorage.removeItem(AUTOSAVE_KEY);
}
const loadedAutosave = forceNewGame ? null : readSave(AUTOSAVE_KEY);
const autosaveCanContinue = loadedAutosave
  && Array.isArray(loadedAutosave.friends)
  && loadedAutosave.friends.length > 0;
if (!autosaveCanContinue || !applySaveData(loadedAutosave)) {
  if (loadedAutosave && !autosaveCanContinue) {
    localStorage.removeItem(AUTOSAVE_KEY);
  }
  startTutorial();
  saveRuntimeReady = true;
} else {
  saveRuntimeReady = true;
}
