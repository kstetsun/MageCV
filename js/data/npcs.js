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
  },

  {
    id: "dwarf",
    name: "Dwarf HR",
    description: "Weary realist, knows how things work",
    minEffect: -3,
    maxEffect: 2,
    dialogues: [
      {
        id: "football_philosophy",
        nodes: [
          {
            id: "fp1",
            line: "Ironforge lost again. Third time this season. I'm not angry. I'm just done.",
            choices: [
              { label: "Who do they play next?", score: 1, next: "fp2" },
              { label: "That's rough.", score: 0, next: "fp2" },
              { label: "It's just a game.", score: 0, next: "fp2" }
            ]
          },
          {
            id: "fp2",
            line: "The Stoneback Crushers. Undefeated. Coach is a troll, literally.",
            choices: [
              { label: "Any chance Ironforge pulls through?", score: 1, next: "fp3" },
              { label: "Sounds tough.", score: 0, next: "fp3" },
              { label: "Trolls make good coaches actually.", score: 0, next: "fp3" }
            ]
          },
          {
            id: "fp3",
            line: "None. But I'll watch anyway. Two hundred years and I still watch.",
            choices: [
              { label: "That's loyalty.", score: 1, next: "fp4" },
              { label: "Why bother?", score: 0, next: "fp4" },
              { label: "Maybe switch teams.", score: 0, next: "fp4" }
            ]
          },
          {
            id: "fp4",
            line: "It's not loyalty. It's habit. There's a difference. Learn it before your next interview.",
            choices: [
              { label: "What's the difference?", score: 1, next: "fp5" },
              { label: "Fair enough.", score: 0, next: "fp5" },
              { label: "That's not interview advice.", score: 0, next: "fp5" }
            ]
          },
          {
            id: "fp5",
            line: "Loyalty implies hope. Habit just shows up. Employers want habit.",
            terminal: true
          }
        ]
      },
      {
        id: "rabbit_hunting",
        nodes: [
          {
            id: "rh1",
            line: "Went hunting before work. Rabbits were smarter than last year. Much smarter.",
            choices: [
              { label: "Did you catch anything?", score: 1, next: "rh2" },
              { label: "Early start.", score: 0, next: "rh2" },
              { label: "Poor rabbits.", score: 0, next: "rh2" }
            ]
          },
          {
            id: "rh2",
            line: "One. Small one. Looked at me before I caught it. Didn't run.",
            choices: [
              { label: "Why didn't it run?", score: 1, next: "rh3" },
              { label: "That's something.", score: 0, next: "rh3" },
              { label: "That's a bit sad.", score: 0, next: "rh3" }
            ]
          },
          {
            id: "rh3",
            line: "Either it trusted me or it gave up. I think about that more than I should.",
            choices: [
              { label: "Which do you hope it was?", score: 1, next: "rh4" },
              { label: "Probably just tired.", score: 0, next: "rh4" },
              { label: "It's a rabbit.", score: 0, next: "rh4" }
            ]
          },
          {
            id: "rh4",
            line: "Trust. Obviously trust. I'm not spending my mornings catching quitters.",
            choices: [
              { label: "That's unexpectedly moving.", score: 1, next: "rh5" },
              { label: "Right.", score: 0, next: "rh5" },
              { label: "It's still a rabbit.", score: 0, next: "rh5" }
            ]
          },
          {
            id: "rh5",
            line: "Don't read into it. Now fix your cover letter. Third paragraph is weak.",
            terminal: true
          }
        ]
      },
      {
        id: "global_cooling",
        nodes: [
          {
            id: "gc1",
            line: "Temperature dropped two degrees last month. Nobody's talking about it.",
            choices: [
              { label: "Are you worried?", score: 1, next: "gc2" },
              { label: "Two degrees isn't much.", score: 0, next: "gc2" },
              { label: "It's been warm lately.", score: 0, next: "gc2" }
            ]
          },
          {
            id: "gc2",
            line: "I've got four cloaks stockpiled. My wife thinks I'm overreacting. She's wrong.",
            choices: [
              { label: "What does she think is happening?", score: 1, next: "gc3" },
              { label: "Four seems like a lot.", score: 0, next: "gc3" },
              { label: "You are overreacting.", score: 0, next: "gc3" }
            ]
          },
          {
            id: "gc3",
            line: "She says it's seasonal. Two hundred years and she still says seasonal.",
            choices: [
              { label: "How long have you been tracking this?", score: 1, next: "gc4" },
              { label: "She might be right.", score: 0, next: "gc4" },
              { label: "It probably is seasonal.", score: 0, next: "gc4" }
            ]
          },
          {
            id: "gc4",
            line: "Sixty years. I have charts. The charts are very clear. Nobody looks at the charts.",
            choices: [
              { label: "I'd look at the charts.", score: 1, next: "gc5" },
              { label: "Charts aren't everything.", score: 0, next: "gc5" },
              { label: "Maybe update your methodology.", score: 0, next: "gc5" }
            ]
          },
          {
            id: "gc5",
            line: "Good. Dress in layers for your interviews. That's advice on multiple levels.",
            terminal: true
          }
        ]
      },
      {
        id: "hr_two_centuries",
        nodes: [
          {
            id: "hc1",
            line: "Two hundred and twelve years in HR. You know what's changed? The fonts on resumes.",
            choices: [
              { label: "What else has stayed the same?", score: 1, next: "hc2" },
              { label: "That can't be all.", score: 0, next: "hc2" },
              { label: "Fonts matter.", score: 0, next: "hc2" }
            ]
          },
          {
            id: "hc2",
            line: "Candidates. Same panic, different language. Used to say 'hardworking.' Now say 'passionate.'",
            choices: [
              { label: "Which do you prefer?", score: 1, next: "hc3" },
              { label: "I say passionate.", score: 0, next: "hc3" },
              { label: "They mean the same thing.", score: 0, next: "hc3" }
            ]
          },
          {
            id: "hc3",
            line: "Hardworking. At least it's honest. Passion is for hobbies. Show up, that's enough.",
            choices: [
              { label: "Should I change my resume?", score: 1, next: "hc4" },
              { label: "I disagree.", score: 0, next: "hc4" },
              { label: "Passion drives performance though.", score: 0, next: "hc4" }
            ]
          },
          {
            id: "hc4",
            line: "Yes. Delete the word 'passionate.' Also 'synergy.' And whatever 'ninja' means.",
            choices: [
              { label: "I'll do that tonight.", score: 1, next: "hc5" },
              { label: "I don't use those words.", score: 0, next: "hc5" },
              { label: "Ninja conveys agility.", score: 0, next: "hc5" }
            ]
          },
          {
            id: "hc5",
            line: "Good. Come back when it's under one page. I've got a meeting in four hours.",
            terminal: true
          }
        ]
      },
      {
        id: "dove_hunting",
        nodes: [
          {
            id: "dh1",
            line: "Orange doves are back in season. Finally something to look forward to.",
            choices: [
              { label: "Do you hunt them yourself?", score: 1, next: "dh2" },
              { label: "Nice.", score: 0, next: "dh2" },
              { label: "Orange doves are rare actually.", score: 0, next: "dh2" }
            ]
          },
          {
            id: "dh2",
            line: "Every year. Same spot by the Mirefall ridge. Forty years. Never missed.",
            choices: [
              { label: "Any good this year?", score: 1, next: "dh3" },
              { label: "That's consistent.", score: 0, next: "dh3" },
              { label: "Seems excessive.", score: 0, next: "dh3" }
            ]
          },
          {
            id: "dh3",
            line: "Three. Could've been five but my knee gave out on the second slope.",
            choices: [
              { label: "The knee's been giving you trouble?", score: 1, next: "dh4" },
              { label: "Three's not bad.", score: 0, next: "dh4" },
              { label: "Maybe retire the ridge.", score: 0, next: "dh4" }
            ]
          },
          {
            id: "dh4",
            line: "Since the Copper War. Sixty years. I don't mention it. It's mentioned anyway.",
            choices: [
              { label: "Still going every year though.", score: 1, next: "dh5" },
              { label: "You should see a healer.", score: 0, next: "dh5" },
              { label: "Maybe try flat terrain.", score: 0, next: "dh5" }
            ]
          },
          {
            id: "dh5",
            line: "Every year. That's the point. Go apply somewhere. You're wasting good stubbornness.",
            terminal: true
          }
        ]
      },
      {
        id: "market_realism",
        nodes: [
          {
            id: "mr1",
            line: "The market's bad. Not 'tough' bad. Actually bad. I've seen tough. This is different.",
            choices: [
              { label: "How different?", score: 1, next: "mr2" },
              { label: "I've noticed.", score: 0, next: "mr2" },
              { label: "It'll recover.", score: 0, next: "mr2" }
            ]
          },
          {
            id: "mr2",
            line: "Post-Goblin-Crash bad. And that took thirty years. So. Manage expectations.",
            choices: [
              { label: "What would you do in my position?", score: 1, next: "mr3" },
              { label: "That's discouraging.", score: 0, next: "mr3" },
              { label: "Thirty years seems extreme.", score: 0, next: "mr3" }
            ]
          },
          {
            id: "mr3",
            line: "Apply anyway. Every day. Not because it works. Because stopping is worse.",
            choices: [
              { label: "Has that worked for others?", score: 1, next: "mr4" },
              { label: "I am applying every day.", score: 0, next: "mr4" },
              { label: "That's bleak logic.", score: 0, next: "mr4" }
            ]
          },
          {
            id: "mr4",
            line: "Two candidates out of four thousand. But they applied every day. I remember them.",
            choices: [
              { label: "You remember them?", score: 1, next: "mr5" },
              { label: "Two out of four thousand.", score: 0, next: "mr5" },
              { label: "Those are terrible odds.", score: 0, next: "mr5" }
            ]
          },
          {
            id: "mr5",
            line: "I remember everyone who didn't complain. It's a short list. Get on it.",
            terminal: true
          }
        ]
      }
    ],
    choices: []
  },

  {
    id: "wizard",
    name: "Chaos Wizard",
    description: "Unpredictable, loves experiments",
    minEffect: -5,
    maxEffect: 6,
    dialogues: [
      {
        id: "onion_crisis",
        nodes: [
          {
            id: "oc1",
            line: "The French elves have forty thousand onions in a vault under the Seine. I've seen the maps.",
            choices: [
              { label: "How did you get the maps?", score: 1, next: "oc2" },
              { label: "That seems like a lot of onions.", score: 0, next: "oc2" },
              { label: "The Seine is not under their jurisdiction.", score: 0, next: "oc2" }
            ]
          },
          {
            id: "oc2",
            line: "A dove brought them. Orange dove. Couldn't read my reply because I wrote in soup.",
            choices: [
              { label: "You wrote in soup.", score: 1, next: "oc3" },
              { label: "What did you want to say?", score: 0, next: "oc3" },
              { label: "Doves can't carry maps.", score: 0, next: "oc3" }
            ]
          },
          {
            id: "oc3",
            line: "Onion soup. Obviously. It felt appropriate. It tasted correct.",
            choices: [
              { label: "Did the dove taste it?", score: 1, next: "oc4" },
              { label: "I don't follow.", score: 0, next: "oc4" },
              { label: "This is not how communication works.", score: 0, next: "oc4" }
            ]
          },
          {
            id: "oc4",
            line: "The dove wept. Which means either solidarity or acid reflux. Either is meaningful.",
            choices: [
              { label: "I choose solidarity.", score: 1, next: "oc5" },
              { label: "Probably reflux.", score: 0, next: "oc5" },
              { label: "Doves don't weep.", score: 0, next: "oc5" }
            ]
          },
          {
            id: "oc5",
            line: "Your resume smells faintly of onion. That will help. Or destroy everything. Good luck.",
            terminal: true
          }
        ]
      },

      {
        id: "lemon_drop_review",
        nodes: [
          {
            id: "ld1",
            line: "I've reviewed eleven lemon drop brands this quarter. This is my life's work.",
            choices: [
              { label: "Which is the best?", score: 1, next: "ld2" },
              { label: "Eleven is a lot.", score: 0, next: "ld2" },
              { label: "That's not a life's work.", score: 0, next: "ld2" }
            ]
          },
          {
            id: "ld2",
            line: "Brand seven. Notes of unresolved childhood, late autumn, and mild prophecy.",
            choices: [
              { label: "Mild prophecy as a flavor.", score: 1, next: "ld3" },
              { label: "What did it actually taste like?", score: 0, next: "ld3" },
              { label: "Those aren't flavor notes.", score: 0, next: "ld3" }
            ]
          },
          {
            id: "ld3",
            line: "It told me you were coming. Three weeks ago. I wasn't surprised to see you.",
            choices: [
              { label: "What else did it say about me?", score: 1, next: "ld4" },
              { label: "That's a coincidence.", score: 0, next: "ld4" },
              { label: "Candy doesn't prophesy.", score: 0, next: "ld4" }
            ]
          },
          {
            id: "ld4",
            line: "That you'd ask that question. I gave it five stars. This is why.",
            choices: [
              { label: "I feel observed.", score: 1, next: "ld5" },
              { label: "That's circular logic.", score: 0, next: "ld5" },
              { label: "You rated it before I asked.", score: 0, next: "ld5" }
            ]
          },
          {
            id: "ld5",
            line: "You are observed. The lemon drops see everything. Buy a bag before your interview.",
            terminal: true
          }
        ]
      },

      {
        id: "chamomile_threat",
        nodes: [
          {
            id: "ct1",
            line: "Chamomile is expanding. Three new patches appeared overnight. I measured.",
            choices: [
              { label: "Why are you measuring chamomile?", score: 1, next: "ct2" },
              { label: "It's just a plant.", score: 0, next: "ct2" },
              { label: "Chamomile spreads naturally.", score: 0, next: "ct2" }
            ]
          },
          {
            id: "ct2",
            line: "Because it waits. Forty years I've watched it. It grows toward decisions.",
            choices: [
              { label: "Toward decisions specifically?", score: 1, next: "ct3" },
              { label: "Plants grow toward light.", score: 0, next: "ct3" },
              { label: "You've watched chamomile for forty years.", score: 0, next: "ct3" }
            ]
          },
          {
            id: "ct3",
            line: "There's a patch outside the hiring office on Grimwald Street. Has been since spring.",
            choices: [
              { label: "Should I avoid Grimwald Street?", score: 1, next: "ct4" },
              { label: "That's probably a coincidence.", score: 0, next: "ct4" },
              { label: "Plants don't track HR departments.", score: 0, next: "ct4" }
            ]
          },
          {
            id: "ct4",
            line: "No. Walk through it. Slowly. Let it know you're serious. It respects that.",
            choices: [
              { label: "I'll walk through it slowly.", score: 1, next: "ct5" },
              { label: "I will not do that.", score: 0, next: "ct5" },
              { label: "The chamomile doesn't have opinions.", score: 0, next: "ct5" }
            ]
          },
          {
            id: "ct5",
            line: "It already knows your name. I told it. You're welcome. Or I'm sorry. Both apply.",
            terminal: true
          }
        ]
      },

      {
        id: "election_fervor",
        nodes: [
          {
            id: "ef1",
            line: "Arindel leads by fourteen points. I wept when I saw the numbers. Happy weeping.",
            choices: [
              { label: "You follow the polls closely?", score: 1, next: "ef2" },
              { label: "What's his platform?", score: 0, next: "ef2" },
              { label: "Fourteen points isn't decisive.", score: 0, next: "ef2" }
            ]
          },
          {
            id: "ef2",
            line: "His hair alone communicates policy. The left side means trade reform. I've studied it.",
            choices: [
              { label: "What does the right side mean?", score: 1, next: "ef3" },
              { label: "That's not how policy works.", score: 0, next: "ef3" },
              { label: "Hair doesn't communicate policy.", score: 0, next: "ef3" }
            ]
          },
          {
            id: "ef3",
            line: "Agricultural subsidies. Obviously. It's slightly more windswept on Tuesdays. Peak subsidy days.",
            choices: [
              { label: "I'll check his hair on Tuesday.", score: 1, next: "ef4" },
              { label: "That's not a real methodology.", score: 0, next: "ef4" },
              { label: "Does he know you do this?", score: 0, next: "ef4" }
            ]
          },
          {
            id: "ef4",
            line: "He sent me a portrait. Signed. His hair in it means 'thank you for your service.'",
            choices: [
              { label: "How do you know that's what it means?", score: 1, next: "ef5" },
              { label: "He probably just signed a portrait.", score: 0, next: "ef5" },
              { label: "This is not how portraits work.", score: 0, next: "ef5" }
            ]
          },
          {
            id: "ef5",
            line: "He told me. In a dream. Which I induced with chamomile tea. The circle closes.",
            terminal: true
          }
        ]
      },

      {
        id: "forget_me_not_warning",
        nodes: [
          {
            id: "fn1",
            line: "Forget-me-nots are blooming early this year. That's a professional warning sign.",
            choices: [
              { label: "A warning for whom?", score: 1, next: "fn2" },
              { label: "They bloom in spring normally.", score: 0, next: "fn2" },
              { label: "Flowers aren't warning signs.", score: 0, next: "fn2" }
            ]
          },
          {
            id: "fn2",
            line: "For anyone sending resumes. The early bloom means the market forgets quickly.",
            choices: [
              { label: "How quickly?", score: 1, next: "fn3" },
              { label: "That's not what the flower means.", score: 0, next: "fn3" },
              { label: "Botanical symbolism isn't HR data.", score: 0, next: "fn3" }
            ]
          },
          {
            id: "fn3",
            line: "Three days. After three days, your resume is a petal. Then it falls. Then it's composted.",
            choices: [
              { label: "So follow up within three days?", score: 1, next: "fn4" },
              { label: "Resumes aren't petals.", score: 0, next: "fn4" },
              { label: "That's not how applicant tracking works.", score: 0, next: "fn4" }
            ]
          },
          {
            id: "fn4",
            line: "Follow up in two. Leave one day as a buffer for unforeseen petal activity.",
            choices: [
              { label: "Noted. Two days, petal buffer included.", score: 1, next: "fn5" },
              { label: "There's no petal activity.", score: 0, next: "fn5" },
              { label: "I'll follow up when I feel ready.", score: 0, next: "fn5" }
            ]
          },
          {
            id: "fn5",
            line: "Wise. I've pressed one into your file. For luck. Or documentation. I forget which.",
            terminal: true
          }
        ]
      },

      {
        id: "fate_amplification",
        nodes: [
          {
            id: "fa1",
            line: "I amplified your fate this morning. Didn't ask. Felt it needed doing.",
            choices: [
              { label: "What does that mean exactly?", score: 1, next: "fa2" },
              { label: "Please don't do that.", score: 0, next: "fa2" },
              { label: "Fate can't be amplified.", score: 0, next: "fa2" }
            ]
          },
          {
            id: "fa2",
            line: "Your probability of success is now either higher or lower. The amplifier doesn't specify.",
            choices: [
              { label: "Can you check which one?", score: 1, next: "fa3" },
              { label: "That's not helpful.", score: 0, next: "fa3" },
              { label: "Then what was the point?", score: 0, next: "fa3" }
            ]
          },
          {
            id: "fa3",
            line: "I looked. The reading was a question mark. Which I've rated three stars. Intriguing.",
            choices: [
              { label: "Three stars for a question mark.", score: 1, next: "fa4" },
              { label: "A question mark isn't a result.", score: 0, next: "fa4" },
              { label: "I want my original fate back.", score: 0, next: "fa4" }
            ]
          },
          {
            id: "fa4",
            line: "Your original fate was also a question mark. I have the receipt. It's laminated.",
            choices: [
              { label: "Can I see the receipt?", score: 1, next: "fa5" },
              { label: "Fate doesn't have receipts.", score: 0, next: "fa5" },
              { label: "Why is it laminated.", score: 0, next: "fa5" }
            ]
          },
          {
            id: "fa5",
            line: "I lost it. But I remember the font. Very professional. You'll be fine. Probably.",
            terminal: true
          }
        ]
      }
    ],
    choices: []
  }
];


// ======================
// 🎲 HELPERS
// ======================

function getRandomNPC() {
  return npcData[Math.floor(Math.random() * npcData.length)];
}

function getRandomNPCMessage(npc) {
  return npc.messages[Math.floor(Math.random() * npc.messages.length)];
}

function getRandomEffect(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random dialogue tree from an NPC that has them (i.e. the Elf).
function getRandomDialogue(npc) {
  if (!npc.dialogues || !npc.dialogues.length) return null;
  return npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
}

// Given a dialogue and a node id, returns that node object.
function getDialogueNode(dialogue, nodeId) {
  return dialogue.nodes.find(n => n.id === nodeId) || null;
}

// Maps accumulated score from a multi-turn dialogue to a flat outcome string.
// 0–1 → "neutral", 2+ → "positive"
function scoreToOutcome(score) {
  if (score >= 2) return "positive";
  return "neutral";
}

// ======================
// EXPORTS
// ======================

window.getRandomNPC          = getRandomNPC;
window.getRandomNPCMessage   = getRandomNPCMessage;
window.getRandomEffect       = getRandomEffect;
window.getRandomDialogue     = getRandomDialogue;
window.getDialogueNode       = getDialogueNode;
window.scoreToOutcome        = scoreToOutcome;
