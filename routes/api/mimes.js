const S3 = require("aws-sdk/clients/s3");

const express = require("express");
const router = express.Router();
const Mime = require("../../models/Mime");

const aws_key = require("../../config/aws").aws_key;
const aws_secret = require("../../config/aws").aws_secret;
const aws_region = require("../../config/aws").aws_region;
const api_version = require("../../config/aws").api_version;

router.get("/mimes/:cat0/:cat1/:cat2", (req, res) => {
  // console.log("in api getting stuff thumbs");
  //console.log("cat passed in " + req.params.cat);
  //let s3 = new S3();
  let cat0 = req.params.cat0; // category or emotion
  let cat1 = req.params.cat1;
  let cat2 = req.params.cat2;

  //console.log(cat0 + " " + cat1 + " " + cat2);

  let rary = null;
  let query = {};
  let query0 = { cat0: cat0 };
  let query1 = { $and: [{ cat0: cat0 }, { cat1: cat1 }] };
  let query2 = { $and: [{ cat0: cat0 }, { cat1: cat1 }, { cat2: cat2 }] };

  // if (cat2 === "undefined") {
  //   console.log("cat2 is undefined");
  // } else {
  //   console.log("cat2 is defined");
  // }

  if (cat2 !== "undefined") {
    if (cat2 === "all") {
      query = query1;
    } else {
      query = query2;
    }
  } else {
    if (cat1 === "all") {
      query = query0;
    } else {
      query = query1;
    }
  }

  //console.log("mimes api ", query);

  if (cat0 === "ALL") {
    Mime.find()
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  } else {
    Mime.find(query)
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  }

  // if (cat0 === "ALL") {
  //   Mime.find()
  //     .then(thumbs => res.json(thumbs))
  //     .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  // } else if (cat1 === "all") {
  //   Mime.find(query0)
  //     .then(thumbs => res.json(thumbs))
  //     .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  // } else {
  //   Mime.find(query1)
  //     .then(thumbs => res.json(thumbs))
  //     .catch(err => res.status(404).json({ noresults: "No Categories found" }));
  // }
});

// db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

router.get("/search/:term", (req, res) => {
  let rary = null;
  let wc = req.params.term;
  let sterm = { $regex: ".*" + req.params.term + ".*" }; //"/" + req.params.term + "/";
  //console.log("sterm passed in " + sterm);
  if (wc == "*") {
    Mime.find({ status: 0 })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Wildcards found" }));
  } else {
    Mime.find({ search_data: sterm })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Wildcards found" }));
  }
});

router.get("/status/:status", (req, res) => {
  if (req.params.status == "*") {
    Mime.find()
      .sort({ image: 1 })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Wildcards found" }));
  } else {
    Mime.find({ status: req.params.status })
      .then(thumbs => res.json(thumbs))
      .catch(err => res.status(404).json({ noresults: "No Wildcards found" }));
  }
});

router.get("/xxxgetMimes", (req, res) => {
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

//router.get("/deleteMime/:id", (req, res) => {
router.post("/deleteMime", (req, res) => {
  // console.log("in api getting stuff thumbs");
  // console.log("delete record passed in " + req.body.recid);
  // console.log("delete mime passed in " + req.body.mimeid);
  // console.log("delete image passed in " + req.body.imageid);
  //let id = req.params.id;
  let id = req.body.recid;
  let query = { _id: id };

  let imageid = req.body.imageid;
  let mimeid = req.body.mimeid;
  // console.log(query);
  // console.log("awskey", aws_key);
  // console.log("awssecret", aws_secret);
  // console.log("awsregion", aws_region);

  let s3 = new S3({
    apiVersion: api_version,
    accessKeyId: aws_key,
    secretAccessKey: aws_secret,
    region: aws_region
  });

  // let params = {
  //   // Bucket: "ldphotos",
  //   Bucket: "mimesthumbnails",
  //   MaxKeys: 12
  // };
  // s3.listObjects(params, function(err, data) {
  //   if (err) console.log(err, err.stack);
  //   // an error occurred
  //   else console.log(data);
  // });

  Mime.deleteOne(query)
    .then(thumbs => {
      let params = {
        Bucket: "mimesthumbnails",
        Key: imageid
      };
      s3.deleteObject(params, function(err, data) {
        if (err) {
          res.status(404).json({ errormsg: "Problem Deleteing Image" });
        } else {
          let params2 = {
            Bucket: "mimesvideos",
            Key: mimeid
          };
          s3.deleteObject(params2, function(err, data) {
            if (err) {
              //console.log("we have an error deleting video");
              //console.log(err, err.stack);
              res.status(404).json({ errormsg: "Problem Deleteing Mime" });
            } else {
              res.json(thumbs);
            }
          });
        }
      });
    })
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
    rating: req.body.rating,
    keywords: req.body.keywords,
    label: req.body.label,
    artist: req.body.artist,
    song: req.body.song,
    lyrics: req.body.lyrics,
    cat0: req.body.cat0,
    cat1: req.body.cat1,
    cat2: req.body.cat2,
    cat3: req.body.cat3,
    search_data: req.body.search_data,
    image: req.body.image,
    video: req.body.video,
    start: req.body.start,
    end: req.body.end,
    duration: req.body.duration,
    mime: req.body.mime,
    width: req.body.width,
    height: req.body.height,
    fps: req.body.fps,
    video_url: req.body.video_url,
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
    rating: req.body.rating,
    keywords: req.body.keywords,
    label: req.body.label,
    artist: req.body.artist,
    song: req.body.song,
    lyrics: req.body.lyrics,
    cat0: req.body.cat0,
    cat1: req.body.cat1,
    cat2: req.body.cat2,
    cat3: req.body.cat3,
    search_data: req.body.search_data,
    width: req.body.width,
    height: req.body.height,
    image: req.body.image,
    video: req.body.video,
    start: req.body.start,
    end: req.body.end,
    duration: req.body.duration,
    mime: req.body.mime,
    //width: req.body.width,
    //height: req.body.height,
    //fps: req.body.fps,
    //video_url: req.body.video_url,
    releaseDate: req.body.releaseDate
    // status: 0
  };

  // formdata.append("rating", this.state.rating);
  //   formdata.append("keywords", this.state.keywords);
  //   formdata.append("label", this.state.label);
  //   formdata.append("artist", this.state.artist);
  //   formdata.append("song", this.state.song);
  //   formdata.append("lyrics", this.state.lyrics);
  //   formdata.append("category", this.state.category);
  //   formdata.append("emotion", this.state.emotion);
  //   formdata.append("image", this.state.image);
  //   formdata.append("mime", this.state.mime);
  //   formdata.append("video", this.state.video);
  //   formdata.append("start", this.state.start);
  //   formdata.append("end", this.state.end);
  //   formdata.append("duration", this.state.duration);
  //   formdata.append("releaseDate", this.state.releaseDate);
  //   formdata.append("status", 0);

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

  // let jstr =
  //   '[{"rating":"uploaded one","keywords":"keywords","label":"label","artist":"artist","song":"song","lyrics":"lyrics","category":"cool","emotion":"serious","image":"IMG_1644.JPG","releaseDate":"2019-01-30","status":0},{"rating":"upload 2","keywords":"keywords1","label":"label1","artist":"artist1","song":"song1","lyrics":"lyrics1","category":"wow","emotion":"happy","image":"IMG_1602.JPG","releaseDate":"2019-01-30","status":0}]';

  let jstr = jsonFile.data.toString();
  let jobja = JSON.parse(jstr);

  //}

  // [{"rating":"R","keywords":"jazz cool","label":"label","artist":"artist","song":"song","lyrics":"lyrics","category":"cool","emotion":"serious","image":"IMG_1644.JPG","releaseDate":"2019-01-30","status":0},{"rating":"PG ","keywords":"cool happy exciting","label":"label1","artist":"artist1","song":"song1","lyrics":"lyrics1","category":"wow","emotion":"happy","image":"IMG_1602.JPG","releaseDate":"2019-01-30","status":0}]

  // db record
  // label:
  // artist:
  // song:
  // lyrics:
  // rating:
  // keywords:
  // category:
  // emotion:
  // image:
  // mime:
  // video:
  // start:
  // end:
  // duration:
  // releaseDate:
  // status:
  // date:

  objary = [];
  jobja.forEach(function(rec) {
    tobj = {};
    tobj["label"] = "sony";
    tobj["artist"] = rec["utube_artist"];
    tobj["song"] = rec["utube_title"];
    tobj["lyrics"] = rec["lyrics"];
    tobj["rating"] = rec["utube_rating"];
    tobj["keywords"] = rec["keywords"];
    // tobj["category"] = rec["utube_categories"];
    // tobj["emotion"] = "";
    tobj["cat0"] = rec["utube_categories"];
    tobj["cat1"] = "";
    tobj["cat2"] = "";
    tobj["cat3"] = "";
    tobj["search_data"] =
      rec["keywords"] +
      " " +
      rec["song"] +
      " " +
      rec["category"] +
      " " +
      rec["lyrics"];
    tobj["image"] = rec["image"];
    tobj["mime"] = rec["mime"];
    tobj["video"] = rec["video"];
    tobj["video_url"] = rec["utube_webpage_url"];
    tobj["height"] = rec["utube_height"];
    tobj["width"] = rec["utube_width"];
    tobj["fps"] = rec["utube_fps"];
    tobj["start"] = rec["start"];
    tobj["end"] = rec["end"];
    tobj["duration"] = rec["totaltime"];
    objary.push(tobj);
  });

  // objary.forEach(function(obj) {
  //   console.log(obj);
  // });

  // {
  // "totaltime": "15.199",
  // "utube_id": "usGv0gB2zEU",
  // "utube_categories": "Music",
  // "utube_creator": "Eric Church",
  // "end": "0:00:15.582",
  // "lyrics": "  ",
  // "utube_webpage_url": "https://www.youtube.com/watch?v=usGv0gB2zEU",
  // "image": "0-usGv0gB2zEU-ladygaga.gif",
  // "utube_title": "Eric Church - Drink In My Hand",
  // "utube_format": "18 - 640x360 (medium)",
  // "utube_filename": "Eric Church - Drink In My Hand-usGv0gB2zEU.mp4",
  // "start": "00:00:00.400",
  // "utube_fulltitle": "Eric Church - Drink In My Hand",
  // "utube_height": 360,
  // "mime": "0-usGv0gB2zEU-ladygaga.mp4",
  // "keywords": "Eric Church Drink In My Hand Chief Official HD Capitol Nashville",
  // "utube_tags": "Eric Church Drink In My Hand Chief Official HD Capitol Nashville",
  // "id": 0,
  // "utube_width": 640,
  // "utube_artist": "Eric Church"

  //let jobj = jobja[0];

  // const anewMime = new Mime({
  //   rating: jobj.rating,
  //   keywords: jobj.keywords,
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

  // console.log("new newMime in api", objary);
  // let tob = objary[0];

  // const newMime = new Mime({
  //   rating: tob["rating"],
  //   keywords: tob["keywords"],
  //   label: tob["label"],
  //   artist: tob["artist"],
  //   song: tob["song"],
  //   lyrics: tob["lyrics"],
  //   category: tob["category"],
  //   emotion: tob["emotion"],
  //   image: tob["image"],
  //   video: tob["video"],
  //   start: tob["start"],
  //   end: tob["end"],
  //   duration: tob["duration"],
  //   mime: tob["mime"],
  //   width: tob["width"],
  //   height: tob["height"],
  //   fps: tob["fps"],
  //   video_url: tob["video_url"]
  // });

  // tobj["label"] = "sony";
  // tobj["artist"] = rec["utube_artist"];
  // tobj["song"] = rec["utube_title"];
  // tobj["lyrics"] = rec["lyrics"];
  // tobj["rating"] = rec["utube_rating"];
  // tobj["keywords"] = rec["keywords"];
  // tobj["category"] = rec["utube_categories"];
  // tobj["emotion"] = "";
  // tobj["image"] = rec["image"];
  // tobj["mime"] = rec["mime"];
  // tobj["video"] = rec["video"];
  // tobj["video_url"] = rec["utube_webpage_url"];
  // tobj["fps"] = rec["utube_fps"];
  // tobj["start"] = rec["start"];
  // tobj["end"] = rec["end"];
  // tobj["duration"] = rec["totaltime"];

  // console.log("new newMime in api", newMime);

  // newMime
  //   .save()
  //   .then(newMime => {
  //     res.json(newMime);
  //   })
  //   .catch(err =>
  //     res.status(404).json({ message: "Create Mime Record Unsuccessful" })
  //   );

  Mime.insertMany(objary)
    .then(objary => {
      console.log("we have success insert many");
      res.json(objary);
    })
    .catch(err => {
      console.log("we have an insert many error");
      res.status(404).json({ message: "Create Mime Records Unsuccessful" });
    });

  // res.json(jobja);
});

module.exports = router;
