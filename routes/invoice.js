const Invoice = require("../models/Invoice");

const router = require("express").Router();

router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newVendors = new Invoice({
        order: req.body.order,
        user: req.body.user,
        payment: req.body.payment,
        isPaid: req.body.isPaid,
      });

      const post = await newVendors.save();

      res.status(200).json({
        _id: post._id,
        user: post.user,
        order: post.order,
        isPaid: post.isPaid,

        payment: post.payment,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    // .populate("user", ["profilePicture", "username", "Verified", "isAdmin"]);

    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////// to get music by id
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
