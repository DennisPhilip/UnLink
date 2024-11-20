import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "UnLink User",
    },
    Semester: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        }
    ],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;