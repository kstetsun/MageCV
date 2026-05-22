// ======================
// 🧙 NPC DATA
// ======================

const npcData = [
  {
    id: "elf",
    name: "Elf ☕",
    description: "Friendly networker, believes in people",
    minEffect: 2,
    maxEffect: 5,
    messages: [
      "You look tired. Let me help you a bit with your career.",
      "Networking is magic, and you just forgot the spell.",
      "I've already told one important mage about you.",
      "A good word travels fast in the enchanted forest.",
      "Remember, every connection is a new opportunity."
    ],
    choices: [
      { label: "Thank you, I really appreciate that.", outcome: "positive" },
      { label: "I'll keep that in mind.", outcome: "neutral" },
      { label: "I don't have time for this.", outcome: "negative" }
    ]
  },

  {
    id: "dwarf",
    name: "Dwarf HR",
    description: "Weary realist, knows how things work",
    minEffect: -3,
    maxEffect: 2,
    messages: [
      "The resume is okay. But the market right now... you know.",
      "I'd tell you the truth, but you're not ready.",
      "Try applying another 200 times, then we'll talk.",
      "Stone doors open only for the persistent.",
      "Not every gem shines on the first polish."
    ],
    choices: [
      { label: "You're right. I'll reconsider my approach.", outcome: "positive" },
      { label: "Thanks for the feedback.", outcome: "neutral" },
      { label: "That's not helpful at all.", outcome: "negative" }
    ]
  },

  {
    id: "wizard",
    name: "Chaos Wizard",
    description: "Unpredictable, loves experiments",
    minEffect: -5,
    maxEffect: 6,
    messages: [
      "I amplified your fate. Or broke it. It's unclear for now.",
      "Career energy is unstable. Excellent!",
      "Try not to think about the results. Or think too hard.",
      "The stars are whispering about your next interview.",
      "Reality bends for those who dare to dream."
    ],
    choices: [
      { label: "I embrace the chaos willingly.", outcome: "positive" },
      { label: "I stare back in silence.", outcome: "neutral" },
      { label: "Please stop speaking in riddles.", outcome: "negative" }
    ]
  }
];


// ======================
// 🎲 HELPERS
// ======================

function getRandomNPC() {
  return npcData[
    Math.floor(Math.random() * npcData.length)
  ];
}

function getRandomNPCMessage(npc) {
  return npc.messages[
    Math.floor(Math.random() * npc.messages.length)
  ];
}

function getRandomEffect(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
