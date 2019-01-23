import React from "react";

export default () => {
  return (
    <footer
      className=" navbackground text-white xmt-5 p-4 text-center"
      style={{ border: "0px solid black" }}
    >
      Copyright &copy; {new Date().getFullYear()} Mirror
    </footer>
  );
};
