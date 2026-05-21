// ======================
// GAME MESSAGES (HUB atmosphere)
// ======================

const boardMessages = [
  "We are still reviewing your resume...",
  "Your resume has been sent to the magical HR department...",
  "Expect a response within 3–5 years...",
  "Unfortunately, you don't have enough mastery of ancient Excel scrolls...",
  "Your resume was lost in magical mail (this happens often)",
  "The employer is impressed... but remains silent for now",
  "The system says: 'please try again later'"
];

function getRandomBoardMessage() {
  return boardMessages[
    Math.floor(Math.random() * boardMessages.length)
  ];
}
