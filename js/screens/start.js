// ======================
// 🚀 START SCREEN — js/screens/start.js
// ======================
// Responsibilities:
//   — Check if a saved run exists → show Continue button
//   — Handle New Game (Demo / Long) → call startNewGame()
//   — Handle Continue → load save → go to hub
//   — Handle Rules → goRules()
// ======================


// ======================
// PAGE INIT
// ======================

function initStartPage() {

  // If a save exists, reveal the Continue block and populate meta info
  if (typeof hasSave === "function" && hasSave()) {
    showContinueBlock();
  }

  console.log("[Start] Page ready.");
}


// ======================
// CONTINUE BLOCK
// ======================

function showContinueBlock() {
  const block = document.getElementById("continueBlock");
  if (block) block.style.display = "block";

  // Read save to show day + total resumes as context
  if (typeof loadRaw === "function") {
    const save = loadRaw();
    const meta = document.getElementById("continueMeta");
    if (meta) {
      const modeLabel = save.mode === "demo" ? "Demo" : "Long Mode";
      meta.innerText = `Day ${save.day} · ${save.resumesSentTotal} resumes sent · ${modeLabel}`;
    }
  }
}


// ======================
// NEW GAME HANDLERS
// ======================

function onSelectDemo() {
  confirmNewGame("demo");
}

function onSelectLong() {
  confirmNewGame("long");
}

function confirmNewGame(selectedMode) {
  // If a save exists, warn before overwriting
  if (typeof hasSave === "function" && hasSave()) {
    const ok = confirm(
      "Starting a new game will erase your current saved run.\n\nAre you sure?"
    );
    if (!ok) return;
  }

  // Clear any existing save and start fresh
  if (typeof clearSave === "function") clearSave();
  if (typeof clearModifiers === "function") clearModifiers();

  // startNewGame() is in game.js — sets all state, saves, then goHub()
  if (typeof startNewGame === "function") {
    startNewGame(selectedMode);
  } else {
    console.error("[Start] startNewGame() not found. Is game.js loaded?");
  }
}


// ======================
// CONTINUE HANDLER
// ======================

function onContinue() {
  if (typeof loadGame === "function") loadGame();

  // Navigate to hub — save already has gameStarted: true
  if (typeof goHub === "function") {
    goHub();
  } else {
    window.location.href = "hub.html";
  }
}


// ======================
// LAUNCH
// ======================

initStartPage();


// ======================
// EXPORTS
// ======================

window.onSelectDemo  = onSelectDemo;
window.onSelectLong  = onSelectLong;
window.onContinue    = onContinue;