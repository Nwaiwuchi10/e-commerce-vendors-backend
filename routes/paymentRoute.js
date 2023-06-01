const nodemailer = require("nodemailer");
const Payment = require("../models/Payment");

const router = require("express").Router();

router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newVendors = new Payment({
        order: req.body.order,
        user: req.body.user,
        transactionReceipt: req.body.transactionReceipt,
      });

      const post = await newVendors.save();

      res.status(200).json({
        _id: post._id,
        user: post.user,
        order: post.order,
        user: post.user,

        transactionReceipt: post.transactionReceipt,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.put("/updateIsPaid/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    payment.isPaid = req.body.isPaid || payment.isPaid;

    const updatedIsPaid = await payment.save();
    res.status(200).json({
      _id: updatedIsPaid._id,

      isPaid: updatedIsPaid.isPaid,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find({})
      .sort({ createdAt: -1 })
      .populate("user", ["email", "phoneNumber", "firstName", "isAdmin"]);

    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////// to get music by id
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
