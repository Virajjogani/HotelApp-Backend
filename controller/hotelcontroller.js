import Hotel from "../models/Hotel.js";

export const Addhotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).send({ msg: "Hotel added Succesfully", status: 200 });
  } catch {
    next();
  }
};
export const updatehotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).send({ msg: "Hotel updated Succesfully", status: 200 });
  } catch (error) {
    next(error);
  }
};
export const DeleteHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Hotel Deleted Succesfully", status: 200 });
  } catch {
    next();
  }
};
export const GetallHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).send({ hotels, status: 200 });
  } catch {
    next();
  }
};
export const GetsingleHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    res.status(200).send({ hotels, status: 200 });
  } catch {
    next();
  }
};
export const CountBycity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(list);
  } catch {
    next();
  }
};
export const CountBytype = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(d);
    res.status(200).send({ hotels, status: 200 });
  } catch {
    next();
  }
};
