const express = require("express");
const axios = require("axios");
let app2 = express();
app2.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app2.get("/apitest", (req, res) => {
  let link = "https://dispatch-ads.herokuapp.com/api/advertise/bizdata_api2";
  console.log("getData", link);
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(result => {
      //console.log(result.data);
      res.json(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app2;
