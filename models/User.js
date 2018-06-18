const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ideas: [
    {
      idea_id: {
        type: Schema.Types.ObjectId,
        ref: "ideas"
      }
    }
  ],
  votes: [
    {
      idea_id: {
        type: Schema.Types.ObjectId,
        ref: "ideas"
      },
      idea_vote: {
        type: String
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
