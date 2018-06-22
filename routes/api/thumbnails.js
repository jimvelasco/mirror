const express = require("express");
const router = express.Router();
const Thumbnail = require("../../models/Thumbnail");
//const validateSearchInput = require("../../validation/search");

// @route   GET api/thumbnails/thumbs
// @desc    Tests posts route
// @access  Public
// these are triggered from the thumbnailActions

router.get("/thumbs/:cat", (req, res) => {
  // console.log("in api getting stuff thumbs");
  //console.log("cat passed in " + req.params.cat);

  let rary = null;
  if (req.params.cat === "all") {
    Thumbnail.find()
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  } else {
    Thumbnail.find({ category: req.params.cat })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  }
});

router.get("/search/:term", (req, res) => {
  // console.log("in api getting stuff thumbs");
  //console.log("term passed in " + req.params.term);
  // let asterm = req.params.term;
  // const { errors, isValid } = validateSearchInput(asterm);
  // //Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  let rary = null;
  let sterm = { $regex: ".*" + req.params.term + ".*" }; //"/" + req.params.term + "/";
  //console.log("sterm passed in " + sterm);

  Thumbnail.find({ name: sterm })
    .then(thumbs => res.json(thumbs))
    .catch(err => res.status(404).json({ noresults: "No Wildcards found" }));
});

router.get("/emotion/:term", (req, res) => {
  Thumbnail.find({ emotion: req.params.term })
    .then(thumbs => res.json(thumbs))
    .catch(err => res.status(404).json({ noresults: "No Emotions Found" }));
});

router.get("/single/:id", (req, res) => {
  Thumbnail.find({ _id: req.params.id })
    .then(thumbs => res.json(thumbs))
    .catch(err => res.status(404).json({ noresults: "No Emotions Found" }));
});

router.get("/allthumbs", (req, res) => {
  console.log("in api getting stuff all thumbs");
  // console.log(req.params);
  res.json([
    {
      _id: "1",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1655.jpg"
    },
    {
      _id: "2",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1645.JPG"
    },
    {
      _id: "3",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1644.JPG"
    },
    {
      _id: "4",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1641.jpg"
    },
    {
      _id: "5",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1611.JPG"
    },
    {
      _id: "6",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1608.JPG"
    },
    {
      _id: "7",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1602.JPG"
    },
    {
      _id: "8",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1598.jpg"
    },
    {
      _id: "9",
      url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1580.JPG"
    }
  ]);
});

router.get("/Xthumbs/:cat", (req, res) => {
  // console.log("in api getting stuff thumbs");
  // console.log(req.params);
  let rary = null;
  if (req.params.cat === "all") {
    rary = [
      {
        _id: "1",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1655.jpg"
      },
      {
        _id: "2",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1645.JPG"
      },
      {
        _id: "3",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1644.JPG"
      },
      {
        _id: "4",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1641.jpg"
      },
      {
        _id: "5",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1611.JPG"
      },
      {
        _id: "6",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1608.JPG"
      },
      {
        _id: "7",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1602.JPG"
      },
      {
        _id: "8",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1598.jpg"
      },
      {
        _id: "9",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1580.JPG"
      }
    ];
  }
  if (req.params.cat === "sports") {
    rary = [
      {
        _id: "1",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1655.jpg"
      },
      {
        _id: "2",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1645.JPG"
      },
      {
        _id: "3",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1644.JPG"
      },
      {
        _id: "4",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1641.jpg"
      },
      {
        _id: "5",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1611.JPG"
      }
    ];
  }
  if (req.params.cat === "entertainment") {
    rary = [
      {
        _id: "5",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1611.JPG"
      },
      {
        _id: "6",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1608.JPG"
      },
      {
        _id: "7",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1602.JPG"
      },
      {
        _id: "8",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1598.jpg"
      },
      {
        _id: "9",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1580.JPG"
      }
    ];
  }

  if (req.params.cat === "artists") {
    rary = [
      {
        _id: "5",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1598.jpg"
      },
      {
        _id: "6",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1608.JPG"
      },
      {
        _id: "7",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1611.JPG"
      },
      {
        _id: "8",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1641.jpg"
      },
      {
        _id: "9",
        url: "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/IMG_1655.jpg"
      }
    ];
  }
  res.json(rary);
});

router.post("/newthumb", (req, res) => {
  const newthumb = new Thumbnail({
    name: req.body.name,
    category: req.body.category,
    emotion: req.body.emotion,
    image: req.body.image
  });

  newthumb
    .save()
    .then(thumb => res.json(thumb))
    .catch(err => console.log(err));
});

module.exports = router;
