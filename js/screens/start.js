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
  if (typeof hasSave === "function" && hasSave()) {
    showMagicConfirm(() => {
      _startFresh(selectedMode);
    });
    return;
  }
  _startFresh(selectedMode);
}

function _startFresh(selectedMode) {
  if (typeof clearSave === "function") clearSave();
  if (typeof clearModifiers === "function") clearModifiers();
  if (typeof startNewGame === "function") {
    startNewGame(selectedMode);
  } else {
    console.error("[Start] startNewGame() not found. Is game.js loaded?");
  }
}

function showMagicConfirm(onConfirm) {
  const overlay = document.createElement("div");
  overlay.id = "magicWarnOverlay";
  overlay.innerHTML = `
    <div class="mw-backdrop"></div>
    <div class="mw-box" role="dialog" aria-modal="true">
      <div class="mw-sparkle-zone"></div>
      <div class="mw-content">
        <span class="mw-icon" aria-hidden="true">⚗️</span>
        <div class="mw-msg">
          Starting a new game will erase your current saved run.
          <br><br>
          This cannot be undone.
        </div>
        <div class="mw-btns">
          <button class="mw-btn-back">Turn Back</button>
          <button class="mw-btn-erase">Burn It All</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const sparkleZone = overlay.querySelector(".mw-sparkle-zone");
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("div");
    s.className = "mw-sparkle";
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;` +
      `animation-delay:${Math.random()*2.5}s;animation-duration:${2+Math.random()*1.5}s;`;
    sparkleZone.appendChild(s);
  }

  const close = () => overlay.remove();
  overlay.querySelector(".mw-btn-back").addEventListener("click", close);
  overlay.querySelector(".mw-btn-erase").addEventListener("click", () => {
    close();
    onConfirm();
  });
  overlay.querySelector(".mw-backdrop").addEventListener("click", close);
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