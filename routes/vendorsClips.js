const vendorsClips = require("../models/vendorsClips");

const router = require("express").Router();

router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newVendorsClip = new vendorsClips({
        vendors: req.body.vendors._id,

        images: req.body.images,
      });

      const post = await newVendorsClip.save();

      res.status(200).json({
        id: post.id,
        vendors: post.vendors._id,

        images: post.images,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const vendorsClips = await vendorsClips.find({}).sort({ createdAt: -2 });
    // .populate("user", ["profilePicture", "username", "Verified", "isAdmin"]);

    res.status(200).json(vendorsClips);
  } catch (err) {
    res.status(500).json(err);
  }
});
// "engines": {
//   "node": "16.x"
// },
/////// to get music by id
router.get("/:id", async (req, res) => {
  try {
    const vendorsClip = await vendorsClips.findById(req.params.id);

    res.status(200).json(vendorsClip);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
