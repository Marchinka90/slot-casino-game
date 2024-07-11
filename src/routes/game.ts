import { Router } from "express";
import { check } from "express-validator";

import {
  playAGame,
  spinInMultiple,
  returnToPlayer,
} from "../controllers/game.js";

const router = Router();

router.post("/play", [check("bet").isInt({ min: 1 })], playAGame);

router.post(
  "/sim",
  [check("count").isInt({ min: 1 }), check("bet").isInt({ min: 1 })],
  spinInMultiple
);

router.get("/rtp", returnToPlayer);

export default router;
