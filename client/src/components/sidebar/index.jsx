import "./sidebar.css";
import logo from "../../assets/images/AdminLTELogo.png";
import { Link, useHistory } from "react-router-dom";
import { MdPregnantWoman } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../services/auth";

const Sidebar = ({ role }) => {
  const history = useHistory();

  const actionLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.erroMessage);
      }
    }
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <img
          src={logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "0.8" }}
        />
        <span className="brand-text font-weight-light">Genggam Mas</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {role === "Bidan" && (
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  <GoHome />
                  <p>Beranda</p>
                </Link>
              </li>
            )}

            <li className="nav-header">
              {role === "Bidan" ? "Data Master" : "Data Ibu Hamil"}
            </li>
            <li className="nav-item">
              <Link to="/pregnant" className="nav-link">
                <MdPregnantWoman />
                <p>Ibu Hamil</p>
              </Link>
            </li>
            {role === "Bidan" && (
              <li className="nav-item">
                <Link to="/kader" className="nav-link">
                  <FiUser />
                  <p>Kader</p>
                </Link>
              </li>
            )}
            <li className="nav-item mt-3">
              <Link
                to={history.location.pathname}
                onClick={actionLogout}
                className="nav-link"
              >
                <IoLogOutOutline />
                <p>Keluar</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
