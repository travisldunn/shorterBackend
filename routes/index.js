const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/", async (req, res) => {
  try {
    const urlList = await Url.find({});
    return res.send(urlList);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.delete("/:code", async (req, res) => {
  try {
    const url = await Url.deleteOne({ urlCode: req.params.code });
    res.send(url);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
