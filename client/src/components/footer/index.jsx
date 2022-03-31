import React from "react";

const Footer = () => {
  const getFullYears = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="main-footer">
      <strong>
        Copyright © {getFullYears()}
        <a href="https://instagram.com/akhyaarmuh"> NWdev</a>.{" "}
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
  );
};

export default Footer;
