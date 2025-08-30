import User from "../models/user.model.js";

export const sendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverUserName = req.params.username;
    if (!receiverUserName) {
      return res.status(400).json({ message: "Receiver username is required" });
    }

    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const receiverUser = await User.findOne({ username: receiverUserName });
    if (!receiverUser) {
      return res
        .status(404)
        .json({ message: "Receiver with that username not found" });
    }

    if (senderUser.username === receiverUserName) {
      return res
        .status(400)
        .json({ message: "You cannot send friend request to yourself" });
    }

    if (senderUser.friends.includes(receiverUser._id)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    if (receiverUser.friendRequests.includes(senderUser._id)) {
      return res.status(400).json({
        message: "You have already sent a friend request to this user",
      });
    }

    receiverUser.friendRequests.push(senderUser._id);
    await receiverUser.save();
    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptRequest = async (req, res) => {
  const receiverId = req.user._id;
  const senderUserName = req.params.username;
  const receiverUser = await User.findById(receiverId);
  const senderUser = await User.findOne({username:senderUserName});

  if (!receiverUser) {
    return res.status(400).json({ message: "Receiver user not found" });
  }

  if (!senderUser) {
    return res.status(400).json({ message: "Sender user not found" });
  }

  if (
    receiverUser.friends.includes(senderUser._id) ||
    senderUser.friends.includes(receiverId)
  ) {
    return res
      .status(400)
      .json({ message: "You are already friends with this user" });
  }

  if (receiverUser.friendRequests.includes(senderUser._id)) {
    receiverUser.friends.push(senderUser._id);
    await receiverUser.save();
    senderUser.friends.push(receiverId);
    await senderUser.save();
    receiverUser.friendRequests.pull(senderUser._id);
    await receiverUser.save();

    res.status(200).json({ message: "Request accepted" });
  }
  else{
    res.status(400).json({ message: "Request not found" });
  }
};

export const declineRequest = async (req, res) => {
  const receiverId = req.user._id;
  const senderUserName = req.params.username;

  console.log("decline request called", receiverId,senderUserName)

  const receiverUser = await User.findById(receiverId);
  const senderUser = await User.findOne({username:senderUserName});

  if (!receiverUser) {
    return res.status(400).json({ message: "Receiver user not found" });
  }

  if (!senderUser) {
    return res.status(400).json({ message: "Sender user not found" });
  }

  if (
    receiverUser.friends.includes(senderUser._id) ||
    senderUser.friends.includes(receiverId)
  ) {
    return res
      .status(400)
      .json({ message: "You are already friends with this user" });
  }

  if (receiverUser.friendRequests.includes(senderUser._id)) {
    receiverUser.friendRequests.pull(senderUser._id);
    await receiverUser.save();
    res.status(200).json({ message: "Request declined" });
  }
  else{
    res.status(400).json({ message: "Request not found" });
  }
};

export const getRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "friendRequests",
      "username fullName profilePic"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friendRequests);
  } catch (error) {
    console.error("Error in getRequests: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "friends",
      "username fullName profilePic"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getRequests: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
