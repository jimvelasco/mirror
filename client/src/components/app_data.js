// module.exports = {
//   cat_list: ["one", "two", "three"],
//   emot_list: ["four", "five", "six"]
// };

const xlists = {
  wow: ["all", "happy", "serious", "angry"],
  cool: ["all", "one2", "serious", "three2"],
  amazing: ["all", "one3", "happy", "angry"]
};
const lists = {
  Music: ["all", "Rock", "Country", "Jazz", "Rap", "HipHop", "Classical"],
  Relationships: [
    "all",
    "Kissing",
    "Friends",
    "Reminiscing",
    "Family",
    "Desire",
    "Flirting",
    "Back together",
    "Hooking up",
    "Make out",
    "Scorn",
    "Breaking Up",
    "It’s over"
  ],
  Communication: [
    "all",
    "Major Categories",
    "Communication",
    "Advice",
    "Apologies",
    "Bragging",
    "Commands",
    "Compliments",
    "Excuses",
    "Gratitude",
    "Hype/Swagger",
    "Inspiration",
    "Instructions ",
    "Insults",
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
  Status: [
    "all",
    "Money",
    "Cities",
    "Transportation",
    "Nature",
    "Planets",
    "Location/Places",
    "Weather",
    "Jobs",
    "Planning",
    "Countries",
    "Health",
    "Nature/parks",
    "School/Jobs",
    "Home",
    "Time",
    "Colleges",
    "High Schools"
  ],
  Phrases: [
    "all",
    "lol",
    "BFF",
    "Lmao",
    "Busted",
    "BFD",
    "WTF",
    "idk",
    "Busted!",
    "nbd",
    "TBH",
    "Own you",
    "See ya",
    "smh",
    "Karma",
    "Bye",
    "WTH",
    "yolo",
    "What’s up?",
    "idc",
    "OMG"
  ],
  Greetings: [
    "all",
    "Sympathy",
    "Anniversary",
    "Get well soon",
    "Its a Boy/Girl",
    "Baby shower",
    "Wedding",
    "Graduation",
    "I miss you",
    "Happy Birthday",
    "I love you",
    "Congratulations",
    "Engagement",
    "Bar Mitzvah"
  ],
  Holidays: [
    "all",
    "4th Of July",
    "Mothers Day",
    "Fathers Day",
    "Halloween",
    "MLK Day",
    "4/20",
    "Memorial Day",
    "New Years Day",
    "Easter",
    "Christmas",
    "New Years Eve",
    "Valentines",
    "Labor Day",
    "Hanukkah",
    "Thanksgiving"
  ],
  Entertainment: [
    "all",
    "Sports",
    "Internet",
    "Partying",
    "Humor",
    "Food",
    "Movies/Celebrities",
    "Anthems",
    "V",
    "Animals",
    "Decades",
    "Nightlife",
    "Video Games"
  ],
  // from column in sheet
  Emotions: [
    "all",
    "Anger",
    "Sadness",
    "Disgust",
    "Joy",
    "Surprise",
    "Fear",
    "Contempt"
  ],
  // from column in sheet
  Reactions: [
    "all",
    "Confused",
    "No",
    "Yes",
    "Angry",
    "Indifferent",
    "Sad",
    "Happy",
    "Love/Cute",
    "Wow/Disbelief"
  ]
};

const lists2 = {
  Anger: [
    "all",
    "Fury",
    "Vengefulness",
    "Bitterness",
    "Argumentative",
    "Exasperation",
    "Frustration",
    "Annoyance"
  ],
  Sadness: [
    "all",
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
    "all",
    "Loathe",
    "Abhorrent",
    "Revulsion",
    "Repugnance",
    "Distaste",
    "Aversion",
    "Dislike"
  ],
  Joy: [
    "all",
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
  Surprise: ["all", "Amazement", "Astonishment"],
  Fear: [
    "all",
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
  getCats: function() {
    return Object.keys(lists);
  },
  getEmotions: function(which) {
    return lists[which];
  },
  getEmotions2: function(which) {
    return lists2[which];
  }
};

// const func = which => {
//   return lists[which];
// };

export default list_helper;
