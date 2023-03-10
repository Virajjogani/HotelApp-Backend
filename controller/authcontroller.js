import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import ejs from "ejs";
import path from "path";


export const register = async (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vjo.globaliasoft@gmail.com",
      pass: "oooleqplwjzfbkbw",
    },
  });
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    await newUser.save();

    const data = await ejs.renderFile(
      path.join("__dirname", "../views/EmailTemplate.ejs"),
      { name: req.body.username }
    );
    const mailOptions = {
      from: "vjo.globaliasoft@gmail.com",
      to: req.body.email,
      subject: "Welcome to Booking.com",
      html: data,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error Occurs');
      } else {
        console.log('Email sent successfully');
      }
      res.status(200).send({
        msg: "User Created successfully",
        status: 200
      });
    });

  } catch (error) {
    next(error);
  }

};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) return res.status(400).send("User not found!");

    const validateapssword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validateapssword)
      return res.status(400).send({
        msg: "Please enter valid password or username",
        status: 400
      });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .send({
        msg: "Login Successfully",
        status: 200,
        token: token
      });
  } catch (error) {
    next(error);
  }
};
