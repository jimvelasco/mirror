import React, { Component } from "react";

import S3 from "aws-sdk/clients/s3";
//import AWS, { LexRuntime } from "aws-sdk";

import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextFieldGroupLink from "../common/TextFieldGroupLink";
import ImageDisplay from "../common/ImageDisplay";
import MimeDisplay from "../common/MimeDisplay";
import SelectCategoryGroup from "../common/SelectCategoryGroup";
//import SelectCategory2Group from "../common/SelectCategory2Group";
// import SelectEmotionGroup from "../common/SelectEmotionGroup";
import FilterMimes from "../common/FilterMimes";
import FilterMimesBar from "../common/FilterMimesBar";

//import app_data from "../app_data";
import list_helper from "../app_data";

// import ImageDisplayObj from "../common/ImageDisplayObj";
// import { getAdvertisements } from "../../actions/advertisementActions";
// import { createAdvertisement } from "../../actions/advertisementActions";
// import { modifyAdvertisement } from "../../actions/advertisementActions";
// import { deleteAdvertisement } from "../../actions/advertisementActions";
// import { changeAdvertisementStatus } from "../../actions/advertisementActions";
// import { setCurrentAdvertisement } from "../../actions/advertisementActions";

import {
  getMimes,
  searchMimes,
  statusMimes,
  createMime,
  deleteMime,
  setCurrentMime,
  modifyMime,
  changeMimeStatus
} from "../../actions/mimeActions";

//const aws_key = require("../../../config/aws").aws_key;
// const aws_secret = require("./config/aws").aws_secret;
// const aws_region = require("./config/aws").aws_region;

class MimeRecords extends Component {
  constructor(props) {
    super(props);
    //AWS.config.loadFromPath("./config.json");

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    // console.log("tdate is ", today);

    //const app_data = require("../app_data");
    //console.log(app_data.cat_list);

    this.state = {
      mimeid: "",
      rating: "",
      keywords: "",
      label: "",
      artist: "",
      song: "",
      lyrics: "",
      cat0: "",
      cat1: "",
      cat2: "",
      cat3: "",
      search_data: "",
      image: "",
      mime: "",
      video: "",
      start: "",
      end: "",
      duration: "",
      releaseDate: today, //"2019-01-02",
      status: 0,
      errors: {},
      selectedImage: "",
      selectedMime: "",
      new_or_update: "NEW",
      cat0_list: [], //list_helper.getCat0(),
      cat1_list: [], //list_helper.getCat1("Music"),
      cat2_list: [] //list_helper.getCat2("Anger")
    }; //shuttles: ["one", "two", "three"] };

    this.onChange = this.onChange.bind(this);
    this.onMimeClick = this.onMimeClick.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteMime = this.deleteMime.bind(this);
    this.showModifyMime = this.showModifyMime.bind(this);
    this.onRBChange = this.onRBChange.bind(this);
    this.doFiltering = this.doFiltering.bind(this);

    // this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  componentDidMount() {
    // console.log("cdm");
    // let bizid = this.props.selectedBizid;
    // console.log(list_helper.getCats());
    // console.log(list_helper.getEmotions("cool"));
    // this.props.getMimes();
    // let fobj = { cat0: "ALL", cat1: "ALL" };

    let fobj = { type: "status", param: 1 };

    this.props.statusMimes(fobj);

    //this.props.getMimes(fobj);

    // this.props.getMimes({ param: "all" });
  }

  componentWillReceiveProps(nextProps) {
    // console.log("props ", this.props.mimereducer);
    // console.log("nextprops ", nextProps.mimereducer);
    // console.log("-------------");
    // let pmime = this.props.mimereducer;
    let npmime = nextProps.mimereducer;
    // if (pmime.mime._id) {
    //   console.log("we do have a pmime id");
    // } else {
    //   console.log("we do NOT have a pmime id");
    // }
    let curmime = npmime.mime;
    if (curmime._id) {
      // console.log("we do have a npmime id", curmime);
      // console.log(curmime.cat0 + " " + curmime.cat1);
      this.setState({
        mimeid: curmime._id,
        rating: curmime.rating,
        keywords: curmime.keywords,
        label: curmime.label,
        artist: curmime.artist,
        song: curmime.song,
        lyrics: curmime.lyrics,
        cat0: curmime.cat0,
        cat1: curmime.cat1,
        cat2: curmime.cat2,
        cat3: curmime.cat3,
        search_data: curmime.search_data,

        image: curmime.image,
        mime: curmime.mime,
        video: curmime.video,
        start: curmime.start,
        end: curmime.end,
        duration: curmime.duration,
        releaseData: curmime.releaseData,
        status: curmime.status,
        selectedImage: "",
        selectedMime: "",
        cat0_list: list_helper.getCat0(),
        cat1_list: list_helper.getCat1(curmime.cat0),
        cat2_list: list_helper.getCat2(curmime.cat1)
      });
    } else {
      //console.log("we do NOT have a npmime id");
    }
  }

  componentDidUpdate() {}

  onChange(e) {
    //console.log(e.target.name + " " + e.target.value);
    //let emotlist = ["happy", "serious", "angry"];
    //let emotlist2 = ["happy", "serious", "angry", "pissed"];
    // if (e.target.name === "category" && e.target.value == "cool") {
    //   this.setState({ emot_list: emotlist2 });
    // } else {
    //   this.setState({ emot_list: emotlist });
    // }
    let cval = e.target.value;
    if (e.target.name === "cat0") {
      this.setState({ cat1_list: list_helper.getCat1(cval) });
    }
    if (e.target.name === "cat1") {
      this.setState({ cat2_list: list_helper.getCat2(cval) });
    }

    this.setState({ [e.target.name]: e.target.value });
  }

  onMimeClick(e, what) {
    e.preventDefault();
    // console.log("on click hit", this.state.mimeid);
    // console.log("on click hit", this.state.mime);
    // console.log("on click hit", what);
    this.setState({ selectedMime: this.state.mime });
  }

  onImageClick(e) {
    e.preventDefault();
    // console.log("on click hit", this.state.mimeid);
    // console.log("on click hit", this.state.mime);
    this.setState({ selectedImage: this.state.image });
  }

  onFileInputChange(e) {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0],
        statusmsg: ""
      });
    }
  }

  onRBChange(e) {
    this.setState({ new_or_update: e.target.value });
    // this.setState({ [e.target.name]: e.target.value });
  }

  showModifyMime(e, mimeid) {
    e.preventDefault();
    document.getElementById("mimeform").reset();
    this.props.setCurrentMime(mimeid);
    this.setState({ new_or_update: "UPDATE" });
  }

  deleteMime(e, recid, mimeid, imageid) {
    // if (window.confirm("Are you sure you want to delete this Mime?")) {
    let data = { recid: recid, mimeid: mimeid, imageid: imageid };
    this.props.deleteMime(data);
  }

  changeMimeStatus = (e, mimeid, status) => {
    e.preventDefault();
    this.props.changeMimeStatus(mimeid, status);
  };

  // this is called from the filter bar
  doFiltering(fobj) {
    //console.log("filtering object", fobj);
    // if (fobj.type == "category") {
    //   this.props.getMimes(fobj);
    // }
    if (fobj.type == "wildcard") {
      this.props.searchMimes(fobj);
    }
    if (fobj.type == "status") {
      this.props.statusMimes(fobj);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // let sp = window.scrollY;
    // this.setState({ winpos: sp });

    let curMimeId = this.props.mimereducer.mime._id;

    let formdata = new FormData();
    formdata.append("mimeid", curMimeId);
    formdata.append("rating", this.state.rating);
    formdata.append("keywords", this.state.keywords);
    formdata.append("label", this.state.label);
    formdata.append("artist", this.state.artist);
    formdata.append("song", this.state.song);
    formdata.append("lyrics", this.state.lyrics);
    // formdata.append("category", this.state.category);
    // formdata.append("emotion", this.state.emotion);
    formdata.append("cat0", this.state.cat0);
    formdata.append("cat1", this.state.cat1);
    formdata.append("cat2", this.state.cat2);
    formdata.append("cat3", this.state.cat3);
    formdata.append("search_data", this.state.search_data);
    formdata.append("image", this.state.image);
    formdata.append("mime", this.state.mime);
    formdata.append("video", this.state.video);
    formdata.append("start", this.state.start);
    formdata.append("end", this.state.end);
    formdata.append("duration", this.state.duration);
    formdata.append("releaseDate", this.state.releaseDate);
    formdata.append("status", 0);
    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (this.state.new_or_update === "NEW") {
      this.props.createMime(formdata);
    } else {
      this.props.modifyMime(formdata);
    }
  }

  // changeAdStatus = (e, adid, status) => {
  //   e.preventDefault();
  //   this.props.changeAdvertisementStatus(adid, status);
  // };

  // showModifyAd(e, adid) {
  //   e.preventDefault();
  //   document.getElementById("advertisementform").reset();
  //   this.props.setCurrentAdvertisement(adid);
  //   this.setState({ file: null, new_or_update: "UPDATE" });
  // }

  render() {
    const { errors } = this.state;

    const mimes = this.props.mimereducer.workmimes;
    //console.log(mimes);

    // if (mimes.length == 0) {
    //   return (
    //     <div>
    //       {/* <h2 style={{ textAlign: "center", marginTop: "20px" }}>
    //         No Mimes Exist
    //       </h2> */}
    //       <FilterMimes passedFunction={this.doFiltering} />
    //     </div>
    //   );
    // }

    const new_or_update = this.state.new_or_update;

    let imgstr =
      "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" +
      this.state.image;
    let imgname = this.state.image;
    let selid = this.state.mimeid;
    let selectedImage = this.state.selectedImage;
    let selectedMime = this.state.selectedMime;

    return (
      <div>
        <FilterMimesBar />
        <FilterMimes passedFunction={this.doFiltering} />
        <h5 style={{ textAlign: "center", color: "white" }}>Mimes</h5>
        <div className="xcontainer xmimerecordstablewrapper">
          <div className="row">
            <div className="col-md-9 xmimerecordstablewrapper">
              <div className="mimerecordstablewrapper">
                <table className="table table-light xtable-bordered table-striped xtable-sm ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Rating</th>
                      {/* <th>Keywords</th> */}
                      {/* <th>Label</th> */}
                      <th>Artist</th>
                      <th>Song</th>
                      <th>Lyrics</th>
                      {/* <th>Image</th> */}
                      {/* <th>Mime</th>
                <th>Video</th>
                <th>Start</th>
                <th>End</th>
                <th>Dur</th> */}
                      <th>Cat1</th>
                      <th>Cat2</th>
                      <th>Cat3</th>
                      <th>Search</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>

                  <tbody style={{ color: "black" }}>
                    {mimes.map((mime, index) => (
                      <tr key={mime._id}>
                        <td>{mime.rating}</td>
                        {/* <td>{mime.keywords}</td> */}
                        {/* <td>{mime.label}</td> */}
                        <td>{mime.artist}</td>
                        <td>{mime.song}</td>
                        <td>{mime.lyrics}</td>
                        {/* <td>{mime.image}</td> */}
                        {/* <td>{mime.mime}</td>
                  <td>{mime.video}</td>
                  <td>{mime.start}</td>
                  <td>{mime.end}</td>
                  <td>{mime.duration}</td> */}
                        <td>{mime.cat0}</td>
                        <td>{mime.cat1}</td>
                        <td>{mime.cat2}</td>
                        <td>{mime.search_data}</td>
                        <td>
                          <a
                            href="#"
                            onClick={e => {
                              this.changeMimeStatus(e, mime._id, mime.status);
                            }}
                          >
                            {mime.status}
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="xbtn xbtn-sm xbtn-secondary xbtn-block"
                            onClick={e => {
                              this.showModifyMime(e, mime._id);
                            }}
                          >
                            modify
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="#"
                            className="xbtn xbtn-sm xbtn-secondary xbtn-block"
                            onClick={e => {
                              this.deleteMime(
                                e,
                                mime._id,
                                mime.mime,
                                mime.image
                              );
                            }}
                          >
                            delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selectedImage ? (
                <ImageDisplay img={imgname} title={imgname} />
              ) : (
                <div />
              )}
              {selectedMime ? (
                <MimeDisplay mime={selectedMime} title={selectedMime} />
              ) : (
                <div />
              )}
            </div>
            <div className="col-md-3 mimerecordsformwrapper">
              <h5 style={{ textAlign: "center" }}>Record</h5>
              <form
                id="mimeform"
                noValidate
                onSubmit={this.onSubmit}
                // style={{
                //   backgroundColor: "#fff",
                //   padding: "10px",
                //   fontSize: "10pt",
                //   color: "black"
                // }}
              >
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Rating"
                    placeholder="Rating"
                    name="rating"
                    value={this.state.rating}
                    onChange={this.onChange}
                    error={errors.rating}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Label"
                    placeholder="Label"
                    name="label"
                    value={this.state.label}
                    onChange={this.onChange}
                    error={errors.label}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Keywords"
                    placeholder="Keywords"
                    name="keywords"
                    value={this.state.keywords}
                    onChange={this.onChange}
                    error={errors.keywords}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Artist"
                    placeholder="Artist"
                    name="artist"
                    value={this.state.artist}
                    onChange={this.onChange}
                    error={errors.artist}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Song"
                    placeholder="Song"
                    name="song"
                    value={this.state.song}
                    onChange={this.onChange}
                    error={errors.song}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Lyrics"
                    placeholder="lyrics"
                    name="lyrics"
                    value={this.state.lyrics}
                    onChange={this.onChange}
                    error={errors.lyrics}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Search"
                    placeholder="search_data"
                    name="search_data"
                    value={this.state.search_data}
                    onChange={this.onChange}
                    error={errors.search_data}
                  />
                </div>
                <div className="form-group">
                  <SelectCategoryGroup
                    label="Category 0"
                    name="cat0"
                    list={this.state.cat0_list}
                    value={this.state.cat0}
                    onChange={this.onChange}
                    error={errors.cat0}
                  />
                </div>
                <div className="form-group">
                  <SelectCategoryGroup
                    label="Category 1"
                    name="cat1"
                    list={this.state.cat1_list}
                    value={this.state.cat1}
                    onChange={this.onChange}
                    error={errors.cat1}
                  />
                </div>
                <div className="form-group">
                  <SelectCategoryGroup
                    label="Category 2"
                    name="cat2"
                    list={this.state.cat2_list}
                    value={this.state.cat2}
                    onChange={this.onChange}
                    error={errors.cat2}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Release Date"
                    placeholder="releaseDate"
                    name="releaseDate"
                    value={this.state.releaseDate}
                    onChange={this.onChange}
                    error={errors.releaseDate}
                  />
                </div>

                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Start"
                    placeholder="Start"
                    name="start"
                    value={this.state.start}
                    onChange={this.onChange}
                    error={errors.start}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Start"
                    placeholder="Start"
                    name="start"
                    value={this.state.start}
                    onChange={this.onChange}
                    error={errors.start}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="End"
                    placeholder="End"
                    name="end"
                    value={this.state.end}
                    onChange={this.onChange}
                    error={errors.end}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Duration"
                    placeholder="Duration"
                    name="duration"
                    value={this.state.duration}
                    onChange={this.onChange}
                    error={errors.duration}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroupLink
                    type="text"
                    label="Image"
                    placeholder="image"
                    name="image"
                    value={this.state.image}
                    onChange={this.onChange}
                    onClick={e => {
                      this.onImageClick(e);
                    }}
                    error={errors.image}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroupLink
                    type="text"
                    label="Mime"
                    placeholder="Mime"
                    name="mime"
                    value={this.state.mime}
                    onChange={this.onChange}
                    onClick={e => {
                      this.onMimeClick(e, "which");
                    }}
                    error={errors.mime}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Video"
                    placeholder="Video"
                    name="video"
                    value={this.state.video}
                    onChange={this.onChange}
                    error={errors.video}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="radio"
                    value="NEW"
                    checked={new_or_update === "NEW"}
                    name="neworupdate"
                    onChange={this.onRBChange}
                  />
                  &nbsp;New &nbsp;&nbsp;
                  <input
                    type="radio"
                    value="UPDATE"
                    checked={new_or_update === "UPDATE"}
                    name="neworupdate"
                    onChange={this.onRBChange}
                  />
                  &nbsp;Update
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-info btn-block " />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- end wrapper --> */}
      </div>
    );
  }
}

//export default withRouter(Advertisements);
const mapStateToProps = state => ({
  // auth: state.auth,
  errors: state.errors,
  // advertise: state.advertise,
  // statusMsg: state.statusMsg
  mimereducer: state.mimereducer
});

export default connect(
  mapStateToProps,
  {
    getMimes,
    searchMimes,
    statusMimes,
    createMime,
    deleteMime,
    setCurrentMime,
    modifyMime,
    changeMimeStatus
    // modifyAdvertisement,
    // deleteAdvertisement,
    // changeAdvertisementStatus,
    // setCurrentAdvertisement
  }
)(withRouter(MimeRecords));
