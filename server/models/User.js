const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    favorites: [
        {
            id: { type: Number, required: true },
            media_type: { type: String, enum: ["movie", "tv"], required: true }
        }
    ],
    watchlist: [
        {
            id: { type: Number, required: true },
            media_type: { type: String, enum: ["movie", "tv"], required: true }
        }
    ],
    ratings: [
        {
            id: { type: Number, required: true },
            media_type: { type: String, enum: ["movie", "tv"], required: true },
            rating: { type: Number, required: true }
        }
    ],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(this.password, salt)
        this.password = hashed
        next()
    } catch (err) {
        console.error("Error hashing password:", err)
        next(err)
    }
})


const User = mongoose.model("User", userSchema)
module.exports = User