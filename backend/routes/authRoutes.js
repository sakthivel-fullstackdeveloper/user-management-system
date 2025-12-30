const express = require("express");
const { signup, login,getMe, logout } = require("../controllers/authController");
const middleware = require("../middleware/middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", middleware, getMe);
router.post("/logout", middleware, logout);

module.exports = router;
