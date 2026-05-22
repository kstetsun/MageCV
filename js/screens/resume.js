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
//   6.1 — job card modal opens automatically on page load and after each submit
//   6.2 — "View card" button in banner re-opens modal at any time
// ======================


// ======================
// 📋 ACTIVE JOB CARD
// ======================

let activeJobCard = null;


// ======================
// 6.1 / 6.2 — JOB CARD MODAL
// Opens automatically when a new card is loaded (page load + after each submit).
// Can also be re-opened manually via the "View card" banner button.
// Closes on: confirm button, ✕ button, or clicking the overlay backdrop.
// ======================

function openJobCardModal() {
  const modal = document.getElementById("jobCardModal");
  if (!modal) return;
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
}

function closeJobCardModal() {
  const modal = document.getElementById("jobCardModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
}

// Closes modal only when the dark backdrop itself is clicked,
// not when clicking inside the card.
function handleModalOverlayClick(event) {
  if (event.target === document.getElementById("jobCardModal")) {
    closeJobCardModal();
  }
}

// Populate all modal fields from a job card object.
function _populateModal(card) {
  const titleEl = document.getElementById("modalJobTitle");
  if (titleEl) titleEl.innerText = card.title || "—";

  const descEl = document.getElementById("modalJobDescription");
  if (descEl) descEl.innerText = card.description || "";

  const imgEl    = document.getElementById("modalJobImage");
  const phEl     = document.getElementById("modalImagePlaceholder");
  const imgSrc   = `../assets/jobcards/${card.id}.png`;

  if (imgEl) {
    imgEl.src   = imgSrc;
    imgEl.alt   = card.title || "";
    imgEl.style.display = "none"; // hide until confirmed loaded

    imgEl.onload  = () => {
      imgEl.style.display = "block";
      if (phEl) phEl.style.display = "none";
    };
    imgEl.onerror = () => {
      imgEl.style.display = "none";
      if (phEl) phEl.style.display = "flex";
    };
  }

  // Debug hints — remove once real PNG assets are in place
  _renderCorrectAnswerHints(card);
}


// ======================
// 2.6 — LOAD & DISPLAY JOB CARD
// ======================

function loadJobCard() {
  if (!jobCards || jobCards.length === 0) {
    console.warn("[Resume] No job cards found in jobCards.js");
    return;
  }

  activeJobCard = jobCards[Math.floor(Math.random() * jobCards.length)];

  // --- Banner strip ---
  const titleEl = document.getElementById("jobCardTitle");
  if (titleEl) titleEl.innerText = activeJobCard.title;

  const descEl = document.getElementById("jobCardDescription");
  if (descEl) descEl.innerText = activeJobCard.description || "";

  const stripImg = document.getElementById("jobCardImage");
  const stripFb  = document.getElementById("jobCardImageFallback");
  if (stripImg) {
    stripImg.src = `../assets/jobcards/${activeJobCard.id}.png`;
    stripImg.alt = activeJobCard.title;
    stripImg.style.display = "none";
    stripImg.onload  = () => {
      stripImg.style.display = "block";
      if (stripFb) stripFb.style.display = "none";
    };
    stripImg.onerror = () => {
      stripImg.style.display = "none";
      if (stripFb) stripFb.style.display = "flex";
    };
  }

  // --- Modal ---
  _populateModal(activeJobCard);

  // 6.1 — Auto-open modal so player reads the card before choosing
  openJobCardModal();

  console.log(`[Resume] Job card loaded: ${activeJobCard.title}`);
}

// Temporary helper — renders correct answer hints in the modal debug element.
// Remove or hide once real job card PNG assets are in place.
function _renderCorrectAnswerHints(card) {
  const hintEl = document.getElementById("jobCardHints");
  if (!hintEl || !card.correctAnswers) return;
  const c = card.correctAnswers;
  hintEl.innerHTML =
    `<span class="hint-tag">plant: ${c.plant}</span>` +
    `<span class="hint-tag">photo: ${c.photo}</span>` +
    `<span class="hint-tag">date: ${c.date}</span>`;
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

  // 5.2 — Apply active modifiers
  const finalScore = (typeof applyModifiersToScore === "function")
    ? applyModifiersToScore(base)
    : base;

  console.log(`[Resume] Score: base=${base} → after modifiers=${finalScore}`);
  return finalScore;
}


// ======================
// 2.4 — DAILY RESUME LIMIT
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
//  11. Load next job card (auto-opens modal for next application — 6.1)
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

  // Step 5 — 5.3: Tick resume-duration modifiers AFTER score is calculated
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

  // Daily limit now reached after this submit
  if (isResumeLimitReached()) {
    showDailyLimitReached();
    return;
  }

  // Step 10 — 4.1: NPC spawn attempt (20% chance, respects daily limit)
  trySpawnNPCFromResume();

  // Step 11 — Load next job card (openJobCardModal is called inside loadJobCard)
  loadJobCard();
}


// ======================
// 4.1 — NPC SPAWN TRIGGER (Resume Room)
// ======================

function trySpawnNPCFromResume() {
  if (typeof npcInteractionsToday === "undefined" ||
      typeof npcInteractionsLimit === "undefined") return;

  if (npcInteractionsToday >= npcInteractionsLimit) return;

  const save = (typeof loadRaw === "function") ? loadRaw() : {};
  if (save.npcPending) return;

  if (Math.random() > 0.20) return;

  const npc = (typeof getRandomNPC === "function") ? getRandomNPC() : null;
  if (!npc) return;

  console.log(`[Resume] NPC spawned: ${npc.name}`);
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

  if (typeof hasSave === "function" && !hasSave()) {
    window.location.href = "start.html";
    return;
  }

  loadJobCard();        // populates banner + modal, auto-opens modal (6.1)
  updateResumeCounter();
  updateModifierDisplay();

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

window.selectPlant             = selectPlant;
window.selectPhoto             = selectPhoto;
window.selectDate              = selectDate;
window.submitResume            = submitResume;
window.loadJobCard             = loadJobCard;
window.openJobCardModal        = openJobCardModal;
window.closeJobCardModal       = closeJobCardModal;
window.handleModalOverlayClick = handleModalOverlayClick;
window.trySpawnNPCFromResume   = trySpawnNPCFromResume;
window.initResumePage          = initResumePage;