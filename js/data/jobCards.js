// ======================
// JOB CARDS DATA
// ======================

// Minimal sample job cards for MageCV — each card includes correctAnswers
// used by resume.js. This file intentionally small for testing purposes.

const jobCards = [
  {
    title: "Apprentice Herbologist",
    description: "Tend enchanted plants and assist with potion gardens.",
    correctAnswers: {
      plant: "flower",   // plant type: cactus|flower|fern
      photo: "smile",    // photo: neutral|smile|serious
      date:  "correct"   // correct|wrong
    }
  },

  {
    title: "Junior Rune Archivist",
    description: "Organize rune fragments and maintain the archive ledger.",
    correctAnswers: {
      plant: "fern",
      photo: "serious",
      date:  "correct"
    }
  },

  {
    title: "Enchanted Product Assistant",
    description: "Help craft enchanted office supplies and prepare samples.",
    correctAnswers: {
      plant: "cactus",
      photo: "neutral",
      date:  "wrong"
    }
  }
];

// Make available on window for legacy scripts
window.jobCards = jobCards;
