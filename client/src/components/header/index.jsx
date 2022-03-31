import React from "react";

const Header = ({ name }) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto pr-3">
        <li className="nav-item d-none d-sm-inline-block">{name}</li>
      </ul>
    </nav>
  );
};

export default Header;
