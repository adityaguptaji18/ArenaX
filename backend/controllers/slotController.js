const Arena = require("../models/Arena");
const Booking = require("../models/Booking");
const ArenaSlot = require("../models/ArenaSlot");

const getArenaSlots = async (req, res) => {
  try {
    const { arenaId } = req.params;
    const { date } = req.query;

    // Check date
    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    // Find arena
    const arena = await Arena.findById(arenaId);

    if (!arena) {
      return res.status(404).json({
        message: "Arena not found",
      });
    }

    // Find blocked slots
    const blockedSlots = await ArenaSlot.find({
      arena: arenaId,
      date: new Date(date),
    });

    // Find confirmed bookings
    const bookings = await Booking.find({
      arena: arenaId,
      date: new Date(date),
      status: "confirmed",
    });

    // Generate slots
    const slots = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = new Date();

        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime);

        endTime.setMinutes(endTime.getMinutes() + 30);

        const formatTime = (date) => {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        };

        const start = formatTime(startTime);
        const end = formatTime(endTime);

        // Check if slot is blocked
        const blockedSlot = blockedSlots.find((slot) => slot.startTime === start);

        // Check if slot is booked
        const booking = bookings.find((booking) => booking.startTime === start);

        let status = "available";

        if (blockedSlot) {
          status = "notAvailable";
        } else if (booking) {
          status = "booked";
        }

        // Add slot
        slots.push({
          startTime: start,
          endTime: end,
          status,

           slotId: blockedSlot
          ? blockedSlot._id
          : null,


          booking: booking
            ? {
                id: booking._id,
                user: booking.user,
              }
            : null,
        });
      }
    }

    // Send response
    res.status(200).json({
      message: "Slots fetched successfully",

      date,

      arena: {
        id: arena._id,
        name: arena.name,
      },

      slots,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const blockArenaSlot = async (req, res) => {
  try {
    const { arenaId } = req.params;
    const { date, startTime, endTime } = req.body;

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

    // Check if this slot is already booked
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

    // Check if already blocked
    const existingSlot = await ArenaSlot.findOne({
      arena: arenaId,
      date: new Date(date),
      startTime,
    });

    if (existingSlot) {
      return res.status(400).json({
        message: "This slot is already blocked",
      });
    }

    // Create blocked slot
    const blockedSlot = await ArenaSlot.create({
      arena: arenaId,
      date: new Date(date),
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "Slot blocked successfully",
      slot: blockedSlot,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};
const unblockArenaSlot = async (req, res) => {
  try {
    const { arenaId, slotId } = req.params;

    // Check arena
    const arena = await Arena.findById(arenaId);

    if (!arena) {
      return res.status(404).json({
        message: "Arena not found",
      });
    }

    // Find the blocked slot
    const slot = await ArenaSlot.findOne({
      _id: slotId,
      arena: arenaId,
    });

    if (!slot) {
      return res.status(404).json({
        message: "Blocked slot not found",
      });
    }

    // Remove blocked slot
    await ArenaSlot.deleteOne({
      _id: slotId,
    });

    res.status(200).json({
      message: "Slot unblocked successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};
module.exports = {getArenaSlots,blockArenaSlot,unblockArenaSlot} ;
