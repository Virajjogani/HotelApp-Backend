import User from "../models/User.js";

export const updateuser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).send({ msg: "User updated Succesfully", status: 200 });
  } catch (error) {
    next(error);
  }
};
export const DeleteUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const deleteUser = awaitUser.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "User Deleted Succesfully", status: 200 });
  } catch {
    next();
  }
};
export const GetallUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ users, status: 200 });
  } catch {
    next();
  }
};
export const GetsingleUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).send({ users, status: 200 });
  } catch {
    next();
  }
};
