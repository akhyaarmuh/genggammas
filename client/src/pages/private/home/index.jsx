import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdPregnantWoman } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { getHome } from "../../../services/dashboard/home";

const Main = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    actionGetHome();
  }, []);
  const actionGetHome = async () => {
    try {
      const res = await getHome();
      setData(res.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errorMessage);
      }
    }
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Beranda</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Genggam Mas</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{data.pregnants ? data.pregnants : 0}</h3>
                  <p>Ibu Hamil</p>
                </div>
                <div className="icon">
                  <MdPregnantWoman />
                </div>
                <Link to="/pregnant" className="small-box-footer">
                  Selengkapnya <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{data.users ? data.users - 1 : 0}</h3>
                  <p>Kader</p>
                </div>
                <div className="icon">
                  <FaUserAlt />
                </div>
                <Link to="/kader" className="small-box-footer">
                  Selengkapnya <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Main;
