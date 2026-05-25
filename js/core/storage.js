// ======================
// 💾 STORAGE — Save / Load / Clear
// ======================
// Full schema for MageCV v2
// Wraps localStorage with typed defaults and safe fallbacks.
// ======================

const SAVE_KEY = "magecv_save";

// ======================
// DEFAULT STATE
// ======================

const defaultSave = {
  // --- Mode & Session ---
  mode: "long",               // "demo" | "long"
  targetScore: 0,             // hidden target; never shown to player
  hiddenScore: 0,             // actual accumulated score

  // --- Daily Progress ---
  day: 1,
  resumesSentTotal: 0,        // across all days in this run
  resumesSentToday: 0,

  // --- NPC ---
  npcInteractionsToday: 0,
  npcInteractionsLimit: 2,    // set on new day based on mode
  npcPending: null,           // { npcId, originScreen } — set before redirect to npc.html
  resumesSentAtLastNPC: 0,    // resumesSentTotal value when last NPC interaction completed

  // --- Modifiers ---
  // Each entry: { type, value, duration, remaining }
  // duration: "instant" | "resume" | "day" | "multiday"
  // remaining: number (resumes left, days left, etc.)
  activeModifiers: [],

  // --- Meta ---
  gameStarted: false          // false until New Game is confirmed
};

// ======================
// SAVE
// ======================

function saveGame(stateOverride = {}) {
  const current = loadRaw();
  const merged = Object.assign({}, current, stateOverride);
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn("saveGame failed:", e);
  }
}

// ======================
// LOAD
// ======================

function loadGame() {
  const raw = loadRaw();

  // Push loaded values into global game state variables
  if (typeof mode       !== "undefined") mode                   = raw.mode;
  if (typeof targetScore !== "undefined") targetScore           = raw.targetScore;
  if (typeof hiddenScore !== "undefined") hiddenScore           = raw.hiddenScore;
  if (typeof day        !== "undefined") day                    = raw.day;
  if (typeof resumesSentTotal !== "undefined") resumesSentTotal = raw.resumesSentTotal;
  if (typeof resumesToday !== "undefined") resumesToday         = raw.resumesSentToday;
  if (typeof npcInteractionsToday !== "undefined") npcInteractionsToday = raw.npcInteractionsToday;
  if (typeof npcInteractionsLimit !== "undefined") npcInteractionsLimit = raw.npcInteractionsLimit;
  if (typeof resumesSentAtLastNPC !== "undefined") resumesSentAtLastNPC = raw.resumesSentAtLastNPC;
  if (typeof activeModifiers !== "undefined") activeModifiers   = raw.activeModifiers;
}

// ======================
// RAW READ (returns plain object, no side effects)
// ======================

function loadRaw() {
  try {
    const stored = localStorage.getItem(SAVE_KEY);
    if (!stored) return Object.assign({}, defaultSave);
    const parsed = JSON.parse(stored);
    // Fill in any missing keys from defaultSave (forward-compat)
    return Object.assign({}, defaultSave, parsed);
  } catch (e) {
    console.warn("loadRaw failed, returning defaults:", e);
    return Object.assign({}, defaultSave);
  }
}

// ======================
// CHECK — does a save exist?
// ======================

function hasSave() {
  const raw = loadRaw();
  return raw.gameStarted === true;
}

// ======================
// CLEAR — called on win or new game
// ======================

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.warn("clearSave failed:", e);
  }
}

// ======================
// PARTIAL UPDATE helpers
// (use these for single-field updates without re-reading everything)
// ======================

function saveField(key, value) {
  const current = loadRaw();
  current[key] = value;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn("saveField failed:", e);
  }
}

function readField(key) {
  const raw = loadRaw();
  return raw[key];
}

// ======================
// EXPORTS (global scope for plain HTML/JS)
// ======================

window.saveGame             = saveGame;
window.loadGame             = loadGame;
window.loadRaw              = loadRaw;
window.hasSave              = hasSave;
window.clearSave            = clearSave;
window.saveField            = saveField;
window.readField            = readField;