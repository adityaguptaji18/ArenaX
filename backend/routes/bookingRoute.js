const express = require("express");

const protect = require("../middleware/authMiddleware");

const {createBooking,getMyBookings} = require("../controllers/bookingController");

const router = express.Router();

router.post(
  "/:arenaId/book",
  protect,
  createBooking
);
router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

module.exports = router;