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

// --------------------------------------------------
// router.get("/checkautentication", verifytoken, (req, res, next) => {
//   res.send("Token Verify Successfully");
// });
// router.get("/checkuser/:id", verifyuser, (req, res, next) => {
//   res.send("You are Logging Successfully");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are Logging Successfully as Admin");
// });
router.put("/updateuser/:id", verifyuser, updateuser);
router.delete("/deleteuser/:id", verifyuser, DeleteUser);
router.get("/getallusers", verifyAdmin, GetallUsers);
router.get("/getuser/:id", verifyuser, GetsingleUser);

// --------------------------------------------------

export default router;
