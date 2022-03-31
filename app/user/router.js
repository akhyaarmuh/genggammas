import express from "express";
import {
  createUser,
  createKader,
  getToken,
  login,
  getAllKader,
  logout,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "./controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/kader", createKader);
router.post("/login", login);
router.get("/token", getToken);
router.get("/", getAllKader);
router.delete("/", logout);

// router.get("/:id", getUserById);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
