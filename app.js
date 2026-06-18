const NORMAL_ATTACK_MULTIPLIER = 0.5;

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
  ,
  poisonFang: { name: "毒の牙", attribute: "黒", gauge: 3, multiplier: 1.3, effect: "1.3倍ダメージ＋50%で毒" },
  fireHammer: { name: "火炎ハンマー", attribute: "赤", gauge: 4, multiplier: 1.5, effect: "1.5倍ダメージ＋自分のスターを1段階上げる" },
  glitterMachine: { name: "キラキラさせ機", attribute: "無", gauge: 3, multiplier: 1, effect: "10ターン、味方パーティー全体のスターを2倍にする" },
  electricShock: { name: "電気ショック", attribute: "白", gauge: 2, multiplier: 1.2, effect: "1.2倍ダメージ＋20%で麻痺" },
  lick: { name: "舐める", attribute: "黒", gauge: 3, multiplier: 1.3, effect: "1.3倍ダメージ＋50%で盲目" },
  ambush: { name: "闇討ち", attribute: "黒", gauge: 3, multiplier: 1.2, effect: "1.2倍ダメージ＋相手のGを1減らす" },
  charge: { name: "ためる", attribute: "無", gauge: 3, multiplier: 1, effect: "次のターンの攻撃威力を3倍にする" },
  healingWater: { name: "癒しの水", attribute: "青", gauge: 3, multiplier: 1, effect: "味方全員の状態異常を解除し、HPを1/4回復" },
  poisonBreath: { name: "毒の息", attribute: "黒", gauge: 4, multiplier: 1.3, effect: "1.3倍ダメージ＋50%で毒＋全体攻撃" },
  slimePress: { name: "スライムプレス", attribute: "青", gauge: 3, multiplier: 1.2, effect: "1.2倍ダメージ＋相手の被ダメージ率を1段階上げる" }
};
const monsterSpecies = [
  { no: 1, name: "プリンスライム", rank: "G", attribute: "無", hp: 35, power: 10, star: 10, expTable: "A", passive: null, leftMove: moves.caramelStrike },
  { no: 2, name: "ワラボン", rank: "G", attribute: "緑", hp: 25, power: 7, star: 15, expTable: "A", passive: { name: "隠れる", effect: "回避率10%" }, leftMove: moves.roll },
  { no: 3, name: "アカシャマ", rank: "G", attribute: "赤", hp: 27, power: 13, star: 10, expTable: "A", passive: { name: "焼きたがり", effect: "相手が火傷ならダメージ倍増" }, leftMove: moves.burn },
  { no: 4, name: "シズク", rank: "G", attribute: "青", hp: 31, power: 10, star: 4, expTable: "A", passive: { name: "泡", effect: "バトルで最初に受けるダメージを1/2にする" }, leftMove: moves.soak },
  { no: 5, name: "クロダンゴ", rank: "G", attribute: "黒", hp: 32, power: 10, star: 10, expTable: "A", passive: { name: "甘々", effect: "戦闘開始時、相手のパワーを1段階下げる" }, leftMove: moves.gnaw },
  { no: 6, name: "ミルフィ", rank: "G", attribute: "白", hp: 27, power: 6, star: 18, expTable: "A", passive: { name: "甘々", effect: "場に出た時、相手のパワーを1段階下げる" }, leftMove: moves.shine },
  { no: 7, name: "ボヤモト", rank: "G", attribute: "赤", hp: 24, power: 12, star: 12, expTable: "A", passive: { name: "ヤニ", effect: "ゲージを消費する度、HPを1/8回復" }, leftMove: moves.drain },
  { no: 8, name: "キュコン", rank: "G", attribute: "緑", hp: 40, power: 7, star: 8, expTable: "A", passive: { name: "根気", effect: "HPが0になる時、一度HP1で耐える" }, leftMove: moves.grow },
  { no: 9, name: "スライム", rank: "G", attribute: "青", hp: 35, power: 5, star: 10, expTable: "A", passive: { name: "ぷるぷる", effect: "30%の確率で相手からのダメージを1/4にする" }, leftMove: moves.cling },
  { no: 10, name: "スカルビット", rank: "G", attribute: "黒", hp: 30, power: 11, star: 9, expTable: "A", passive: { name: "怨念", effect: "倒された時、相手のゲージを0にする" }, leftMove: moves.bite },
  { no: 11, name: "デンキュ", rank: "G", attribute: "白", hp: 26, power: 8, star: 20, expTable: "A", passive: { name: "発光", effect: "回避率10%" }, leftMove: moves.flash },
  { no: 12, name: "ゾンビキッズ", rank: "G", attribute: "黒", hp: 47, power: 15, star: 6, expTable: "A", passive: { name: "ゾンビ", effect: "自分を攻撃した相手の特性をゾンビにする" }, leftMove: moves.poisonFang },
  { no: 13, name: "グラッパ", rank: "G", attribute: "赤", hp: 38, power: 20, star: 12, expTable: "A", passive: { name: "調子乗り", effect: "クリティカルのダメージを2倍にする" }, leftMove: moves.fireHammer },
  { no: 14, name: "天才スライム", rank: "G", attribute: "無", hp: 45, power: 12, star: 20, expTable: "A", passive: { name: "ぷるぷる", effect: "30%の確率で相手からのダメージを1/4にする" }, leftMove: moves.glitterMachine },
  { no: 15, name: "ピリビート", rank: "G", attribute: "白", hp: 32, power: 14, star: 17, expTable: "A", passive: { name: "加速", effect: "相手を攻撃する度にゲージを1増やす" }, leftMove: moves.electricShock },
  { no: 16, name: "ナメナメラ", rank: "G", attribute: "黒", hp: 53, power: 13, star: 3, expTable: "A", passive: { name: "ぬめぬめ", effect: "戦闘開始時、相手のスターを1段階下げる" }, leftMove: moves.lick },
  { no: 17, name: "シャド", rank: "F", attribute: "黒", hp: 55, power: 32, star: 13, expTable: "A", passive: { name: "霧隠れ", effect: "回避率25%" }, leftMove: moves.ambush },
  { no: 18, name: "ゴッレム", rank: "F", attribute: "緑", hp: 77, power: 25, star: 5, expTable: "A", passive: { name: "頑丈", effect: "相手からのダメージを10減らす" }, leftMove: moves.charge },
  { no: 19, name: "ピクシィィ", rank: "F", attribute: "青", hp: 65, power: 18, star: 27, expTable: "A", passive: { name: "幸運", effect: "戦闘開始時、ゲージを3増やす" }, leftMove: moves.healingWater },
  { no: 20, name: "ゾンビビッグ", rank: "F", attribute: "黒", hp: 68, power: 29, star: 9, expTable: "A", passive: { name: "アンデッド", effect: "HPが0になる時、30%でHP1で耐える" }, leftMove: moves.poisonBreath },
  { no: 21, name: "スライム兄", rank: "F", attribute: "青", hp: 70, power: 20, star: 18, expTable: "A", passive: { name: "王の威厳", effect: "攻撃時、25%で相手に怯みを付与" }, rightMoves: [{ name: "アタック", attribute: "青", gauge: 0, multiplier: NORMAL_ATTACK_MULTIPLIER, effect: "使用者の属性で0.5倍ダメージ" }], leftMove: moves.slimePress },
  { no: 39, name: "ゴールドピクシィィ", rank: "F", attribute: "青", hp: 65, power: 18, star: 27, expTable: "A", passive: { name: "黄金の幸運", effect: "40%で逃走。倒すと追加経験値1000" }, leftMove: moves.healingWater, escapeChance: 0.4, defeatExperienceBonus: 1000 }
];
Object.assign(monsterSpecies.find((species) => species.no === 17), {
  hp: 55, power: 35, star: 13
});
Object.assign(monsterSpecies.find((species) => species.no === 18), {
  hp: 87, power: 28, star: 5
});
Object.assign(monsterSpecies.find((species) => species.no === 20), {
  hp: 68, power: 30, star: 9
});
monsterSpecies.splice(
  monsterSpecies.findIndex((species) => species.no === 39),
  1
);
monsterSpecies.push(
  { no: 22, name: "ゴールデンオデン", rank: "F", attribute: "赤", hp: 50, power: 32, star: 24, expTable: "A", passive: { name: "アチアチボディ", effect: "攻撃を受けた時、30%の確率で相手を火傷させる" }, leftMove: moves.burn },
  { no: 23, name: "ワラードー", rank: "F", attribute: "青", hp: 60, power: 22, star: 30, expTable: "A", passive: null, leftMove: moves.soak },
  { no: 24, name: "ナックル", rank: "F", attribute: "無", hp: 68, power: 34, star: 27, expTable: "A", passive: null, leftMove: moves.caramelStrike },
  { no: 25, name: "トリ", rank: "F", attribute: "緑", hp: 60, power: 20, star: 20, expTable: "A", passive: null, leftMove: moves.roll },
  { no: 26, name: "ネムリッコ", rank: "F", attribute: "赤", hp: 56, power: 24, star: 36, expTable: "A", passive: null, leftMove: moves.burn },
  { no: 27, name: "ダンゴ", rank: "F", attribute: "緑", hp: 57, power: 24, star: 17, expTable: "A", passive: null, leftMove: moves.roll },
  { no: 28, name: "ゴールドピクシィィ", rank: "F", attribute: "白", hp: 75, power: 23, star: 25, expTable: "A", passive: { name: "黄金の幸運", effect: "40%で逃走。倒すと追加経験値1000" }, leftMove: moves.shine, escapeChance: 0.4, defeatExperienceBonus: 1000 },
  { no: 29, name: "エンエル", rank: "F", attribute: "白", hp: 57, power: 13, star: 30, expTable: "A", passive: null, leftMove: moves.shine },
  { no: 30, name: "ドガゴーン", rank: "F", attribute: "無", hp: 90, power: 32, star: 15, expTable: "A", passive: null, leftMove: moves.caramelStrike },
  { no: 31, name: "アクダルマ", rank: "F", attribute: "黒", hp: 65, power: 30, star: 26, expTable: "A", passive: null, leftMove: moves.gnaw },
  { no: 32, name: "ウィザードさん", rank: "F", attribute: "赤", hp: 25, power: 50, star: 35, expTable: "B", passive: null, leftMove: { name: "火球魔法", attribute: "赤", gauge: 5, multiplier: 1.5, effect: "1.5倍ダメージ+自身のパワーを1段階上げる" } },
  { no: 33, name: "シャドレム", rank: "E", attribute: "黒", hp: 120, power: 40, star: 40, expTable: "A", passive: null, leftMove: moves.ambush },
  { no: 34, name: "パンドラ", rank: "E", attribute: "黒", hp: 120, power: 40, star: 40, expTable: "A", passive: null, leftMove: moves.lick },
  { no: 35, name: "ワラシーナ", rank: "E", attribute: "青", hp: 120, power: 40, star: 40, expTable: "A", passive: null, leftMove: moves.soak },
  { no: 36, name: "スライムキング", rank: "E", attribute: "青", hp: 120, power: 40, star: 40, expTable: "A", passive: null, leftMove: moves.slimePress }
);
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
const CAGE_F_PRICE = 300;
const CAGE_E_PRICE = 700;
const EXP_500_DRINK_PRICE = 200;
const EXP_500_DRINK_AMOUNT = 500;
const EXP_DRINK_PRICE = 2200;
const EXP_DRINK_AMOUNT = 5000;
const EXP_MIST_PRICE = 700;
const EXP_MIST_AMOUNT = 500;
const CATALOG_CHANGE_PRICE = 1000;
const HEART_PLUS_PRICE = 2000;
const MAX_CATALOG_HEARTS = 5;
const CATALOG_HEART_RECOVERY_MS = 30 * 60 * 1000;
const OUTGOING_MATCH_REFRESH_MS = 3 * 60 * 60 * 1000;
const SAVE_VERSION = 9;
const AUTOSAVE_KEY = "monmachi.save.autosave";
const MANUAL_SAVE_PREFIX = "monmachi.save.slot.";
const MANUAL_SAVE_SLOT_COUNT = 5;
const AUTOSAVE_DELAY_MS = 250;
const PAIR_TRAIN_EVOLUTIONS = [
  { baseSpecies: 11, partnerSpecies: 6, resultSpecies: 15 },
  { baseSpecies: 6, partnerSpecies: 11, resultSpecies: 15 },
  { baseSpecies: 9, partnerSpecies: 7, resultSpecies: 21 },
  { baseSpecies: 7, partnerSpecies: 9, resultSpecies: 21 },
  { baseSpecies: 12, partnerSpecies: 10, resultSpecies: 20 },
  { baseSpecies: 19, partnerSpecies: 22, resultSpecies: 28 },
  { baseSpecies: 4, partnerSpecies: 4, resultSpecies: 23 },
  { baseSpecies: 14, partnerSpecies: 28, resultSpecies: 25 },
  { baseSpecies: 28, partnerSpecies: 14, resultSpecies: 25 },
  { baseSpecies: 26, partnerSpecies: 19, resultSpecies: 32 },
  { baseSpecies: 21, partnerSpecies: 21, resultSpecies: 36 },
  { baseSpecies: 18, partnerSpecies: 17, resultSpecies: 33 },
  { baseSpecies: 17, partnerSpecies: 18, resultSpecies: 33 },
  { baseSpecies: 18, partnerSpecies: 16, resultSpecies: 34 },
  { baseSpecies: 16, partnerSpecies: 18, resultSpecies: 34 }
];
const CATALOG_EXCLUDED_SPECIES = new Set(
  PAIR_TRAIN_EVOLUTIONS.map((recipe) => recipe.resultSpecies)
);
const MAX_CATALOG_CANDIDATES = 15;
const UNDISCOVERED_MATCH_RATE_MULTIPLIER = 0.7;
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

function rankIndex(rankName) {
  return monsterRanks.findIndex((rank) => rank.name === rankName);
}

function cageRankName(cageType) {
  return monsterRanks.some((rank) => rank.name === cageType) ? cageType : "G";
}

function cageCanHold(cageType, monster) {
  return rankIndex(monster.rank.name) <= rankIndex(cageRankName(cageType));
}

function cageCount(cageType) {
  if (cageType === "E") return state.cagesE;
  return cageType === "F" ? state.cagesF : state.cages;
}

function hasCompatibleCage(monster) {
  return (state.cages > 0 && cageCanHold("G", monster))
    || (state.cagesF > 0 && cageCanHold("F", monster))
    || (state.cagesE > 0 && cageCanHold("E", monster));
}

function preferredCageType(monster) {
  if (state.cages > 0 && cageCanHold("G", monster)) return "G";
  if (state.cagesF > 0 && cageCanHold("F", monster)) return "F";
  if (state.cagesE > 0 && cageCanHold("E", monster)) return "E";
  return null;
}

function consumeCage(cageType) {
  if (cageType === "E") {
    state.cagesE = Math.max(0, state.cagesE - 1);
  } else if (cageType === "F") {
    state.cagesF = Math.max(0, state.cagesF - 1);
  } else {
    state.cages = Math.max(0, state.cages - 1);
  }
}
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
      { species: [5, 1, 1], level: 4, hpMultiplier: 1 }
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
  geniusShape: {
    number: "06",
    category: "general",
    unlockAfter: "alley",
    name: "天才の形",
    baseExperience: 30,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 20,
    requestTables: [
      { name: "A", baseRate: 70, monsters: [13, 15].map((species) => ({ species, level: 6, weight: 1 })) },
      { name: "B", baseRate: 20, monsters: [{ species: 14, level: 6, weight: 1 }] },
      { name: "C", baseRate: 10, monsters: [{ species: 14, level: 8, talent: 1, weight: 1 }] }
    ],
    enemyIv: { hp: 0, atk: 0, sense: 0 },
    rushes: [
      { species: [13, 13, 13], level: 8, hpMultiplier: 1 },
      { species: [15, 15, 15], level: 8, hpMultiplier: 1 }
    ],
    bosses: [{ species: 14, level: 12, hpMultiplier: 1 }]
  },
  zombieTown: {
    number: "07",
    category: "general",
    unlockAfter: "geniusShape",
    name: "闇のゾンビ街",
    baseExperience: 35,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 15,
    requestTables: [
      { name: "A", baseRate: 65, monsters: [{ species: 12, level: 7, weight: 1 }] },
      { name: "B", baseRate: 30, monsters: [{ species: 12, level: 9, weight: 1 }] },
      { name: "C", baseRate: 5, monsters: [{ species: 20, level: 11, weight: 1 }] }
    ],
    enemyIv: { hp: 2, atk: 0, sense: 0 },
    rushes: [
      { species: [12, 12, 16], level: 10, hpMultiplier: 1 },
      { species: [12, 12, 5], level: 11, hpMultiplier: 1 },
      { species: [12, 12, 17], levels: [11, 11, 13], hpMultiplier: 1 }
    ],
    bosses: [
      { species: 12, level: 11, hpMultiplier: 1 },
      { species: 20, level: 14, hpMultiplier: 1 }
    ]
  },
  persistentHappiness: {
    number: "08",
    category: "general",
    unlockAfter: "zombieTown",
    name: "幸せのしつこさ",
    baseExperience: 40,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 40,
    requestTables: [
      {
        name: "A",
        baseRate: 65,
        monsters: [
          { species: 19, level: 8, weight: 1 },
          { species: 19, level: 9, weight: 1 }
        ]
      },
      { name: "B", baseRate: 30, monsters: [{ species: 19, level: 10, weight: 1 }] },
      { name: "C", baseRate: 5, monsters: [{ species: 28, level: 15, weight: 1 }] }
    ],
    enemyIvRange: { min: 0, max: 1 },
    rushes: [
      { species: [19, 19, 19], level: 13, hpMultiplier: 1 },
      { species: [19, 19, 28], level: 14, hpMultiplier: 1 },
      { species: [19, 19, 28], level: 15, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 19, level: 15, hpMultiplier: 1 },
      { species: 19, level: 15, hpMultiplier: 1 },
      { species: 19, level: 15, hpMultiplier: 1 }
    ]
  },
  endlessFlame: {
    number: "09",
    category: "general",
    unlockAfter: "persistentHappiness",
    name: "延々と炎炎",
    baseExperience: 40,
    specialExperienceMultiplier: 1,
    requestReferenceStar: 35,
    requestTables: [
      {
        name: "A",
        baseRate: 65,
        monsters: [
          { species: 26, level: 9, weight: 1 },
          { species: 13, level: 12, weight: 1 }
        ]
      },
      {
        name: "B",
        baseRate: 30,
        monsters: [
          { species: 26, level: 12, weight: 1 },
          { species: 22, level: 14, weight: 1 }
        ]
      },
      {
        name: "C",
        baseRate: 5,
        monsters: [{ species: 32, level: 15, weight: 1 }]
      }
    ],
    rushes: [
      { species: [7, 13, 13], level: 15, hpMultiplier: 1 },
      { species: [26, 13], level: 15, hpMultiplier: 1 },
      { species: [26, 22, 22], level: 17, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 22, level: 18, hpMultiplier: 1 },
      { species: 22, level: 18, hpMultiplier: 1 },
      { species: 32, level: 20, hpMultiplier: 1 }
    ]
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
      { species: [16, 16, 16], level: 8, hpMultiplier: 1 },
      { species: [5, 5, 5], level: 10, hpMultiplier: 1 }
    ],
    bosses: [{ species: 17, level: 15, hpMultiplier: 1 }]
  },
  trial5: {
    number: "Lv5",
    category: "trial",
    requiredPlayerLevel: 4,
    name: "昇格戦 Lv5",
    baseExperience: 30,
    rewardPlayerLevel: 5,
    rushes: [
      { species: [8, 8, 2], level: 10, hpMultiplier: 1 },
      { species: [8, 2, 2], level: 10, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 8, level: 15, hpMultiplier: 1 },
      { species: 2, level: 15, hpMultiplier: 1 },
      { species: 18, level: 18, hpMultiplier: 1 }
    ]
  },
  trial6: {
    number: "Lv6",
    category: "trial",
    requiredPlayerLevel: 5,
    name: "昇格戦 Lv6",
    baseExperience: 35,
    rewardPlayerLevel: 6,
    rushes: [
      { species: [26, 26, 26], level: 15, hpMultiplier: 1 },
      { species: [31, 31, 31], level: 16, hpMultiplier: 1 },
      { species: [29, 19, 29], level: 18, hpMultiplier: 1 }
    ],
    bosses: [
      { species: 30, level: 22, hpMultiplier: 1, switchAtLowHp: true },
      { species: 19, level: 19, hpMultiplier: 1 },
      { species: 32, level: 20, hpMultiplier: 1 }
    ]
  },
  challengerTakashi: {
    number: "SP1",
    category: "special",
    requiredPlayerLevel: 5,
    name: "モンスター使いタカシ",
    baseExperience: 40,
    rushes: [],
    bosses: [
      { species: 21, level: 16, hpMultiplier: 1 },
      { species: 27, level: 19, hpMultiplier: 1 },
      { species: 25, level: 24, hpMultiplier: 1 }
    ]
  },
  monsterMasterMinato: {
    number: "SP2",
    category: "special",
    requiredPlayerLevel: 5,
    name: "モンスターマスター ミナト",
    baseExperience: 60,
    rushes: [],
    bosses: [
      { species: 18, level: 26, hpMultiplier: 1 },
      { species: 14, level: 30, hpMultiplier: 1 },
      { species: 13, level: 32, hpMultiplier: 1 }
    ]
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
  "緑": { strong: ["青", "白"], weak: ["赤", "黒"] },
  "青": { strong: ["赤", "白"], weak: ["緑", "黒"] },
  "白": { strong: ["黒", "無"], weak: ["赤", "緑", "青"] },
  "黒": { strong: ["赤", "緑", "青"], weak: ["白"] },
  "無": { strong: [], weak: ["白"] }
};

const state = {
  playerLevel: 1,
  playerName: "プレイヤー",
  gold: 320,
  cages: 1,
  cagesF: 0,
  cagesE: 0,
  exp500Drinks: 0,
  expDrinks: 0,
  expMists: 0,
  catalogChanges: 0,
  catalogHearts: MAX_CATALOG_HEARTS,
  catalogHeartUpdatedAt: Date.now(),
  friends: [],
  friendSequence: 0,
  collectionSort: "newest",
  collectionAttributeFilter: "all",
  partyPickerSort: "newest",
  partyPickerAttributeFilter: "all",
  profilePickerSort: "newest",
  profilePickerAttributeFilter: "all",
  pairPickerSort: "newest",
  pairPickerAttributeFilter: "all",
  expDrinkSort: "newest",
  expDrinkAttributeFilter: "all",
  pairBaseId: null,
  pairPartnerId: null,
  pairPickerMode: "base",
  pendingPairMonsterId: null,
  pendingPairResult: null,
  pairTrainingTimers: [],
  outgoingCandidates: [],
  outgoingGeneratedAt: 0,
  outgoingTimer: null,
  pendingOutgoingMonsterId: null,
  selectedOutgoingCageType: null,
  catalogMatchAnimating: false,
  discoveredSpecies: new Set([1, 2, 3, 4, 5, 6]),
  ownedSpecies: new Set(),
  newCodexSpecies: new Set(),
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
  selectedLeftMoveIndex: 0,
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
  pendingRecruitCageType: null,
  matchAnimationActive: false,
  matchAnimationTimers: [],
  experienceContinue: null,
  detailMode: "view",
  detailMonsterId: null,
  detailMonsterRef: null,
  activeExpDrinkAmount: EXP_DRINK_AMOUNT,
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
    "partyView", "codexView", "battleView", "matchView",
    "tutorialSkipButton", "tutorialOverlay", "tutorialText", "tutorialContinueButton",
    "testClearButton", "openBattleStatus", "battleStatusDialog",
    "closeBattleStatus", "battleStatusContent",
    "benchActionDialog", "benchActionName", "benchActionMonster",
    "closeBenchAction", "benchDetailButton", "benchSwitchButton",
    "monsterHomePanel", "dungeonHomePanel", "trainingHomePanel", "matchHomePanel", "shopHomePanel",
    "pairBaseSlot", "pairPartnerSlot", "pairTrainingPreview", "pairTrainingStart",
    "pairPickerDialog", "pairPickerTitle", "pairPickerCopy", "pairPickerRoster", "closePairPicker",
    "pairPickerSort", "pairPickerAttributeFilter",
    "pairActionDialog", "pairActionName", "pairActionMonster", "pairActionReason",
    "closePairAction", "pairActionDetailButton", "pairActionSelectButton",
    "pairEvolutionDialog", "pairEvolutionTitle", "pairEvolutionTarget",
    "declinePairEvolution", "acceptPairEvolution",
    "pairTrainingOverlay", "pairTrainingBaseMonster", "pairTrainingPartnerMonster",
    "pairTrainingStageLabel", "pairResultDialog", "pairResultMonster",
    "pairResultStats", "pairResultGoodbye", "closePairResult",
    "dungeonCategoryTabs", "generalDungeonList", "trialDungeonList", "specialDungeonList",
    "monsterTabButton", "dungeonTabButton", "trainingTabButton", "matchTabButton", "shopTabButton",
    "shopGold", "shopCageCount", "buyCageButton", "shopCageFItem", "shopCageFCount", "buyCageFButton",
    "shopCageEItem", "shopCageECount", "buyCageEButton",
    "shopFeedback",
    "shopExpDrinkItem", "shopExp500DrinkCount", "buyExp500DrinkButton", "useExp500DrinkButton",
    "shopExp3000DrinkItem", "shopExpDrinkCount", "buyExpDrinkButton", "useExpDrinkButton",
    "shopExpMistItem", "shopExpMistCount", "buyExpMistButton", "useExpMistButton",
    "shopCatalogChangeItem", "shopCatalogChangeCount", "buyCatalogChangeButton", "useCatalogChangeButton",
    "shopHeartPlusItem", "buyHeartPlusButton",
    "expDrinkDialog", "closeExpDrinkDialog", "expDrinkRoster",
    "expDrinkDialogCopy", "expDrinkDialogStatus", "expDrinkFeedback",
    "expDrinkSort", "expDrinkAttributeFilter",
    "collectionCount", "collectionGrid", "collectionSort", "collectionAttributeFilter",
    "openPartyEditorButton", "openCodexButton", "closeCodexButton",
    "codexCompleteRate", "codexRankBars", "codexGrid",
    "codexDetailDialog", "closeCodexDetail", "codexDetailName", "codexDetailBody",
    "partyDialog", "closePartyDialog", "selectedDungeonName",
    "dungeonBossSummary", "dungeonBossList", "openDungeonDetails",
    "dungeonDetailDialog", "closeDungeonDetails", "dungeonDetailName",
    "dungeonDetailMeta", "dungeonDetailBattles",
    "presetTabs", "partyTotalSp", "partyPickerDialog", "closePartyPicker", "pickerTitle",
    "partyPickerSort", "partyPickerAttributeFilter",
    "partyCount", "partySlots", "requestInbox", "requestInboxTitle", "requestInboxCopy",
    "inboxCount", "requestTabBadge", "playerLevel", "matchMenuHeading", "matchMenuCaption",
    "matchMenuList", "openProfileButton", "matchProfileName",
    "outgoingMatchButton", "outgoingCountLabel", "outgoingUnlockCopy", "outgoingMatchView",
    "closeOutgoingMatch", "refreshOutgoingMatch", "outgoingRefreshTimer",
    "catalogHeartDisplay", "catalogHeartTimer",
    "outgoingPlayerName", "unlockedRankLabel", "matchProfileMonsters", "outgoingMatchFeedback",
    "outgoingMonsterList",
    "profileDialog", "closeProfileDialog", "playerNameInput", "profileEditorSlots",
    "saveProfileButton", "profilePickerDialog", "profilePickerTitle",
    "closeProfilePicker", "profilePickerRoster",
    "profilePickerSort", "profilePickerAttributeFilter",
    "cageSelectDialog", "closeCageSelect", "standardCageChoice", "fCageChoice", "eCageChoice",
    "outgoingCageCount", "outgoingCageFCount", "outgoingCageECount", "confirmOutgoingApplication",
    "catalogMatchOverlay", "catalogMatchMonster", "catalogMatchStageTitle", "catalogMatchStageCopy",
    "roster", "diveButton", "battleKind", "battleTitle",
    "battleSpeedButton", "battleSpeedValue",
    "battleDots", "rushBattleArea", "rushEnemyHpList", "rushAllyHpList",
    "rushBattleLog", "bossBattleArea", "manualBattleField",
    "enemyName", "enemyHp", "enemyHpValue", "enemyGauge", "enemyGaugeValue",
    "enemyMonster", "enemyStatusIcons", "allyName", "allyHp", "allyHpValue", "allyGauge", "allyGaugeValue",
    "allyStatusIcons",
    "allyMonster", "leftMoveCallout", "rightMoveCallout",
    "leftMoveButton", "rightMoveButton", "leftMoveGuide", "rightMoveGuide",
    "leftMoveTooltip", "rightMoveTooltip",
    "bench", "replacementPrompt", "battleLog", "bossEffectText",
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
    "openPairHistory", "pairHistoryDialog", "closePairHistory",
    "pairHistoryTitle", "pairHistoryCaption", "pairHistoryViewport",
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
    * Math.pow(Math.max(1, talent), GROWTH_CONFIG.talentExponent);
}

function calculateMonsterStats(monster) {
  const talent = Math.max(1, Number(monster.talent) || 1);
  const growth = 1 + ((monster.level - 1) / GROWTH_CONFIG.levelDivisor)
    * talentMultiplier(talent);
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
  monster.talent = Math.max(1, Number(monster.talent) || 1);
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

function speciesBaseStats(speciesNo, rankName = null) {
  const species = monsterSpecies.find((candidate) => candidate.no === speciesNo);
  if (!species) return { hp: 1, power: 1, star: 1 };
  const speciesRank = monsterRanks.find((candidate) => candidate.name === species.rank)
    ?? monsterRanks[0];
  const rank = monsterRanks.find((candidate) => candidate.name === rankName)
    ?? speciesRank;
  return {
    hp: species.hp * (rank.hp / speciesRank.hp),
    power: species.power * (rank.power / speciesRank.power),
    star: species.star * (rank.star / speciesRank.star)
  };
}

function calculateTrainingBonus(parentA, parentB) {
  return {
    hp: Math.ceil((parentA.hp + parentB.hp) / 4),
    power: Math.ceil((parentA.power + parentB.power) / 4),
    star: Math.ceil((parentA.star + parentB.star) / 4)
  };
}

function combinedTalent(parentA, parentB) {
  return Math.max(1, Number(parentA.talent) || 1)
    + Math.max(1, Number(parentB.talent) || 1);
}

function clonePairLineage(lineage) {
  if (!lineage) return null;
  return JSON.parse(JSON.stringify(lineage));
}

function pairLineageIdentity(monster) {
  return {
    speciesNo: monster.speciesNo,
    name: monster.name,
    level: monster.level,
    rankName: monster.rank?.name ?? monster.rankName ?? "G",
    attribute: monster.attr?.name ?? "",
    sp: monster.sp,
    hp: monster.hp,
    power: monster.power,
    star: monster.star,
    talent: Math.max(1, Number(monster.talent) || 1),
    iv: { ...monster.iv },
    bodyRadius: monster.bodyRadius,
    color: monster.attr?.monster ?? "#76c6a7",
    background: monster.attr?.bg ?? "#e7f4ef"
  };
}

function pairLineageNode(monster) {
  return {
    monster: pairLineageIdentity(monster),
    pairing: clonePairLineage(monster.pairLineage)
  };
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
  ) + Math.max(0, Number(enemyMonster.defeatExperienceBonus) || 0));
}

function calculatePartyExperience(defeatedEnemies) {
  const defeated = defeatedEnemies.filter((enemy) => !enemy.escaped);
  const partyIds = new Set(state.allies.map((fighter) => fighter.id));
  return new Map(state.friends.map((monster) => {
    const amount = defeated.reduce(
      (total, enemy) => total + calculateDefeatExperience(enemy.monster, monster),
      0
    );
    return [monster.id, partyIds.has(monster.id) ? amount : Math.round(amount / 2)];
  }));
}

function calculateBattleGold(defeatedEnemies) {
  return defeatedEnemies.filter((enemy) => !enemy.escaped).reduce(
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
  const allyById = new Map(state.allies.map((fighter) => [fighter.id, fighter]));
  const allRewards = state.friends.map((monster) => {
    const amount = experienceAwards.get(monster.id) ?? 0;
    const reward = grantExperience(monster, amount);
    const fighter = allyById.get(monster.id);
    if (fighter) syncFighterAfterGrowth(fighter);
    return { ...reward, amount, party: Boolean(fighter) };
  });
  const rewards = allRewards.filter((reward) => reward.party);
  const reserveRewards = allRewards.filter((reward) => !reward.party && reward.amount > 0);

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
    multiplier: NORMAL_ATTACK_MULTIPLIER,
    effect: "使用者の属性で0.5倍ダメージ"
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
  const ivRange = options.ivRange;
  const randomIv = () => ivRange
    ? randomInt(ivRange.min ?? 0, ivRange.max ?? 5)
    : randomInt(0, 5);
  const iv = options.iv
    ? {
        hp: options.iv.hp ?? randomIv(),
        atk: options.iv.atk ?? randomIv(),
        sense: options.iv.sense ?? randomIv()
      }
    : {
        hp: fixedIv ?? randomIv(),
        atk: fixedIv ?? randomIv(),
        sense: fixedIv ?? randomIv()
      };
  const rightMoveCandidates = species.rightMoves ?? [normalAttack(species.attribute)];
  const leftMoveCandidates = species.leftMoves ?? [species.leftMove].filter(Boolean);
  const passiveCandidates = species.passives ?? [species.passive].filter(Boolean);
  const rightMove = pick(rightMoveCandidates);
  const selectedLeftMoves = randomSample(leftMoveCandidates, 2);
  const leftMove = selectedLeftMoves[0];
  const selectedPassive = passiveCandidates.length ? pick(passiveCandidates) : null;
  const trainingBonusOption = options.trainingBonus ?? 0;
  const trainingBonus = typeof trainingBonusOption === "number"
    ? {
        hp: trainingBonusOption,
        power: trainingBonusOption,
        star: trainingBonusOption
      }
    : {
        hp: Number(trainingBonusOption.hp) || 0,
        power: Number(trainingBonusOption.power) || 0,
        star: Number(trainingBonusOption.star) || 0
      };
  const monster = applyCalculatedStats({
    id: crypto.randomUUID(),
    speciesNo: species.no,
    name: species.name,
    attr,
    rank,
    expTable: species.expTable,
    experience: 0,
    level,
    talent: Math.max(1, Number(options.talent) || 1),
    baseStats: {
      hp: species.hp * rankScale.hp,
      power: species.power * rankScale.power,
      star: species.star * rankScale.star
    },
    trainingBonus,
    pairLineage: null,
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
    escapeChance: species.escapeChance ?? 0,
    defeatExperienceBonus: species.defeatExperienceBonus ?? 0,
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
    talent: Math.max(1, Number(savedMonster.talent) || 1),
    baseStats: savedMonster.baseStats ?? {
      hp: species.hp,
      power: species.power,
      star: species.star
    },
    trainingBonus: savedMonster.trainingBonus ?? { hp: 0, power: 0, star: 0 },
    pairLineage: savedMonster.pairLineage ?? null,
    iv: savedMonster.iv ?? { hp: 0, atk: 0, sense: 0 },
    escapeChance: savedMonster.escapeChance ?? species.escapeChance ?? 0,
    defeatExperienceBonus: savedMonster.defeatExperienceBonus
      ?? species.defeatExperienceBonus
      ?? 0,
    leftMoves: savedMonster.leftMoves?.length
      ? savedMonster.leftMoves
      : [fallbackLeftMove].filter(Boolean),
    bodyRadius: savedMonster.bodyRadius || "50%",
    hornTilt: savedMonster.hornTilt || "0deg",
    hornTop: savedMonster.hornTop || "16px"
  };
  const primaryLeftMove = monster.leftMoves[0] ?? fallbackLeftMove;
  if (monster.rightMove === "アタック") {
    monster.rightMoveMultiplier = NORMAL_ATTACK_MULTIPLIER;
    monster.rightMoveGauge = 0;
    monster.rightMoveEffect = "使用者の属性で0.5倍ダメージ";
  }
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
    cagesF: state.cagesF,
    cagesE: state.cagesE,
    exp500Drinks: state.exp500Drinks,
    expDrinks: state.expDrinks,
    expMists: state.expMists,
    catalogChanges: state.catalogChanges,
    catalogHearts: state.catalogHearts,
    catalogHeartUpdatedAt: state.catalogHeartUpdatedAt,
    friends: state.friends.map(serializeMonster),
    friendSequence: state.friendSequence,
    collectionSort: state.collectionSort,
    collectionAttributeFilter: state.collectionAttributeFilter,
    partyPickerSort: state.partyPickerSort,
    partyPickerAttributeFilter: state.partyPickerAttributeFilter,
    profilePickerSort: state.profilePickerSort,
    profilePickerAttributeFilter: state.profilePickerAttributeFilter,
    pairPickerSort: state.pairPickerSort,
    pairPickerAttributeFilter: state.pairPickerAttributeFilter,
    expDrinkSort: state.expDrinkSort,
    expDrinkAttributeFilter: state.expDrinkAttributeFilter,
    outgoingCandidates: state.outgoingCandidates.map(serializeMonster),
    outgoingGeneratedAt: state.outgoingGeneratedAt,
    discoveredSpecies: [...state.discoveredSpecies],
    ownedSpecies: [...state.ownedSpecies],
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
  if (migrated.saveVersion < 2) {
    migrated.cagesF = 0;
  }
  if (migrated.saveVersion < 3) {
    const remapLegacySpecies = (monster) => {
      if (!monster) return monster;
      if (monster.speciesNo === 13 && monster.name === "ナメナメラ") {
        return { ...monster, speciesNo: 16 };
      }
      if (monster.speciesNo === 14 && monster.name === "シャド") {
        return { ...monster, speciesNo: 17 };
      }
      return monster;
    };
    migrated.friends = (migrated.friends ?? []).map(remapLegacySpecies);
    migrated.outgoingCandidates = (migrated.outgoingCandidates ?? []).map(remapLegacySpecies);
    migrated.requests = (migrated.requests ?? []).map(remapLegacySpecies);
  }
  if (migrated.saveVersion < 4) {
    const remapGoldPixie = (monster) => (
      monster?.speciesNo === 39
        ? { ...monster, speciesNo: 28, name: "ゴールドピクシィィ" }
        : monster
    );
    migrated.friends = (migrated.friends ?? []).map(remapGoldPixie);
    migrated.outgoingCandidates = (migrated.outgoingCandidates ?? []).map(remapGoldPixie);
    migrated.requests = (migrated.requests ?? []).map(remapGoldPixie);
    migrated.discoveredSpecies = (migrated.discoveredSpecies ?? []).map((speciesNo) => (
      speciesNo === 39 ? 28 : speciesNo
    ));
  }
  if (migrated.saveVersion < 5) {
    migrated.expMists = 0;
    migrated.catalogChanges = 0;
    migrated.catalogHearts = MAX_CATALOG_HEARTS;
    migrated.catalogHeartUpdatedAt = Date.now();
  }
  if (migrated.saveVersion < 6) {
    const addEmptyLineage = (monster) => (
      monster ? { ...monster, pairLineage: monster.pairLineage ?? null } : monster
    );
    migrated.friends = (migrated.friends ?? []).map(addEmptyLineage);
    migrated.outgoingCandidates = (migrated.outgoingCandidates ?? []).map(addEmptyLineage);
    migrated.requests = (migrated.requests ?? []).map(addEmptyLineage);
  }
  if (migrated.saveVersion < 7) {
    migrated.exp500Drinks = 0;
  }
  if (migrated.saveVersion < 8) {
    migrated.cagesE = 0;
  }
  if (migrated.saveVersion < 9) {
    migrated.ownedSpecies = (migrated.friends ?? [])
      .map((monster) => monster?.speciesNo)
      .filter(Boolean);
  }
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
  state.cagesF = Math.max(0, Number(saved.cagesF) || 0);
  state.cagesE = Math.max(0, Number(saved.cagesE) || 0);
  state.exp500Drinks = Math.max(0, Number(saved.exp500Drinks) || 0);
  state.expDrinks = Math.max(0, Number(saved.expDrinks) || 0);
  state.expMists = Math.max(0, Number(saved.expMists) || 0);
  state.catalogChanges = Math.max(0, Number(saved.catalogChanges) || 0);
  state.catalogHearts = Math.max(
    0,
    Math.min(MAX_CATALOG_HEARTS, Number(saved.catalogHearts) || 0)
  );
  state.catalogHeartUpdatedAt = Number(saved.catalogHeartUpdatedAt) || Date.now();
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
  state.profilePickerSort = saved.profilePickerSort || "newest";
  state.profilePickerAttributeFilter = saved.profilePickerAttributeFilter || "all";
  state.pairPickerSort = saved.pairPickerSort || "newest";
  state.pairPickerAttributeFilter = saved.pairPickerAttributeFilter || "all";
  state.expDrinkSort = saved.expDrinkSort || "newest";
  state.expDrinkAttributeFilter = saved.expDrinkAttributeFilter || "all";
  state.outgoingCandidates = (saved.outgoingCandidates ?? []).map(hydrateMonster).filter(Boolean);
  state.outgoingGeneratedAt = Number(saved.outgoingGeneratedAt) || 0;
  state.discoveredSpecies = new Set(saved.discoveredSpecies ?? friends.map((monster) => monster.speciesNo));
  state.ownedSpecies = new Set([
    ...(saved.ownedSpecies ?? []),
    ...friends.map((monster) => monster.speciesNo)
  ]);
  state.newCodexSpecies = new Set();
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
  if (state.homeTab === "training" && state.playerLevel < 5) {
    state.homeTab = "monsters";
  }
  state.dungeonCategory = ["general", "trial", "special"].includes(saved.dungeonCategory)
    ? saved.dungeonCategory
    : "general";
  if (state.dungeonCategory === "special" && state.playerLevel < 5) {
    state.dungeonCategory = "general";
  }
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
  els.profilePickerSort.value = state.profilePickerSort;
  els.profilePickerAttributeFilter.value = state.profilePickerAttributeFilter;
  els.pairPickerSort.value = state.pairPickerSort;
  els.pairPickerAttributeFilter.value = state.pairPickerAttributeFilter;
  els.expDrinkSort.value = state.expDrinkSort;
  els.expDrinkAttributeFilter.value = state.expDrinkAttributeFilter;
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
  const firstOwned = !state.ownedSpecies.has(monster.speciesNo);
  state.friendSequence += 1;
  monster.acquiredOrder = state.friendSequence;
  state.friends.push(monster);
  state.discoveredSpecies.add(monster.speciesNo);
  state.ownedSpecies.add(monster.speciesNo);
  if (firstOwned) state.newCodexSpecies.add(monster.speciesNo);
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
  state.cagesF = 0;
  state.cagesE = 0;
  state.exp500Drinks = 0;
  state.expDrinks = 0;
  state.expMists = 0;
  state.catalogChanges = 0;
  state.catalogHearts = MAX_CATALOG_HEARTS;
  state.catalogHeartUpdatedAt = Date.now();
  state.friends = [];
  state.friendSequence = 0;
  state.discoveredSpecies = new Set([1, 2, 3, 4, 5, 6]);
  state.ownedSpecies = new Set();
  state.newCodexSpecies = new Set();
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
  state.cagesF = 0;
  state.cagesE = 0;
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
  state.cagesF = 0;
  state.cagesE = 0;
  state.friends = prince ? [prince] : [];
  state.friendSequence = prince ? 1 : 0;
  state.discoveredSpecies = new Set([1, 2, 3, 4, 5, 6]);
  state.ownedSpecies = new Set(prince ? [prince.speciesNo] : []);
  state.newCodexSpecies = new Set();
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
      state.tutorialStage = "dungeonSelect";
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
  state.cagesF = 0;
  state.cagesE = 0;
  state.exp500Drinks = 0;
  state.expDrinks = 0;
  state.expMists = 0;
  state.catalogChanges = 0;
  state.catalogHearts = MAX_CATALOG_HEARTS;
  state.catalogHeartUpdatedAt = Date.now();
  state.friends = [];
  state.friendSequence = 0;
  state.discoveredSpecies = new Set();
  state.ownedSpecies = new Set();
  state.newCodexSpecies = new Set();
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
  recoverCatalogHearts();
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
    ? `${Math.min(MAX_CATALOG_CANDIDATES, 3 + state.playerLevel)}体`
    : "Lv3";
  const trainingUnlocked = state.playerLevel >= 5;
  els.trainingTabButton.classList.toggle("locked", !trainingUnlocked);
  els.trainingTabButton.querySelector(".tab-lock-label").hidden = trainingUnlocked;
  els.friends.textContent = state.friends.length;
  els.gold.textContent = state.gold;
  els.shopGold.textContent = state.gold;
  els.shopCageCount.textContent = state.cages;
  els.shopCageFCount.textContent = state.cagesF;
  els.shopCageECount.textContent = state.cagesE;
  els.outgoingCageCount.textContent = state.cages;
  els.outgoingCageFCount.textContent = state.cagesF;
  els.outgoingCageECount.textContent = state.cagesE;
  els.shopExp500DrinkCount.textContent = state.exp500Drinks;
  els.shopExpDrinkCount.textContent = state.expDrinks;
  els.shopExpMistCount.textContent = state.expMists;
  els.shopCatalogChangeCount.textContent = state.catalogChanges;
  els.matchCageCount.textContent = `G ${state.cages} / F ${state.cagesF} / E ${state.cagesE}`;
  els.buyCageButton.disabled = state.gold < CAGE_PRICE;
  const cageFUnlocked = state.playerLevel >= 3;
  const cageEUnlocked = state.playerLevel >= 5;
  const mistUnlocked = state.playerLevel >= 4;
  const drinkUnlocked = state.playerLevel >= 6;
  const catalogItemsUnlocked = state.playerLevel >= 7;
  setShopItemLock(els.shopCageFItem, cageFUnlocked, 3);
  setShopItemLock(els.shopCageEItem, cageEUnlocked, 5);
  setShopItemLock(els.shopExpMistItem, mistUnlocked, 4);
  setShopItemLock(els.shopExp3000DrinkItem, drinkUnlocked, 6);
  setShopItemLock(els.shopCatalogChangeItem, catalogItemsUnlocked, 7);
  setShopItemLock(els.shopHeartPlusItem, catalogItemsUnlocked, 7);
  els.buyCageFButton.disabled = !cageFUnlocked || state.gold < CAGE_F_PRICE;
  els.buyCageEButton.disabled = !cageEUnlocked || state.gold < CAGE_E_PRICE;
  els.buyExp500DrinkButton.disabled = state.gold < EXP_500_DRINK_PRICE;
  els.buyExpDrinkButton.disabled = !drinkUnlocked || state.gold < EXP_DRINK_PRICE;
  els.buyExpMistButton.disabled = !mistUnlocked || state.gold < EXP_MIST_PRICE;
  els.useExp500DrinkButton.disabled = state.exp500Drinks <= 0 || state.friends.length === 0;
  els.useExpDrinkButton.disabled = state.expDrinks <= 0 || state.friends.length === 0;
  els.useExpMistButton.disabled = state.expMists <= 0 || state.friends.length === 0;
  els.buyCatalogChangeButton.disabled = !catalogItemsUnlocked || state.gold < CATALOG_CHANGE_PRICE;
  els.useCatalogChangeButton.disabled = !catalogItemsUnlocked || state.catalogChanges <= 0;
  els.buyHeartPlusButton.disabled = !catalogItemsUnlocked || state.gold < HEART_PLUS_PRICE
    || state.catalogHearts >= MAX_CATALOG_HEARTS;
  updateCatalogHeartDisplay();
  const requestMonster = state.requests[state.requestIndex];
  const canRecruitCurrent = requestMonster ? hasCompatibleCage(requestMonster) : false;
  els.keepButton.disabled = !canRecruitCurrent;
  els.skipButton.disabled = state.tutorialStage === "prince";
  els.rejectAllRequestsButton.disabled = isTutorialActive();
  els.exitRequestsButton.disabled = isTutorialActive();
  els.matchCageStatus.classList.toggle("empty", !canRecruitCurrent);
  els.matchCageLabel.textContent = canRecruitCurrent
    ? "ケージ"
    : "使えるケージがありません";
  els.matchCageCount.hidden = !canRecruitCurrent;
  updateRequestInbox();
  scheduleAutosave();
}

function setShopItemLock(item, unlocked, level) {
  if (!item) return;
  item.classList.toggle("locked", !unlocked);
  item.dataset.unlockLabel = unlocked ? "" : `PL${level}で解放`;
}

function recoverCatalogHearts(now = Date.now()) {
  if (state.catalogHearts >= MAX_CATALOG_HEARTS) {
    state.catalogHearts = MAX_CATALOG_HEARTS;
    state.catalogHeartUpdatedAt = now;
    return;
  }
  const elapsed = Math.max(0, now - state.catalogHeartUpdatedAt);
  const recovered = Math.floor(elapsed / CATALOG_HEART_RECOVERY_MS);
  if (recovered <= 0) return;
  state.catalogHearts = Math.min(MAX_CATALOG_HEARTS, state.catalogHearts + recovered);
  state.catalogHeartUpdatedAt += recovered * CATALOG_HEART_RECOVERY_MS;
  if (state.catalogHearts >= MAX_CATALOG_HEARTS) state.catalogHeartUpdatedAt = now;
}

function updateCatalogHeartDisplay() {
  if (!els.catalogHeartDisplay) return;
  recoverCatalogHearts();
  els.catalogHeartDisplay.textContent = `${"♥".repeat(state.catalogHearts)}${"♡".repeat(MAX_CATALOG_HEARTS - state.catalogHearts)}`;
  if (state.catalogHearts >= MAX_CATALOG_HEARTS) {
    els.catalogHeartTimer.textContent = "MAX";
    return;
  }
  const remaining = Math.max(
    0,
    CATALOG_HEART_RECOVERY_MS - (Date.now() - state.catalogHeartUpdatedAt)
  );
  const totalSeconds = Math.ceil(remaining / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  els.catalogHeartTimer.textContent = `次まで ${minutes}:${seconds}`;
}

function consumeCatalogHeart() {
  recoverCatalogHearts();
  if (state.catalogHearts <= 0) return false;
  if (state.catalogHearts >= MAX_CATALOG_HEARTS) {
    state.catalogHeartUpdatedAt = Date.now();
  }
  state.catalogHearts -= 1;
  updateCatalogHeartDisplay();
  return true;
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
  const discoveredMultiplier = state.discoveredSpecies.has(monster.speciesNo)
    ? 1
    : UNDISCOVERED_MATCH_RATE_MULTIPLIER;
  return Math.min(
    100,
    Math.max(1, 40 * (averageStar / opponentAverageStat) * discoveredMultiplier)
  );
}

function outgoingDifficulty(rate) {
  if (rate >= 75) return 1;
  if (rate >= 55) return 2;
  if (rate >= 35) return 3;
  if (rate >= 15) return 4;
  return 5;
}

function outgoingSpeciesPool() {
  const unlockedRankNames = new Set(unlockedRanksForPlayer().map((rank) => rank.name));
  const unlockedSpecies = monsterSpecies.filter((species) => (
    unlockedRankNames.has(species.rank)
      && species.catalogMatch !== false
      && !CATALOG_EXCLUDED_SPECIES.has(species.no)
  ));
  const discovered = unlockedSpecies.filter((species) => state.discoveredSpecies.has(species.no));
  if (Math.random() < 0.12 || discovered.length === 0) return unlockedSpecies;
  return discovered;
}

function outgoingLevelRange(playerLevel = state.playerLevel) {
  const minimum = Math.max(1, 2 * playerLevel - 3);
  return {
    minimum,
    maximum: minimum + 5
  };
}

function generateOutgoingCandidates() {
  const count = Math.min(MAX_CATALOG_CANDIDATES, 3 + state.playerLevel);
  const levelRange = outgoingLevelRange();
  const usedSpecies = new Set();
  state.outgoingCandidates = Array.from({ length: count }, () => {
    let pool = outgoingSpeciesPool().filter((species) => !usedSpecies.has(species.no));
    if (pool.length === 0) {
      usedSpecies.clear();
      pool = outgoingSpeciesPool();
    }
    const species = pick(pool);
    usedSpecies.add(species.no);
    const level = randomInt(levelRange.minimum, levelRange.maximum);
    return createMonster(0, species.no, level);
  });
  state.outgoingGeneratedAt = Date.now();
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
  const undiscovered = !state.discoveredSpecies.has(monster.speciesNo);
  const profileReady = profileMonsters().length === 3;
  const canApply = profileReady
    && state.catalogHearts > 0
    && !state.catalogMatchAnimating
    && hasCompatibleCage(monster);
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
          <i class="inline-rank" style="${rankStyle(monster.rank)}">${monster.rank.name}</i>
          ${undiscovered ? '<i class="catalog-undiscovered">未発見</i>' : ""}
        </div>
        <span class="sp-chip">SP ${monster.sp}</span>
      </div>
      <button class="outgoing-apply-button" data-outgoing-id="${monster.id}" type="button"
        ${canApply ? "" : "disabled"}>
        <span>マッチ申請</span>
        <strong>${Math.round(rate)}%</strong>
      </button>
    </article>`;
}

function renderOutgoingMatch() {
  recoverCatalogHearts();
  renderMatchProfile();
  els.outgoingMonsterList.innerHTML = state.outgoingCandidates
    .map(outgoingCandidateMarkup)
    .join("");
  if (profileMonsters().length !== 3) {
    els.outgoingMatchFeedback.textContent = "プロフィールに3体設定するとマッチ申請できます。";
    els.outgoingMatchFeedback.className = "outgoing-match-feedback warning";
    els.outgoingMatchFeedback.hidden = false;
  } else if (
    !state.outgoingCandidates.some((monster) => hasCompatibleCage(monster))
  ) {
    els.outgoingMatchFeedback.textContent = "表示中のモンスターに使えるケージがありません。";
    els.outgoingMatchFeedback.className = "outgoing-match-feedback warning";
    els.outgoingMatchFeedback.hidden = false;
  } else if (state.catalogHearts <= 0) {
    els.outgoingMatchFeedback.textContent = "申請ハートがありません。30分で1つ回復します。";
    els.outgoingMatchFeedback.className = "outgoing-match-feedback warning";
    els.outgoingMatchFeedback.hidden = false;
  }
  updateCatalogHeartDisplay();
  updateOutgoingRefreshTimer();
}

function updateOutgoingRefreshTimer() {
  updateCatalogHeartDisplay();
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
  recoverCatalogHearts();
  if (
    state.catalogMatchAnimating
    || state.catalogHearts <= 0
    || profileMonsters().length !== 3
  ) return;
  const monster = state.outgoingCandidates.find((candidate) => candidate.id === monsterId);
  if (!monster || !hasCompatibleCage(monster)) return;
  state.pendingOutgoingMonsterId = monsterId;
  state.selectedOutgoingCageType = preferredCageType(monster);
  ["G", "F", "E"].forEach((type) => {
    const choice = type === "G"
      ? els.standardCageChoice
      : type === "F"
        ? els.fCageChoice
        : els.eCageChoice;
    const available = cageCount(type) > 0 && cageCanHold(type, monster);
    const rate = Math.min(100, outgoingMatchRate(monster) * cageSuccessMultiplier(type, monster));
    choice.disabled = !available;
    choice.classList.toggle("selected", type === state.selectedOutgoingCageType);
    choice.querySelector("small").textContent = available
      ? `${type}ランク以下に使用可能 / 成功率 ${Math.round(rate)}%`
      : `${type}ランク以下に使用可能`;
  });
  updateOutgoingCageConfirmation(monster);
  els.cageSelectDialog.showModal();
}

function cageSuccessMultiplier(cageType, monster) {
  const cageRank = rankIndex(cageRankName(cageType));
  const monsterRank = rankIndex(monster.rank.name);
  if (cageRank < 0 || monsterRank < 0 || cageRank < monsterRank) return 0;
  return 1 + (cageRank - monsterRank) * 0.4;
}

function updateOutgoingCageConfirmation(monster) {
  const cageType = state.selectedOutgoingCageType;
  els.confirmOutgoingApplication.disabled = !cageType;
  if (!cageType) {
    els.confirmOutgoingApplication.textContent = "このケージで申請";
    return;
  }
  const rate = Math.min(100, outgoingMatchRate(monster) * cageSuccessMultiplier(cageType, monster));
  els.confirmOutgoingApplication.textContent = `このケージで申請（成功率 ${Math.round(rate)}%）`;
}

function applyOutgoingMatch() {
  if (
    state.catalogMatchAnimating
    || profileMonsters().length !== 3
    || state.catalogHearts <= 0
  ) return;
  const monsterId = state.pendingOutgoingMonsterId;
  const monster = state.outgoingCandidates.find((candidate) => candidate.id === monsterId);
  const cageType = state.selectedOutgoingCageType;
  if (
    !monster
    || !cageType
    || cageCount(cageType) <= 0
    || !cageCanHold(cageType, monster)
  ) return;
  const rate = Math.min(100, outgoingMatchRate(monster) * cageSuccessMultiplier(cageType, monster));
  const success = Math.random() * 100 < rate;
  if (!consumeCatalogHeart()) return;
  consumeCage(cageType);
  state.pendingOutgoingMonsterId = null;
  state.selectedOutgoingCageType = null;
  els.cageSelectDialog.close();
  showCatalogMatchResult(monster, success);
}

function finishCatalogMatchResult(monster, success) {
  state.catalogMatchAnimating = false;
  els.catalogMatchOverlay.hidden = true;
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
  state.outgoingCandidates = state.outgoingCandidates.filter((candidate) => candidate.id !== monster.id);
  els.outgoingMatchFeedback.hidden = false;
  updateResources();
  renderOutgoingMatch();
}

function showCatalogMatchResult(monster, success) {
  state.catalogMatchAnimating = true;
  els.catalogMatchMonster.setAttribute("style", monsterStyle(monster));
  els.catalogMatchStageTitle.textContent = "マッチ申請を送信中…";
  els.catalogMatchStageCopy.textContent = `${monster.name}の返事を待っています`;
  els.catalogMatchOverlay.className = "catalog-match-overlay";
  els.catalogMatchOverlay.hidden = false;
  renderOutgoingMatch();
  window.setTimeout(() => {
    els.catalogMatchStageTitle.textContent = "返事が届きました";
    els.catalogMatchStageCopy.textContent = "結果を確認しています…";
    els.catalogMatchOverlay.classList.add("waiting");
  }, 950);
  window.setTimeout(() => {
    els.catalogMatchOverlay.classList.add(success ? "success" : "failure");
    els.catalogMatchStageTitle.textContent = success ? "MATCH!" : "NO MATCH";
    els.catalogMatchStageCopy.textContent = success
      ? `${monster.name}とマッチしました！`
      : "今回は縁がなかったようです";
  }, 1900);
  window.setTimeout(() => finishCatalogMatchResult(monster, success), 3100);
}

function showView(viewId) {
  ["partyView", "codexView", "battleView", "matchView"].forEach((id) => {
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
  if (state.currentView === "codexView") renderCodex();
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
          <i class="inline-rank" style="${rankStyle(monster.rank)}">${monster.rank.name}</i>
          <i class="attribute-chip" style="--attr-bg:${monster.attr.bg};--attr-color:${monster.attr.color}">${monster.attr.name}</i>
        </span>
        <span class="sp-chip monster-list-sp">SP ${monster.sp}</span>
      </span>
      ${selected ? `<span class="selected-slot">${selectedSlot + 1}</span>` : ""}
    </button>`;
}

function speciesAttribute(species) {
  return attributes.find((attribute) => attribute.name === species.attribute) ?? attributes.at(-1);
}

function speciesRank(species) {
  return monsterRanks.find((rank) => rank.name === species.rank) ?? monsterRanks[0];
}

function speciesMiniStyle(species) {
  const attr = speciesAttribute(species);
  return `--mini-bg:${attr.bg};--mini-color:${attr.monster};--mini-radius:50% 52% 47% 49% / 52% 48% 48% 52%`;
}

function codexState(species) {
  if (state.ownedSpecies.has(species.no)) return "owned";
  if (state.discoveredSpecies.has(species.no)) return "discovered";
  return "unknown";
}

function codexCompletion() {
  const total = monsterSpecies.length || 1;
  const owned = monsterSpecies.filter((species) => state.ownedSpecies.has(species.no)).length;
  const discovered = monsterSpecies.filter((species) => state.discoveredSpecies.has(species.no)).length;
  return { total, owned, discovered, rate: Math.round((owned / total) * 100) };
}

function codexRankProgressMarkup(rank) {
  const speciesByRank = monsterSpecies.filter((species) => species.rank === rank.name);
  const total = speciesByRank.length || 1;
  const owned = speciesByRank.filter((species) => state.ownedSpecies.has(species.no)).length;
  const discovered = speciesByRank.filter((species) => (
    !state.ownedSpecies.has(species.no) && state.discoveredSpecies.has(species.no)
  )).length;
  const ownedPercent = (owned / total) * 100;
  const discoveredPercent = (discovered / total) * 100;
  return `
    <div class="codex-rank-row">
      <span>${rank.name}</span>
      <div class="codex-rank-track">
        <i class="owned" style="width:${ownedPercent}%"></i>
        <i class="seen" style="left:${ownedPercent}%;width:${discoveredPercent}%"></i>
      </div>
      <strong>${Math.round(ownedPercent)}%</strong>
    </div>`;
}

function renderCodex() {
  const progress = codexCompletion();
  els.codexCompleteRate.textContent = `${progress.rate}%`;
  els.codexRankBars.innerHTML = monsterRanks
    .filter((rank) => monsterSpecies.some((species) => species.rank === rank.name))
    .map(codexRankProgressMarkup)
    .join("");
  els.codexGrid.innerHTML = [...monsterSpecies]
    .sort((a, b) => a.no - b.no)
    .map((species) => {
      const status = codexState(species);
      const discovered = status !== "unknown";
      const owned = status === "owned";
      const fresh = state.newCodexSpecies.has(species.no);
      return `
        <button class="codex-card ${status}" data-codex-no="${species.no}" type="button">
          <span class="codex-no">No.${String(species.no).padStart(3, "0")}</span>
          <span class="codex-art ${discovered ? "" : "silhouette"}">
            <span class="mini-monster" style="${speciesMiniStyle(species)}"></span>
          </span>
          <strong>${discovered ? species.name : "？？？"}</strong>
          ${owned ? '<i class="codex-owned-mark">✓</i>' : ""}
          ${fresh ? '<em class="codex-new-mark">NEW</em>' : ""}
        </button>`;
    })
    .join("");
}

function openCodex() {
  renderCodex();
  showView("codexView");
}

function closeCodex() {
  showView("partyView");
  setHomeTab("monsters");
}

function codexAcquisitionEntries(speciesNo) {
  const entries = [];
  Object.values(DUNGEON_CONFIG).forEach((dungeon) => {
    if (dungeon.requestTables?.some((table) => (
      table.monsters?.some((monster) => monster.species === speciesNo)
    ))) {
      entries.push(`${dungeon.name} / ダンジョン後マッチ`);
    }
  });
  if (!CATALOG_EXCLUDED_SPECIES.has(speciesNo)) {
    entries.push("カタログ");
  }
  return [...new Set(entries)];
}

function codexMoveTag(move) {
  const key = moveKey(move?.name);
  const statusKeys = new Set([
    "burn", "soak", "gnaw", "poisonFang", "electricShock",
    "lick", "poisonBreath", "slimePress"
  ]);
  const supportKeys = new Set(["shine", "grow", "glitterMachine", "charge", "healingWater", "cling"]);
  if (statusKeys.has(key)) return "状態異常";
  if (supportKeys.has(key)) return "補助";
  return (Number(move?.multiplier) || 0) > 0 ? "攻撃" : "特殊";
}

function codexMoveRows(movesToShow) {
  return movesToShow.map(({ label, move }) => `
    <article class="codex-move-row">
      <span>
        <small>${label}</small>
        <strong>${move?.name ?? "なし"}</strong>
      </span>
      <i>${move ? codexMoveTag(move) : "なし"}</i>
      <p>${move?.effect ?? "この技はありません。"}</p>
    </article>
  `).join("");
}

function codexMovesForSpecies(species) {
  const rightMove = species.rightMoves?.[0] ?? normalAttack(species.attribute);
  const leftMoves = species.leftMoves ?? [species.leftMove].filter(Boolean);
  return [
    { label: "右技", move: rightMove },
    { label: "左技1", move: leftMoves[0] },
    { label: "左技2", move: leftMoves[1] ?? null }
  ];
}

function pairRecipeEntries(speciesNo) {
  return PAIR_TRAIN_EVOLUTIONS
    .filter((recipe) => recipe.resultSpecies === speciesNo)
    .map((recipe) => {
      const base = monsterSpecies.find((species) => species.no === recipe.baseSpecies);
      const partner = monsterSpecies.find((species) => species.no === recipe.partnerSpecies);
      const result = monsterSpecies.find((species) => species.no === recipe.resultSpecies);
      return `${base?.name ?? "？"} × ${partner?.name ?? "？"} → ${result?.name ?? "？"}`;
    });
}

function openCodexDetail(speciesNo) {
  const species = monsterSpecies.find((candidate) => candidate.no === speciesNo);
  if (!species) return;
  state.newCodexSpecies.delete(speciesNo);
  if (state.currentView === "codexView") renderCodex();
  const status = codexState(species);
  const discovered = status !== "unknown";
  const owned = status === "owned";
  const attr = speciesAttribute(species);
  const rank = speciesRank(species);
  const locations = discovered ? codexAcquisitionEntries(species.no) : [];
  const recipes = discovered ? pairRecipeEntries(species.no) : [];
  const passive = species.passives?.[0] ?? species.passive;
  els.codexDetailName.textContent = discovered ? species.name : "？？？";
  els.codexDetailBody.innerHTML = `
    <section class="codex-detail-hero ${discovered ? "" : "unknown"}">
      <div class="codex-detail-art ${discovered ? "" : "silhouette"}">
        <span class="mini-monster" style="${speciesMiniStyle(species)}"></span>
      </div>
      <div class="codex-detail-copy">
        <span class="codex-status-badge ${owned ? "owned" : discovered ? "seen" : "unknown"}">
          ${owned ? "取得済み" : discovered ? "未所持" : "未発見"}
        </span>
        <strong>${discovered ? species.name : "？？？"}</strong>
        <span class="codex-detail-chips">
          <i class="attribute-chip" style="--attr-bg:${attr.bg};--attr-color:${attr.color}">${discovered ? attr.name : "？"}</i>
          <i class="inline-rank" style="${rankStyle(rank)}">${discovered ? rank.name : "？"}</i>
        </span>
      </div>
    </section>
    <section class="codex-stat-grid">
      <span><small>HP</small><strong>${discovered ? species.hp : "？"}</strong></span>
      <span><small>パワー</small><strong>${discovered ? species.power : "？"}</strong></span>
      <span><small>スター</small><strong>${discovered ? species.star : "？"}</strong></span>
    </section>
    <section class="codex-info-block codex-move-block">
      <h3>技情報</h3>
      ${discovered
        ? codexMoveRows(codexMovesForSpecies(species))
        : `<p>発見すると技情報が表示されます。</p>`}
    </section>
    <section class="codex-info-block codex-trait-block">
      <h3>特性</h3>
      ${discovered
        ? `<article class="codex-trait-row"><strong>${passive?.name ?? "なし"}</strong><p>${passive?.effect ?? "パッシブなし"}</p></article>`
        : `<p>発見すると特性が表示されます。</p>`}
    </section>
    <section class="codex-info-block">
      <h3>入手情報</h3>
      ${discovered && locations.length
        ? locations.map((entry) => `<p>${entry}</p>`).join("")
        : `<p>${discovered ? "仲間にできる場所はまだ不明です。" : "まだ姿を確認していません。"}</p>`}
    </section>
    <section class="codex-info-block">
      <h3>ペアトレ情報</h3>
      ${discovered && recipes.length
        ? recipes.map((entry) => `<p>${entry}</p>`).join("")
        : `<p>${discovered ? "判明している組み合わせはありません。" : "発見するとヒントが表示されます。"}</p>`}
    </section>`;
  els.codexDetailDialog.showModal();
}

function pairTrainEvolution(baseMonster, partnerMonster) {
  if (!baseMonster || !partnerMonster) return null;
  return PAIR_TRAIN_EVOLUTIONS.find((recipe) => (
    recipe.baseSpecies === baseMonster.speciesNo
      && recipe.partnerSpecies === partnerMonster.speciesNo
  )) ?? null;
}

function canPairTrainByMonsterCount() {
  return state.friends.length - 1 > 2;
}

function pairTrainStats(baseMonster, partnerMonster) {
  const trainingBonus = calculateTrainingBonus(baseMonster, partnerMonster);
  const baseStats = speciesBaseStats(baseMonster.speciesNo, baseMonster.rank.name);
  return {
    hp: Math.max(1, Math.round(
      (baseStats.hp + trainingBonus.hp) * individualMultiplier(baseMonster.iv.hp)
    )),
    power: Math.max(1, Math.round(
      (baseStats.power + trainingBonus.power) * individualMultiplier(baseMonster.iv.atk)
    )),
    star: Math.max(1, Math.round(
      (baseStats.star + trainingBonus.star) * individualMultiplier(baseMonster.iv.sense)
    ))
  };
}

function pairSlotMarkup(monster, emptyLabel) {
  if (!monster) {
    return `
      <span class="pair-slot-label">${emptyLabel === "ベースを選ぶ" ? "BASE" : "PARTNER"}</span>
      <span class="pair-slot-empty">${emptyLabel}</span>`;
  }
  return `
    <span class="pair-slot-label">${emptyLabel === "ベースを選ぶ" ? "BASE" : "PARTNER"}</span>
    <span class="pair-slot-monster">
      <span class="mini-monster" style="${monsterStyle(monster)}"></span>
      <span>
        <strong>${monster.name}</strong>
        <small>Lv ${monster.level} / SP ${monster.sp}</small>
      </span>
    </span>`;
}

function renderPairTraining() {
  if (!els.pairBaseSlot) return;
  const baseMonster = state.friends.find((monster) => monster.id === state.pairBaseId);
  const partnerMonster = state.friends.find((monster) => monster.id === state.pairPartnerId);
  if (!baseMonster) {
    state.pairBaseId = null;
    state.pairPartnerId = null;
  }
  if (!partnerMonster || partnerMonster.id === state.pairBaseId) {
    state.pairPartnerId = null;
  }
  const currentBase = state.friends.find((monster) => monster.id === state.pairBaseId);
  const currentPartner = state.friends.find((monster) => monster.id === state.pairPartnerId);
  const enoughMonsters = canPairTrainByMonsterCount();
  els.pairBaseSlot.innerHTML = pairSlotMarkup(currentBase, "ベースを選ぶ");
  els.pairPartnerSlot.innerHTML = pairSlotMarkup(currentPartner, "相手を選ぶ");
  els.pairBaseSlot.disabled = !enoughMonsters;
  els.pairPartnerSlot.disabled = !currentBase || !enoughMonsters;

  if (!enoughMonsters) {
    els.pairTrainingPreview.hidden = false;
    els.pairTrainingPreview.innerHTML = `
      <p class="pair-count-warning">
        ペアトレ後も3体以上残す必要があります。所持モンスターを4体以上にしてください。
      </p>`;
  } else if (currentBase && currentPartner) {
    const stats = pairTrainStats(currentBase, currentPartner);
    const talent = combinedTalent(currentBase, currentPartner);
    const evolution = pairTrainEvolution(currentBase, currentPartner);
    els.pairTrainingPreview.hidden = false;
    els.pairTrainingPreview.innerHTML = `
      <div class="pair-preview-heading">
        <span>ペアトレ後 Lv1</span>
        ${evolution ? "<strong>進化可能</strong>" : ""}
      </div>
      <div class="pair-preview-stats">
        <span><small>HP</small><b>${stats.hp}</b></span>
        <span><small>パワー</small><b>${stats.power}</b></span>
        <span><small>スター</small><b>${stats.star}</b></span>
        <span><small>才能</small><b>${talent}</b></span>
      </div>`;
  } else {
    els.pairTrainingPreview.hidden = true;
    els.pairTrainingPreview.innerHTML = "";
  }
  els.pairTrainingStart.disabled = !(enoughMonsters && currentBase && currentPartner);
}

function pairPickerCardMarkup(monster, mode) {
  const isBase = mode === "base";
  const isSelf = monster.id === state.pairBaseId;
  const tooLow = monster.level < 10;
  const disabled = tooLow || isSelf;
  const evolution = !disabled && !isBase
    ? pairTrainEvolution(
        state.friends.find((friend) => friend.id === state.pairBaseId),
        monster
      )
    : null;
  let reason = "";
  if (tooLow) reason = "Lv10で解放";
  else if (isSelf) reason = "ベース選択中";
  return `
    <button class="monster-list-card pair-picker-card${evolution ? " pair-evolution-ready" : ""}${disabled ? " unavailable" : ""}"
      data-pair-monster-id="${monster.id}" type="button">
      <span class="monster-list-visual" style="--list-bg:${monster.attr.bg}">
        <span class="mini-monster" style="${monsterStyle(monster)}"></span>
      </span>
      <span class="monster-list-info">
        <strong class="monster-list-name">${monster.name}</strong>
        <span class="monster-list-meta">
          <i class="level-chip">Lv ${monster.level}</i>
          <i class="inline-rank" style="${rankStyle(monster.rank)}">${monster.rank.name}</i>
          <i class="attribute-chip" style="--attr-bg:${monster.attr.bg};--attr-color:${monster.attr.color}">${monster.attr.name}</i>
        </span>
        <span class="sp-chip monster-list-sp">SP ${monster.sp}</span>
        ${evolution ? "<em class=\"pair-evolution-label\">進化可能</em>" : ""}
        ${reason ? `<em class="pair-disabled-reason">${reason}</em>` : ""}
      </span>
    </button>`;
}

function openPairPicker(mode) {
  if (!canPairTrainByMonsterCount()) {
    renderPairTraining();
    return;
  }
  if (mode === "partner" && !state.pairBaseId) return;
  state.pairPickerMode = mode;
  els.pairPickerTitle.textContent = mode === "base" ? "ベースを選ぶ" : "ペア相手を選ぶ";
  els.pairPickerCopy.textContent = mode === "base"
    ? "Lv10以上のベースモンスターを選択してください。"
    : "Lv10以上のペア相手を選択してください。パーティー・プロフィール使用中でも選べます。";
  const monsters = getFilteredSortedFriends(
    state.pairPickerSort,
    state.pairPickerAttributeFilter
  );
  els.pairPickerRoster.innerHTML = monsters.length
    ? monsters.map((monster) => pairPickerCardMarkup(monster, mode)).join("")
    : "<p class=\"collection-empty\">仲間モンスターがいません。</p>";
  if (!els.pairPickerDialog.open) els.pairPickerDialog.showModal();
}

function selectPairMonster(monsterId) {
  const monster = state.friends.find((friend) => friend.id === monsterId);
  if (!monster || monster.level < 10) return;
  if (state.pairPickerMode === "base") {
    state.pairBaseId = monster.id;
    if (state.pairPartnerId === monster.id) state.pairPartnerId = null;
  } else {
    if (monster.id === state.pairBaseId) return;
    state.pairPartnerId = monster.id;
  }
  els.pairPickerDialog.close();
  renderPairTraining();
}

function openPairAction(monsterId) {
  const monster = state.friends.find((friend) => friend.id === monsterId);
  if (!monster) return;
  state.pendingPairMonsterId = monster.id;
  const isSelf = monster.id === state.pairBaseId && state.pairPickerMode === "partner";
  const tooLow = monster.level < 10;
  els.pairActionName.textContent = monster.name;
  els.pairActionMonster.innerHTML = `
    <span class="mini-monster" style="${monsterStyle(monster)}"></span>
    <span><strong>${monster.name}</strong><small>Lv ${monster.level} / SP ${monster.sp}</small></span>`;
  els.pairActionReason.textContent = tooLow
    ? "Lv10以上でペアトレできます。"
    : isSelf
      ? "ベースと同じモンスターはペア相手に選べません。"
      : "このモンスターを選択しますか？";
  els.pairActionSelectButton.disabled = tooLow || isSelf;
  els.pairActionDialog.showModal();
}

function closePairAction() {
  state.pendingPairMonsterId = null;
  if (els.pairActionDialog.open) els.pairActionDialog.close();
}

function showPairActionDetail() {
  const monster = state.friends.find((friend) => friend.id === state.pendingPairMonsterId);
  if (!monster) return;
  els.pairActionDialog.close();
  openMonsterDetail(monster, "pairView");
}

function confirmPairActionSelection() {
  const monsterId = state.pendingPairMonsterId;
  if (!monsterId || els.pairActionSelectButton.disabled) return;
  els.pairActionDialog.close();
  state.pendingPairMonsterId = null;
  selectPairMonster(monsterId);
}

function clearPairTrainingTimers() {
  state.pairTrainingTimers.forEach((timer) => clearTimeout(timer));
  state.pairTrainingTimers = [];
}

function pairTrainingDelay(callback, delay) {
  const timer = setTimeout(callback, delay);
  state.pairTrainingTimers.push(timer);
}

function startPairTraining() {
  const baseMonster = state.friends.find((monster) => monster.id === state.pairBaseId);
  const partnerMonster = state.friends.find((monster) => monster.id === state.pairPartnerId);
  if (
    !canPairTrainByMonsterCount()
    || !baseMonster
    || !partnerMonster
    || baseMonster.level < 10
    || partnerMonster.level < 10
  ) return;
  state.pendingPairResult = {
    baseId: baseMonster.id,
    partnerId: partnerMonster.id,
    evolution: pairTrainEvolution(baseMonster, partnerMonster)
  };
  clearPairTrainingTimers();
  els.pairTrainingBaseMonster.setAttribute("style", monsterStyle(baseMonster));
  els.pairTrainingPartnerMonster.setAttribute("style", monsterStyle(partnerMonster));
  els.pairTrainingStageLabel.textContent = "マッチ成立！";
  els.pairTrainingOverlay.hidden = false;
  pairTrainingDelay(() => {
    els.pairTrainingStageLabel.textContent = "トレーニング中…";
    els.pairTrainingOverlay.classList.add("training");
  }, 850);
  pairTrainingDelay(() => {
    els.pairTrainingOverlay.hidden = true;
    els.pairTrainingOverlay.classList.remove("training");
    const pending = state.pendingPairResult;
    if (!pending) return;
    const currentBase = state.friends.find((monster) => monster.id === pending.baseId);
    const currentPartner = state.friends.find((monster) => monster.id === pending.partnerId);
    if (!currentBase || !currentPartner) return;
    if (pending.evolution) {
      const target = monsterSpecies.find((species) => species.no === pending.evolution.resultSpecies);
      els.pairEvolutionTitle.textContent = `${target?.name ?? "新しい姿"}へ進化できます`;
      els.pairEvolutionTarget.innerHTML = target
        ? `<strong>${currentBase.name}</strong><span>→</span><strong>${target.name}</strong>`
        : "";
      els.pairEvolutionDialog.showModal();
    } else {
      finishPairTraining(false);
    }
  }, 1900);
}

function createPairTrainingResult(baseMonster, partnerMonster, evolve) {
  const recipe = state.pendingPairResult?.evolution;
  const trainingBonus = calculateTrainingBonus(baseMonster, partnerMonster);
  const talent = combinedTalent(baseMonster, partnerMonster);
  const inheritedIv = { ...baseMonster.iv };
  let result;
  if (evolve && recipe) {
    result = createMonster(0, recipe.resultSpecies, 1, { iv: inheritedIv, talent });
    result.id = baseMonster.id;
    state.friendSequence += 1;
    result.acquiredOrder = state.friendSequence;
  } else {
    result = {
      ...baseMonster,
      leftMoves: [...(baseMonster.leftMoves ?? [])],
      iv: { ...baseMonster.iv },
      baseStats: { ...baseMonster.baseStats },
      trainingBonus: { ...baseMonster.trainingBonus }
    };
  }
  result.level = 1;
  result.experience = 0;
  result.talent = talent;
  result.iv = inheritedIv;
  result.baseStats = speciesBaseStats(result.speciesNo, result.rank.name);
  result.trainingBonus = trainingBonus;
  applyCalculatedStats(result);
  result.nextLevelExperience = nextLevelExperience(result);
  result.pairLineage = {
    trainedAt: new Date().toISOString(),
    evolved: Boolean(evolve && recipe),
    base: pairLineageNode(baseMonster),
    partner: pairLineageNode(partnerMonster)
  };
  return result;
}

function removeMonsterReferences(monsterId) {
  state.partyPresets = state.partyPresets.map((preset) => (
    preset.map((id) => id === monsterId ? null : id)
  ));
  state.profileMonsterIds = state.profileMonsterIds.map((id) => (
    id === monsterId ? null : id
  )).filter(Boolean);
  state.editingProfileMonsterIds = state.editingProfileMonsterIds.map((id) => (
    id === monsterId ? null : id
  )).filter(Boolean);
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
}

function finishPairTraining(evolve) {
  const pending = state.pendingPairResult;
  if (!pending) return;
  if (els.pairEvolutionDialog.open) els.pairEvolutionDialog.close();
  const baseIndex = state.friends.findIndex((monster) => monster.id === pending.baseId);
  const baseMonster = state.friends[baseIndex];
  const partnerMonster = state.friends.find((monster) => monster.id === pending.partnerId);
  if (baseIndex < 0 || !baseMonster || !partnerMonster) {
    state.pendingPairResult = null;
    renderPairTraining();
    return;
  }
  const result = createPairTrainingResult(baseMonster, partnerMonster, evolve);
  const ordinary = createMonster(0, result.speciesNo, 1, { fixedIv: 0, talent: 0 });
  state.friends[baseIndex] = result;
  state.friends = state.friends.filter((monster) => monster.id !== partnerMonster.id);
  removeMonsterReferences(partnerMonster.id);
  const firstOwnedResult = !state.ownedSpecies.has(result.speciesNo);
  state.discoveredSpecies.add(result.speciesNo);
  state.ownedSpecies.add(result.speciesNo);
  if (firstOwnedResult) state.newCodexSpecies.add(result.speciesNo);
  state.pendingPairResult = null;
  state.pairBaseId = result.id;
  state.pairPartnerId = null;

  const statRows = [
    ["HP", result.hp, result.hp - ordinary.hp],
    ["パワー", result.power, result.power - ordinary.power],
    ["スター", result.star, result.star - ordinary.star],
    ["才能", result.talent, result.talent]
  ];
  els.pairResultMonster.innerHTML = `
    <span class="mini-monster" style="${monsterStyle(result)}"></span>
    <span><small>Lv 1</small><strong>${result.name}</strong><b>SP ${result.sp}</b></span>`;
  els.pairResultStats.innerHTML = statRows.map(([label, value, delta]) => `
    <span><small>${label}</small><strong>${value}</strong><em>${delta >= 0 ? "+" : ""}${delta}</em></span>
  `).join("");
  els.pairResultGoodbye.textContent = `${partnerMonster.name}は満足して去っていった…`;
  renderParty();
  renderPairTraining();
  scheduleAutosave();
  els.pairResultDialog.showModal();
}

function setHomeTab(tab) {
  if (tab === "training" && state.playerLevel < 5) return;
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
  if (training) renderPairTraining();
}

function isDungeonUnlocked(dungeon) {
  if (dungeon.category === "trial" || dungeon.category === "special") {
    return state.playerLevel >= (dungeon.requiredPlayerLevel ?? 1);
  }
  return !dungeon.unlockAfter || state.clearedDungeons.has(dungeon.unlockAfter);
}

function dungeonCardMarkup(dungeonId, dungeon) {
  const isTrial = dungeon.category === "trial";
  const isSpecial = dungeon.category === "special";
  const rushCount = dungeon.rushes.length;
  const bossCount = dungeon.bosses.length;
  const numberLabel = isTrial || isSpecial
    ? dungeon.number
    : String(dungeon.number).padStart(2, "0");
  const tutorialClass = dungeonId === "warawara" ? " tutorial-dungeon-target" : "";
  const cleared = state.clearedDungeons.has(dungeonId);
  const tutorialLocked = state.tutorialStage === "dungeonSelect" && dungeonId !== "warawara";
  const categoryLabel = isTrial
    ? "PROMOTION TRIAL"
    : isSpecial
      ? "CHALLENGER"
      : "DUNGEON";
  return `
    <button class="dungeon-card${tutorialClass}${cleared ? " cleared" : ""}${tutorialLocked ? " locked" : ""}"
      data-dungeon-id="${dungeonId}" type="button" ${tutorialLocked ? "disabled" : ""}>
      <span class="dungeon-art ${isTrial ? "trial-art" : isSpecial ? "special-art" : "forest-art"}">${numberLabel}</span>
      <span class="dungeon-copy">
        <small>${categoryLabel} ${numberLabel}</small>
        <strong>${dungeon.name}</strong>
        <span>基礎EXP ${dungeon.baseExperience} / ${rushCount ? `ラッシュ${rushCount}戦 / ` : ""}ガチ${bossCount}体</span>
        ${isTrial ? `<b>報酬 プレイヤーLv${dungeon.rewardPlayerLevel}</b>` : ""}
        ${cleared ? '<b class="dungeon-cleared-label">CLEAR</b>' : ""}
      </span>
      <span aria-hidden="true">›</span>
    </button>`;
}

function renderDungeonLists() {
  const entries = Object.entries(DUNGEON_CONFIG);
  const generalDungeons = entries.filter(([, dungeon]) => (
    dungeon.category === "general" && isDungeonUnlocked(dungeon)
  ));
  const trialDungeons = entries.filter(([id, dungeon]) => (
    dungeon.category === "trial"
      && isDungeonUnlocked(dungeon)
      && !state.clearedDungeons.has(id)
  ));
  const clearedTrials = entries.filter(([id, dungeon]) => (
    dungeon.category === "trial"
      && isDungeonUnlocked(dungeon)
      && state.clearedDungeons.has(id)
  ));
  const specialDungeons = entries.filter(([, dungeon]) => (
    dungeon.category === "special" && isDungeonUnlocked(dungeon)
  ));

  els.generalDungeonList.innerHTML = generalDungeons
    .map(([id, dungeon]) => dungeonCardMarkup(id, dungeon))
    .join("");
  els.trialDungeonList.innerHTML = trialDungeons.length
    ? trialDungeons.map(([id, dungeon]) => dungeonCardMarkup(id, dungeon)).join("")
    : `<p class="dungeon-list-empty">未クリアの試練はありません</p>`;
  if (clearedTrials.length) {
    els.trialDungeonList.insertAdjacentHTML("beforeend", `
      <details class="cleared-trials">
        <summary>クリア済 <b>${clearedTrials.length}</b></summary>
        <div class="cleared-trial-list">
          ${clearedTrials.map(([id, dungeon]) => dungeonCardMarkup(id, dungeon)).join("")}
        </div>
      </details>`);
  }
  els.specialDungeonList.innerHTML = specialDungeons.length
    ? specialDungeons.map(([id, dungeon]) => dungeonCardMarkup(id, dungeon)).join("")
    : `<p class="dungeon-list-empty">スペシャルはプレイヤーLv5で解放されます</p>`;

  els.generalDungeonList.hidden = state.dungeonCategory !== "general";
  els.trialDungeonList.hidden = state.dungeonCategory !== "trial";
  els.specialDungeonList.hidden = state.dungeonCategory !== "special";
  const specialButton = els.dungeonCategoryTabs.querySelector('[data-dungeon-category="special"]');
  specialButton.classList.toggle("locked", state.playerLevel < 5);
  specialButton.querySelector(".category-lock-label").hidden = state.playerLevel >= 5;
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

function buyCageF() {
  if (state.playerLevel < 3) return;
  if (state.gold < CAGE_F_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません";
    return;
  }
  state.gold -= CAGE_F_PRICE;
  state.cagesF += 1;
  els.shopFeedback.textContent = "モンスターケージFを1個購入しました";
  updateResources();
}

function buyCageE() {
  if (state.playerLevel < 5) return;
  if (state.gold < CAGE_E_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません";
    return;
  }
  state.gold -= CAGE_E_PRICE;
  state.cagesE += 1;
  els.shopFeedback.textContent = "モンスターケージEを1個購入しました";
  updateResources();
}

function buyExpDrink() {
  if (state.playerLevel < 6) return;
  if (state.gold < EXP_DRINK_PRICE) {
    els.shopFeedback.textContent = "ゴールドが足りません。";
    return;
  }
  state.gold -= EXP_DRINK_PRICE;
  state.expDrinks += 1;
  els.shopFeedback.textContent = "経験値5000ドリンクを購入しました。";
  updateResources();
}

function buyExp500Drink() {
  if (state.gold < EXP_500_DRINK_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません。";
    return;
  }
  state.gold -= EXP_500_DRINK_PRICE;
  state.exp500Drinks += 1;
  els.shopFeedback.textContent = "経験値500ドリンクを購入しました。";
  updateResources();
}

function buyExpMist() {
  if (state.playerLevel < 4) return;
  if (state.gold < EXP_MIST_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません。";
    return;
  }
  state.gold -= EXP_MIST_PRICE;
  state.expMists += 1;
  els.shopFeedback.textContent = "経験値500ミストを購入しました。";
  updateResources();
}

function useExpMist() {
  if (state.expMists <= 0 || state.friends.length === 0) return;
  const levelUps = state.friends.reduce((count, monster) => (
    count + (grantExperience(monster, EXP_MIST_AMOUNT).leveledUp ? 1 : 0)
  ), 0);
  state.expMists -= 1;
  els.shopFeedback.textContent = `仲間全員が${EXP_MIST_AMOUNT} EXP獲得${levelUps ? ` / ${levelUps}体がレベルアップ！` : ""}`;
  renderParty();
  updateResources();
}

function buyCatalogChange() {
  if (state.playerLevel < 7) return;
  if (state.gold < CATALOG_CHANGE_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません。";
    return;
  }
  state.gold -= CATALOG_CHANGE_PRICE;
  state.catalogChanges += 1;
  els.shopFeedback.textContent = "カタログチェンジを購入しました。";
  updateResources();
}

function useCatalogChange() {
  if (state.playerLevel < 7 || state.catalogChanges <= 0) return;
  state.catalogChanges -= 1;
  generateOutgoingCandidates();
  els.shopFeedback.textContent = "カタログを更新しました。";
  updateResources();
}

function buyHeartPlus() {
  if (state.playerLevel < 7) return;
  recoverCatalogHearts();
  if (state.catalogHearts >= MAX_CATALOG_HEARTS) {
    els.shopFeedback.textContent = "申請ハートはすでに最大です。";
    return;
  }
  if (state.gold < HEART_PLUS_PRICE) {
    els.shopFeedback.textContent = "Goldが足りません。";
    return;
  }
  state.gold -= HEART_PLUS_PRICE;
  state.catalogHearts = MAX_CATALOG_HEARTS;
  state.catalogHeartUpdatedAt = Date.now();
  els.shopFeedback.textContent = "申請ハートが全回復しました。";
  updateResources();
  renderOutgoingMatch();
}

function activeExpDrinkCount() {
  return state.activeExpDrinkAmount === EXP_500_DRINK_AMOUNT
    ? state.exp500Drinks
    : state.expDrinks;
}

function openExpDrinkDialog(amount = EXP_DRINK_AMOUNT) {
  state.activeExpDrinkAmount = amount;
  if (activeExpDrinkCount() <= 0 || state.friends.length === 0) return;
  els.expDrinkFeedback.hidden = true;
  renderExpDrinkDialog();
  els.expDrinkDialog.showModal();
}

function renderExpDrinkDialog() {
  const amount = state.activeExpDrinkAmount;
  const count = activeExpDrinkCount();
  els.expDrinkDialogCopy.textContent = `選んだモンスターに${amount}経験値を与えます。`;
  els.expDrinkDialogStatus.textContent = `経験値${amount}ドリンク 所持数 ${count}`;
  const monsters = getFilteredSortedFriends(
    state.expDrinkSort,
    state.expDrinkAttributeFilter
  );
  els.expDrinkRoster.innerHTML = monsters.map((monster) => (
    monsterListCardMarkup(monster, "drink-target")
  )).join("") || '<p class="collection-empty">該当するモンスターはいません。</p>';
  els.expDrinkRoster.querySelectorAll("[data-drink-target]").forEach((button) => {
    button.disabled = count <= 0;
  });
}

function useExpDrinkOnMonster(monsterId) {
  const amount = state.activeExpDrinkAmount;
  if (activeExpDrinkCount() <= 0) return;
  const monster = state.friends.find((friend) => friend.id === monsterId);
  if (!monster) return;
  const reward = grantExperience(monster, amount);
  if (amount === EXP_500_DRINK_AMOUNT) {
    state.exp500Drinks -= 1;
  } else {
    state.expDrinks -= 1;
  }
  updateResources();
  renderParty();
  renderExpDrinkDialog();
  els.expDrinkFeedback.hidden = false;
  els.expDrinkFeedback.classList.toggle("level-up", reward.leveledUp);
  els.expDrinkFeedback.textContent = reward.leveledUp
    ? `${monster.name}　Lv ${reward.before.level} → Lv ${monster.level}！ HP +${reward.gains.hp} / パワー +${reward.gains.power} / スター +${reward.gains.star}`
    : `${monster.name}に${amount} EXP（${monster.experience} / ${monster.nextLevelExperience}）`;
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
  const monsters = getFilteredSortedFriends(
    state.profilePickerSort,
    state.profilePickerAttributeFilter
  );
  els.profilePickerRoster.innerHTML = monsters.map((monster) => (
    monsterListCardMarkup(
      monster,
      "profile-monster-id",
      state.editingProfileMonsterIds.indexOf(monster.id)
    )
  )).join("") || '<p class="collection-empty">該当するモンスターはいません。</p>';
  if (!els.profilePickerDialog.open) els.profilePickerDialog.showModal();
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

function dungeonEnemySpecies(speciesNo) {
  return monsterSpecies.find((species) => species.no === speciesNo);
}

function dungeonEnemyCardMarkup(speciesNo, level, options = {}) {
  const species = dungeonEnemySpecies(speciesNo);
  if (!species) return "";
  const attr = attributes.find((candidate) => candidate.name === species.attribute) ?? attributes[0];
  const rank = monsterRanks.find((candidate) => candidate.name === species.rank) ?? monsterRanks[0];
  const hpText = options.hpMultiplier && options.hpMultiplier !== 1
    ? `HP ${Math.round(options.hpMultiplier * 100)}%`
    : "";
  const talentText = options.talent ? `才能 ${options.talent}` : "";
  const trainingText = options.trainingBonus
    ? `特訓 +${typeof options.trainingBonus === "number"
        ? options.trainingBonus
        : `${options.trainingBonus.hp ?? 0}/${options.trainingBonus.power ?? 0}/${options.trainingBonus.star ?? 0}`}`
    : "";
  const levelLabel = `Lv ${level}${typeof options.trainingBonus === "number" && options.trainingBonus > 0
    ? `+${options.trainingBonus}`
    : ""}`;
  const behaviorText = options.switchAtLowHp ? "ピンチ時交代" : "";
  return `
    <article class="dungeon-enemy-card">
      <span class="dungeon-enemy-art" style="--list-bg:${attr.bg}">
        <span class="mini-monster" style="--mini-bg:${attr.bg};--mini-color:${attr.monster};--mini-radius:50%"></span>
      </span>
      <span class="dungeon-enemy-copy">
        <strong>${species.name}</strong>
        <span>
          <i class="level-chip">${levelLabel}</i>
          <i class="inline-rank" style="${rankStyle(rank)}">${rank.name}</i>
          <i class="attribute-chip" style="--attr-bg:${attr.bg};--attr-color:${attr.color}">${attr.name}</i>
        </span>
        ${hpText || talentText || trainingText || behaviorText
          ? `<small>${[hpText, talentText, trainingText, behaviorText].filter(Boolean).join(" / ")}</small>`
          : ""}
      </span>
    </article>`;
}

function dungeonBossSummaryMarkup(dungeon) {
  return dungeon.bosses.map((boss) => (
    dungeonEnemyCardMarkup(boss.species, boss.level, boss)
  )).join("");
}

function rushEnemyDetailsMarkup(rush) {
  if (rush.species) {
    return rush.species.map((speciesNo, index) => (
      dungeonEnemyCardMarkup(
        speciesNo,
        rush.levels?.[index] ?? rush.level,
        {
          hpMultiplier: rush.hpMultiplier,
          talent: rush.talents?.[index] ?? rush.talent
        }
      )
    )).join("");
  }
  const candidates = rush.speciesPool ?? [];
  return `
    <p class="dungeon-random-note">以下の候補からランダムに${rush.count ?? 1}体出現</p>
    ${candidates.map((speciesNo) => (
      dungeonEnemyCardMarkup(speciesNo, rush.level, {
        hpMultiplier: rush.hpMultiplier,
        talent: rush.talent
      })
    )).join("")}`;
}

function dungeonIvDescription(dungeon) {
  if (dungeon.enemyIvRange) {
    return `個体値 ${dungeon.enemyIvRange.min ?? 0}〜${dungeon.enemyIvRange.max ?? 5}`;
  }
  const iv = dungeon.enemyIv;
  if (!iv) return "個体値 0";
  return `個体値 HP ${iv.hp ?? 0} / パワー ${iv.atk ?? 0} / スター ${iv.sense ?? 0}`;
}

function renderDungeonBossSummary() {
  const dungeon = DUNGEON_CONFIG[state.selectedDungeon];
  const visible = state.partyEditorMode === "dungeon" && Boolean(dungeon);
  els.dungeonBossSummary.hidden = !visible;
  if (!visible) return;
  els.dungeonBossList.innerHTML = dungeonBossSummaryMarkup(dungeon);
}

function openDungeonDetails() {
  const dungeon = DUNGEON_CONFIG[state.selectedDungeon];
  if (!dungeon || state.partyEditorMode !== "dungeon") return;
  els.dungeonDetailName.textContent = dungeon.name;
  els.dungeonDetailMeta.innerHTML = `
    <span>基礎EXP <strong>${dungeon.baseExperience}</strong></span>
    <span>${dungeonIvDescription(dungeon)}</span>
    <span>ラッシュ ${dungeon.rushes.length}戦 / ボス ${dungeon.bosses.length}体</span>`;
  const rushes = dungeon.rushes.map((rush, index) => `
    <section class="dungeon-battle-section">
      <div class="dungeon-battle-heading">
        <span>RUSH ${index + 1}</span>
        <strong>ラッシュバトル ${index + 1}</strong>
      </div>
      <div class="dungeon-enemy-grid">${rushEnemyDetailsMarkup(rush)}</div>
    </section>
  `).join("");
  const bosses = `
    <section class="dungeon-battle-section boss">
      <div class="dungeon-battle-heading">
        <span>GACHI</span>
        <strong>ガチバトル</strong>
      </div>
      <div class="dungeon-enemy-grid">${dungeonBossSummaryMarkup(dungeon)}</div>
    </section>`;
  els.dungeonDetailBattles.innerHTML = rushes + bosses;
  els.dungeonDetailDialog.showModal();
}

function openDungeonPartyEditor(dungeonId) {
  const dungeon = DUNGEON_CONFIG[dungeonId];
  if (state.tutorialStage === "dungeonSelect" && dungeonId !== "warawara") return;
  if (!dungeon || !isDungeonUnlocked(dungeon)) return;
  if (state.tutorialStage === "dungeonSelect" && dungeonId === "warawara") {
    state.tutorialStage = "dungeonSelected";
  }
  state.partyEditorMode = "dungeon";
  state.selectedDungeon = dungeonId;
  els.selectedDungeonName.textContent = dungeon.name;
  els.diveButton.hidden = false;
  renderParty();
  renderDungeonBossSummary();
  els.partyDialog.showModal();
}

function openPartyManager() {
  state.partyEditorMode = "manage";
  els.selectedDungeonName.textContent = "パーティー編成";
  els.diveButton.hidden = true;
  renderParty();
  renderDungeonBossSummary();
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
    traitOverride: null,
    escaped: false,
    escapeChecked: false,
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
  const chargeMultiplier = attacker.nextAttackMultiplier ?? 1;
  attacker.nextAttackMultiplier = 1;
  const damage = Math.max(1, Math.round(
    effectivePower(attacker) * moveMultiplier * chargeMultiplier
      * randomMultiplier * criticalMultiplier * effectiveness
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
    "ライト": "flash",
    "毒の牙": "poisonFang",
    "火炎ハンマー": "fireHammer",
    "キラキラさせ機": "glitterMachine",
    "電気ショック": "electricShock",
    "舐める": "lick",
    "闇討ち": "ambush",
    "ためる": "charge",
    "癒しの水": "healingWater",
    "毒の息": "poisonBreath",
    "スライムプレス": "slimePress"
  }[moveName] ?? "attack";
}

function traitKey(fighter) {
  const traitName = fighter.traitOverride ?? fighter.monster.trait;
  return {
    "名称未設定": fighter.monster.speciesNo === 4 ? "firstGuard" : "dodge",
    "焼きたがり": "burnHunter",
    "甘々": "sweet",
    "ヤニ": "resin",
    "根気": "grit",
    "ぷるぷる": "jelly",
    "怨念": "grudge",
    "発光": "dodge",
    "隠れる": "dodge",
    "泡": "firstGuard",
    "加速": "accelerate",
    "ぬめぬめ": "slimy",
    "霧隠れ": "mistDodge",
    "頑丈": "sturdy",
    "幸運": "lucky",
    "アンデッド": "undead",
    "王の威厳": "royal",
    "ゾンビ": "zombie"
  }[traitName] ?? "none";
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
    fighter.traitOverride = null;
    fighter.nextAttackMultiplier = 1;
  });
}

function triggerEntryTrait(fighter, opponents) {
  if (!fighter) return;
  const key = traitKey(fighter);
  if (key === "sweet") {
    appendBattleLog(`${fighterLogName(fighter)}の特性「甘々」が発動`, "trait");
    living(opponents).forEach((opponent) => changeStage(opponent, "power", -1));
  }
  if (key === "slimy") {
    appendBattleLog(`${fighterLogName(fighter)}の特性「ぬめぬめ」が発動`, "trait");
    living(opponents).forEach((opponent) => changeStage(opponent, "star", -1));
  }
  if (key === "lucky") {
    const gaugeKey = gaugeKeyForFighter(
      fighter,
      state.battleIndex < rushBattleCount()
    );
    state[gaugeKey] = Math.min(MAX_BATTLE_GAUGE, state[gaugeKey] + 3);
    appendBattleLog(`${fighterLogName(fighter)}の特性「幸運」でGが3増えた`, "trait");
  }
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
  const defenderTrait = traitKey(defender);
  const dodgeRate = defenderTrait === "mistDodge"
    ? 0.25
    : defenderTrait === "dodge"
      ? 0.1
      : 0;
  if (dodgeRate && Math.random() < dodgeRate) {
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
  if (defenderTrait === "sturdy") {
    damage = Math.max(1, damage - 10);
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
    if (traitKey(defender) === "zombie") {
      attacker.traitOverride = "ゾンビ";
      appendBattleLog(`${fighterLogName(attacker)}の特性が「ゾンビ」になった`, "status");
    }
  }
  if (
    wasAlive
    && defender.hp <= 0
    && (
      (traitKey(defender) === "grit" && !defender.endured)
      || (traitKey(defender) === "undead" && !defender.endured && Math.random() < 0.3)
    )
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
  if (key === "poisonFang" && Math.random() < 0.5) addStatus(target, "poison");
  if (key === "fireHammer") changeStage(attacker, "star", 1);
  if (key === "glitterMachine") {
    const party = state.allies.includes(attacker)
      ? state.allies
      : [...state.enemies, ...state.bossQueue];
    party
      .filter((fighter) => fighter.hp > 0 && !fighter.escaped)
      .forEach((fighter) => changeStage(fighter, "star", 2));
    appendBattleLog(`${fighterLogName(attacker)}のキラキラでパーティー全体のスターが上がった`, "status stat-up");
  }
  if (key === "electricShock" && Math.random() < 0.2) addStatus(target, "paralysis");
  if (key === "lick" && Math.random() < 0.5) addStatus(target, "blind");
  if (key === "ambush") {
    const gaugeKey = gaugeKeyForFighter(target, rush);
    state[gaugeKey] = Math.max(0, state[gaugeKey] - 1);
  }
  if (key === "charge") attacker.nextAttackMultiplier = 3;
  if (key === "healingWater") {
    const party = state.allies.includes(attacker) ? state.allies : state.enemies;
    living(party).forEach((fighter) => {
      fighter.statuses = {};
      healFighter(fighter, fighter.maxHp / 4, "「癒しの水」");
    });
  }
  if (key === "poisonBreath" && Math.random() < 0.5) addStatus(target, "poison");
  if (key === "slimePress") changeStage(target, "damage", 1);
  if (!result.nonDamage && !result.missed && traitKey(attacker) === "accelerate") {
    const gaugeKey = gaugeKeyForFighter(attacker, rush);
    state[gaugeKey] = Math.min(MAX_BATTLE_GAUGE, state[gaugeKey] + 1);
  }
  if (!result.nonDamage && !result.missed && traitKey(attacker) === "royal" && Math.random() < 0.25) {
    addStatus(target, "flinch");
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
  state.selectedLeftMoveIndex = 0;
  state.awaitingReplacement = false;
  if (state.tutorialStage === "dungeonSelected" && state.selectedDungeon === "warawara") {
    state.tutorialStage = "rushIntro";
  }
  showView("battleView");
  startBattleRound();
}

function configuredEnemy(speciesNo, level, hpMultiplier = 1, boss = false, options = {}) {
  state.discoveredSpecies.add(speciesNo);
  const monster = createMonster(0, speciesNo, level, options);
  const fighter = makeFighter(monster, true, boss);
  fighter.maxHp = Math.max(1, Math.round(fighter.maxHp * hpMultiplier));
  fighter.hp = fighter.maxHp;
  return fighter;
}

function currentDungeon() {
  return DUNGEON_CONFIG[state.selectedDungeon] ?? DUNGEON_CONFIG.warawara;
}

function battleThemeForDungeon(dungeonId = state.selectedDungeon) {
  const themeMap = {
    warawara: "forest",
    beginner: "hall",
    plain: "field",
    sweetHome: "sweet",
    alley: "alley",
    geniusShape: "lab",
    zombieTown: "night",
    happyPersistence: "fairy",
    endlessFlame: "flame"
  };
  const dungeon = DUNGEON_CONFIG[dungeonId];
  if (dungeon?.category === "trial") return "trial";
  if (dungeon?.category === "special") return "arena";
  return themeMap[dungeonId] ?? "field";
}

function applyBattleTheme() {
  if (els.battleView) els.battleView.dataset.battleTheme = battleThemeForDungeon();
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

function currentLeftMove(monster) {
  if (!monster) return null;
  const moves = monster.leftMoves?.length
    ? monster.leftMoves
    : [{
        name: monster.leftMove,
        multiplier: monster.leftMoveMultiplier,
        attribute: monster.leftMoveAttribute,
        gauge: monster.leftMoveGauge,
        effect: monster.leftMoveEffect
      }];
  const index = Math.min(Math.max(0, state.selectedLeftMoveIndex || 0), moves.length - 1);
  if (index !== state.selectedLeftMoveIndex) state.selectedLeftMoveIndex = index;
  return moves[index] ?? moves[0] ?? null;
}

function leftMoveByIndex(monster, index) {
  return monster?.leftMoves?.[index] ?? null;
}

function moveTooltipText(move, fallbackEffect = "") {
  if (!move) return fallbackEffect;
  return [
    `属性 ${move.attribute ?? "無"}`,
    `消費G ${Math.max(0, Number(move.gauge) || 0)}`,
    move.effect ?? fallbackEffect
  ].join(" / ");
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
    `${mode === "rush" ? "ラッシュバトル" : "ガチバトル"}速度 ${speed}倍`
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
  applyBattleTheme();
  window.clearInterval(state.rushTimer);
  if (!boss) {
    startRushBattle();
    return;
  }
  state.bossQueue = dungeon.bosses.map((bossConfig) => {
    const fighter = configuredEnemy(
      bossConfig.species,
      bossConfig.level,
      bossConfig.hpMultiplier,
      true,
      {
        iv: bossConfig.iv ?? dungeon.enemyIv,
        ivRange: bossConfig.ivRange ?? dungeon.enemyIvRange,
        ...(!(bossConfig.iv ?? dungeon.enemyIv)
          && !(bossConfig.ivRange ?? dungeon.enemyIvRange)
          ? { fixedIv: 0 }
          : {}),
        talent: bossConfig.talent ?? 0,
        trainingBonus: bossConfig.trainingBonus ?? 0
      }
    );
    fighter.switchAtLowHp = Boolean(bossConfig.switchAtLowHp);
    fighter.pinchSwitchUsed = false;
    return fighter;
  });
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
  appendBattleLog("ガチバトル開始", "section");
  appendBattleLog(`味方パーティー：${state.allies.map((fighter) => fighter.name).join(" / ")}`, "lineup ally");
  appendBattleLog(`敵パーティー：${state.enemies.map((fighter) => fighter.name).join(" / ")}`, "lineup enemy");
  applyBattleEntryTraits("boss");
  appendBattleLog("ページを左右にスワイプして技を選ぶ");
  renderBattleStatuses();
  if (state.tutorialStage === "rushRunning") {
    state.battleLocked = true;
    showTutorialMessage(
      "ガチバトルではモンスターを1体ずつ繰り出すよ！\n右技と左技を選び、相手を全員倒そう！",
      () => {
        state.tutorialStage = "bossRunning";
        state.battleLocked = false;
        setBattleMessage("あなたのターン");
      },
      "ガチバトル開始"
    );
  }
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
  return fighters.filter((fighter) => fighter.hp > 0 && !fighter.escaped);
}

function startRushBattle() {
  const dungeon = currentDungeon();
  const rushConfig = dungeon.rushes[state.battleIndex];
  const speciesNumbers = rushConfig.species
    ?? Array.from(
      { length: rushConfig.count },
      () => pick(rushConfig.speciesPool)
    );
  state.enemies = speciesNumbers.map((speciesNo, index) => configuredEnemy(
    speciesNo,
    rushConfig.levels?.[index] ?? rushConfig.level,
    rushConfig.hpMultiplier,
    false,
    {
      iv: rushConfig.iv ?? dungeon.enemyIv,
      ivRange: rushConfig.ivRange ?? dungeon.enemyIvRange,
      ...(!(rushConfig.iv ?? dungeon.enemyIv)
        && !(rushConfig.ivRange ?? dungeon.enemyIvRange)
        ? { fixedIv: 0 }
        : {}),
      talent: rushConfig.talents?.[index] ?? rushConfig.talent ?? 0,
      trainingBonus: rushConfig.trainingBonuses?.[index] ?? rushConfig.trainingBonus ?? 0
    }
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
  if (state.tutorialStage === "rushIntro") {
    state.battleLocked = true;
    showTutorialMessage(
      "ラッシュバトルはモンスターたちが自動で戦うよ！\nHPとバトルログを見ながら応援しよう！",
      () => {
        state.tutorialStage = "rushRunning";
        state.battleLocked = false;
        startRushTimer();
      },
      "ラッシュ開始"
    );
  } else {
    startRushTimer();
  }
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
  if (
    attackingSide === "enemy"
    && attacker.monster.escapeChance > 0
    && !attacker.escapeChecked
  ) {
    attacker.escapeChecked = true;
    if (Math.random() < attacker.monster.escapeChance) {
      attacker.escaped = true;
      appendBattleLog(`${fighterLogName(attacker)}は逃げ出した`, "status");
      showBattleStatusEffect(attacker, "逃走", "dodge");
      state.rushSide = "ally";
      renderRushHp();
      resolveRushBattle();
      return;
    }
  }
  if (actionBlocked(attacker)) {
    finishFighterAction(attacker);
    state.rushSide = state.rushSide === "ally" ? "enemy" : "ally";
    renderRushHp();
    resolveRushBattle();
    return;
  }
  const move = chooseRushMove(attacker, attackingSide);
  const key = moveKey(move.name);
  const nonDamageMove = ["shine", "grow", "cling", "glitterMachine", "charge", "healingWater"].includes(key);
  const missed = !nonDamageMove && moveMissed(attacker);
  const result = missed
    ? { damage: 0, critical: false, effectiveness: 1, missed: true }
    : calculateDamage(attacker, target, move.multiplier, move.attribute);
  animateRushAttack(attacker, target, state.rushSide, () => {
    const affectedTargets = ["flash", "poisonBreath"].includes(key) ? [...targets] : [target];
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
  if (result.critical) {
    showCriticalImpact(fighterElement, targetElement);
    window.setTimeout(() => popup.remove(), 950);
  } else {
    battleTimeout(() => popup.remove(), 800, "rush");
  }
}

function showCriticalImpact(anchor, targetElement) {
  if (!anchor) return;
  anchor.classList.remove("critical-impact");
  targetElement?.classList.remove("critical-hit");
  void anchor.offsetWidth;
  anchor.classList.add("critical-impact");
  targetElement?.classList.add("critical-hit");
  const label = document.createElement("span");
  label.className = "critical-impact-label";
  label.textContent = "CRITICAL!";
  anchor.appendChild(label);
  window.setTimeout(() => {
    label.remove();
    anchor.classList.remove("critical-impact");
    targetElement?.classList.remove("critical-hit");
  }, 900);
}

function showBossDamage(target, result) {
  if (result.damage <= 0) return;
  const isAlly = state.allies.some((fighter) => fighter.id === target.id);
  const targetElement = isAlly ? els.allyMonster : els.enemyMonster;
  const anchor = targetElement?.closest(".combatant") ?? els.manualBattleField;
  if (!anchor) return;
  const popup = document.createElement("span");
  popup.className = `boss-damage-number${result.critical ? " critical" : ""}`;
  popup.textContent = `-${result.damage}`;
  anchor.appendChild(popup);
  if (result.critical) {
    showCriticalImpact(anchor, targetElement);
    window.setTimeout(() => popup.remove(), 1100);
  } else {
    battleTimeout(() => popup.remove(), 900, "boss");
  }
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
        ? "ラッシュ突破。ガチバトルが始まる"
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
  renderBattleUi();
  return;
  els.testClearButton.textContent = "TEST: ガチバトル突破";
  els.battleKind.textContent = "GACHI BATTLE";
  const dungeon = currentDungeon();
  els.battleTitle.textContent = dungeon.name;
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
  updateBossMoveAvailability();
  renderBench();
  renderBattleHp();
}

function renderBattleUi() {
  els.testClearButton.textContent = "TEST: ガチバトル突破";
  els.battleKind.textContent = "GACHI BATTLE";
  const dungeon = currentDungeon();
  els.battleTitle.textContent = dungeon.name;
  renderBattleDots();
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  if (!ally || !enemy) return;
  const leftMove = currentLeftMove(ally.monster);
  els.enemyName.textContent = enemy.name;
  els.allyName.textContent = ally.name;
  els.leftMoveCallout.textContent = leftMove?.name ?? ally.monster.leftMove;
  els.rightMoveCallout.textContent = ally.monster.rightMove;
  els.leftMoveGuide.textContent = leftMove?.name ?? ally.monster.leftMove;
  els.rightMoveGuide.textContent = ally.monster.rightMove;
  els.leftMoveButton.dataset.meta = `G${Math.max(0, Number(leftMove?.gauge) || 0)}`;
  els.rightMoveButton.dataset.meta = `x${ally.monster.rightMoveMultiplier}`;
  els.leftMoveButton.dataset.attribute = leftMove?.attribute ?? ally.monster.leftMoveAttribute ?? "無";
  els.rightMoveButton.dataset.attribute = ally.monster.rightMoveAttribute ?? "無";
  els.leftMoveTooltip.textContent = moveTooltipText(leftMove, ally.monster.leftMoveEffect);
  els.rightMoveTooltip.textContent = moveTooltipText({
    name: ally.monster.rightMove,
    attribute: ally.monster.rightMoveAttribute,
    gauge: 0,
    effect: ally.monster.rightMoveEffect
  });
  els.leftMoveButton.setAttribute(
    "aria-label",
    `${leftMove?.name ?? ally.monster.leftMove} ${els.leftMoveTooltip.textContent}`
  );
  els.rightMoveButton.setAttribute(
    "aria-label",
    `${ally.monster.rightMove} ${els.rightMoveTooltip.textContent}`
  );
  applyBattleMonsterStyle(els.enemyMonster, enemy.monster);
  applyBattleMonsterStyle(els.allyMonster, ally.monster);
  updateBossMoveAvailability();
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
  els.allyHpValue.textContent = `${Math.max(0, ally.hp)} / ${ally.maxHp}`;
  els.enemyHpValue.textContent = `${Math.max(0, enemy.hp)} / ${enemy.maxHp}`;
  setBattleGauge(els.allyGauge, els.allyGaugeValue, state.allyPartyGauge);
  setBattleGauge(els.enemyGauge, els.enemyGaugeValue, state.enemyPartyGauge);
  updateBossMoveAvailability();
  renderBench();
  renderBattleStatuses();
}

function updateBossMoveAvailability() {
  const ally = state.allies[state.activeAllyIndex];
  if (!ally || !els.leftMoveButton) return;
  const leftMove = currentLeftMove(ally.monster);
  const gaugeCost = Math.max(0, Number(leftMove?.gauge) || 0);
  const paralyzed = Boolean(ally.statuses.paralysis);
  const leftMoveReady = !state.battleLocked
    && !state.awaitingReplacement
    && !paralyzed
    && state.allyPartyGauge >= gaugeCost;
  els.leftMoveButton.classList.toggle("move-ready", leftMoveReady);
  els.leftMoveButton.classList.toggle("move-disabled", paralyzed);
  els.leftMoveButton.disabled = paralyzed;
  els.rightMoveButton.disabled = false;
  els.leftMoveCallout.classList.toggle("move-ready", leftMoveReady);
  els.leftMoveCallout.classList.toggle("move-disabled", paralyzed);
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
    battleTimeout(() => popup.remove(), 1300, "rush");
    return;
  }
  els.bossEffectText.hidden = false;
  els.bossEffectText.className = `battle-effect-text ${result.effectiveness > 1 ? "strong" : "weak"}`;
  els.bossEffectText.textContent = text;
  window.clearTimeout(state.effectivenessTimer);
  state.effectivenessTimer = battleTimeout(() => {
    els.bossEffectText.hidden = true;
  }, 1450, "boss");
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

function renderBenchUi() {
  els.replacementPrompt.hidden = !state.awaitingReplacement;
  const active = state.allies[state.activeAllyIndex];
  const secondLeftMove = leftMoveByIndex(active?.monster, 1);
  const selected = state.selectedLeftMoveIndex === 1 && secondLeftMove;
  const left2Disabled = !secondLeftMove
    || state.battleLocked
    || state.awaitingReplacement
    || active?.hp <= 0;
  const left2Button = `
    <button class="bench-button left2-toggle ${selected ? "selected" : ""}"
      data-left2-toggle type="button" ${left2Disabled ? "disabled" : ""}>
      <span class="left2-toggle-mark">左技2</span>
      <span class="bench-copy">
        <strong>${secondLeftMove?.name ?? "なし"}</strong>
        <span>${secondLeftMove ? `G${Math.max(0, Number(secondLeftMove.gauge) || 0)} / ${secondLeftMove.attribute ?? "無"}` : "左技2なし"}</span>
      </span>
    </button>`;
  const benchButtons = state.allies.map((fighter, index) => {
    if (index === state.activeAllyIndex) return "";
    const percent = Math.max(0, Math.round((fighter.hp / fighter.maxHp) * 100));
    const selectableReplacement = state.awaitingReplacement && fighter.hp > 0;
    const disabled = fighter.hp <= 0 || (state.battleLocked && !selectableReplacement);
    return `
      <button class="bench-button ${selectableReplacement ? "replacement-choice" : ""}"
        data-bench-index="${index}" type="button" ${disabled ? "disabled" : ""}>
        <div class="mini-monster" style="${monsterStyle(fighter.monster)}"></div>
        <span class="bench-copy">
          <strong>${fighter.name}</strong>
          <span>HP ${fighter.hp} / ${fighter.maxHp} (${percent}%)</span>
        </span>
      </button>`;
  }).join("");
  els.bench.innerHTML = left2Button + benchButtons;
}

function renderBench() {
  renderBenchUi();
  return;
  els.replacementPrompt.hidden = !state.awaitingReplacement;
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
          <span>HP ${fighter.hp} / ${fighter.maxHp}（${percent}%）</span>
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

function switchEnemyAtLowHp() {
  const enemy = state.enemies[0];
  if (
    !enemy
    || !enemy.switchAtLowHp
    || enemy.pinchSwitchUsed
    || enemy.hp <= 0
    || enemy.hp / enemy.maxHp > 0.25
    || state.bossQueue.length === 0
  ) return false;

  enemy.pinchSwitchUsed = true;
  const nextEnemy = state.bossQueue.shift();
  state.bossQueue.push(enemy);
  state.enemies = [nextEnemy];
  resetFighterStatChanges(enemy);
  appendBattleLog(
    `${fighterLogName(enemy)}はピンチになり、${fighterLogName(nextEnemy)}と交代した`,
    "section enemy"
  );
  triggerEntryTrait(nextEnemy, [state.allies[state.activeAllyIndex]]);
  state.battleLocked = false;
  renderBattle();
  renderBattleHp();
  setBattleMessage(`相手が${nextEnemy.name}に交代。あなたのターン`);
  return true;
}

function useMove(direction) {
  if (state.battleLocked) return;
  const ally = state.allies[state.activeAllyIndex];
  const enemy = state.enemies[0];
  if (!ally || ally.hp <= 0 || !enemy || enemy.hp <= 0) return;
  if (switchEnemyAtLowHp()) return;
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
        setBattleMessage("次のモンスターを選んでください");
      }
    } else {
      battleTimeout(enemyTurn, 520, "boss");
    }
    return;
  }

  const right = direction === "right";
  const leftMove = currentLeftMove(ally.monster);
  const moveName = right ? ally.monster.rightMove : (leftMove?.name ?? ally.monster.leftMove);
  const key = moveKey(moveName);
  const rollBonus = !right && key === "roll" ? ally.rollUses * 0.1 : 0;
  const multiplier = right
    ? ally.monster.rightMoveMultiplier
    : (leftMove?.multiplier ?? ally.monster.leftMoveMultiplier) + rollBonus;
  const moveAttribute = right
    ? ally.monster.rightMoveAttribute
    : (leftMove?.attribute ?? ally.monster.leftMoveAttribute);
  const gaugeCost = right ? 0 : Math.max(0, Number(leftMove?.gauge) || 0);
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
  renderBattleHp();
  const nonDamageMove = ["shine", "grow", "cling", "glitterMachine", "charge", "healingWater"].includes(key);
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
        showBossDamage(enemy, finalResult);
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
          setBattleMessage("次のモンスターを選んでください");
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
    renderBattleHp();
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
  const nonDamageMove = ["shine", "grow", "cling", "glitterMachine", "charge", "healingWater"].includes(key);
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
      showBossDamage(ally, finalResult);
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
        setBattleMessage("次のモンスターを選んでください");
      }, 700, "boss");
    } else {
      battleTimeout(() => {
        state.battleLocked = false;
        renderBattleHp();
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
    state.selectedLeftMoveIndex = 0;
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
  state.selectedLeftMoveIndex = 0;
  renderBattle();
  setBattleMessage(`【味方】${fighter.name}に交代した`);
  triggerEntryTrait(fighter, state.enemies);
  renderBattleHp();
  battleTimeout(() => {
    if (switchEnemyAtLowHp()) return;
    enemyTurn();
  }, 600, "boss");
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
    appendBattleLog("ガチバトル勝利", "result");
    state.gold += battleGold;
    appendBattleLog(`${battleGold} Goldを獲得した`, "reward");
    updateResources();
    showExperienceReward(experienceAwards, "ガチバトル勝利", () => finishDungeon(true));
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
    Array.isArray(selectedMonster.level)
      ? randomInt(selectedMonster.level[0], selectedMonster.level[1])
      : selectedMonster.level,
    {
      ...(selectedMonster.rank ? { rankName: selectedMonster.rank } : {}),
      ...(selectedMonster.talent ? { talent: selectedMonster.talent } : {}),
      ...(selectedMonster.iv ? { iv: selectedMonster.iv } : {}),
      ...(selectedMonster.trainingBonus
        ? { trainingBonus: selectedMonster.trainingBonus }
        : {})
    }
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
  if (cleared && state.tutorialStage === "bossRunning") {
    showTutorialMessage(
      "マッチ申請が来ているよ！\nショップでケージを用意してモンスターとマッチしよう！",
      () => {
        state.tutorialStage = "done";
        els.tutorialSkipButton.hidden = true;
        updateResources();
      },
      "わかった"
    );
  }
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

function pairHistoryCounts(node) {
  if (!node?.pairing) return { pairings: 0, monsters: 1 };
  const base = pairHistoryCounts(node.pairing.base);
  const partner = pairHistoryCounts(node.pairing.partner);
  return {
    pairings: 1 + base.pairings + partner.pairings,
    monsters: 1 + base.monsters + partner.monsters
  };
}

function hasLegacyPairTraining(monster) {
  return !monster?.pairLineage && Object.values(monster?.trainingBonus ?? {})
    .some((value) => Number(value) > 0);
}

function pairHistoryMonsterStyle(monster) {
  return [
    `--mini-bg:${monster.background ?? "#e7f4ef"}`,
    `--mini-color:${monster.color ?? "#76c6a7"}`,
    `--mini-radius:${monster.bodyRadius ?? "50%"}`
  ].join(";");
}

function pairHistoryNodeMarkup(node, role = "継承個体") {
  if (!node?.monster) return "";
  const monster = node.monster;
  const pairing = node.pairing;
  const eventDate = pairing?.trainedAt
    ? new Date(pairing.trainedAt).toLocaleDateString("ja-JP")
    : "";
  return `
    <div class="lineage-tree">
      <article class="lineage-monster-card">
        <span class="lineage-role">${role}</span>
        <span class="mini-monster" style="${pairHistoryMonsterStyle(monster)}"></span>
        <strong>${monster.name}</strong>
        <span>Lv ${monster.level} / ${monster.rankName}</span>
        <b>SP ${monster.sp}</b>
        <small>才能 ${monster.talent}</small>
      </article>
      ${pairing ? `
        <div class="lineage-event">
          <strong>${pairing.evolved ? "進化ペアトレ" : "ペアトレ"}</strong>
          ${eventDate ? `<span>${eventDate}</span>` : ""}
        </div>
        <div class="lineage-branches">
          <div class="lineage-branch">
            ${pairHistoryNodeMarkup(pairing.base, "ベース")}
          </div>
          <div class="lineage-branch">
            ${pairHistoryNodeMarkup(pairing.partner, "ペア相手")}
          </div>
        </div>
      ` : ""}
    </div>`;
}

function openPairHistoryDialog() {
  const monster = currentDetailMonster();
  if (!monster) return;
  els.pairHistoryTitle.textContent = `${monster.name}の系譜`;
  if (!monster.pairLineage) {
    const legacyTraining = hasLegacyPairTraining(monster);
    els.pairHistoryCaption.textContent = legacyTraining
      ? "旧バージョンで行ったペアトレの詳細は保存されていません。"
      : "このモンスターはまだペアトレをしていません。";
    els.pairHistoryViewport.innerHTML = `
      <div class="pair-history-empty">
        <span class="mini-monster" style="${monsterStyle(monster)}"></span>
        <strong>${monster.name}</strong>
        <p>${legacyTraining
          ? "特訓済みであることは確認できます。次回のペアトレから、相手とその祖先まで系譜に記録されます。"
          : "最初のペアトレを行うと、ここから系譜が記録されます。"}</p>
      </div>`;
  } else {
    const root = {
      monster: pairLineageIdentity(monster),
      pairing: monster.pairLineage
    };
    const counts = pairHistoryCounts(root);
    els.pairHistoryCaption.textContent =
      `ペアトレ ${counts.pairings}回 / 系譜に残る個体 ${counts.monsters}体`;
    els.pairHistoryViewport.innerHTML = `
      <div class="pair-history-canvas">${pairHistoryNodeMarkup(root, "現在")}</div>`;
    els.pairHistoryViewport.scrollLeft = Math.max(
      0,
      (els.pairHistoryViewport.scrollWidth - els.pairHistoryViewport.clientWidth) / 2
    );
  }
  els.pairHistoryDialog.showModal();
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
  state.discoveredSpecies.add(monster.speciesNo);
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
  updateResources();
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
  const cageType = keep ? preferredCageType(monster) : null;
  if (keep && !cageType) {
    snapCardBack();
    els.matchCageStatus.classList.remove("notice");
    void els.matchCageStatus.offsetWidth;
    els.matchCageStatus.classList.add("notice");
    return;
  }
  if (keep && state.friends.length >= MAX_FRIENDS) {
    state.pendingRecruit = monster;
    state.pendingRecruitCageType = cageType;
    snapCardBack();
    openReplaceDialog();
    return;
  }
  state.requestLocked = true;
  animateCardOut(keep);
  if (keep) {
    addFriendDirect(monster);
    consumeCage(cageType);
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
  const legacyHistory = hasLegacyPairTraining(monster);
  const hasHistory = Boolean(monster.pairLineage) || legacyHistory;
  els.openPairHistory.classList.toggle("has-history", hasHistory);
  els.openPairHistory.setAttribute(
    "aria-label",
    monster.pairLineage
      ? "ペアトレ履歴あり"
      : legacyHistory
        ? "旧データのペアトレ履歴あり"
        : "ペアトレ履歴なし"
  );
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
  const firstOwned = !state.ownedSpecies.has(matchedMonster.speciesNo);
  state.discoveredSpecies.add(matchedMonster.speciesNo);
  state.ownedSpecies.add(matchedMonster.speciesNo);
  if (firstOwned) state.newCodexSpecies.add(matchedMonster.speciesNo);
  consumeCage(state.pendingRecruitCageType);
  state.partyPresets = state.partyPresets.map((preset) => preset.map((monsterId) => monsterId === id ? null : monsterId));
  state.profileMonsterIds = state.profileMonsterIds.map((monsterId) => monsterId === id ? null : monsterId);
  state.partyIds = [...state.partyPresets[state.activePresetIndex]];
  state.pendingRecruit = null;
  state.pendingRecruitCageType = null;
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
  els.pairBaseSlot.addEventListener("click", () => openPairPicker("base"));
  els.pairPartnerSlot.addEventListener("click", () => openPairPicker("partner"));
  els.pairTrainingStart.addEventListener("click", startPairTraining);
  els.closePairPicker.addEventListener("click", () => els.pairPickerDialog.close());
  els.pairPickerDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.pairPickerDialog)) {
      els.pairPickerDialog.close();
      return;
    }
    const button = event.target.closest("[data-pair-monster-id]");
    if (button) openPairAction(button.dataset.pairMonsterId);
  });
  els.pairPickerSort.addEventListener("change", () => {
    state.pairPickerSort = els.pairPickerSort.value;
    openPairPicker(state.pairPickerMode);
    scheduleAutosave();
  });
  els.pairPickerAttributeFilter.addEventListener("change", () => {
    state.pairPickerAttributeFilter = els.pairPickerAttributeFilter.value;
    openPairPicker(state.pairPickerMode);
    scheduleAutosave();
  });
  els.closePairAction.addEventListener("click", closePairAction);
  els.pairActionDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.pairActionDialog)) closePairAction();
  });
  els.pairActionDetailButton.addEventListener("click", showPairActionDetail);
  els.pairActionSelectButton.addEventListener("click", confirmPairActionSelection);
  els.declinePairEvolution.addEventListener("click", () => finishPairTraining(false));
  els.acceptPairEvolution.addEventListener("click", () => finishPairTraining(true));
  els.closePairResult.addEventListener("click", () => els.pairResultDialog.close());
  els.pairResultDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.pairResultDialog)) els.pairResultDialog.close();
  });
  els.dungeonCategoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-dungeon-category]");
    if (!button) return;
    if (button.dataset.dungeonCategory === "special" && state.playerLevel < 5) return;
    state.dungeonCategory = button.dataset.dungeonCategory;
    renderDungeonLists();
    scheduleAutosave();
  });
  els.buyCageButton.addEventListener("click", buyCage);
  els.buyCageFButton.addEventListener("click", buyCageF);
  els.buyCageEButton.addEventListener("click", buyCageE);
  els.buyExp500DrinkButton.addEventListener("click", buyExp500Drink);
  els.useExp500DrinkButton.addEventListener(
    "click",
    () => openExpDrinkDialog(EXP_500_DRINK_AMOUNT)
  );
  els.buyExpDrinkButton.addEventListener("click", buyExpDrink);
  els.useExpDrinkButton.addEventListener(
    "click",
    () => openExpDrinkDialog(EXP_DRINK_AMOUNT)
  );
  els.buyExpMistButton.addEventListener("click", buyExpMist);
  els.useExpMistButton.addEventListener("click", useExpMist);
  els.buyCatalogChangeButton.addEventListener("click", buyCatalogChange);
  els.useCatalogChangeButton.addEventListener("click", useCatalogChange);
  els.buyHeartPlusButton.addEventListener("click", buyHeartPlus);
  els.closeExpDrinkDialog.addEventListener("click", () => els.expDrinkDialog.close());
  els.expDrinkDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.expDrinkDialog)) els.expDrinkDialog.close();
  });
  els.expDrinkRoster.addEventListener("click", (event) => {
    const button = event.target.closest("[data-drink-target]");
    if (button) useExpDrinkOnMonster(button.dataset.drinkTarget);
  });
  els.expDrinkSort.addEventListener("change", () => {
    state.expDrinkSort = els.expDrinkSort.value;
    renderExpDrinkDialog();
    scheduleAutosave();
  });
  els.expDrinkAttributeFilter.addEventListener("change", () => {
    state.expDrinkAttributeFilter = els.expDrinkAttributeFilter.value;
    renderExpDrinkDialog();
    scheduleAutosave();
  });
  els.openPartyEditorButton.addEventListener("click", openPartyManager);
  els.openCodexButton.addEventListener("click", openCodex);
  els.closeCodexButton.addEventListener("click", closeCodex);
  els.codexGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-codex-no]");
    if (button) openCodexDetail(Number(button.dataset.codexNo));
  });
  els.closeCodexDetail.addEventListener("click", () => els.codexDetailDialog.close());
  els.codexDetailDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.codexDetailDialog)) els.codexDetailDialog.close();
  });
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
  els.openDungeonDetails.addEventListener("click", openDungeonDetails);
  els.closeDungeonDetails.addEventListener("click", () => els.dungeonDetailDialog.close());
  els.dungeonDetailDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.dungeonDetailDialog)) {
      els.dungeonDetailDialog.close();
    }
  });
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
  els.profilePickerSort.addEventListener("change", () => {
    state.profilePickerSort = els.profilePickerSort.value;
    openProfilePicker(state.editingProfileSlot);
    scheduleAutosave();
  });
  els.profilePickerAttributeFilter.addEventListener("change", () => {
    state.profilePickerAttributeFilter = els.profilePickerAttributeFilter.value;
    openProfilePicker(state.editingProfileSlot);
    scheduleAutosave();
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
    state.selectedOutgoingCageType = null;
    els.cageSelectDialog.close();
  });
  [els.standardCageChoice, els.fCageChoice, els.eCageChoice].forEach((choice) => {
    choice.addEventListener("click", () => {
      if (choice.disabled) return;
      state.selectedOutgoingCageType = choice.dataset.cageType;
      els.standardCageChoice.classList.toggle(
        "selected",
        state.selectedOutgoingCageType === "G"
      );
      els.fCageChoice.classList.toggle(
        "selected",
        state.selectedOutgoingCageType === "F"
      );
      els.eCageChoice.classList.toggle(
        "selected",
        state.selectedOutgoingCageType === "E"
      );
      const monster = state.outgoingCandidates.find(
        (candidate) => candidate.id === state.pendingOutgoingMonsterId
      );
      if (monster) updateOutgoingCageConfirmation(monster);
    });
  });
  els.cageSelectDialog.addEventListener("click", (event) => {
    if (!clickedDialogBackdrop(event, els.cageSelectDialog)) return;
    state.pendingOutgoingMonsterId = null;
    state.selectedOutgoingCageType = null;
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
    const left2Toggle = event.target.closest("[data-left2-toggle]");
    if (left2Toggle) {
      const active = state.allies[state.activeAllyIndex];
      if (!left2Toggle.disabled && leftMoveByIndex(active?.monster, 1)) {
        state.selectedLeftMoveIndex = state.selectedLeftMoveIndex === 1 ? 0 : 1;
        renderBattle();
      }
      return;
    }
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
  els.openPairHistory.addEventListener("click", openPairHistoryDialog);
  els.closePairHistory.addEventListener("click", () => els.pairHistoryDialog.close());
  els.pairHistoryDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.pairHistoryDialog)) {
      els.pairHistoryDialog.close();
    }
  });
  els.detailDialog.addEventListener("click", (event) => {
    if (clickedDialogBackdrop(event, els.detailDialog)) closeMonsterDetail();
  });
  els.detailDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeMonsterDetail();
  });
  els.cancelReplace.addEventListener("click", () => {
    state.pendingRecruit = null;
    state.pendingRecruitCageType = null;
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
