const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { first: { type: String, required: true }, last: { type: String, required: true } },
    password: { type: String, required: true },
    role: { type: String, enum: ["regular", "master", "admin"], default: "regular" },

    questionData: {
        type: [{
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
            selectedAnswerId: { type: String, default: null },
            userRating: { type: Number, default: null },
            submitted: { type: Boolean, default: false },
            bookmarked: { type: Boolean, default: false }
        }],
        default: []
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;