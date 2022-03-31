import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getKaders } from "../../../../services/kader";

const List = () => {
  const [kader, setKader] = useState([]);

  useEffect(() => {
    actionGetKaders();
  }, []);

  const actionGetKaders = async () => {
    try {
      const res = await getKaders();
      setKader(res.data.data);
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
              <h1 className="m-0">Kader</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Kader</li>
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
                to="/kader/create"
                type="button"
                className="btn btn-primary "
              >
                <i className="fa fa-plus"></i> Tambah Kader
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
                      <th>No. HP</th>
                      <th>Kata Sandi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kader.map((ibu, i) => (
                      <tr key={i}>
                        <td>
                          {/* <Link to={`/kader/${ibu._id}`}>{ibu.name}</Link> */}
                          {ibu.name}
                        </td>
                        <td>{ibu.noHp}</td>
                        <td>{ibu.password}</td>

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
