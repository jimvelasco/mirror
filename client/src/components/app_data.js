// module.exports = {
//   cat_list: ["one", "two", "three"],
//   emot_list: ["four", "five", "six"]
// };

const lists = {
  wow: ["happy", "serious", "angry"],
  cool: ["one2", "serious", "three2"],
  amazing: ["one3", "happy", "angry"]
};

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
  helper3: function(param1, param2) {}
};

// const func = which => {
//   return lists[which];
// };

export default list_helper;
