// ======================
// 🧙 NPC SCREEN — js/screens/npc.js
// ======================
// Responsibilities:
//   — Read pending NPC data from localStorage (set by hub.js / resume.js)
//   — Display NPC name, portrait emoji, description, dialogue line
//   — Run countdown timer (15–45s); auto-dismiss on expire
//   — Render 2–3 choice buttons from npcs.js dialogue data
//   — On choice: apply modifier, increment interaction count, return to origin
//   — On skip / expire: return to origin with no effect
// ======================


// ======================
// STATE
// ======================

let timerInterval  = null;
let timerSeconds   = 0;
let currentNPC     = null;
let originScreen   = "hub.html";


// ======================
// PAGE INIT
// ======================

function initNPCPage() {
  if (typeof loadGame === "function") loadGame();

  // Guard: no active game
  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  // Read pending NPC from save
  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  const pending = save.npcPending;

  if (!pending || !pending.npcId) {
    console.warn("[NPC] No pending NPC found. Returning to hub.");
    window.location.href = "hub.html";
    return;
  }

  // Resolve origin screen
  originScreen = pending.originScreen || "hub.html";

  // Find NPC definition from npcs.js data
  currentNPC = npcData.find(n => n.id === pending.npcId) || null;

  if (!currentNPC) {
    console.warn("[NPC] Unknown NPC id:", pending.npcId);
    returnToOrigin();
    return;
  }

  renderNPC(currentNPC);
  startTimer();

  console.log(`[NPC] ${currentNPC.name} appeared. Origin: ${originScreen}`);
}


// ======================
// RENDER NPC
// ======================

const NPC_PORTRAITS = {
  elf:    "🧝",
  dwarf:  "⛏️",
  wizard: "🧙"
};

function renderNPC(npc) {
  // Portrait emoji
  const portrait = document.getElementById("npcPortrait");
  if (portrait) portrait.innerText = NPC_PORTRAITS[npc.id] || "👤";

  // Name + description
  const nameEl = document.getElementById("npcName");
  if (nameEl) nameEl.innerText = npc.name;

  const descEl = document.getElementById("npcDescription");
  if (descEl) descEl.innerText = npc.description;

  // Random dialogue line
  const msg = npc.messages[Math.floor(Math.random() * npc.messages.length)];
  const msgEl = document.getElementById("npcMessage");
  if (msgEl) msgEl.innerText = msg;

  // Render choice buttons
  renderChoices(npc);
}


// ======================
// RENDER CHOICES
// Reads dialogue choices from npc.choices[] if defined,
// otherwise falls back to two generic options.
// ======================

function renderChoices(npc) {
  const container = document.getElementById("npcChoices");
  if (!container) return;

  container.innerHTML = "";

  // Use defined choices if available, otherwise generic fallback
  const choices = (npc.choices && npc.choices.length > 0)
    ? npc.choices
    : [
        { label: "Respond politely",  outcome: "positive" },
        { label: "Nod and say nothing", outcome: "neutral" },
        { label: "Dismiss them",       outcome: "negative" }
      ];

  choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "btn-secondary npc-choice-btn";
    btn.innerText  = choice.label;
    btn.onclick    = () => resolveChoice(choice, index);
    container.appendChild(btn);
  });
}


// ======================
// RESOLVE CHOICE
// ======================

function resolveChoice(choice, index) {
  stopTimer();
  disableChoices();

  // Increment NPC interaction counter
  npcInteractionsToday++;
  if (typeof saveField === "function") {
    saveField("npcInteractionsToday", npcInteractionsToday);
  }

  // Apply modifier based on NPC type + outcome
  applyNPCModifier(currentNPC, choice.outcome);

  // Clear pending NPC from save
  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }

  console.log(`[NPC] Choice made: "${choice.label}" (${choice.outcome})`);

  // Brief delay so player sees the choice was registered
  setTimeout(returnToOrigin, 600);
}


// ======================
// APPLY MODIFIER BY OUTCOME
// Maps NPC type + outcome string → ModifierTemplates call
// ======================

function applyNPCModifier(npc, outcome) {
  if (typeof applyModifier !== "function" || typeof ModifierTemplates === "undefined") {
    console.warn("[NPC] modifiers.js not available.");
    return;
  }

  let modifier = null;

  if (npc.id === "elf") {
    if (outcome === "positive") modifier = ModifierTemplates.elfBonusResume(2);
    else if (outcome === "neutral") modifier = ModifierTemplates.elfBonusDay();
    else modifier = null; // dismissed — no effect
  }

  else if (npc.id === "dwarf") {
    if (outcome === "positive") modifier = ModifierTemplates.dwarfPenaltyReduction();
    else if (outcome === "neutral") modifier = ModifierTemplates.dwarfSmallBonus();
    else modifier = ModifierTemplates.dwarfDebuff();
  }

  else if (npc.id === "wizard") {
    // Always chaotic — ignores player choice
    modifier = (typeof getRandomWizardModifier === "function")
      ? getRandomWizardModifier()
      : null;
  }

  if (modifier) {
    applyModifier(modifier);
    console.log(`[NPC] Modifier applied: ${modifier.label}`);
  } else {
    console.log("[NPC] No modifier for this outcome.");
  }
}


// ======================
// COUNTDOWN TIMER
// Duration: random 15–45 seconds
// ======================

function startTimer() {
  timerSeconds = Math.floor(Math.random() * 31) + 15; // 15–45

  const fill = document.getElementById("timerFill");
  if (fill) fill.style.width = "100%";

  const totalSeconds = timerSeconds;

  timerInterval = setInterval(() => {
    timerSeconds--;

    // Update timer bar width
    if (fill) {
      const pct = (timerSeconds / totalSeconds) * 100;
      fill.style.width = pct + "%";

      // Colour shift: green → amber → red
      if (pct > 60)      fill.style.background = "var(--color-positive)";
      else if (pct > 25) fill.style.background = "var(--color-accent)";
      else               fill.style.background = "var(--color-negative)";
    }

    if (timerSeconds <= 0) {
      onTimerExpired();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function onTimerExpired() {
  stopTimer();
  disableChoices();

  const msgEl = document.getElementById("npcMessage");
  if (msgEl) msgEl.innerText = "They waited... but you didn't respond. They left.";

  if (typeof saveField === "function") saveField("npcPending", null);

  console.log("[NPC] Timer expired. NPC left.");
  setTimeout(returnToOrigin, 1800);
}


// ======================
// SKIP
// ======================

function skipNPC() {
  stopTimer();
  if (typeof saveField === "function") saveField("npcPending", null);
  returnToOrigin();
}


// ======================
// RETURN TO ORIGIN
// ======================

function returnToOrigin() {
  window.location.href = originScreen;
}


// ======================
// HELPERS
// ======================

function disableChoices() {
  document.querySelectorAll(".npc-choice-btn")
    .forEach(btn => { btn.disabled = true; });

  const skipBtn = document.getElementById("npcSkipBtn");
  if (skipBtn) skipBtn.disabled = true;
}


// ======================
// LAUNCH
// ======================

initNPCPage();


// ======================
// EXPORTS
// ======================

window.skipNPC        = skipNPC;
window.resolveChoice  = resolveChoice;