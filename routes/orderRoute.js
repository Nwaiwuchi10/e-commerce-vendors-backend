const nodemailer = require("nodemailer");
// const order = require("../models/order");
const Order = require("../models/Order");
const router = require("express").Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "djnchrys@gmail.com",
    pass: "mictdtqklnuerfkg",
  },
});
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newVendors = new Order({
        orderItems: req.body.orderItems,
        user: req.body.user,
        usersEmail: req.body.usersEmail,
        eventAddress: req.body.eventAddress,
      });
      ////nodemailer
      const mailOptions = {
        from: "djnchrys@gmail.com",
        to: req.body.usersEmail,
        subject: "Booking Successful",
        html: `<p>Hello ${req.body.user},</p>
        <p>Thank you for placing an order. Your Event Booikng has been successfully created.</p><p>Click <a href="https://example.com/confirm-email">here</a> to confirm your email address.</p>`,
        //   text: "Congratulations, your registration was successful!",
      };
      // save post and respond
      const post = await newVendors.save();
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      res.status(200).json({
        _id: post._id,
        user: post.user,
        orderItems: post.orderItems,
        usersEmail: post.usersEmail,

        eventAddress: post.eventAddress,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    // .populate("user", ["profilePicture", "username", "Verified", "isAdmin"]);

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////// to get music by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
