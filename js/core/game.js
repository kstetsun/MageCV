// ======================
// 🎮 GAME STATE
// ======================

let mode = "long";              // "demo" | "long"
let targetScore = 0;            // hidden win target — never shown to player
let hiddenScore = 0;            // actual accumulated score — never shown to player

let day = 1;
let resumesSentTotal = 0;       // total resumes sent across all days
let resumesToday = 0;           // resumes sent today
let npcInteractionsToday = 0;
let npcInteractionsLimit = 2;   // recalculated each new day based on mode
let npcActive = false;
let resumesSentAtLastNPC = 0;   // resumesSentTotal when last NPC interaction completed

let activeModifiers = [];       // managed by modifiers.js


// ======================
// 📐 MODE CONFIG
// Returns the limits for the current mode.
// ======================

const ModeConfig = {
  demo: {
    resumesPerDay: 5,
    npcInteractionsPerDay: () => 2,         // fixed
    targetScore: () => 10                   // fixed
  },
  long: {
    resumesPerDay: 10,
    npcInteractionsPerDay: () => Math.floor(Math.random() * 3) + 1,  // 1–3
    targetScore: () => Math.floor(Math.random() * 31) + 30           // 30–60
  }
};

function getConfig() {
  return ModeConfig[mode] || ModeConfig.long;
}


// ======================
// 🎲 NEW GAME SETUP
// Called once when player picks a mode on start.html.
// Generates hidden target, sets all limits, marks game as started.
// ======================

function startNewGame(selectedMode) {
  mode = selectedMode;

  const config = getConfig();

  targetScore           = config.targetScore();
  hiddenScore           = 0;
  day                   = 1;
  resumesSentTotal      = 0;
  resumesToday          = 0;
  npcInteractionsToday  = 0;
  npcInteractionsLimit  = config.npcInteractionsPerDay();
  resumesSentAtLastNPC  = 0;
  activeModifiers       = [];

  saveGame({
    mode,
    targetScore,
    hiddenScore,
    day,
    resumesSentTotal,
    resumesSentToday:       0,
    npcInteractionsToday:   0,
    npcInteractionsLimit,
    resumesSentAtLastNPC:   0,
    activeModifiers,
    gameStarted:            true
  });

  console.log(`[Game] New game started. Mode: ${mode}. Target: ${targetScore} (hidden).`);

  goHub();
}


// ======================
// 🌅 NEW DAY
// Resets daily counters, ticks modifiers, saves.
// Called from hub.js when player clicks Next Day.
// ======================

function advanceDay() {
  day++;
  resumesToday          = 0;
  npcInteractionsToday  = 0;
  npcInteractionsLimit  = getConfig().npcInteractionsPerDay();

  // Tick day-based modifiers (expire "day" duration, decrement "multiday")
  if (typeof tickDayModifiers === "function") {
    tickDayModifiers();
  }

  saveGame({
    day,
    resumesSentToday:     0,
    npcInteractionsToday: 0,
    npcInteractionsLimit,
    activeModifiers
  });

  console.log(`[Game] Day ${day} started. Resume limit: ${getConfig().resumesPerDay}. NPC limit: ${npcInteractionsLimit}.`);
}


// ======================
// 🏆 WIN CHECK
// Called after every submitResume().
// If hiddenScore >= targetScore, redirect to win screen.
// ======================

function checkWin() {
  if (hiddenScore >= targetScore) {
    console.log(`[Game] Win condition met. Score: ${hiddenScore} / ${targetScore}.`);

    // Save final state before showing win screen
    saveGame({ hiddenScore });

    goWin();
    return true;
  }
  return false;
}


// ======================
// 🔁 NAVIGATION
// All screens live in pages/ — same-folder hrefs.
// ======================

function goHub()    { window.location.href = "hub.html";    }
function goResume() { window.location.href = "resume.html"; }
function goStart()  { window.location.href = "start.html";  }
function goNPC()    { window.location.href = "npc.html";    }
function goWin()    { window.location.href = "win.html";    }
function goRules()  { window.location.href = "rules.html";  }


// ======================
// 🚀 INIT
// Loads saved state into global variables on every page load.
// Called once at bottom of every page's script block.
// ======================

function ensureLoadGameCalled() {
  // Try immediately
  if (typeof loadGame === "function") {
    loadGame();
    return;
  }

  // If storage.js hasn't loaded yet (script order), poll briefly until it appears
  let attempts = 0;
  const maxAttempts = 50; // ~5 seconds
  const interval = setInterval(() => {
    attempts++;
    if (typeof loadGame === "function") {
      loadGame();
      clearInterval(interval);
    } else if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.warn("[Game] loadGame() unavailable after waiting.");
    }
  }, 100);
}

function initGame() {
  ensureLoadGameCalled();

  console.log(`[Game] Init complete. Day: ${day} | Mode: ${mode} | Score: ${hiddenScore} (hidden).`);
}

initGame();


// ======================
// EXPORTS
// ======================

window.mode                   = mode;
window.targetScore            = targetScore;
window.hiddenScore            = hiddenScore;
window.day                    = day;
window.resumesSentTotal       = resumesSentTotal;
window.resumesToday           = resumesToday;
window.npcInteractionsToday   = npcInteractionsToday;
window.npcInteractionsLimit   = npcInteractionsLimit;
window.npcActive              = npcActive;
window.resumesSentAtLastNPC   = resumesSentAtLastNPC;
window.activeModifiers        = activeModifiers;

window.ModeConfig             = ModeConfig;
window.getConfig              = getConfig;
window.startNewGame           = startNewGame;
window.advanceDay             = advanceDay;
window.checkWin               = checkWin;

window.goHub                  = goHub;
window.goResume               = goResume;
window.goStart                = goStart;
window.goNPC                  = goNPC;
window.goWin                  = goWin;
window.goRules                = goRules;