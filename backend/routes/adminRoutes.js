const express = require("express");
const router = express.Router();

const {getUsers,activateUser,deactivateUser} = require("../controllers/adminController");

const { adminOnly } = require("../middleware/adminMiddleware");


router.get("/users", adminOnly, getUsers);

router.patch("/users/:id/activate", adminOnly, activateUser);

router.patch("/users/:id/deactivate", adminOnly, deactivateUser);

module.exports = router;
