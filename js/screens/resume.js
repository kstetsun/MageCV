// ======================
// 📄 RESUME SCREEN — js/screens/resume.js
// ======================
// Responsibilities:
//   2.4 — reads daily resume limit from gameMode (not hardcoded)
//   2.5 — correct answers driven by active job card from jobCards.js
//   2.6 — random job card selected on page load, displayed in UI
//   2.7 — checkWin() called after every submitResume()
// ======================


// ======================
// 📋 ACTIVE JOB CARD
// Set on page load via loadJobCard().
// ======================

let activeJobCard = null;


// ======================
// 2.6 — LOAD & DISPLAY JOB CARD
// Picks a random card from jobCards[] (defined in js/data/jobCards.js).
// Updates the UI to show the card image and title.
// ======================

function loadJobCard() {
  if (!jobCards || jobCards.length === 0) {
    console.warn("[Resume] No job cards found in jobCards.js");
    return;
  }

  // Pick a random card
  activeJobCard = jobCards[Math.floor(Math.random() * jobCards.length)];

  // --- Update UI ---

  // Card title
  const titleEl = document.getElementById("jobCardTitle");
  if (titleEl) titleEl.innerText = activeJobCard.title;

  // Card image (PNG from assets/jobcards/)
  const imgEl = document.getElementById("jobCardImage");
  if (imgEl) {
    imgEl.src = `../assets/jobcards/${activeJobCard.id}.png`;
    imgEl.alt = activeJobCard.title;
  }

  // Card description (optional flavour text)
  const descEl = document.getElementById("jobCardDescription");
  if (descEl && activeJobCard.description) {
    descEl.innerText = activeJobCard.description;
  }

  console.log(`[Resume] Job card loaded: ${activeJobCard.title}`);
}


// ======================
// 📄 RESUME STATE
// Resets after each submission.
// ======================

let resume = {
  plant: null,
  photo: null,
  date:  null
};


// ======================
// 🌱 SELECTION HANDLERS
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
// Correct answers are read from activeJobCard.correctAnswers.
// +1 for each correct choice, -1 for each wrong choice.
// Minimum score per resume: 1 point (hard floor).
// Modifiers from modifiers.js are applied after base calculation.
// ======================

function calculateResumeScore() {
  if (!activeJobCard) {
    console.warn("[Resume] No active job card — returning base score 1.");
    return 1;
  }

  const correct = activeJobCard.correctAnswers;
  let base = 0;

  // 🌱 Plant
  if (resume.plant !== null) {
    base += (resume.plant === correct.plant) ? 1 : -1;
  }

  // 📸 Photo
  if (resume.photo !== null) {
    base += (resume.photo === correct.photo) ? 1 : -1;
  }

  // 📅 Date
  if (resume.date !== null) {
    base += (resume.date === correct.date) ? 1 : -1;
  }

  // Hard floor before modifiers
  if (base < 1) base = 1;

  // Apply active modifiers (bonus_per_resume, multipliers, etc.)
  const finalScore = (typeof applyModifiersToScore === "function")
    ? applyModifiersToScore(base)
    : base;

  console.log(`[Resume] Base: ${base} → After modifiers: ${finalScore}`);
  return finalScore;
}


// ======================
// 2.4 — DAILY LIMIT CHECK
// Reads limit from ModeConfig via getConfig(), not hardcoded.
// Also accounts for extra_resume_slot modifiers.
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
// Full flow:
//   1. Validate selections
//   2. Check daily limit (2.4)
//   3. Calculate score using job card (2.5)
//   4. Apply score to hiddenScore
//   5. Tick resume modifiers
//   6. Update + save state
//   7. Check win condition (2.7)
//   8. Load new job card for next resume
// ======================

function submitResume() {

  // Guard: core scripts loaded
  if (typeof saveGame !== "function" || typeof goHub !== "function") {
    alert("Core game scripts not loaded. Please reload the page.");
    return;
  }

  // Guard: all selections made
  if (!resume.plant || !resume.photo || !resume.date) {
    showResumeMessage("Please select all resume components before submitting.");
    return;
  }

  // 2.4 — Daily limit check
  if (isResumeLimitReached()) {
    showResumeMessage("You've reached today's resume limit. Come back tomorrow!");
    return;
  }

  // 2.5 — Calculate score
  const gained = calculateResumeScore();

  // Update state
  hiddenScore          += gained;
  resumesToday         += 1;
  resumesSentTotal     += 1;

  // Tick resume-duration modifiers
  if (typeof tickResumeModifiers === "function") {
    tickResumeModifiers();
  }

  // Persist
  saveGame({
    hiddenScore,
    resumesSentToday:  resumesToday,
    resumesSentTotal,
    activeModifiers
  });

  // Show feedback (no score values revealed)
  showResumeMessage(getSubmitFeedback(gained));

  // Reset selections
  resume = { plant: null, photo: null, date: null };
  clearAllSelections();

  // 2.7 — Win check (redirects to win.html if condition met)
  if (typeof checkWin === "function" && checkWin()) {
    return; // navigation handled by checkWin → goWin()
  }

  // Check if daily limit now reached — show Next Day prompt
  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // Load a new job card for the next resume
  loadJobCard();
}


// ======================
// UI HELPERS
// ======================

// Clear all selected button highlights
function clearAllSelections() {
  ["plant", "photo", "date"].forEach(group => clearSelection(group));
}

// Show inline feedback message instead of alert()
function showResumeMessage(text) {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText = text;
    el.style.display = "block";
    // Auto-hide after 3 seconds
    setTimeout(() => { el.style.display = "none"; }, 3000);
  } else {
    // Fallback if element not in HTML yet
    console.log("[Resume Message]", text);
  }
}

// Show prompt when daily resume limit is reached
function showDailyLimitReached() {
  const el = document.getElementById("resumeMessage");
  if (el) {
    el.innerText = "You've sent all your resumes for today. Head back to the HUB!";
    el.style.display = "block";
  }
  // Disable submit button
  const btn = document.getElementById("submitResumeBtn");
  if (btn) btn.disabled = true;
}

// Feedback text based on score gained — no numbers revealed
function getSubmitFeedback(score) {
  if (score >= 3) return "Excellent resume! The employer seems very interested.";
  if (score === 2) return "Good resume. Solid choices.";
  if (score === 1) return "Resume sent. Room for improvement, but it counts.";
  return "Resume sent. Keep trying!";
}

// Update the resumes-sent counter in the UI
function updateResumeCounter() {
  const limit = getDailyResumeLimit();
  const el = document.getElementById("resumesTodayDisplay");
  if (el) el.innerText = `${resumesToday} / ${limit}`;
}


// ======================
// 🚀 PAGE INIT
// Runs when resume.html loads.
// ======================

function initResumePage() {
  // Load saved state
  if (typeof loadGame === "function") loadGame();

  // Block access if no active game
  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  // Load a job card
  loadJobCard();

  // Update counter display
  updateResumeCounter();

  // If limit already reached (player navigated back), show message
  if (isResumeLimitReached()) {
    showDailyLimitReached();
  }

  console.log("[Resume] Page ready.");
}

initResumePage();


// ======================
// EXPORTS
// ======================

window.selectPlant      = selectPlant;
window.selectPhoto      = selectPhoto;
window.selectDate       = selectDate;
window.submitResume     = submitResume;
window.loadJobCard      = loadJobCard;
window.initResumePage   = initResumePage;