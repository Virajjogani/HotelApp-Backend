import mongoose from "mongoose";
import { Schema } from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  rooms: {
    type: [String]
  },
  cheapestprice: {
    type: Number,
    required: true
  },
  feautred: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Hotel", HotelSchema);
