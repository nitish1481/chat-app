import User from "../models/user.model.js"; 

export const getUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(200).json([]); 
    }

    const searchRegex = new RegExp(`^${query}`, "i");

    const loggedInUserId = req.user._id; 
    
    const users = await User.find({
      username: { $regex: searchRegex },
      _id: { $ne: loggedInUserId },
    }).select("-password -email -friendRequests -friends");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};