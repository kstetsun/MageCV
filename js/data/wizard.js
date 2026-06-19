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
    },
    {
      id: "poll_distrust",
      nodes: [
        {
          id: "pd1",
          line: "Arindel dropped three points last night. No event. No goat. Nothing. Just gone.",
          choices: [
            { label: "Three points with no cause is harder.", score: 1, next: "pd2" },
            { label: "Polls shift all the time.", score: 0, next: "pd2" },
            { label: "It'll probably recover.", score: 0, next: "pd2" }
          ]
        },
        {
          id: "pd2",
          line: "I don't trust polls. I watch them every morning. These are compatible positions.",
          choices: [
            { label: "Watching what you distrust makes sense.", score: 1, next: "pd3" },
            { label: "That's contradictory.", score: 0, next: "pd3" },
            { label: "Maybe just trust them a little.", score: 0, next: "pd3" }
          ]
        },
        {
          id: "pd3",
          line: "I also distrust nights. Numbers move in the dark. I've told people. They react poorly.",
          choices: [
            { label: "Given the evidence, that tracks.", score: 1, next: "pd4" },
            { label: "Nights don't affect polling data.", score: 0, next: "pd4" },
            { label: "Maybe tell fewer people.", score: 0, next: "pd4" }
          ]
        },
        {
          id: "pd4",
          line: "I checked everything at midnight. The forget-me-nots. The onion supply. The chamomile.",
          choices: [
            { label: "Did checking help?", score: 1, next: "pd5" },
            { label: "That's a lot to check at midnight.", score: 0, next: "pd5" },
            { label: "The onions aren't related to the polls.", score: 0, next: "pd5" }
          ]
        },
        {
          id: "pd5",
          line: "Everything was where I left it. That's the best a night can offer. I accepted it.",
          terminal: true
        }
      ]
    },
    {
      id: "lemon_drop_new_brand",
      nodes: [
        {
          id: "ln1",
          line: "A new lemon drop arrived last week. I tried it the same day. I've been thinking since.",
          choices: [
            { label: "What did you conclude?", score: 1, next: "ln2" },
            { label: "Trying it quickly is fine.", score: 0, next: "ln2" },
            { label: "What brand?", score: 0, next: "ln2" }
          ]
        },
        {
          id: "ln2",
          line: "It's good. That's the problem. I've had a preferred brand for eleven years. This is sharper.",
          choices: [
            { label: "A lemon drop shouldn't cause this.", score: 1, next: "ln3" },
            { label: "Different isn't a problem.", score: 0, next: "ln3" },
            { label: "Maybe you like both.", score: 0, next: "ln3" }
          ]
        },
        {
          id: "ln3",
          line: "I'm running a controlled test. One of each, every evening, same hour. No other food present.",
          choices: [
            { label: "A proper test needs proper conditions.", score: 1, next: "ln4" },
            { label: "That's a lot of structure for candy.", score: 0, next: "ln4" },
            { label: "What does your test show so far?", score: 0, next: "ln4" }
          ]
        },
        {
          id: "ln4",
          line: "Inconclusive. Which is itself a result. I've rated the inconclusiveness four stars. Honest.",
          choices: [
            { label: "Four stars for not knowing is generous.", score: 1, next: "ln5" },
            { label: "That's not how ratings work.", score: 0, next: "ln5" },
            { label: "When will you have a conclusion?", score: 0, next: "ln5" }
          ]
        },
        {
          id: "ln5",
          line: "After the election. Or never. Both outcomes carry their own flavor. I'll document either way.",
          terminal: true
        }
      ]
    },
    {
      id: "french_elf_restaurant",
      nodes: [
        {
          id: "fe1",
          line: "The French elves opened a restaurant here. Two weeks after the shortage. Interesting timing.",
          choices: [
            { label: "Which side of that are you on?", score: 1, next: "fe2" },
            { label: "A new restaurant is good.", score: 0, next: "fe2" },
            { label: "Probably just a coincidence.", score: 0, next: "fe2" }
          ]
        },
        {
          id: "fe2",
          line: "I walked past it. Good font on the sign. I noticed the font before the onion implications.",
          choices: [
            { label: "The font detail is very specific.", score: 1, next: "fe3" },
            { label: "A long line is a good sign.", score: 0, next: "fe3" },
            { label: "Soup smell is usually encouraging.", score: 0, next: "fe3" }
          ]
        },
        {
          id: "fe3",
          line: "It smelled extraordinary. I want to be honest. The smell is separate from article fourteen.",
          choices: [
            { label: "Both things can be true at once.", score: 1, next: "fe4" },
            { label: "If it smells good, go in.", score: 0, next: "fe4" },
            { label: "Article fourteen again.", score: 0, next: "fe4" }
          ]
        },
        {
          id: "fe4",
          line: "I'm not going in yet. After the election. When I can eat soup without being part of it.",
          choices: [
            { label: "You're checking if that sounds reasonable.", score: 1, next: "fe5" },
            { label: "The election won't change the soup.", score: 0, next: "fe5" },
            { label: "Go when you want to go.", score: 0, next: "fe5" }
          ]
        },
        {
          id: "fe5",
          line: "I'm checking. It mostly does. The font was very clean. I keep thinking about that font.",
          terminal: true
        }
      ]
    },
    {
      id: "chamomile_bad_season",
      nodes: [
        {
          id: "cs1",
          line: "The chamomile this year was pale, thin, bloomed late. I took it personally. Still do.",
          choices: [
            { label: "Being told it's irrational doesn't help.", score: 1, next: "cs2" },
            { label: "Maybe something affected the soil.", score: 0, next: "cs2" },
            { label: "What do you think caused it?", score: 0, next: "cs2" }
          ]
        },
        {
          id: "cs2",
          line: "Chamomile responds to intention. Thirty years of evidence. Not a widely held view. Fine.",
          choices: [
            { label: "The room meaning the world in general.", score: 1, next: "cs3" },
            { label: "Plants don't respond to intention.", score: 0, next: "cs3" },
            { label: "What would change your view?", score: 0, next: "cs3" }
          ]
        },
        {
          id: "cs3",
          line: "The world, yes. The onion situation. The election. Chamomile registers it faster than most.",
          choices: [
            { label: "Annoying and honest is a hard combination.", score: 1, next: "cs4" },
            { label: "That's giving chamomile too much credit.", score: 0, next: "cs4" },
            { label: "What do you do with a bad harvest?", score: 0, next: "cs4" }
          ]
        },
        {
          id: "cs4",
          line: "I dried what I had. Enough for the important weeks. Around elections I drink significant amounts.",
          choices: [
            { label: "No explanation needed, it makes sense.", score: 1, next: "cs5" },
            { label: "You could buy more.", score: 0, next: "cs5" },
            { label: "Maybe next year improves.", score: 0, next: "cs5" }
          ]
        },
        {
          id: "cs5",
          line: "I've tried market chamomile. It does the thing. It just doesn't know me. That's all.",
          terminal: true
        }
      ]
    },
    {
      id: "secret_onions",
      nodes: [
        {
          id: "so1",
          line: "I'm growing onions. Back corner. Small batch. Nobody knows. I'm telling you now.",
          choices: [
            { label: "Why keep it quiet?", score: 1, next: "so2" },
            { label: "Growing your own makes sense.", score: 0, next: "so2" },
            { label: "How many did you plant?", score: 0, next: "so2" }
          ]
        },
        {
          id: "so2",
          line: "If people know, people ask. They'll have valid reasons. I won't say no. Then no onions.",
          choices: [
            { label: "You've protected yourself from your own generosity.", score: 1, next: "so3" },
            { label: "Sharing might be worth it.", score: 0, next: "so3" },
            { label: "That's a very specific concern.", score: 0, next: "so3" }
          ]
        },
        {
          id: "so3",
          line: "This happened with chamomile. Three years ago. I had nothing left by February. Lesson learned.",
          choices: [
            { label: "Warm feelings that don't help in spring.", score: 1, next: "so4" },
            { label: "Be more careful who you tell.", score: 0, next: "so4" },
            { label: "That sounds generous actually.", score: 0, next: "so4" }
          ]
        },
        {
          id: "so4",
          line: "They're doing well. Better than expected. I've been keeping them informed. The election, the shortage.",
          choices: [
            { label: "The onions are responding to the situation.", score: 1, next: "so5" },
            { label: "Good soil explains good growth.", score: 0, next: "so5" },
            { label: "The chamomile may be affecting your analysis.", score: 0, next: "so5" }
          ]
        },
        {
          id: "so5",
          line: "Possibly. But they look exceptional for the conditions. Something is helping. I won't question it.",
          terminal: true
        }
      ]
    },
    {
      id: "forget_me_not_suspect",
      nodes: [
        {
          id: "fs1",
          line: "Someone pulled my forget-me-nots. The good ones. East corner. Two years of work. Gone.",
          choices: [
            { label: "A clean pull means someone experienced.", score: 1, next: "fs2" },
            { label: "Are you sure they didn't just die?", score: 0, next: "fs2" },
            { label: "Could it have been an animal?", score: 0, next: "fs2" }
          ]
        },
        {
          id: "fs2",
          line: "Not an animal. Animals make mess. This was deliberate. I have a suspect. No proof yet.",
          choices: [
            { label: "One past mistake and you're already factoring it in.", score: 1, next: "fs3" },
            { label: "Who do you suspect?", score: 0, next: "fs3" },
            { label: "Without proof, nothing can be done.", score: 0, next: "fs3" }
          ]
        },
        {
          id: "fs3",
          line: "My neighbour Tormand has been very friendly. Commented on those specific flowers. I wrote it down.",
          choices: [
            { label: "You wrote it down before knowing why.", score: 1, next: "fs4" },
            { label: "Friendly neighbours are usually just friendly.", score: 0, next: "fs4" },
            { label: "Complimenting flowers isn't suspicious.", score: 0, next: "fs4" }
          ]
        },
        {
          id: "fs4",
          line: "No forget-me-nots in his garden. I checked from the street. There is a legal distinction.",
          choices: [
            { label: "Checking from the street is entirely reasonable.", score: 1, next: "fs5" },
            { label: "Just ask him directly.", score: 0, next: "fs5" },
            { label: "Absence of flowers isn't evidence.", score: 0, next: "fs5" }
          ]
        },
        {
          id: "fs5",
          line: "It's a data point. I'm collecting them. We looked at each other yesterday. We both know something.",
          terminal: true
        }
      ]
    },
    {
      id: "election_eve",
      nodes: [
        {
          id: "ee1",
          line: "Election is tomorrow. I've been preparing since last week. My colleague finds this excessive.",
          choices: [
            { label: "Some days require more preparation.", score: 1, next: "ee2" },
            { label: "What kind of preparing?", score: 0, next: "ee2" },
            { label: "Try not to build it up too much.", score: 0, next: "ee2" }
          ]
        },
        {
          id: "ee2",
          line: "Chamomile stocked. Lemon drops positioned. Herb arrangement refreshed. Onions checked. Tormand watched.",
          choices: [
            { label: "Tormand is still on the list.", score: 1, next: "ee3" },
            { label: "That's a thorough list.", score: 0, next: "ee3" },
            { label: "Tormand is probably not an election concern.", score: 0, next: "ee3" }
          ]
        },
        {
          id: "ee3",
          line: "Tormand is always on the list now. The timing feels connected. I don't separate connected things.",
          choices: [
            { label: "Unexplained connections are still connections.", score: 1, next: "ee4" },
            { label: "Tormand and the election are separate.", score: 0, next: "ee4" },
            { label: "Focus on one thing at a time.", score: 0, next: "ee4" }
          ]
        },
        {
          id: "ee4",
          line: "I have a backup plan for a loss. Chamomile first. Then lemon drop. Then the forget-me-nots. Then sleep.",
          choices: [
            { label: "A plan on good paper is a real comfort.", score: 1, next: "ee5" },
            { label: "Hopefully you won't need it.", score: 0, next: "ee5" },
            { label: "That's a lot of steps.", score: 0, next: "ee5" }
          ]
        },
        {
          id: "ee5",
          line: "Each step does something different. I've had bad election nights. You learn. The goats are accounted for.",
          terminal: true
        }
      ]
    },
    {
      id: "lemon_drop_samples",
      nodes: [
        {
          id: "ls1",
          line: "Three new lemon drop samples arrived this week. Supplier I've been watching. Deliberate vagueness.",
          choices: [
            { label: "Deliberate vagueness is its own information.", score: 1, next: "ls2" },
            { label: "Suppliers don't always share details.", score: 0, next: "ls2" },
            { label: "What made you watch this supplier?", score: 0, next: "ls2" }
          ]
        },
        {
          id: "ls2",
          line: "Recommended by someone with good herb instincts but questionable confectionery taste. Too sweet. Consistently.",
          choices: [
            { label: "Useful information and trustworthy source are different things.", score: 1, next: "ls3" },
            { label: "A recommendation is still a starting point.", score: 0, next: "ls3" },
            { label: "What were your questions about their taste?", score: 0, next: "ls3" }
          ]
        },
        {
          id: "ls3",
          line: "Good ideas, overexplained. You learn to adjust. I adjusted. The first sample was indeed too sweet.",
          choices: [
            { label: "Adjusting for someone's bias is a skill.", score: 1, next: "ls4" },
            { label: "Sweet preferences are just personal taste.", score: 0, next: "ls4" },
            { label: "Did the adjustment help?", score: 0, next: "ls4" }
          ]
        },
        {
          id: "ls4",
          line: "The second was sharp and strange. Interesting for thirty seconds. Then not. I noted both phases.",
          choices: [
            { label: "Interesting for thirty seconds is still worth noting.", score: 1, next: "ls5" },
            { label: "Sharp and strange doesn't sound appealing.", score: 0, next: "ls5" },
            { label: "What about the third?", score: 0, next: "ls5" }
          ]
        },
        {
          id: "ls5",
          line: "Haven't tried the third. I'm saving it. Sometimes you want something left to discover. Good shelf.",
          terminal: true
        }
      ]
    },
    {
      id: "new_chamomile_supplier",
      nodes: [
        {
          id: "nc1",
          line: "Found a new chamomile supplier. Good price, good quantity, fast delivery. Three green flags. Suspicious.",
          choices: [
            { label: "Three good signs made you look harder.", score: 1, next: "nc2" },
            { label: "Three good signs sounds like a good find.", score: 0, next: "nc2" },
            { label: "Maybe it's just a good supplier.", score: 0, next: "nc2" }
          ]
        },
        {
          id: "nc2",
          line: "It looked right. Smelled almost right. Slightly to the left of right. That distinction matters.",
          choices: [
            { label: "Slightly to the left of right is a real category.", score: 1, next: "nc3" },
            { label: "If it looks and smells fine, it's fine.", score: 0, next: "nc3" },
            { label: "Your usual supplier set a high standard.", score: 0, next: "nc3" }
          ]
        },
        {
          id: "nc3",
          line: "Like a sentence that ends correctly but slightly too fast. Technically fine. Carries something unresolved.",
          choices: [
            { label: "You know what you're looking for even when it's hard to name.", score: 1, next: "nc4" },
            { label: "That might just be personal taste.", score: 0, next: "nc4" },
            { label: "Most people wouldn't notice the difference.", score: 0, next: "nc4" }
          ]
        },
        {
          id: "nc4",
          line: "I ordered three more bags. The price was good. The election is next week. This is not the moment for a gap.",
          choices: [
            { label: "Timing forced your hand a little.", score: 1, next: "nc5" },
            { label: "Three bags of something slightly off is a lot.", score: 0, next: "nc5" },
            { label: "Maybe you'll get used to it.", score: 0, next: "nc5" }
          ]
        },
        {
          id: "nc5",
          line: "I will not get used to it. I want that on record. Temporarily. That is all this is. Temporarily.",
          terminal: true
        }
      ]
    }
  ],
  choices: []
};