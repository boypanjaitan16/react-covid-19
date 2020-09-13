import React from "react";

function Nav() {
  return (
    <div className="dashboard__nav">
      <div className="dashboard__nav-logo">
        <img alt={'logo'} src="dist/img/logo.svg" />
      </div>
      <div className="dashboard__nav-full">
        <img alt={'fullscreen'} src="dist/img/fullscreen.svg" />
      </div>
    </div>
  );
}

export default Nav;
