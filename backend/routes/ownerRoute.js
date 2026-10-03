const express = require("express");
const ownerOnly = require("../middleware/ownerMiddleware");
const protect = require("../middleware/authMiddleware") ; 

const {
  registerOwner,
  loginOwner,
  getOwnerProfile,
} = require("../controllers/ownerController");



const router = express.Router();

router.post("/register", registerOwner);

router.post("/login", loginOwner);

router.get("/profile", protect,ownerOnly, getOwnerProfile);

module.exports = router;