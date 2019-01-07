const express = require("express");
const router = express.Router();
const Mime = require("../../models/Mime");

router.get("/mimes/:cat", (req, res) => {
  // console.log("in api getting stuff thumbs");
  //console.log("cat passed in " + req.params.cat);

  let rary = null;
  if (req.params.cat === "all") {
    Mime.find()
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  } else {
    Mime.find({ category: req.params.cat })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  }
});

router.get("/getMimes", (req, res) => {
  // console.log("in api getting stuff thumbs");
  //console.log("cat passed in " + req.params.cat);
  Mime.find()
    .then(thumbs => res.json(thumbs))
    .catch(err => res.status(404).json({ noresults: "No Categories found" }));
});

// router.get("/delete-business/:id", (req, res) => {
//   //console.log("in advertise get delete-ad", req.params);
//   let id = req.params.id;
//   let query = { _id: id };
//   let query2 = { businessId: id };
//   Business.deleteOne(query)
//     .then(biz => {
//       Image.deleteMany(query2)
//         .then(di => {
//           res.json(biz);
//         })
//         .catch(err =>
//           res.status(404).json({ message: "Problem Deleting Images" })
//         );
//     })
//     .catch(err =>
//       res.status(404).json({ message: "Problem Deleting Business" })
//     );
// });

router.get("/deleteMime/:id", (req, res) => {
  // console.log("in api getting stuff thumbs");
  console.log("delete mime passed in " + req.params.id);
  let id = req.params.id;
  let query = { _id: id };
  Mime.deleteOne(query)
    .then(thumbs => res.json(thumbs))
    .catch(err => res.status(404).json({ noresults: "No Categories found" }));
});

router.post("/createMime", (req, res) => {
  // const { errors, isValid } = validateAdvertisementInput(req.body);
  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // let noimageavail = true;
  // let imageFile = null;
  // let filename = "now is the time";
  // if (req.files) {
  //   noimageavail = false;
  //   imageFile = req.files.file;
  //   filename = imageFile.name;
  // }
  // if (noimageavail) {
  //   let errors = {};
  //   errors.message = "You must provide an advertisement image";
  //   return res.status(400).json(errors);
  // }
  //console.log("in api createMime via post");

  // const newMime = new Mime({
  //   name: req.body.name,
  //   artist: req.body.artist,
  //   song: req.body.song,
  //   lyrics: req.body.lyrics,
  //   category: req.body.category,
  //   emotion: req.body.emotion,
  //   image: req.body.image,
  //   releaseDate: req.body.releaseDate,
  //   status: 0
  // });

  //console.log("request body", req.body);

  const newMime = new Mime({
    name: req.body.name,
    description: req.body.description,
    label: req.body.label,
    artist: req.body.artist,
    song: req.body.song,
    lyrics: req.body.lyrics,
    category: req.body.category,
    emotion: req.body.emotion,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
    status: 0
  });

  //console.log("new newMime in api", newMime);

  newMime
    .save()
    .then(newMime => {
      res.json(newMime);
    })
    .catch(err =>
      res.status(404).json({ message: "Create Mime Record Unsuccessful" })
    );
});

router.post("/modifyMime", (req, res) => {
  let id = req.body.mimeid;
  let query = { _id: id };
  var options = { new: true };

  const updateobj = {
    name: req.body.name,
    description: req.body.description,
    label: req.body.label,
    artist: req.body.artist,
    song: req.body.song,
    lyrics: req.body.lyrics,
    category: req.body.category,
    emotion: req.body.emotion,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
    status: 0
  };

  //console.log("new newMime in api", newMime);

  Mime.findOneAndUpdate(query, updateobj, options)
    .then(newMime => {
      res.json(newMime);
    })
    .catch(err =>
      res.status(404).json({ message: "Create Mime Record Unsuccessful" })
    );
});

router.get("/change-mime-status/:id/:status", (req, res) => {
  //console.log("in advertisers get change-advertiser-status", req.params);
  let id = req.params.id;
  let curstat = req.params.status;
  let updatestat = 0;
  if (curstat == "0") {
    updatestat = 1;
  }
  let query = { _id: id };

  var updateobj = { status: updatestat };
  var options = { new: true };

  Mime.findOneAndUpdate(query, updateobj, options)
    .then(function(mime) {
      return res.json(mime);
    })
    .catch(err =>
      res.status(404).json({ message: "Problem changing advertiser status" })
    );
});

router.post("/uploadjson", (req, res) => {
  let errors = {};

  // const { errors, isValid } = validateRegisterInput(req.body, true);
  // if (!isValid) {
  //return res.status(400).json(errors);
  // }
  //let errors = {};
  errors.generic = "Please select an json file";
  // return res.status(400).json(errors);
  if (!req.files) {
    errors.generic = "Please select an json file";
    return res.status(400).json(errors);
  }
  let jsonFile = req.files.file;
  let fname = jsonFile.name;
  // console.log("jsonfile is", jsonFile);
  // console.log("jsonfile data");
  // console.log(jsonFile.data.toString());

  let jstr =
    '[{"name":"uploaded one","description":"description","label":"label","artist":"artist","song":"song","lyrics":"lyrics","category":"cool","emotion":"serious","image":"IMG_1644.JPG","releaseDate":"2019-01-30","status":0},{"name":"upload 2","description":"description1","label":"label1","artist":"artist1","song":"song1","lyrics":"lyrics1","category":"wow","emotion":"happy","image":"IMG_1602.JPG","releaseDate":"2019-01-30","status":0}]';

  jstr = jsonFile.data.toString();
  let jobja = JSON.parse(jstr);

  //let jobj = jobja[0];

  // const anewMime = new Mime({
  //   name: jobj.name,
  //   description: jobj.description,
  //   label: jobj.label,
  //   artist: jobj.artist,
  //   song: jobj.song,
  //   lyrics: jobj.lyrics,
  //   category: jobj.category,
  //   emotion: jobj.emotion,
  //   image: jobj.image,
  //   releaseDate: jobj.releaseDate,
  //   status: jobj.status
  // });

  //console.log("new newMime in api", newMime);

  Mime.insertMany(jobja)
    .then(jobja => {
      res.json(jobja);
    })
    .catch(err =>
      res.status(404).json({ message: "Create Mime Records Unsuccessful" })
    );

  // res.json(jobja);
});

module.exports = router;
