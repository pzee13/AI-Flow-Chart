const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flow', flowSchema);