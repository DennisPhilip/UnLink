import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
 
    try {
        const currentUser = await User.findById(req.user._id).select("connections");

        const suggestedUser = await User.find({
            _id:{
                $ne: req.user._id, 
                $nin: currentUser.connections
            }
        })
        .select("name username profilePicture headline")
        .limit(5);

        res.json(suggestedUser);
    } catch (error) {
        console.log("Error in getSuggestedConnections controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
    
};

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password -connections");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log("Error in getPublicProfile controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "semester",
        ]

        const updatedData = {};
        
        for(const field of allowedFields) {
            if (req.body[field]) {
                updatedData[field] = req.body[field];
            }
        }

        const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(-"password");

        res.json(user);
    } catch (error) {
        console.log("Error in updateProfile controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
}