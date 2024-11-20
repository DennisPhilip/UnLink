import mongoose from "mongoose";
import ConnectionRequest from "../models/connectionRequest.model.js";
import User from "../models/user.model.js";


export const sendConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user._id;

        if (senderId.toString() === userId.toString()) {
            return res.status(400).json({ message: "You cannot send a connection request to yourself" });
        }

        const sender = await User.findById(senderId);
        if (sender.connections.includes(userId)) {
            return res.status(400).json({ message: "You are already connected" });
        }

        const existingRequest = await ConnectionRequest.findOne({
            sender: senderId,
            receiver: userId,
            status: "pending",
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already exists" });
        }

        const newRequest = new ConnectionRequest({
            sender: senderId,
            receiver: userId,
        });

        await newRequest.save();

        return res.status(200).json({ 
            message: "Connection request sent successfully",
            request: newRequest 
        });
    } catch (error) {
        console.error("Error in sendConnectionRequest controller: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await ConnectionRequest.findById(requestId)
            .populate("sender", "name username")
            .populate("receiver", "name username profilePicture");

        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (request.receiver._id.toString() !== userId.toString()) { 
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ message: "Connection request is not pending" });
        }

        request.status = "accepted";
        await request.save();

        await User.findByIdAndUpdate(request.sender._id, { $addToSet: { connections: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { connections: request.sender._id } });

        res.json({ message: "Connection accepted successfully" });

    } catch (error) {
        console.log("Error in acceptConnectionRequest controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const rejectConnectionRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await ConnectionRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (request.receiver.toString() !== userId.toString()) { // Changed recipient to receiver
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ message: "Connection request is not pending" });
        }

        request.status = "rejected";
        await request.save();

        res.json({ message: "Connection request rejected successfully" });
    } catch (error) {
        console.log("Error in rejectConnectionRequest controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getConnectionRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const requests = await ConnectionRequest.find({ receiver: userId, status: "pending" }) // Changed recipient to receiver
            .populate("sender", "name username profilePicture headline connections");
        res.json(requests);
    } catch (error) {
        console.log("Error in getConnectionRequests controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUserConnections = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("connections", "name username profilePicture headline connections");
        res.json(user.connections);
    } catch (error) {
        console.log("Error in getUserConnections controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const removeConnection = async (req, res) => {
    try {
        const myId = req.user._id;
        const { userId } = req.params;

        await User.findByIdAndUpdate(myId, { $pull: { connections: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { connections: myId } });

        res.json({ message: "Connection removed successfully" });
    } catch (error) {
        console.log("Error in removeConnection controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.user._id;

        const currentUser = req.user;
        if (currentUser.connections.includes(targetUserId)) {
            return res.status(200).json({ status: "connected" });
        }

        const pendingRequest = await ConnectionRequest.findOne({
            $or: [
                { sender: currentUserId, receiver: targetUserId }, // Changed recipient to receiver
                { sender: targetUserId, receiver: currentUserId } // Changed recipient to receiver
            ],
            status: "pending"
        });

        if (pendingRequest) {
            if (pendingRequest.sender.toString() === currentUserId.toString()) {
                return res.json({ status: "pending" }); // Changed case to lower
            } else {
                return res.json({ status: "received", requestId: pendingRequest._id }); // Changed to 'received'
            }
        }

        res.json({ status: "Not Connected" });
    } catch (error) {
        console.log("Error in getConnectionStatus controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};
