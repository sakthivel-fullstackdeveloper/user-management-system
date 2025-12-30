const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const users = await User.find()
      .select("-password") 
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
      currentPage,
      totalPages: Math.ceil(totalUsers / pageSize),
      users,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.activateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User activated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.deactivateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deactivated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
