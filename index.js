import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/Hotel.js";
import roomRoute from "./routes/room.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected successfully");
});

//middleware
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorstatus = err.status || 500;
  const errormessage = err.message || "Something went wrong!";
  return res.status(errorstatus).send({
    status: errorstatus,
    message: errormessage
  });
});

app.listen(8000, () => {
  connect();
  console.log("Server started on port 8000");
});
