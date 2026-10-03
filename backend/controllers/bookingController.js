const Arena = require("../models/Arena");
const ArenaSlot = require("../models/ArenaSlot");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { arenaId } = req.params;
    const { date, startTime, endTime } = req.body;

    // User comes from authentication middleware
    const userId = req.user.id;

    // Validate required fields
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Date, startTime and endTime are required",
      });
    }

    // Check arena
    const arena = await Arena.findById(arenaId);

    if (!arena) {
      return res.status(404).json({
        message: "Arena not found",
      });
    }

    // Check if owner has blocked this slot
    const blockedSlot = await ArenaSlot.findOne({
      arena: arenaId,
      date: new Date(date),
      startTime,
    });

    if (blockedSlot) {
      return res.status(400).json({
        message: "This slot is not available",
      });
    }

    // Check if somebody has already booked it
    const existingBooking = await Booking.findOne({
      arena: arenaId,
      date: new Date(date),
      startTime,
      status: "confirmed",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    // Create booking
    const booking = await Booking.create({
      arena: arenaId,
      user: userId,
      date: new Date(date),
      startTime,
      endTime,
      status: "confirmed",
    });

    res.status(201).json({
      message: "Arena booked successfully",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};
const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("arena", "name location sport")
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {createBooking,getMyBookings};