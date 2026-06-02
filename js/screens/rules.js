window.onload = function() {
  if (typeof loadGame === "function") {
    loadGame();
  }
};

function toggleSection(idx) {
  document.querySelectorAll('.rules-section').forEach((s, i) => {
    if (i === idx) s.classList.toggle('open');
    else s.classList.remove('open');
  });
};