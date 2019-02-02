import React from "react";
import ApiAdImageObj from "./ApiAdImageObj";

const ApiAdBusinessObj = ({ obj }) => {
  // console.log("businesses");
  // console.log(obj.imgs);
  let logoary = obj.bizimgs;
  let photoary = obj.bizphotoimgs;
  let adary = obj.advertisements;
  let adimgary = obj.imgs;

  let logoTemplate = logoary.map((img, i) => (
    <div key={i} style={{ marginLeft: "5px" }}>
      <ApiAdImageObj which="business" img={img} />
    </div>
  ));

  let photoTemplate = photoary.map((img, i) => (
    //, float: "left"
    <div key={i} style={{ marginLeft: "5px", float: "left" }}>
      <ApiAdImageObj which="business" img={img} />
    </div>
  ));

  let xxadTemplate = adary.map((ad, i) => (
    <div key={i} style={{ marginLeft: "5px" }}>
      <div>
        <b>{ad.description}</b>
      </div>
      {"2" == "2" ? (
        <div style={{ paddingLeft: "15px" }}>{ad.discount}</div>
      ) : null}
    </div>
  ));

  let adTemplate = adary.map((ad, i) =>
    adimgary.map((adimg, j) => (
      <div key={i} style={{ marginLeft: "5px" }}>
        {ad._id == adimg.advertisementId ? (
          <div>
            <div>
              <b>{ad.description}</b>
            </div>
            <div style={{ paddingLeft: "15px" }}>{ad.discount}</div>
            <div style={{ marginLeft: "25px" }}>
              <ApiAdImageObj which="business" img={adimg} />
            </div>
          </div>
        ) : null}
      </div>
    ))
  );

  return (
    <div>
      <h3>{obj.name}</h3>
      {/* <div>
        <b>Name</b> {obj.name}
      </div> */}

      <div>
        <b>Address</b> {obj.address}, {obj.city}, {obj.state}
      </div>
      <div>
        <b>Phone</b> {obj.phone}
      </div>
      <div>
        <b>Email</b> {obj.email}
      </div>
      <div>
        <b>Latitude</b> {obj.latitude}
      </div>
      <div>
        <b>Longitude</b> {obj.longitude}
      </div>
      <div>
        <b>Business Logo</b>
      </div>
      <div>{logoTemplate}</div>
      <div>
        <b>Business Photos</b>
      </div>
      <div>{photoTemplate}</div>
      <div style={{ clear: "left" }}>
        <h5>Advertisements</h5>
      </div>
      <div>{adTemplate}</div>
    </div>
  );
};

export default ApiAdBusinessObj;
