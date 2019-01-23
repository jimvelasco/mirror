const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const MimeSchema = new Schema({
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
  rating: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  // category: {
  //   type: String
  // },
  // emotion: {
  //   type: String
  // },
  cat0: {
    type: String
  },
  cat1: {
    type: String
  },
  cat2: {
    type: String
  },
  cat3: {
    type: String
  },
  search_data: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  mime: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  duration: {
    type: String
  },

  width: {
    type: Number
  },

  height: {
    type: Number
  },

  fps: {
    type: String
  },

  video_url: {
    type: String
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
