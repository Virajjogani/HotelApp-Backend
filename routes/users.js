import express from "express";
import {
  DeleteUser,
  GetallUsers,
  GetsingleUser,
  updateuser
} from "../controller/userscontorller.js";
import {
  verifyAdmin,
  verifytoken,
  verifyuser
} from "../utils/verifyToken.js";
const router = express.Router();

router.put("/updateuser/:id", verifyuser, updateuser);
router.delete("/deleteuser/:id", verifyuser, DeleteUser);
router.get("/getallusers", verifyAdmin, GetallUsers);
router.get("/getuser/:id", verifyuser, GetsingleUser);

// --------------------------------------------------

export default router;
