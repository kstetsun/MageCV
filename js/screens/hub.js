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
    // 1st NPC: window is resume 1–2
    // 2nd NPC: window is resume 4–5
    if (isFirstNPCToday) {
      if (resumesSentTotal < 1 || resumesSentTotal > 2) return;
    } else {
      if (resumesSentTotal < 4 || resumesSentTotal > 5) return;
    }
  } else {
    // long mode
    // 1st NPC: window is resume 1–3
    // subsequent: at least 2 resumes since last NPC
    if (isFirstNPCToday) {
      if (resumesSentTotal < 1 || resumesSentTotal > 3) return;
    } else {
      if (resumesSentTotal < resumesSentAtLastNPC + 2) return;
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  // 30% spawn chance per page load
  if (Math.random() > 0.30) return;

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