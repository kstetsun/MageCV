const elfData = {
  id: "elf",
  name: "Elf",
  minEffect: 2,
  maxEffect: 5,
  dialogues: [
    {
      id: "ai_displacement",
      nodes: [
        {
          id: "ai1",
          line: "The algorithm painted my cousin's portrait. Faster. Cheaper. Better lighting.",
          choices: [
            { label: "That's genuinely devastating.", score: 1, next: "ai2" },
            { label: "Progress moves fast.", score: 0, next: "ai2" },
            { label: "Efficiency is good actually.", score: 0, next: "ai2" }
          ]
        },
        {
          id: "ai2",
          line: "He now sells artisanal memory crystals at the weekend market.",
          choices: [
            { label: "Is he okay?", score: 1, next: "ai3" },
            { label: "That sounds fine.", score: 0, next: "ai3" },
            { label: "Market demand adapts.", score: 0, next: "ai3" }
          ]
        },
        {
          id: "ai3",
          line: "He's fine. Smiles too much now. That worries me.",
          choices: [
            { label: "Grief takes many forms.", score: 1, next: "ai4" },
            { label: "Maybe he's happy.", score: 0, next: "ai4" },
            { label: "He pivoted. Smart.", score: 0, next: "ai4" }
          ]
        },
        {
          id: "ai4",
          line: "Anyway — have you considered joining my grief-networking circle?",
          choices: [
            { label: "Tell me more about it.", score: 1, next: "ai5" },
            { label: "I'm quite busy.", score: 0, next: "ai5" },
            { label: "That sounds exhausting.", score: 0, next: "ai5" }
          ]
        },
        {
          id: "ai5",
          line: "We meet Tuesdays. We process. We connect. We cry productively.",
          terminal: true
        }
      ]
    },
    {
      id: "networking_spirituality",
      nodes: [
        {
          id: "ns1",
          line: "I had a breakthrough at the networking retreat. Third eye, open.",
          choices: [
            { label: "What did you discover?", score: 1, next: "ns2" },
            { label: "That sounds nice.", score: 0, next: "ns2" },
            { label: "Networking isn't spiritual.", score: 0, next: "ns2" }
          ]
        },
        {
          id: "ns2",
          line: "Every handshake is a small prayer. Every LinkedIn ping, a ritual.",
          choices: [
            { label: "I've never thought of it that way.", score: 1, next: "ns3" },
            { label: "Okay.", score: 0, next: "ns3" },
            { label: "LinkedIn is a hellsite.", score: 0, next: "ns3" }
          ]
        },
        {
          id: "ns3",
          line: "You are not job hunting. You are manifesting professional destiny.",
          choices: [
            { label: "That reframe helps, actually.", score: 1, next: "ns4" },
            { label: "Sure.", score: 0, next: "ns4" },
            { label: "I just want a salary.", score: 0, next: "ns4" }
          ]
        },
        {
          id: "ns4",
          line: "Connect with me. I know a warlock at a mid-size potion firm.",
          choices: [
            { label: "Yes. Absolutely. Please.", score: 1, next: "ns5" },
            { label: "Maybe later.", score: 0, next: "ns5" },
            { label: "I don't like potions.", score: 0, next: "ns5" }
          ]
        },
        {
          id: "ns5",
          line: "Wonderful. I'll forward your aura.",
          terminal: true
        }
      ]
    },
    {
      id: "theater_eulogy",
      nodes: [
        {
          id: "te1",
          line: "I saw the most beautiful play last night. It made me weep professionally.",
          choices: [
            { label: "What was it about?", score: 1, next: "te2" },
            { label: "That's nice.", score: 0, next: "te2" },
            { label: "I don't go to theater.", score: 0, next: "te2" }
          ]
        },
        {
          id: "te2",
          line: "An elven bard loses his voice to an algorithm. It sang better than him. Obviously.",
          choices: [
            { label: "That sounds heartbreaking.", score: 1, next: "te3" },
            { label: "Interesting premise.", score: 0, next: "te3" },
            { label: "Well, efficiency matters.", score: 0, next: "te3" }
          ]
        },
        {
          id: "te3",
          line: "At the end, the algorithm apologizes. The audience cried. The algorithm didn't.",
          choices: [
            { label: "That's quietly devastating.", score: 1, next: "te4" },
            { label: "Sounds dramatic.", score: 0, next: "te4" },
            { label: "The algorithm was right though.", score: 0, next: "te4" }
          ]
        },
        {
          id: "te4",
          line: "The playwright is looking for collaborators. I thought of you immediately.",
          choices: [
            { label: "Why me specifically?", score: 1, next: "te5" },
            { label: "I'm not a playwright.", score: 0, next: "te5" },
            { label: "Hard pass.", score: 0, next: "te5" }
          ]
        },
        {
          id: "te5",
          line: "You have a certain unpolished authenticity. It reads well on stage.",
          terminal: true
        }
      ]
    },
    {
      id: "contemporary_art",
      nodes: [
        {
          id: "ca1",
          line: "There's a new gallery opening in the Elven Quarter. Entirely AI-curated.",
          choices: [
            { label: "How do you feel about that?", score: 1, next: "ca2" },
            { label: "That's convenient.", score: 0, next: "ca2" },
            { label: "More efficient that way.", score: 0, next: "ca2" }
          ]
        },
        {
          id: "ca2",
          line: "The algorithm selected forty works. None by elves. It called this 'unbiased.'",
          choices: [
            { label: "That's a loaded word.", score: 1, next: "ca3" },
            { label: "Well, it's trying.", score: 0, next: "ca3" },
            { label: "Bias is complicated.", score: 0, next: "ca3" }
          ]
        },
        {
          id: "ca3",
          line: "I submitted a piece. It rated it 6.2 out of 10. Then optimized it for me.",
          choices: [
            { label: "Did you keep your version?", score: 1, next: "ca4" },
            { label: "What did it change?", score: 0, next: "ca4" },
            { label: "Maybe 6.2 was fair.", score: 0, next: "ca4" }
          ]
        },
        {
          id: "ca4",
          line: "I kept mine. I gave theirs a 4.1. I felt nothing. That concerned me.",
          choices: [
            { label: "The numbness is the real piece.", score: 1, next: "ca5" },
            { label: "Maybe take a break from art.", score: 0, next: "ca5" },
            { label: "You're overthinking this.", score: 0, next: "ca5" }
          ]
        },
        {
          id: "ca5",
          line: "...yes. Can I put you in my acknowledgments? You just said something important.",
          terminal: true
        }
      ]
    },
    {
      id: "opportunity_reframe",
      nodes: [
        {
          id: "or1",
          line: "Rejection is just an invitation to reapply with better energy.",
          choices: [
            { label: "I like that framing.", score: 1, next: "or2" },
            { label: "Mm.", score: 0, next: "or2" },
            { label: "Or it's just a no.", score: 0, next: "or2" }
          ]
        },
        {
          id: "or2",
          line: "Every closed door is a chance to network with the door.",
          choices: [
            { label: "Network with the door?", score: 1, next: "or3" },
            { label: "Sure.", score: 0, next: "or3" },
            { label: "Doors don't network.", score: 0, next: "or3" }
          ]
        },
        {
          id: "or3",
          line: "Leave an impression. They remember who knocked with intention.",
          choices: [
            { label: "How do you knock with intention?", score: 1, next: "or4" },
            { label: "I'll keep that in mind.", score: 0, next: "or4" },
            { label: "This is not useful advice.", score: 0, next: "or4" }
          ]
        },
        {
          id: "or4",
          line: "You pause. You breathe. You believe in the opportunity before it exists.",
          choices: [
            { label: "I'll try that tomorrow.", score: 1, next: "or5" },
            { label: "Okay.", score: 0, next: "or5" },
            { label: "That's just standing still.", score: 0, next: "or5" }
          ]
        },
        {
          id: "or5",
          line: "Good. I'll manifest on your behalf. Don't thank me — pay it forward.",
          terminal: true
        }
      ]
    },
    {
      id: "elven_kingdom_ai",
      nodes: [
        {
          id: "ek1",
          line: "The kingdom held a summit on creative sovereignty last week. I spoke.",
          choices: [
            { label: "What did you say?", score: 1, next: "ek2" },
            { label: "How did it go?", score: 0, next: "ek2" },
            { label: "Did anything change?", score: 0, next: "ek2" }
          ]
        },
        {
          id: "ek2",
          line: "I said: elven art cannot be replaced. Then an algorithm translated my speech. Better rhythm.",
          choices: [
            { label: "That's almost poetic.", score: 1, next: "ek3" },
            { label: "At least it helped.", score: 0, next: "ek3" },
            { label: "Maybe it was better.", score: 0, next: "ek3" }
          ]
        },
        {
          id: "ek3",
          line: "The council applauded both versions equally. I smiled. It was my worst smile.",
          choices: [
            { label: "What does your worst smile look like?", score: 1, next: "ek4" },
            { label: "I'm sorry.", score: 0, next: "ek4" },
            { label: "Equal applause seems fair.", score: 0, next: "ek4" }
          ]
        },
        {
          id: "ek4",
          line: "Like gratitude with nowhere to go. You understand, I think.",
          choices: [
            { label: "I think I do.", score: 1, next: "ek5" },
            { label: "Sort of.", score: 0, next: "ek5" },
            { label: "Not really.", score: 0, next: "ek5" }
          ]
        },
        {
          id: "ek5",
          line: "Good. That shared understanding — that's networking at its highest form.",
          terminal: true
        }
      ]
    }
  ],
  choices: []
};