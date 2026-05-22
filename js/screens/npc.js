// ======================
// 🧙 NPC SCREEN — js/screens/npc.js
// ======================
// Responsibilities:
//   — Read pending NPC data from localStorage (set by hub.js / resume.js)
//   — Display NPC name, portrait emoji, description, dialogue line
//   — Run countdown timer (15–45s); auto-dismiss on expire
//   — Render 2–3 choice buttons from npcs.js dialogue data
//   4.4 — On choice: resolve outcome → call modifiers.js → apply to activeModifiers[]
//   4.5 — Enforce daily NPC interaction limit before allowing interaction
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

  // 4.5 — Check daily limit BEFORE rendering NPC
  // If limit already reached, don't allow interaction — just return
  if (isNPCLimitReached()) {
    console.log("[NPC] Daily interaction limit already reached. Returning.");
    if (typeof saveField === "function") saveField("npcPending", null);
    returnToOrigin();
    return;
  }

  // Read pending NPC from save
  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  const pending = save.npcPending;

  if (!pending || !pending.npcId) {
    console.warn("[NPC] No pending NPC found. Returning.");
    returnToOrigin();
    return;
  }

  originScreen = pending.originScreen || "hub.html";

  // Find NPC definition from npcs.js
  currentNPC = (typeof npcData !== "undefined")
    ? npcData.find(n => n.id === pending.npcId) || null
    : null;

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
  const portrait = document.getElementById("npcPortrait");
  if (portrait) portrait.innerText = NPC_PORTRAITS[npc.id] || "👤";

  const nameEl = document.getElementById("npcName");
  if (nameEl) nameEl.innerText = npc.name;

  const descEl = document.getElementById("npcDescription");
  if (descEl) descEl.innerText = npc.description;

  // Pick a random dialogue line from the NPC's messages array
  const msg = npc.messages[Math.floor(Math.random() * npc.messages.length)];
  const msgEl = document.getElementById("npcMessage");
  if (msgEl) msgEl.innerText = msg;

  renderChoices(npc);
}


// ======================
// RENDER CHOICES
// Uses npc.choices[] from npcs.js if defined.
// Each choice: { label, outcome }
// Falls back to 3 generic options if no choices defined.
// ======================

function renderChoices(npc) {
  const container = document.getElementById("npcChoices");
  if (!container) return;

  container.innerHTML = "";

  const choices = (npc.choices && npc.choices.length > 0)
    ? npc.choices
    : [
        { label: "Respond politely",    outcome: "positive" },
        { label: "Nod and say nothing", outcome: "neutral"  },
        { label: "Dismiss them",        outcome: "negative" }
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
// 4.5 — DAILY LIMIT CHECK
// Checks npcInteractionsToday against npcInteractionsLimit.
// Both vars come from game.js global state, loaded via loadGame().
// ======================

function isNPCLimitReached() {
  const today  = (typeof npcInteractionsToday !== "undefined") ? npcInteractionsToday : 0;
  const limit  = (typeof npcInteractionsLimit !== "undefined") ? npcInteractionsLimit : 2;
  return today >= limit;
}

function getRemainingNPCInteractions() {
  const today = (typeof npcInteractionsToday !== "undefined") ? npcInteractionsToday : 0;
  const limit = (typeof npcInteractionsLimit !== "undefined") ? npcInteractionsLimit : 2;
  return Math.max(0, limit - today);
}


// ======================
// 4.4 — RESOLVE CHOICE
// Stops timer, increments interaction counter,
// maps outcome → modifier via applyNPCModifier(),
// saves state, clears pending, returns to origin.
// ======================

function resolveChoice(choice, index) {
  stopTimer();
  disableChoices();

  // 4.5 — Final limit check at resolution moment
  // (edge case: limit could have been reached by another tab/session)
  if (isNPCLimitReached()) {
    console.log("[NPC] Limit reached at resolution. No modifier applied.");
    if (typeof saveField === "function") saveField("npcPending", null);
    returnToOrigin();
    return;
  }

  // 4.5 — Increment interaction counter
  npcInteractionsToday++;
  if (typeof saveField === "function") {
    saveField("npcInteractionsToday", npcInteractionsToday);
  }

  // 4.4 — Apply modifier based on NPC type + player outcome choice
  applyNPCModifier(currentNPC, choice.outcome);

  // Clear pending NPC from save
  if (typeof saveField === "function") {
    saveField("npcPending", null);
  }

  // Show remaining interactions count in UI if element exists
  updateNPCLimitDisplay();

  console.log(`[NPC] Choice resolved: "${choice.label}" → outcome: ${choice.outcome}`);
  console.log(`[NPC] Interactions today: ${npcInteractionsToday} / ${npcInteractionsLimit}`);

  setTimeout(returnToOrigin, 700);
}


// ======================
// 4.4 — APPLY MODIFIER BY NPC TYPE + OUTCOME
// Maps { npcId, outcome } → correct ModifierTemplates entry.
// Wizard always ignores player choice — purely random.
// Requires modifiers.js to be loaded.
// ======================

function applyNPCModifier(npc, outcome) {
  if (typeof applyModifier !== "function" || typeof ModifierTemplates === "undefined") {
    console.warn("[NPC] modifiers.js not loaded — cannot apply modifier.");
    return;
  }

  let modifier = null;

  // --- ELF: supportive, rewards politeness ---
  if (npc.id === "elf") {
    if      (outcome === "positive") modifier = ModifierTemplates.elfBonusResume(2);
    else if (outcome === "neutral")  modifier = ModifierTemplates.elfBonusDay();
    else if (outcome === "negative") modifier = null; // dismissed — no effect
  }

  // --- DWARF: realistic, slight penalty for rudeness ---
  else if (npc.id === "dwarf") {
    if      (outcome === "positive") modifier = ModifierTemplates.dwarfPenaltyReduction();
    else if (outcome === "neutral")  modifier = ModifierTemplates.dwarfSmallBonus();
    else if (outcome === "negative") modifier = ModifierTemplates.dwarfDebuff();
  }

  // --- WIZARD: completely chaotic — outcome is irrelevant ---
  else if (npc.id === "wizard") {
    modifier = (typeof getRandomWizardModifier === "function")
      ? getRandomWizardModifier()
      : null;

    if (modifier) {
      console.log(`[NPC] Wizard rolled: ${modifier.label} (chaos — choice ignored)`);
    }
  }

  // Apply to activeModifiers[] via modifiers.js
  if (modifier) {
    applyModifier(modifier); // modifiers.js — pushes to activeModifiers[], saves
    console.log(`[NPC] Modifier applied: ${modifier.label} (${modifier.duration})`);
  } else {
    console.log("[NPC] No modifier for this outcome.");
  }
}


// ======================
// UI — NPC LIMIT DISPLAY
// Updates an optional element showing remaining interactions.
// ======================

function updateNPCLimitDisplay() {
  const el = document.getElementById("npcLimitDisplay");
  if (!el) return;
  const remaining = getRemainingNPCInteractions();
  el.innerText = remaining > 0
    ? `${remaining} interaction${remaining !== 1 ? "s" : ""} remaining today`
    : "No more NPC interactions today";
}


// ======================
// COUNTDOWN TIMER
// Duration: random 15–45 seconds
// ======================

function startTimer() {
  timerSeconds = Math.floor(Math.random() * 31) + 15;

  const fill  = document.getElementById("timerFill");
  const total = timerSeconds;

  if (fill) fill.style.width = "100%";

  timerInterval = setInterval(() => {
    timerSeconds--;

    if (fill) {
      const pct = (timerSeconds / total) * 100;
      fill.style.width = pct + "%";

      if      (pct > 60) fill.style.background = "var(--color-positive)";
      else if (pct > 25) fill.style.background = "var(--color-accent)";
      else               fill.style.background = "var(--color-negative)";
    }

    if (timerSeconds <= 0) onTimerExpired();
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

  console.log("[NPC] Timer expired. NPC left without interaction.");
  setTimeout(returnToOrigin, 1800);
}


// ======================
// SKIP
// ======================

function skipNPC() {
  stopTimer();
  if (typeof saveField === "function") saveField("npcPending", null);
  console.log("[NPC] Player skipped NPC. No modifier applied.");
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

window.skipNPC              = skipNPC;
window.resolveChoice        = resolveChoice;
window.isNPCLimitReached    = isNPCLimitReached;
window.applyNPCModifier     = applyNPCModifier;