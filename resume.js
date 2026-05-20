// ======================
// 📄 RESUME STATE
// ======================

let resume = {
  plant: null,
  photo: null,
  date: null
};

// ======================
// 🌱 SELECTIONS
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
// 🧠 SCORE CALCULATION
// ======================

function calculateResumeScore() {
  let base = 10;

  // 🌱 plant logic
  if (resume.plant === "flower") base += 2;
  if (resume.plant === "fern") base += 1;
  if (resume.plant === "cactus") base += 0;

  // 📸 photo logic
  if (resume.photo === "smile") base += 2;
  if (resume.photo === "serious") base += 1;
  if (resume.photo === "neutral") base += 0;

  // 📅 date logic
  if (resume.date === "correct") base += 2;
  if (resume.date === "wrong") base -= 2;

  // 🚫 минимальный порог
  if (base < 10) base = 10;

  return base;
}

// ======================
// 📨 SUBMIT RESUME
// ======================

function submitResume() {

  // ensure core game variables exist
  if (typeof resumesToday === 'undefined' || resumesToday === null) resumesToday = 0;
  if (typeof score === 'undefined' || score === null) score = 0;

  // ensure core functions are available
  if (typeof saveGame !== 'function' || typeof goHub !== 'function') {
    alert('Core game scripts not loaded. Please reload the page.');
    return;
  }

  // лимит 10 резюме в день
  if (resumesToday >= 10) {
    alert('Достигнут лимит резюме на сегодня.');
    return;
  }

  let gained = calculateResumeScore();

  score += gained;
  resumesToday++;

  saveGame();

  // очищаем выбор после отправки
  resume = {
    plant: null,
    photo: null,
    date: null
  };

  goHub();
}

// Make sure handlers are available to inline onclick attributes
if (typeof window !== 'undefined') {
  window.selectPlant = selectPlant;
  window.selectPhoto = selectPhoto;
  window.selectDate = selectDate;
  window.submitResume = submitResume;
}