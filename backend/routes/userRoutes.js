const express = require("express");
const userRouter = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  changePassword,
} = require("../controllers/userController");

const middleware = require("../middleware/middleware");

userRouter.get("/me", middleware, getMyProfile);
userRouter.put("/me", middleware, updateMyProfile);
userRouter.patch("/me/password", middleware, changePassword);

module.exports = userRouter;
