// ======================
// 📄 RESUME SCREEN — js/screens/resume.js
// ======================
// Responsibilities:
//   2.4 — reads daily resume limit from gameMode (not hardcoded)
//   2.5 — correct answers driven by active job card from jobCards.js
//   2.6 — random job card selected on page load, displayed in UI
//   2.7 — checkWin() called after every submitResume()
//   4.1 — NPC spawn check on page load and after submit
//   4.2 — write npcPending to localStorage before redirecting to npc.html
// ======================


// ======================
// 📋 ACTIVE JOB CARD
// ======================

let activeJobCard = null;


// ======================
// 2.6 — LOAD & DISPLAY JOB CARD
// ======================

function loadJobCard() {
  if (!jobCards || jobCards.length === 0) {
    console.warn("[Resume] No job cards found in jobCards.js");
    return;
  }

  activeJobCard = jobCards[Math.floor(Math.random() * jobCards.length)];

  const titleEl = document.getElementById("jobCardTitle");
  if (titleEl) titleEl.innerText = activeJobCard.title;

  const imgEl = document.getElementById("jobCardImage");
  if (imgEl) {
    imgEl.src = `../assets/jobcards/${activeJobCard.id}.png`;
    imgEl.alt = activeJobCard.title;
  }

  const descEl = document.getElementById("jobCardDescription");
  if (descEl && activeJobCard.description) {
    descEl.innerText = activeJobCard.description;
  }

  console.log(`[Resume] Job card loaded: ${activeJobCard.title}`);
}


// ======================
// 📄 RESUME STATE
// ======================

let resume = {
  plant: null,
  photo: null,
  date:  null
};


// ======================
// SELECTION HANDLERS
// ======================

function clearSelection(group) {
  document.querySelectorAll(`[data-group="${group}"]`)
    .forEach(btn => btn.classList.remove("selected"));
}

function selectPlant(type, btn) {
  resume.plant = type;
  clearSelection("plant");
  btn.classList.add("selected");
}

function selectPhoto(type, btn) {
  resume.photo = type;
  clearSelection("photo");
  btn.classList.add("selected");
}

function selectDate(type, btn) {
  resume.date = type;
  clearSelection("date");
  btn.classList.add("selected");
}


// ======================
// 2.5 — SCORE CALCULATION
// ======================

function calculateResumeScore() {
  if (!activeJobCard) {
    console.warn("[Resume] No active job card — returning base score 1.");
    return 1;
  }

  const correct = activeJobCard.correctAnswers;
  let base = 0;

  if (resume.plant !== null) base += (resume.plant === correct.plant) ? 1 : -1;
  if (resume.photo !== null) base += (resume.photo === correct.photo) ? 1 : -1;
  if (resume.date  !== null) base += (resume.date  === correct.date)  ? 1 : -1;

  if (base < 1) base = 1;

  const finalScore = (typeof applyModifiersToScore === "function")
    ? applyModifiersToScore(base)
    : base;

  console.log(`[Resume] Base: ${base} → After modifiers: ${finalScore}`);
  return finalScore;
}


// ======================
// 2.4 — DAILY LIMIT
// ======================

function getDailyResumeLimit() {
  const base = (typeof getConfig === "function")
    ? getConfig().resumesPerDay
    : 5;

  const extra = (typeof getExtraResumeSlots === "function")
    ? getExtraResumeSlots()
    : 0;

  return base + extra;
}

function isResumeLimitReached() {
  return resumesToday >= getDailyResumeLimit();
}


// ======================
// 📨 SUBMIT RESUME
// ======================

function submitResume() {

  if (typeof saveGame !== "function" || typeof goHub !== "function") {
    alert("Core game scripts not loaded. Please reload the page.");
    return;
  }

  if (!resume.plant || !resume.photo || !resume.date) {
    showResumeMessage("Please select all resume components before submitting.");
    return;
  }

  if (isResumeLimitReached()) {
    showResumeMessage("You've reached today's resume limit. Head back to the HUB!");
    return;
  }

  const gained = calculateResumeScore();

  hiddenScore      += gained;
  resumesToday     += 1;
  resumesSentTotal += 1;

  if (typeof tickResumeModifiers === "function") tickResumeModifiers();

  saveGame({
    hiddenScore,
    resumesSentToday: resumesToday,
    resumesSentTotal,
    activeModifiers
  });

  showResumeMessage(getSubmitFeedback(gained));

  resume = { plant: null, photo: null, date: null };
  clearAllSelections();
  updateResumeCounter();

  // 2.7 — Win check
  if (typeof checkWin === "function" && checkWin()) return;

  // Daily limit now reached after this submit
  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // 4.1 — Attempt NPC spawn after resume submission
  trySpawnNPCFromResume();

  // Load next job card
  loadJobCard();
}


// ======================
// 4.1 — NPC SPAWN TRIGGER (Resume Room)
// Called on page load and after each resume is submitted.
// Uses a lower spawn chance than HUB to avoid interrupting every resume.
// ======================

function trySpawnNPCFromResume() {
  // Respect daily interaction limit
  if (npcInteractionsToday >= npcInteractionsLimit) return;

  // Don't spawn if a pending NPC event already exists
  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  if (save.npcPending) return;

  // 20% chance per trigger (slightly lower than HUB's 30%)
  if (Math.random() > 0.20) return;

  const npc = (typeof getRandomNPC === "function") ? getRandomNPC() : null;
  if (!npc) return;

  console.log(`[Resume] NPC spawned: ${npc.name}`);

  // 4.2 — Save pending NPC + origin, then redirect
  spawnNPCEventFromResume(npc.id);
}


// ======================
// 4.2 — WRITE npcPending + REDIRECT (from Resume Room)
// ======================

function spawnNPCEventFromResume(npcId) {
  if (typeof saveField !== "function") {
    console.warn("[Resume] saveField() not available — cannot spawn NPC.");
    return;
  }

  saveField("npcPending", {
    npcId:        npcId,
    originScreen: "resume.html"
  });

  console.log(`[Resume] npcPending saved: ${npcId} → return to resume.html`);

  // Delay so player reads the resume feedback message before redirect
  setTimeout(() => {
    window.location.href = "npc.html";
  }, 1200);
}


// ======================
// UI HELPERS
// ======================

function clearAllSelections() {
  ["plant", "photo", "date"].forEach(group => clearSelection(group));
}

function showResumeMessage(text) {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText = text;
    el.style.display = "block";
    setTimeout(() => { el.style.display = "none"; }, 3000);
  } else {
    console.log("[Resume Message]", text);
  }
}

function showDailyLimitReached() {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText = "All resumes sent for today. Head back to the HUB!";
    el.style.display = "block";
  }
  const btn = document.getElementById("submitResumeBtn");
  if (btn) btn.disabled = true;
}

function getSubmitFeedback(score) {
  if (score >= 3) return "Excellent resume! The employer seems very interested.";
  if (score === 2) return "Good resume. Solid choices.";
  if (score === 1) return "Resume sent. Room for improvement, but it counts.";
  return "Resume sent. Keep trying!";
}

function updateResumeCounter() {
  const limit = getDailyResumeLimit();
  const el = document.getElementById("resumesTodayDisplay");
  if (el) el.innerText = `${resumesToday} / ${limit}`;
}


// ======================
// 🚀 PAGE INIT
// ======================

function initResumePage() {
  if (typeof loadGame === "function") loadGame();

  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  loadJobCard();
  updateResumeCounter();

  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // 4.1 — Attempt NPC spawn on Resume Room page load
  trySpawnNPCFromResume();

  console.log("[Resume] Page ready.");
}

initResumePage();


// ======================
// EXPORTS
// ======================

window.selectPlant            = selectPlant;
window.selectPhoto            = selectPhoto;
window.selectDate             = selectDate;
window.submitResume           = submitResume;
window.loadJobCard            = loadJobCard;
window.trySpawnNPCFromResume  = trySpawnNPCFromResume;
window.initResumePage         = initResumePage;