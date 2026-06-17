const wizardData = {
  id: "wizard",
  name: "Wizard",
  minEffect: -5,
  maxEffect: 6,
  dialogues: [
  // here would be a part of double-checked dialog, which i already rewrote myself
  // part to continue re-checking
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
};