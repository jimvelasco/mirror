import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectCategoryGroup from "../common/SelectCategoryGroup";
import SelectEmotionGroup from "../common/SelectEmotionGroup";
import FilterMimes from "../common/FilterMimes";

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

class MimeRecords extends Component {
  constructor(props) {
    super(props);
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
      name: "",
      description: "",
      label: "",
      artist: "",
      song: "",
      lyrics: "",
      category: "",
      emotion: "",
      image: "",
      releaseDate: today, //"2019-01-02",
      status: 0,
      errors: {},
      new_or_update: "NEW",
      cat_list: list_helper.getCats(), //["wow", "cool", "amazing"],
      emot_list: list_helper.getEmotions("wow") //["happy", "serious", "angry"]
    }; //shuttles: ["one", "two", "three"] };

    this.onChange = this.onChange.bind(this);
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
    this.props.getMimes({ param: "all" });
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
      //console.log("we do have a npmime id", curmime);
      this.setState({
        name: curmime.name,
        description: curmime.description,
        label: curmime.label,
        artist: curmime.artist,
        song: curmime.song,
        lyrics: curmime.lyrics,
        category: curmime.category,
        emotion: curmime.emotion,
        image: curmime.image,
        releaseData: curmime.releaseData,
        status: curmime.status,
        emot_list: list_helper.getEmotions(curmime.category)
      });
    } else {
      //console.log("we do NOT have a npmime id");
    }
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
    // if (this.props.selectedBizid !== nextProps.selectedBizid) {
    //   let bizid = nextProps.selectedBizid;
    //   this.props.getAdvertisements(bizid);
    // } else if (
    //   this.props.advertise.advertisement._id !==
    //     nextProps.advertise.advertisement._id ||
    //   this.props.advertise.advertisement.image._id !==
    //     nextProps.advertise.advertisement.image._id
    // ) {
    //   let curad = nextProps.advertise.advertisement;
    //   this.setState({
    //     name: curad.name,
    //     discount: curad.discount,
    //     description: curad.description,
    //     startdate: curad.startdate,
    //     enddate: curad.enddate
    //   });
    // } else {
    // }
  }

  componentDidUpdate() {}

  onChange(e) {
    //console.log(e.target.name);
    //let emotlist = ["happy", "serious", "angry"];
    //let emotlist2 = ["happy", "serious", "angry", "pissed"];
    // if (e.target.name === "category" && e.target.value == "cool") {
    //   this.setState({ emot_list: emotlist2 });
    // } else {
    //   this.setState({ emot_list: emotlist });
    // }

    if (e.target.name === "category") {
      let cval = e.target.value;
      this.setState({ emot_list: list_helper.getEmotions(cval) });
    }

    this.setState({ [e.target.name]: e.target.value });
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

  deleteMime(e, adid) {
    // if (window.confirm("Are you sure you want to delete this Mime?")) {
    this.props.deleteMime(adid);
    // } else {
    // }
  }

  changeMimeStatus = (e, mimeid, status) => {
    e.preventDefault();
    this.props.changeMimeStatus(mimeid, status);
  };

  doFiltering(fobj) {
    //console.log("filtering object", fobj);
    if (fobj.type == "category") {
      this.props.getMimes(fobj);
    }
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
    formdata.append("name", this.state.name);
    formdata.append("description", this.state.description);
    formdata.append("label", this.state.label);
    formdata.append("artist", this.state.artist);
    formdata.append("song", this.state.song);
    formdata.append("lyrics", this.state.lyrics);
    formdata.append("category", this.state.category);
    formdata.append("emotion", this.state.emotion);
    formdata.append("image", this.state.image);
    formdata.append("releaseDate", this.state.releaseDate);
    formdata.append("status", 0);
    // for (var pair of formdata.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // console.log("the form data");
    // console.log(formdata);
    // this.props.createMime(formdata);

    // const aMime = {
    //   name: this.state.name,
    //   artist: this.state.artist,
    //   song: this.state.song,
    //   lyrics: this.state.lyrics,
    //   category: this.state.category,
    //   emotion: this.state.emotion,
    //   image: this.state.image,
    //   releaseDate: this.state.releaseDate,
    //   status: this.state.status
    // };

    // console.log("the mime is");
    // console.log(aMime);

    // this.props.createMime(formdata);

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

    const mimes = this.props.mimereducer.mimes;
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
    let imgname = this.state.name;

    return (
      <div>
        <FilterMimes passedFunction={this.doFiltering} />
        <h5 style={{ textAlign: "center" }}>Mimes</h5>
        <div className="container mimerecordswrapper">
          <table className="table table-dark table-bordered table-striped table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Label</th>
                <th>Artist</th>
                <th>Song</th>
                <th>Lyrics</th>
                <th>Image</th>
                <th>Category</th>
                <th>Emotion</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {mimes.map((mime, index) => (
                <tr key={mime._id}>
                  <td>{mime.name}</td>
                  <td>{mime.description}</td>
                  <td>{mime.label}</td>
                  <td>{mime.artist}</td>
                  <td>{mime.song}</td>
                  <td>{mime.lyrics}</td>
                  <td>{mime.image}</td>
                  <td>{mime.category}</td>
                  <td>{mime.emotion}</td>
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
                        this.deleteMime(e, mime._id);
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

        <form
          id="mimeform"
          noValidate
          onSubmit={this.onSubmit}
          style={{ backgroundColor: "#333", padding: "10px" }}
        >
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  label="Description"
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
              </div>
            </div>
            <div className="col-md-4">
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
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
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
            </div>
            <div className="col-md-3">
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
            </div>

            <div className="col-md-6">
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
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <SelectCategoryGroup
                  label="Category"
                  name="category"
                  list={this.state.cat_list}
                  value={this.state.category}
                  onChange={this.onChange}
                  error={errors.category}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <SelectEmotionGroup
                  label="Emotion"
                  name="emotion"
                  list={this.state.emot_list}
                  value={this.state.emotion}
                  onChange={this.onChange}
                  error={errors.emotion}
                />
              </div>
            </div>
            <div className="col-md-6">
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
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  label="Image"
                  placeholder="image"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="image-float">
                <img
                  className="rounded-circle xd-none xd-md-block"
                  src={imgstr}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "3px solid white"
                  }}
                  // onClick={this.onThumbClick.bind(this, id)}
                  // onClick={this.onThumbClick(id)}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: "8pt",
                    width: "100%",
                    textAlign: "center",
                    border: "0px solid white"
                  }}
                >
                  {imgname}
                </div>
              </div>
            </div>

            <div className="col-md-4">
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
              <div style={{ marginTop: "10px" }}>
                <input type="submit" className="btn btn-info btn-block " />
              </div>
            </div>
          </div>
        </form>
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
