const express = require("express");

const {
  createArena,getOwnerArenas,updateArena,deleteArena,getAllArenas
} = require("../controllers/arenaController");

const protect = require("../middleware/authMiddleware");
const ownerOnly = require("../middleware/ownerMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  ownerOnly,
  createArena
);
router.get(
  "/owner",
  protect,
  ownerOnly,
  getOwnerArenas
);
router.put(
  "/:id",
  protect,
  ownerOnly,
  updateArena
);
router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteArena
);
router.get(
  "/",
  protect,
  getAllArenas
);

module.exports = router;