const nodemailer = require("nodemailer");
const Vendors = require("../models/Vendors");
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
      const newVendors = new Vendors({
        officeLocation: req.body.officeLocation,
        user: req.body.user,
        imageProductShowCase: req.body.imageProductShowCase,
        images: req.body.images,
        brandName: req.body.brandName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        socialMediaHandles: req.body.socialMediaHandles,
        category: req.body.category,
        brandDescription: req.body.brandDescription,
        numReviews: req.body.numReviews,
        priceRange: req.body.priceRange,
        weeklyAvaliability: req.body.weeklyAvaliability,
      });
      ////nodemailer
      const mailOptions = {
        from: "djnchrys@gmail.com",
        to: req.body.email,
        subject: "Registration Successful",
        html: `<p>Hello ${req.body.brandName},</p>
        <p>Thank you for registering on My App. Your account has been successfully created.</p><p>Click <a href="https://example.com/confirm-email">here</a> to confirm your email address.</p>`,
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
        officeLocation: post.officeLocation,
        imageProductShowCase: post.imageProductShowCase,
        images: post.images,
        brandName: post.brandName,
        contactNumber: post.contactNumber,
        email: post.email,
        socialMediaHandles: post.socialMediaHandles,
        category: post.category,
        brandDescription: post.brandDescription,
        numReviews: post.numReviews,

        priceRange: post.priceRange,
        weeklyAvaliability: post.weeklyAvaliability,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.put("/updateimages/:id", async (req, res) => {
  try {
    const vendor = await Vendors.findById(req.params.id);
    vendor.images = req.body.images || vendor.images;
    vendor.brandName = req.body.brandName || vendor.brandName;
    const updatedUser = await vendor.save();
    res.status(200).json({
      _id: updatedUser._id,
      brandName: updatedUser.brandName,
      images: updatedUser.images,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendors.find({}).sort({ createdAt: -1 });
    // .populate("user", ["profilePicture", "username", "Verified", "isAdmin"]);

    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/data", async (req, res) => {
  try {
    const vendors = await Vendors.find(
      {},
      "_id user officeLocation imageProductShowCase brandName contactNumber email priceRange category"
    ).sort({ createdAt: -1 });
    // .populate("user", ["profilePicture", "username", "Verified", "isAdmin"]);

    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////// to get music by id
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendors.findById(req.params.id);

    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
