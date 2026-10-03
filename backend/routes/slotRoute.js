const express = require("express");

const protect = require("../middleware/authMiddleware");
const ownerOnly  = require("../middleware/ownerMiddleware") ; 

const{ getArenaSlots,blockArenaSlot,unblockArenaSlot}= require("../controllers/slotController");

const router = express.Router();

router.get(
  "/:arenaId/slots",
  protect,
  getArenaSlots
);
router.post(
  "/:arenaId/slots/block",
  protect,
  ownerOnly,
  blockArenaSlot
);
router.delete(
  "/:arenaId/slots/:slotId",
  protect,
  ownerOnly,
  unblockArenaSlot
);

module.exports = router;