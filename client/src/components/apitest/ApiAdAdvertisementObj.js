import React from "react";
import ApiAdImageObj from "./ApiAdImageObj";

const ApiAdAdvertisementObj = ({ obj }) => {
  let imgary = obj.imgs;
  return (
    <div>
      <div>Advertisement Description {obj.advertisements.description}</div>
      <div>Advertisement Discount {obj.advertisements.discount}</div>

      <div>
        <ApiAdImageObj which="advertisement" imgary={imgary} />
      </div>
    </div>
  );
};

export default ApiAdAdvertisementObj;
