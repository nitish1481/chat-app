import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const loggedInUserId = req.user._id;
  const { username } = req.params;
  const user = await User.findOne({ username: username }).select(
    "-password -friends -friendRequests -_id"
  ).lean();
  if (user) {
    const fullUser = await User.findOne({ username }).select(
      "friends friendRequests"
    ); 

    if (fullUser.friends.includes(loggedInUserId)) {
      user.friendshipStatus = "friends";
    } else if (fullUser.friendRequests.includes(loggedInUserId)) {
      user.friendshipStatus = "request_sent";
    } else {
      user.friendshipStatus = "none";
    }
  }
  console.log(user)
  res.status(200).json(user);
};
