// ======================
// 📜 js/screens/npc.js
// Handles both:
//   • Multi-turn dialogue NPCs (Elf) — npc.dialogues exists
//   • Legacy single-turn NPCs (Dwarf, Wizard) — npc.choices flat array
// ======================

// ── DOM refs ──────────────────────────────────────────────────────────────────
let portrait    = null;
let nameEl      = null;
let descEl      = null;
let messageEl   = null;
let choicesEl   = null;
let timerFill   = null;
let skipBtn     = null;
let historyEl   = null;

// ── Session state (never persisted — lives only for this page load) ──────────
let currentNPC        = null;
let originScreen      = "hub.html";

// Multi-turn state (Elf only)
let currentDialogue   = null;   // full dialogue tree object
let currentNode       = null;   // current node object
let accumulatedScore  = 0;      // running score total across all turns
let turnCount         = 0;      // track turn number (0 = first turn)
let conversationHistory = [];   // array of { type: "npc" | "player", text: "..." }

// Timer state
let timerInterval     = null;
let timerSeconds      = 0;
let timerMax          = 30;

// ── Boot ──────────────────────────────────────────────────────────────────────
function initNPCPage() {
  // Initialize DOM refs
  portrait    = document.getElementById("npcPortrait");
  nameEl      = document.getElementById("npcName");
  descEl      = document.getElementById("npcDescription");
  messageEl   = document.getElementById("npcMessage");
  choicesEl   = document.getElementById("npcChoices");
  timerFill   = document.getElementById("timerFill");
  skipBtn     = document.getElementById("npcSkipBtn");
  historyEl   = document.getElementById("npcHistory");

  if (typeof loadGame === "function") loadGame();

  if (typeof hasSave === "function" && !hasSave()) {
    console.log("[NPC] No save found — redirecting to start.html");
    window.location.href = "start.html";
    return;
  }

  if (npcInteractionsToday >= npcInteractionsLimit) {
    console.log("[NPC] Interaction limit reached — returning to origin");
    if (typeof saveField === "function") saveField("npcPending", null);
    returnToOrigin();
    return;
  }

  const save    = (typeof loadRaw === "function") ? loadRaw() : {};
  const pending = save.npcPending;

  console.log("[NPC] initNPCPage() — pending:", pending);

  if (!pending || !pending.npcId) {
    console.log("[NPC] No npcPending found — returning to origin");
    returnToOrigin();
    return;
  }

  originScreen = pending.originScreen || "hub.html";
  currentNPC   = (typeof npcData !== "undefined")
    ? npcData.find(n => n.id === pending.npcId) || null
    : null;

  if (!currentNPC) {
    console.log("[NPC] NPC not found:", pending.npcId);
    returnToOrigin();
    return;
  }

  console.log("[NPC] Starting dialogue with:", currentNPC.name);

  renderNPCIdentity();

  if (currentNPC.dialogues && currentNPC.dialogues.length) {
    startMultiTurnDialogue();
  } else {
    startLegacyDialogue();
  }
}

document.addEventListener("DOMContentLoaded", initNPCPage);

// ── Identity ─────────────────────────────────────────────────────────────────
const PORTRAITS = { elf: "🧝", dwarf: "⛏️", wizard: "🧙" };

function renderNPCIdentity() {
  portrait.textContent  = PORTRAITS[currentNPC.id] || "?";
  nameEl.textContent    = currentNPC.name;
  descEl.textContent    = currentNPC.description;
}

// ── MULTI-TURN DIALOGUE (ELF) ─────────────────────────────────────────────────

function startMultiTurnDialogue() {
  currentDialogue  = getRandomDialogue(currentNPC);
  accumulatedScore = 0;
  turnCount        = 0;
  conversationHistory = [];
  showNode(currentDialogue.nodes[0]);
}

function showNode(node) {
  currentNode = node;
  turnCount++;

  // Add NPC message to history
  conversationHistory.push({
    type: "npc",
    text: node.line
  });

  // Update history display
  renderHistory();

  choicesEl.innerHTML = "";

  if (node.terminal) {
    // Final Elf line — no choices, auto-resolve after a short read pause
    stopTimer();
    skipBtn.style.display = "none";
    setTimeout(() => resolveMultiTurn(), 2200);
    return;
  }

  // Render this node's choices
  node.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className    = "btn-secondary npc-choice-btn";
    btn.textContent  = choice.label;
    btn.addEventListener("click", () => onMultiTurnChoice(choice));
    choicesEl.appendChild(btn);
  });

  // Timer only on first turn
  if (turnCount === 1) {
    resetTimer();
  }
}

function onMultiTurnChoice(choice) {
  stopTimer();
  disableChoices();

  accumulatedScore += choice.score;

  // Add player choice to history
  conversationHistory.push({
    type: "player",
    text: choice.label
  });

  const nextNode = getDialogueNode(currentDialogue, choice.next);
  if (!nextNode) {
    // Safety: no next node found — resolve immediately
    resolveMultiTurn();
    return;
  }

  // Brief pause before showing next node
  setTimeout(() => showNode(nextNode), 500);
}

function renderHistory() {
  if (!historyEl) return;

  const html = conversationHistory.map(entry => {
    if (entry.type === "npc") {
      return `<div class="history-entry history-npc">
        <span class="history-label">${currentNPC.name.split(" ")[0]}:</span>
        <span class="history-text">${entry.text}</span>
      </div>`;
    } else {
      return `<div class="history-entry history-player">
        <span class="history-label">You:</span>
        <span class="history-text">${entry.text}</span>
      </div>`;
    }
  }).join("");

  historyEl.innerHTML = html;
  
  // Auto-scroll to bottom
  historyEl.scrollTop = historyEl.scrollHeight;
}

function resolveMultiTurn() {
  const outcome = scoreToOutcome(accumulatedScore);
  finishInteraction(outcome);
}

// ── LEGACY DIALOGUE (DWARF / WIZARD) ─────────────────────────────────────────

function startLegacyDialogue() {
  messageEl.textContent = getRandomNPCMessage(currentNPC);

  choicesEl.innerHTML = "";
  currentNPC.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className   = "btn-secondary npc-choice-btn";
    btn.textContent = choice.label;
    btn.addEventListener("click", () => {
      stopTimer();
      disableChoices();
      finishInteraction(choice.outcome);
    });
    choicesEl.appendChild(btn);
  });

  resetTimer();
}

// ── SHARED RESOLUTION ────────────────────────────────────────────────────────

function finishInteraction(outcome) {
  npcInteractionsToday += 1;
  
  if (typeof saveField === "function") {
    saveField("npcInteractionsToday", npcInteractionsToday);
  }

  applyNPCModifier(currentNPC, outcome);

  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }

  // Fade out then redirect
  document.querySelector(".npc-screen").classList.add("npc-leaving");
  setTimeout(() => returnToOrigin(), 700);
}

// ── TIMER ─────────────────────────────────────────────────────────────────────

function resetTimer() {
  stopTimer();
  timerMax     = Math.floor(Math.random() * 31) + 15; // 15–45 s
  timerSeconds = timerMax;
  timerFill.style.width      = "100%";
  timerFill.style.background = "";
  timerFill.classList.remove("timer-urgent");

  timerInterval = setInterval(() => {
    timerSeconds -= 1;
    const pct = (timerSeconds / timerMax) * 100;
    timerFill.style.width = pct + "%";

    if      (pct > 60) timerFill.style.background = "var(--color-positive)";
    else if (pct > 25) timerFill.style.background = "var(--color-accent)";
    else               timerFill.style.background = "var(--color-negative)";

    if (timerSeconds <= 10) {
      timerFill.classList.add("timer-urgent");
    }

    if (timerSeconds <= 0) {
      stopTimer();
      onTimerExpire();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function onTimerExpire() {
  document.body.classList.add("screen-pulse");
  const msgEl = document.getElementById("npcMessage");
  if (msgEl) msgEl.innerText = "They waited... but you didn't respond. They left.";
  
  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }
  
  disableChoices();
  setTimeout(() => returnToOrigin(), 1800);
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function disableChoices() {
  choicesEl.querySelectorAll("button").forEach(b => b.disabled = true);
}

function returnToOrigin() {
  window.location.href = originScreen;
}

// Skip button handler (referenced inline in HTML)
function skipNPC() {
  stopTimer();
  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }
  returnToOrigin();
}

// ======================
// EXPORTS
// ======================

window.skipNPC           = skipNPC;
window.applyNPCModifier  = applyNPCModifier;