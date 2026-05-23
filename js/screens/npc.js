// ======================
// 📜 js/screens/npc.js
// Clear UI state machine for NPC interactions:
//   STATE_INITIAL: First question window + timer (Elf only)
//   STATE_CHAT: Chat history window (Elf only)
//   STATE_LEGACY: Single message window (Dwarf, Wizard)
// ======================

// ── UI States ─────────────────────────────────────────────────────────────────
const UI_STATE = {
  INITIAL: "initial",   // First question window
  CHAT:    "chat",      // Chat history window
  LEGACY:  "legacy"     // Single message window
};

let currentUIState = null;

// ── DOM refs ──────────────────────────────────────────────────────────────────
let portrait      = null;
let nameEl        = null;
let descEl        = null;
let messageEl     = null;
let choicesEl     = null;
let timerFill     = null;
let timerBar      = null;
let skipBtn       = null;
let historyEl     = null;
let stateInitial  = null;
let stateChat     = null;

// ── Session state ──────────────────────────────────────────────────────────────
let currentNPC        = null;
let originScreen      = "hub.html";
let currentDialogue   = null;
let currentNode       = null;
let accumulatedScore  = 0;
let turnCount         = 0;
let conversationHistory = [];
let lastRenderedIndex = -1;  // Track last rendered message for incremental updates

// Timer state
let timerInterval     = null;
let timerSeconds      = 0;
let timerMax          = 30;

// ── Boot ───────────────────────────────────────────────────────────────────────
function initNPCPage() {
  // Initialize all DOM refs
  portrait      = document.getElementById("npcPortrait");
  nameEl        = document.getElementById("npcName");
  descEl        = document.getElementById("npcDescription");
  messageEl     = document.getElementById("npcMessage");
  choicesEl     = document.getElementById("npcChoices");
  timerFill     = document.getElementById("timerFill");
  timerBar      = document.getElementById("npcTimerBar");
  skipBtn       = document.getElementById("npcSkipBtn");
  historyEl     = document.getElementById("npcHistory");
  stateInitial  = document.getElementById("npcStateInitial");
  stateChat     = document.getElementById("npcStateChat");

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

// ── UI STATE MACHINE ──────────────────────────────────────────────────────────

function switchUIState(newState) {
  currentUIState = newState;

  // Hide all states first
  if (stateInitial) stateInitial.style.display = "none";
  if (stateChat) stateChat.style.display = "none";

  if (newState === UI_STATE.INITIAL) {
    if (stateInitial) stateInitial.style.display = "";
    if (timerBar) timerBar.style.display = "";
    console.log("[NPC] UI → INITIAL state");
  } else if (newState === UI_STATE.CHAT) {
    if (stateChat) stateChat.style.display = "";
    if (timerBar) timerBar.style.display = "none";
    console.log("[NPC] UI → CHAT state");
  } else if (newState === UI_STATE.LEGACY) {
    if (stateInitial) stateInitial.style.display = "";
    console.log("[NPC] UI → LEGACY state");
  }
}

// ── Identity ───────────────────────────────────────────────────────────────────
const PORTRAIT_PATHS = { elf: "../media/photos/elf.png", dwarf: "../media/photos/dwarf.png", wizard: "../media/photos/wizard.png" };

function renderNPCIdentity() {
  if (portrait) {
    portrait.innerHTML = `<img src="${PORTRAIT_PATHS[currentNPC.id] || '../media/photos/default.png'}" alt="${currentNPC.id}" class="npc-portrait-img">`;
  }
  if (nameEl)   nameEl.textContent = currentNPC.name;
  if (descEl)   descEl.style.display = "none";
}

// ── MULTI-TURN DIALOGUE (ELF) ──────────────────────────────────────────────────

function startMultiTurnDialogue() {
  currentDialogue   = getRandomDialogue(currentNPC);
  accumulatedScore  = 0;
  turnCount         = 0;
  conversationHistory = [];
  lastRenderedIndex = -1;

  // Start in INITIAL state
  switchUIState(UI_STATE.INITIAL);
  // Show skip button at start; text changes to 'Return to Hub' after conversation ends
  if (skipBtn) { skipBtn.textContent = 'Ignore and return'; skipBtn.style.display = ''; skipBtn.onclick = skipNPC; }

  // Re-assert npcPending in storage to avoid premature clearing by other flows
  if (typeof saveField === 'function') {
    saveField('npcPending', { npcId: currentNPC.id, originScreen: originScreen });
  }

  showNode(currentDialogue.nodes[0]);
}

function showNode(node) {
  currentNode = node;
  turnCount++;

  // Add to history
  conversationHistory.push({
    type: "npc",
    text: node.line
  });

  // INITIAL state: show only in messageEl
  if (currentUIState === UI_STATE.INITIAL) {
    if (messageEl) messageEl.textContent = node.line;
  }
  // CHAT state: render history (typewriter will hide then reveal choices)
  else if (currentUIState === UI_STATE.CHAT) {
    renderHistory();
  }

  choicesEl.innerHTML = "";

  if (node.terminal) {
    stopTimer();
    if (skipBtn) skipBtn.style.display = "none";
    // resolveMultiTurn called by typewriter onDone in renderHistory
    return;
  }

  // Render choices
  node.choices.forEach((choice) => {
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

  // Switch to CHAT state on first choice
  if (currentUIState === UI_STATE.INITIAL) {
    switchUIState(UI_STATE.CHAT);
  }

  // Render player bubble immediately
  renderHistory();

  const nextNode = getDialogueNode(currentDialogue, choice.next);
  if (!nextNode) {
    resolveMultiTurn();
    return;
  }

  // Delay NPC response so player bubble is visible first
  setTimeout(() => showNode(nextNode), 600);
}

function renderHistory() {
  if (!historyEl) return;

  // Only render new messages since last render (incremental update)
  const newMessages = conversationHistory.slice(lastRenderedIndex + 1);

  if (newMessages.length === 0) return;

  // Ensure DOM is ready before appending
  requestAnimationFrame(() => {
    newMessages.forEach(entry => {
      const bubble = document.createElement("div");
      bubble.className = "history-entry " + (entry.type === "npc" ? "history-npc" : "history-player");

      if (entry.type === "npc") {
        const npcMsgsSoFar = conversationHistory.slice(0, lastRenderedIndex + 1).filter(e => e.type === "npc").length;
        const isFirstNPCMessage = npcMsgsSoFar === 0;
        const isTerminal = currentNode && currentNode.terminal;

        bubble.innerHTML = `<span class="history-label">${currentNPC.name.split(" ")[0]}:</span> <span class="history-text"></span>`;
        historyEl.appendChild(bubble);
        historyEl.scrollTop = historyEl.scrollHeight;

        const textEl = bubble.querySelector(".history-text");

        if (isFirstNPCMessage) {
          // First message: no animation, appears instantly
          textEl.textContent = entry.text;
          historyEl.scrollTop = historyEl.scrollHeight;
        } else {
          // Hide choices while NPC is typing, reveal in onDone
          if (choicesEl) choicesEl.style.visibility = "hidden";
          typewriterBubble(textEl, entry.text, 28, () => {
            historyEl.scrollTop = historyEl.scrollHeight;
            if (isTerminal) {
              // Terminal node: show Return to Hub button right after typing finishes
              resolveMultiTurn();
            } else {
              // Reveal choices after typing
              if (choicesEl) choicesEl.style.visibility = "";
            }
          });
        }
      } else {
        // Player bubble: appears instantly
        bubble.innerHTML = `<span class="history-label">You:</span> <span class="history-text">${entry.text}</span>`;
        historyEl.appendChild(bubble);
        historyEl.scrollTop = historyEl.scrollHeight;
      }
    });

    lastRenderedIndex = conversationHistory.length - 1;
  });
}

// Typewriter effect: writes text into el character by character.
// speed: ms per character. onDone: callback when finished.
function typewriterBubble(el, text, speed, onDone) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (typeof onDone === "function") onDone();
    }
  }, speed);
}

function resolveMultiTurn() {
  const outcome = scoreToOutcome(accumulatedScore);
  finishInteraction(outcome);
}

// ── LEGACY DIALOGUE (DWARF / WIZARD) ───────────────────────────────────────────

function startLegacyDialogue() {
  // Use LEGACY state (shows messageEl without timer switching logic)
  switchUIState(UI_STATE.LEGACY);

  if (messageEl) messageEl.textContent = getRandomNPCMessage(currentNPC);

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

// ── SHARED RESOLUTION ──────────────────────────────────────────────────────────

function finishInteraction(outcome) {
  npcInteractionsToday += 1;

  if (typeof saveField === "function") {
    saveField("npcInteractionsToday", npcInteractionsToday);
  }

  applyNPCModifier(currentNPC, outcome);

  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }

  // If this was a multi-turn dialogue chat, show Return to Hub button
  if (currentNPC && currentNPC.dialogues && currentNPC.dialogues.length) {
    // Do NOT fade screen — keep conversation visible until player clicks
    if (skipBtn) {
      skipBtn.textContent = 'Return to Hub';
      skipBtn.style.display = '';
      skipBtn.onclick = function() { returnToOrigin(); };
    }

    // Do not auto-redirect; player will click the button when ready
    return;
  }

  // Legacy behavior for non-elf NPCs: fade out then redirect
  document.querySelector(".npc-screen").classList.add("npc-leaving");
  setTimeout(() => returnToOrigin(), 700);
}

// ── TIMER ──────────────────────────────────────────────────────────────────────

function resetTimer() {
  stopTimer();
  timerMax     = Math.floor(Math.random() * 6) + 5;  // 5–10s
  timerSeconds = timerMax;
  if (timerFill) {
    timerFill.style.width      = "100%";
    timerFill.style.background = "";
    timerFill.classList.remove("timer-urgent");
  }

  timerInterval = setInterval(() => {
    timerSeconds -= 1;
    const pct = (timerSeconds / timerMax) * 100;
    if (timerFill) {
      timerFill.style.width = pct + "%";
      if      (pct > 60) timerFill.style.background = "var(--color-positive)";
      else if (pct > 25) timerFill.style.background = "var(--color-accent)";
      else               timerFill.style.background = "var(--color-negative)";
      if (timerSeconds <= 10) timerFill.classList.add("timer-urgent");
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
  if (messageEl) messageEl.innerText = "They waited... but you didn't respond. They left.";

  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }

  disableChoices();
  setTimeout(() => returnToOrigin(), 1800);
}

// ── UTILS ──────────────────────────────────────────────────────────────────────

function disableChoices() {
  if (choicesEl) {
    choicesEl.querySelectorAll("button").forEach(b => b.disabled = true);
  }
}

function returnToOrigin() {
  window.location.href = originScreen;
}

function skipNPC() {
  stopTimer();
  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }
  returnToOrigin();
}

// ======================
// APPLY NPC MODIFIER
// Maps { npcId, outcome } → correct ModifierTemplates entry.
// Wizard always ignores player choice — purely random.
// ======================

function applyNPCModifier(npc, outcome) {
  if (typeof applyModifier !== "function" || typeof ModifierTemplates === "undefined") {
    console.warn("[NPC] modifiers.js not loaded — cannot apply modifier.");
    return;
  }

  let modifier = null;

  if (npc.id === "elf") {
    if      (outcome === "positive") modifier = ModifierTemplates.elfBonusResume(2);
    else if (outcome === "neutral")  modifier = ModifierTemplates.elfBonusDay();
    // negative → no effect
  } else if (npc.id === "dwarf") {
    if      (outcome === "positive") modifier = ModifierTemplates.dwarfPenaltyReduction();
    else if (outcome === "neutral")  modifier = ModifierTemplates.dwarfSmallBonus();
    else                             modifier = ModifierTemplates.dwarfDebuff();
  } else if (npc.id === "wizard") {
    modifier = (typeof getRandomWizardModifier === "function") ? getRandomWizardModifier() : null;
  }

  if (modifier) {
    applyModifier(modifier);
    console.log("[NPC] Modifier applied:", modifier.label);
  } else {
    console.log("[NPC] No modifier for outcome:", outcome);
  }
}

// ======================
// EXPORTS
// ======================

window.skipNPC           = skipNPC;
window.applyNPCModifier  = applyNPCModifier;