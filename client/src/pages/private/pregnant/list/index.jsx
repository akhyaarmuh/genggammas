import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPregnants } from "../../../../services/pregnant";

const List = ({ role }) => {
  const [ibuHamil, setIbuHamil] = useState([]);

  useEffect(() => {
    actionGetPregnants();
  }, []);

  const actionGetPregnants = async () => {
    try {
      const res = await getPregnants(role);
      setIbuHamil(res.data.data);
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
              <h1 className="m-0">Ibu Hamil</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Ibu Hamil</li>
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
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col">
              <Link
                to="/pregnant/create"
                type="button"
                className="btn btn-primary "
              >
                <i className="fa fa-plus"></i> Tambah Ibu Hamil
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card-body table-responsive p-0">
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Suami</th>
                      <th>HTP</th>
                      <th>No. HP</th>
                      <th>Kader</th>
                      <th>SPK</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ibuHamil.map((ibu, i) => (
                      <tr key={i}>
                        <td>
                          <Link to={`/pregnant/${ibu._id}`}>{ibu.name}</Link>
                        </td>
                        <td>{ibu.husband}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{ibu.htp}</td>
                        <td>{ibu.noHp}</td>
                        <td>{ibu.kader}</td>
                        <td>
                          {ibu.status === "Selesai" ? (
                            <span className="badge badge-success">Selesai</span>
                          ) : (
                            <span className="badge badge-danger">Proses</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm bg-gradient-danger"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default List;
