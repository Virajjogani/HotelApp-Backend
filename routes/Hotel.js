import express from "express";
import {
  Addhotel,
  CountBycity,
  CountBytype,
  DeleteHotel,
  GetallHotels,
  GetsingleHotels,
  updatehotel
} from "../controller/hotelcontroller.js";
import { upload } from "../middleware/multer.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();



// --------------------------------------------------
router.post("/addhotel", verifyAdmin, upload.array('images', 10), Addhotel);
router.put("/updatehotel/:id", verifyAdmin,upload.array('images', 10), updatehotel);
router.delete("/deletehotel/:id", verifyAdmin, DeleteHotel);
router.get("/getallhotels", GetallHotels);
router.get("/gethotel/:id", GetsingleHotels);
router.get("/countbycity", CountBycity);
router.get("/countbytype", CountBytype);

// --------------------------------------------------

export default router;
