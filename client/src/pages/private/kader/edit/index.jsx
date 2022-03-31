import { Link } from "react-router-dom";
import { useState } from "react";

const Edit = () => {
  const [kader, setKader] = useState({
    _id: "564",
    name: "",
    noHp: "",
    password: "",
  });

  const changeData = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setKader({ ...kader, [key]: value });
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Ubah Kader</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Ubah Kader</li>
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
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Detail Data</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="name">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Masukkan nama"
                        onChange={changeData}
                        value={kader.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="noHp">No. Handphone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="noHp"
                        placeholder="Masukkan nama"
                        onChange={changeData}
                        value={kader.noHp}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Kata Sandi</label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder="Masukkan nama"
                        onChange={changeData}
                        value={kader.password}
                      />
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(kader);
                      }}
                    >
                      Ubah
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
