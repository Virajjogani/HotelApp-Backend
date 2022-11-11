import express from "express";
import {
  CreateRoom,
  DeleteRoom,
  GetallRooms,
  Getsinglerooms,
  updateroom
} from "../controller/roomcontroller.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// --------------------------------------------------
router.post("/createroom/:hotelid", verifyAdmin, CreateRoom);
router.put("/updateroom/:id", verifyAdmin, updateroom);
router.delete("/deleteroom/:id/:hotelid", verifyAdmin, DeleteRoom);
router.get("/getallrooms", GetallRooms);
router.get("/getroom/:id", Getsinglerooms);

// --------------------------------------------------

export default router;
