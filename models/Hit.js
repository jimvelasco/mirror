const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const HitSchema = new Schema({
  mimeid: {
    type: String
  },
  cat0: {
    type: String
  },
  cat1: {
    type: String
  },
  cat2: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hit = mongoose.model("hits", HitSchema);
