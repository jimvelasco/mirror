const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const MimeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  artist: {
    type: String
  },
  song: {
    type: String
  },
  lyrics: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  emotion: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  releaseDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 0
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mime = mongoose.model("mimes", MimeSchema);
