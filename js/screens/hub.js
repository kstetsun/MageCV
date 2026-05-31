// ======================
// 🏠 HUB SCREEN — js/screens/hub.js
// ======================
// Responsibilities:
//   — Update HUB UI (day, resumes sent, NPC interaction count, modifiers)
//   — Handle Next Day button → calls advanceDay() from game.js
//   — Update board message on new day
//   — 4.1: Trigger NPC spawn check on page load
//   — 4.2: Write npcPending to localStorage before redirecting to npc.html
// ======================


// ======================
// UI UPDATE
// ======================

function updateHubUI() {
  // Day counter
  const dayEl = document.getElementById("day");
  if (dayEl) dayEl.innerText = day;

  // Resumes today / limit
  const resTodayEl = document.getElementById("resumesToday");
  const limit = (typeof getConfig === "function") ? getConfig().resumesPerDay : "?";
  if (resTodayEl) resTodayEl.innerText = `${resumesToday} / ${limit}`;

  // Total resumes sent
  const resTotalEl = document.getElementById("resumesTotal");
  if (resTotalEl) resTotalEl.innerText = resumesSentTotal;

  // NPC interactions today / limit
  const npcEl = document.getElementById("npcInteractions");
  if (npcEl) npcEl.innerText = `${npcInteractionsToday} / ${npcInteractionsLimit}`;

  // Active modifier labels (names only, no score values)
  const modEl = document.getElementById("activeModifiers");
  if (modEl) {
    const labels = (typeof getActiveModifierLabels === "function")
      ? getActiveModifierLabels()
      : [];

    if (labels.length === 0) {
      modEl.innerHTML = `<span class="no-modifiers">None active</span>`;
    } else {
      modEl.innerHTML = labels
        .map(label => `<span class="modifier-tag">✦ ${label}</span>`)
        .join(" ");
    }
  }

  // Mode badge
  const modeEl = document.getElementById("gameMode");
  if (modeEl) modeEl.innerText = (mode === "demo") ? "Demo" : "Long Mode";

  // Score display
  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.innerText = hiddenScore;
}


// ======================
// BOARD MESSAGE
// ======================

function refreshBoardMessage() {
  const boardEl = document.getElementById("boardText");
  if (boardEl && typeof getRandomBoardMessage === "function") {
    boardEl.innerText = getRandomBoardMessage();
  }
}


// ======================
// NEXT DAY
// ======================

function nextDay() {
  if (typeof advanceDay === "function") {
    advanceDay(); // game.js: increments day, resets daily counters, ticks modifiers, saves
  }

  refreshBoardMessage();
  updateHubUI();

  // After advancing day, attempt a fresh NPC spawn for the new day
  trySpawnNPC("hub.html");
}


// ======================
// 4.1 — NPC SPAWN TRIGGER
// Called on page load and after Next Day.
// Spawn chance is random. Respects daily interaction limit.
// ======================

function trySpawnNPC(origin) {
  // Don't spawn if limit already reached
  if (npcInteractionsToday >= npcInteractionsLimit) return;

  // Don't spawn if another NPC event is already pending
  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  if (save.npcPending) return;

  // ── NPC spawn eligibility by mode ────────────────────────────────────────
  const isFirstNPCToday = npcInteractionsToday === 0;

  if (mode === "demo") {
    // 1st NPC: guaranteed on resume 1 or 2 (50% on 1, 100% on 2 if missed)
    // 2nd NPC: guaranteed on resume 4 or 5 (50% on 4, 100% on 5 if missed)
    if (isFirstNPCToday) {
      if (resumesSentTotal === 1)      { if (Math.random() > 0.50) return; }
      else if (resumesSentTotal === 2) { /* guaranteed */ }
      else return;
    } else {
      if (resumesSentTotal === 4)      { if (Math.random() > 0.50) return; }
      else if (resumesSentTotal === 5) { /* guaranteed */ }
      else return;
    }
  } else {
    // long mode — evenly spread across day, min 2 guaranteed per day
    // Divide 10 resumes into npcInteractionsLimit equal slots.
    // Within each slot: 50% chance per resume, 100% on last resume of slot.
    // No NPC before first resume of the day.
    if (resumesToday < 1) return;

    const resumesPerDay = getConfig().resumesPerDay;
    const slotSize      = Math.floor(resumesPerDay / npcInteractionsLimit);
    const currentSlot   = Math.floor((resumesToday - 1) / slotSize);

    // Past all slots → no more NPCs
    if (currentSlot >= npcInteractionsLimit) return;

    // This slot belongs to a different NPC index → not our turn yet
    if (currentSlot !== npcInteractionsToday) return;

    const posInSlot = ((resumesToday - 1) % slotSize) + 1;
    const isLastInSlot = posInSlot >= slotSize;

    if (!isLastInSlot && Math.random() > 0.50) return;
    // isLastInSlot → guaranteed, no random check
  }
  // ─────────────────────────────────────────────────────────────────────────

  // Pick a random NPC
  const npc = (typeof getRandomNPC === "function")
    ? getRandomNPC()
    : null;

  if (!npc) return;

  console.log(`[Hub] NPC spawned: ${npc.name}`);

  // 4.2 — Write npcPending to localStorage before redirecting
  spawnNPCEvent(npc.id, origin || "hub.html");
}


// ======================
// 4.2 — WRITE npcPending + REDIRECT
// Stores which NPC appeared and which screen to return to,
// then sends the player to npc.html.
// ======================

function spawnNPCEvent(npcId, originScreen) {
  if (typeof saveField !== "function") {
    console.warn("[Hub] saveField() not available — cannot spawn NPC.");
    return;
  }

  saveField("npcPending", {
    npcId:        npcId,
    originScreen: originScreen
  });

  console.log(`[Hub] npcPending saved: ${npcId} → return to ${originScreen}`);

  // Small delay so the player sees the HUB before being redirected
  setTimeout(() => {
    window.location.href = "npc.html";
  }, 800);
}


// ======================
// 🚀 PAGE INIT
// ======================

function initHubPage() {
  if (typeof loadGame === "function") loadGame();

  // Guard: no active game → send to start
  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  refreshBoardMessage();
  updateHubUI();

  // 4.1 — Attempt NPC spawn on HUB load
  trySpawnNPC("hub.html");

  console.log("[Hub] Page ready. Day:", day);
}

document.addEventListener("DOMContentLoaded", initHubPage);


// ======================
// EXPORTS
// ======================

window.updateHubUI    = updateHubUI;
window.nextDay        = nextDay;
window.trySpawnNPC    = trySpawnNPC;
window.spawnNPCEvent  = spawnNPCEvent;