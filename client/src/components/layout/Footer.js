import React from "react";

export default () => {
  return (
    <footer
      className=" xnavbackground text-white xmt-5 p-4 text-center"
      style={{
        border: "0px solid black",
        backgroundColor: "black",
        borderTop: "1px solid white",
        fontSize: "9pt"
      }}
    >
      Copyright &copy; {new Date().getFullYear()} Mirror
    </footer>
  );
};
