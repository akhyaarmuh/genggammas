import express from "express";
import {
  createPregnant,
  createCekup,
  getAllPregnant,
  getPregnantById,
  getAllPregnantKader,
  // updatePregnant,
  // deletePregnant,
} from "./controller.js";

const router = express.Router();

router.post("/", createPregnant);
router.get("/", getAllPregnant);
router.get("/kader/:id", getAllPregnantKader);
router.get("/:id", getPregnantById);
router.patch("/cekup/:id", createCekup);
// router.patch("/:id", updatePregnant);
// router.delete("/:id", deletePregnant);

export default router;
