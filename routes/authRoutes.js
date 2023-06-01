const router = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");

//REGISTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "djnchrys@gmail.com",
    pass: "mictdtqklnuerfkg",
  },
});
router.post("/registers", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      contactAdress: req.body.contactAdress,
      password: hashedPassword,
    });
    ////nodemailer
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.firstName},</p>
      <p>Thank you for registering on My App. Your account has been successfully created.</p><p>Click <a href="https://example.com/confirm-email">here</a> to confirm your email address.</p>`,
      //   text: "Congratulations, your registration was successful!",
    };

    //save user and respond
    const user = await newUser.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      email: user.email,
      phoneNumber: user.phoneNumber,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
