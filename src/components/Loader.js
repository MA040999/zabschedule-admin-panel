import React from "react";

function Loader({ smallLoader }) {
  return (
    <div
      className={`loader-container ${smallLoader && "small-loader-container"}`}
    >
      <div className="loader-content">
        <div className="loader-top"></div>
        <div className="loader-bottom"></div>
      </div>
    </div>
  );
}

export default Loader;
