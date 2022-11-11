import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const CreateRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }
      });
    } catch (error) {
      next(error);
    }
    res.status(200).send({ msg: "Rooms Details Updated Succesfully" });
  } catch (error) {
    next(error);
  }
};

export const updateroom = async (req, res, next) => {
  try {
    const updateroom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "Room Detail updated Succesfully", status: 200 });
  } catch (error) {
    next(error);
  }
};
export const DeleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    const deleteRoom = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }
      });
    } catch (error) {
      next(error);
    }
    res
      .status(200)
      .send({ msg: "Room Detail Deleted Succesfully", status: 200 });
  } catch {
    next();
  }
};
export const GetallRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).send({ rooms, status: 200 });
  } catch {
    next();
  }
};
export const Getsinglerooms = async (req, res, next) => {
  try {
    const rooms = await Room.findById(req.params.id);
    res.status(200).send({ rooms, status: 200 });
  } catch {
    next();
  }
};
