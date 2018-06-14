const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ThumbnailSchema = new Schema({
  name: {
    type: String,
    required: true
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

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Thumbnail = mongoose.model("thumbnails", ThumbnailSchema);
