function initWinPage() {
  // Try to load raw save data (do not clear yet)
  let data = {};
  if (typeof loadRaw === "function") {
    data = loadRaw() || {};
  }

  // Fallbacks if no data
  const days = data.day || '?';
  const resumes = data.resumesSentTotal || '?';
  const mode = data.mode ? (data.mode.charAt(0).toUpperCase() + data.mode.slice(1)) : '?';

  // Fantasy job titles
  const jobTitles = [
    'Archmage of Spreadsheets',
    'Potion Logistics Coordinator',
    'Junior Rune Scribe',
    'Enchanted Mailroom Clerk',
    'Wand Quality Inspector',
    'Scroll Archivist',
    'Mystic HR Specialist',
    'Crystal Ball Analyst'
  ];
  const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];

  // Populate DOM
  document.getElementById('winDays').textContent = days;
  document.getElementById('winResumeCount').textContent = resumes;
  document.getElementById('winMode').textContent = mode;
  document.getElementById('winJobTitle').textContent = randomTitle;

  // Clear save after populating
  if (typeof clearSave === "function") {
    clearSave();
  }
}

function startOver() {
  window.location.href = 'start.html';
}

window.startOver = startOver;

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWinPage);
} else {
  initWinPage();
}
