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
//   5.2 — applyModifiersToScore() called inside calculateResumeScore()
//   5.3 — tickResumeModifiers() called after every successful submitResume()
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
    // Hide broken image icon if asset not yet available
    imgEl.onerror = () => { imgEl.style.display = "none"; };
    imgEl.onload  = () => { imgEl.style.display = "block"; };
  }

  const descEl = document.getElementById("jobCardDescription");
  if (descEl && activeJobCard.description) {
    descEl.innerText = activeJobCard.description;
  }

  // Show which answers are correct (visible hint for placeholder phase)
  _renderCorrectAnswerHints(activeJobCard);

  console.log(`[Resume] Job card loaded: ${activeJobCard.title}`);
}

// Temporary helper — renders correct answer hints in a debug element.
// Remove or hide this once real job card PNG assets are in place.
function _renderCorrectAnswerHints(card) {
  const hintEl = document.getElementById("jobCardHints");
  if (!hintEl || !card.correctAnswers) return;
  const c = card.correctAnswers;
  hintEl.innerText = `Correct: plant=${c.plant} | photo=${c.photo} | date=${c.date}`;
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
// 2.5 + 5.2 — SCORE CALCULATION
// Step 1: calculate base score from job card correct answers (+1/-1 per component)
// Step 2: apply active modifiers via applyModifiersToScore() from modifiers.js
// Hard floor: minimum 1 point per resume regardless of choices or debuffs
// ======================

function calculateResumeScore() {
  if (!activeJobCard) {
    console.warn("[Resume] No active job card — returning minimum score 1.");
    return 1;
  }

  const correct = activeJobCard.correctAnswers;
  let base = 0;

  // --- Component scoring ---
  // Each correct choice: +1. Each wrong choice: -1.
  if (resume.plant !== null) {
    const hit = resume.plant === correct.plant;
    base += hit ? 1 : -1;
    console.log(`[Resume] Plant "${resume.plant}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  if (resume.photo !== null) {
    const hit = resume.photo === correct.photo;
    base += hit ? 1 : -1;
    console.log(`[Resume] Photo "${resume.photo}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  if (resume.date !== null) {
    const hit = resume.date === correct.date;
    base += hit ? 1 : -1;
    console.log(`[Resume] Date "${resume.date}" → ${hit ? "+1 ✓" : "-1 ✗"}`);
  }

  // Hard floor before modifiers
  if (base < 1) base = 1;

  // --- 5.2 — Apply active modifiers ---
  // applyModifiersToScore handles: bonus_per_resume, penalty_reduction,
  // score_multiplier. Returns score with hard floor of 1 enforced again.
  const finalScore = (typeof applyModifiersToScore === "function")
    ? applyModifiersToScore(base)
    : base;

  console.log(`[Resume] Score: base=${base} → after modifiers=${finalScore}`);
  return finalScore;
}


// ======================
// 2.4 — DAILY RESUME LIMIT
// Base limit comes from ModeConfig via getConfig().
// Extra slots from active "extra_resume_slot" modifiers are added on top.
// ======================

function getDailyResumeLimit() {
  const base = (typeof getConfig === "function")
    ? getConfig().resumesPerDay
    : 5; // safe fallback

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
// Full flow per submit:
//   1. Validate all selections made
//   2. Check daily limit (2.4)
//   3. Calculate score: job card base + modifiers (2.5 + 5.2)
//   4. Apply score to hiddenScore
//   5. 5.3 — Tick resume-duration modifiers (decrement + expire)
//   6. Save state to localStorage
//   7. Show feedback message (no score values revealed to player)
//   8. Reset selections and UI counter
//   9. 2.7 — Check win condition
//  10. 4.1 — Attempt NPC spawn
//  11. Load next job card
// ======================

function submitResume() {

  // Guard: core scripts loaded
  if (typeof saveGame !== "function" || typeof goHub !== "function") {
    alert("Core game scripts not loaded. Please reload the page.");
    return;
  }

  // Step 1 — All components must be selected
  if (!resume.plant || !resume.photo || !resume.date) {
    showResumeMessage("Please select all resume components before submitting.");
    return;
  }

  // Step 2 — Daily limit check
  if (isResumeLimitReached()) {
    showResumeMessage("You've reached today's resume limit. Head back to the HUB!");
    return;
  }

  // Step 3 — Calculate score (2.5 + 5.2)
  const gained = calculateResumeScore();

  // Step 4 — Apply to game state
  hiddenScore      += gained;
  resumesToday     += 1;
  resumesSentTotal += 1;

  // Step 5 — 5.3: Tick resume-duration modifiers
  // Must happen AFTER score is calculated so the modifier applies to this resume,
  // then decrements so it will expire correctly for future resumes.
  if (typeof tickResumeModifiers === "function") {
    tickResumeModifiers();
  }

  // Step 6 — Persist state
  saveGame({
    hiddenScore,
    resumesSentToday: resumesToday,
    resumesSentTotal,
    activeModifiers
  });

  // Step 7 — Feedback (no numbers shown to player)
  showResumeMessage(getSubmitFeedback(gained));

  // Step 8 — Reset
  resume = { plant: null, photo: null, date: null };
  clearAllSelections();
  updateResumeCounter();

  // Step 9 — 2.7: Win check — redirects to win.html if condition met
  if (typeof checkWin === "function" && checkWin()) return;

  // Daily limit now reached after this submit — show message and block
  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // Step 10 — 4.1: NPC spawn attempt (20% chance, respects daily limit)
  trySpawnNPCFromResume();

  // Step 11 — Load next job card for the next resume
  loadJobCard();
}


// ======================
// 4.1 — NPC SPAWN TRIGGER (Resume Room)
// Called on page load and after each resume submission.
// Slightly lower chance than HUB (20% vs 30%) — player is mid-task.
// ======================

function trySpawnNPCFromResume() {
  if (typeof npcInteractionsToday === "undefined" ||
      typeof npcInteractionsLimit === "undefined") return;

  // Respect daily interaction limit
  if (npcInteractionsToday >= npcInteractionsLimit) return;

  // Don't spawn if a pending NPC event already exists
  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  if (save.npcPending) return;

  // 20% chance per trigger
  if (Math.random() > 0.20) return;

  const npc = (typeof getRandomNPC === "function") ? getRandomNPC() : null;
  if (!npc) return;

  console.log(`[Resume] NPC spawned: ${npc.name}`);
  spawnNPCEventFromResume(npc.id);
}


// ======================
// 4.2 — WRITE npcPending + REDIRECT (from Resume Room)
// Stores which NPC appeared and sets origin to resume.html.
// Delay: 1200ms so player reads the submit feedback before redirect.
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
    el.innerText       = text;
    el.style.display   = "block";
    setTimeout(() => { el.style.display = "none"; }, 3000);
  } else {
    console.log("[Resume Message]", text);
  }
}

function showDailyLimitReached() {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText     = "All resumes sent for today. Head back to the HUB!";
    el.style.display = "block";
  }
  const btn = document.getElementById("submitResumeBtn");
  if (btn) btn.disabled = true;
}

// Feedback text — communicates quality without revealing numeric score
function getSubmitFeedback(score) {
  if (score >= 3) return "Excellent resume! The employer seems very interested.";
  if (score === 2) return "Good resume. Solid choices.";
  if (score === 1) return "Resume sent. Room for improvement, but it counts.";
  return "Resume sent. Keep trying!";
}

function updateResumeCounter() {
  const limit = getDailyResumeLimit();
  const el    = document.getElementById("resumesTodayDisplay");
  if (el) el.innerText = `${resumesToday} / ${limit}`;
}

// Update active modifier labels shown on resume screen (optional UI element)
function updateModifierDisplay() {
  const el = document.getElementById("activeModifiersResume");
  if (!el) return;
  const labels = (typeof getActiveModifierLabels === "function")
    ? getActiveModifierLabels()
    : [];
  if (labels.length === 0) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = labels
    .map(label => `<span class="modifier-tag">✦ ${label}</span>`)
    .join(" ");
}


// ======================
// 🚀 PAGE INIT
// ======================

function initResumePage() {
  if (typeof loadGame === "function") loadGame();

  // Guard: no active game → send to start
  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  loadJobCard();
  updateResumeCounter();
  updateModifierDisplay();

  // If limit already reached (player navigated back without starting new day)
  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // 4.1 — Attempt NPC spawn on page load
  trySpawnNPCFromResume();

  console.log(`[Resume] Page ready. Day: ${day} | Resumes today: ${resumesToday}/${getDailyResumeLimit()} | Active modifiers: ${activeModifiers.length}`);
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