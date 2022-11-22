import Hotel from "../models/Hotel.js";

export const Addhotel = async (req, res, next) => {

  console.log("🚀 ~ file: hotelcontroller.js ~ line 13 ~ Addhotel ~ req", req.files[0].filename)
  const filename = req.files.map((item) => item.filename)
  const newHotel = new Hotel({
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    title: req.body.title,
    images: filename,
    description: req.body.description,
    rating: req.body.rating,
    rooms: req.body.rooms,
    cheapestprice: req.body.cheapestprice,
    feautred: req.body.feautred
  });
  try {
    const savedHotel = await newHotel.save();
    res.status(200).send({ msg: "Hotel added Succesfully", status: 200 });
  } catch {
    next();
  }
};
export const updatehotel = async (req, res, next) => {
  const filename = req.files.map((item) => item.filename)

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {

      name: req.body.name,
      type: req.body.type,
      city: req.body.city,
      address: req.body.address,
      distance: req.body.distance,
      title: req.body.title,
      images: filename,
      description: req.body.description,
      rating: req.body.rating,
      rooms: req.body.rooms,
      cheapestprice: req.body.cheapestprice,
      feautred: req.body.feautred

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
    const hotels = await Hotel.find(req.query).limit(req.query.limit);
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
  const cities = req.query.cities.split(',');
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
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villasCount = await Hotel.countDocuments({ type: "Villas" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

    res.status(200).send([
      { type: "Hotel", count: hotelCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villas", count: villasCount },
      { type: "Cabin", count: cabinCount }
    ])
  } catch {
    next();
  }
};
