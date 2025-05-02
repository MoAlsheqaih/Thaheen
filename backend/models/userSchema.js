const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { first: { type: String, required: true }, last: { type: String, required: true } },
    password: { type: String, required: true },
    role: { type: String, enum: ["regular", "master", "admin"], default: "regular" },

    progress: {
        type: Map,
        of: {
            selectedAnswerId: { type: String, default: null },
            userRating: { type: Number, default: null },
            submitted: { type: Boolean, default: false },
            submissionTime: { type: Date, default: null },
            bookmarked: { type: Boolean, default: false },
            correct: { type: Boolean, default: null }
        },
        default: {}
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;