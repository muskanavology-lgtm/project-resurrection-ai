const mongoose = require("mongoose");

const RepoChatSchema = new mongoose.Schema({
  sessionId: String,
  messages: [
    {
      role: String,
      content: String,
    },
  ],
});

module.exports = mongoose.model("RepoChat", RepoChatSchema);