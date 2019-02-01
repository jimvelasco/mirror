// module.exports = {
//   cat_list: ["one", "two", "three"],
//   emot_list: ["four", "five", "six"]
// };

const xlists = {
  wow: ["all", "happy", "serious", "angry"],
  cool: ["all", "one2", "serious", "three2"],
  amazing: ["all", "one3", "happy", "angry"]
};

// Communications	Emotions	Greetings	  Holidays	  Phrases
// Insults	        Anger 	  Happy Bday	Xmas	      lol
// Apologies	      Sadness	  I love you	Valentines	wth
// Hype/swagger	  Joy	      I miss you	New Years	  nbd
// Comebacks	      Surprise	Wedding	    Mothers Day	omg
// Compliments	    Fear	    Anniversary	Halloween	  yolo

const lists = {
  // Select: [],
  // Music: ["All", "Rock", "Country", "Jazz", "Rap", "HipHop", "Classical"],
  // Relationships: [
  //   "All",
  //   "Kissing",
  //   "Friends",
  //   "Reminiscing",
  //   "Family",
  //   "Desire",
  //   "Flirting",
  //   "Back together",
  //   "Hooking up",
  //   "Make out",
  //   "Scorn",
  //   "Breaking Up",
  //   "It’s over"
  // ],
  Trending: [],
  Communication: [
    "All",
    "Insults",
    "Apologies",
    "Hype/Swagger",
    "Comebacks",
    "Compliments",

    "Major Categories",
    "Communication",
    "Advice",
    "Bragging",
    "Commands",
    "Excuses",
    "Gratitude",
    "Inspiration",
    "Instructions ",
    "Invites",
    "Opinions",
    "Requests",
    "Responses/Retorts",
    "Statements",
    "Taunts",
    "Thoughts/Ideas",
    "Threats",
    "Ultimatums",
    "Warnings",
    "Predictions"
  ],
  Emotions: [
    "All",
    "Anger",
    "Sadness",
    "Joy",
    "Surprise",
    "Fear",

    "Disgust",
    "Contempt"
  ],

  Greetings: [
    "All",
    "Happy Birthday",
    "I love you",
    "I miss you",
    "Wedding",
    "Anniversary",

    "Sympathy",
    "Get well soon",
    "Its a Boy/Girl",
    "Baby shower",
    "Graduation",
    "Congratulations",
    "Engagement",
    "Bar Mitzvah"
  ],
  Holidays: [
    "All",
    "Christmas",
    "Valentines",
    "New Years Day",
    "Mothers Day",
    "Halloween",

    "4th Of July",
    "Fathers Day",
    "MLK Day",
    "4/20",
    "Memorial Day",
    "Easter",
    "New Years Eve",
    "Labor Day",
    "Hanukkah",
    "Thanksgiving"
  ],
  Phrases: [
    "All",
    "LOL",
    "WTF",
    "WTH",
    "NBD",
    "OMG",
    "YOLO",

    "BFF",
    "Lmao",
    "Busted",
    "BFD",
    "idk",
    "Busted!",
    "TBH",
    "Own you",
    "See ya",
    "smh",
    "Karma",
    "Bye",
    "What’s up?",
    "idc"
  ]

  // Status: [
  //   "All",
  //   "Money",
  //   "Cities",
  //   "Transportation",
  //   "Nature",
  //   "Planets",
  //   "Location/Places",
  //   "Weather",
  //   "Jobs",
  //   "Planning",
  //   "Countries",
  //   "Health",
  //   "Nature/parks",
  //   "School/Jobs",
  //   "Home",
  //   "Time",
  //   "Colleges",
  //   "High Schools"
  // ],

  // Communications	Emotions	Greetings	  Holidays	  Phrases
  // Insults	        Anger 	  Happy Bday	Xmas	      lol
  // Apologies	      Sadness	  I love you	Valentines	wth
  // Hype/swagger	  Joy	      I miss you	New Years	  nbd
  // Comebacks	      Surprise	Wedding	    Mothers Day	omg
  // Compliments	    Fear	    Anniversary	Halloween	  yolo

  // Entertainment: [
  //   "All",
  //   "Sports",
  //   "Internet",
  //   "Partying",
  //   "Humor",
  //   "Food",
  //   "Movies/Celebrities",
  //   "Anthems",
  //   "V",
  //   "Animals",
  //   "Decades",
  //   "Nightlife",
  //   "Video Games"
  // ],
  // from column in sheet

  // Communications	Emotions	Greetings	  Holidays	  Phrases
  // Insults	        Anger 	  Happy Bday	Xmas	      lol
  // Apologies	      Sadness	  I love you	Valentines	wth
  // Hype/swagger	  Joy	      I miss you	New Years	  nbd
  // Comebacks	      Surprise	Wedding	    Mothers Day	omg
  // Compliments	    Fear	    Anniversary	Halloween	  yolo

  // from column in sheet
  // Reactions: [
  //   "All",
  //   "Confused",
  //   "No",
  //   "Yes",
  //   "Angry",
  //   "Indifferent",
  //   "Sad",
  //   "Happy",
  //   "Love/Cute",
  //   "Wow/Disbelief"
  // ]
};

const lists2 = {
  Anger: [
    "All",
    "Fury",
    "Vengefulness",
    "Bitterness",
    "Argumentative",
    "Exasperation",
    "Frustration",
    "Annoyance"
  ],
  Sadness: [
    "All",
    "Anguish",
    "Sorrow",
    "Grief",
    "Despair",
    "Misery",
    "Hopelessness",
    "Helplessness",
    "Resignation",
    "Distraught",
    "Discouraged",
    "Disappointed"
  ],
  Disgust: [
    "All",
    "Loathe",
    "Abhorrent",
    "Revulsion",
    "Repugnance",
    "Distaste",
    "Aversion",
    "Dislike"
  ],
  Joy: [
    "All",
    "Enjoyment",
    "Ecstasy",
    "Excitement",
    "Wonder",
    "Naches",
    "Pride",
    "Fiero",
    "Peace",
    "Relief",
    "Schadenfreude",
    "Amusement",
    "Compassion/Joy",
    "Rejoicing"
  ],
  Surprise: ["All", "Amazement", "Astonishment"],
  Fear: [
    "All",
    "Terror",
    "Horror",
    "Panic",
    "Desperation",
    "Dread",
    "Anxiety",
    "Nervousness",
    "Trepidation"
  ]
};

//Relationships 	Communication 	Status.	Phrases/acronyms 	Greetings	Holidays	Entertainment 	Emotions	Reactions

// Anger	        Sadness	      Disgust	    Joy	          Surprise	    Fear	        Contempt
// Fury	          Anguish	      Loathe	    Enjoyment	    Amazement	    Terror
// Vengefulness	  Sorrow	      Abhorrent 	Ecstasy 	    Astonishment	Horror
// Bitterness	    Grief	        Revulsion 	Excitement 		              Panic
// Argumentative  Despair	      Repugnance 	Wonder		                  Desperation
// Exasperation	  Misery 	      Distaste	  Naches 		                  Dread
// Frustration 	  Hopelessness 	Aversion	  Pride		                    Anxiety
// Annoyance	    Helplessness 	Dislike	    Fiero 		                  Nervousness
//                Resignation		            Peace		                    Trepidation
//                Distraught 		            Relief
//                Discouraged 	            Schadenfreude
//                Disappointed	            Amusement
//                                          Compassion/Joy
//                                          Rejoicing

const list_helper = {
  getCat0: function() {
    let rlist = ["Select"];
    let cary = Object.keys(lists);
    // cary.forEach(function(el) {
    //   rlist.push(el);
    // });

    // rlist.append(Object.keys(lists));
    return cary;
    //return Object.keys(lists);
  },
  getCat1: function(which) {
    return lists[which];
  },
  getCat2: function(which) {
    let rlist = [];
    if (lists2[which]) {
      rlist = lists2[which];
    }
    return rlist;
  }
};

// const func = which => {
//   return lists[which];
// };

export default list_helper;
