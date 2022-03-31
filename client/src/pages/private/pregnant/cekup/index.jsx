import { Link, useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { createCekup } from "../../../../services/pregnant";

const Cekup = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    keluhan: "",
    uKehamilan: "",
    bb: "",
    tensi: "",
    lila: "",
    tDarah: "",
    peb: "",
  });

  const changeData = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    if (key === "uKehamilan" || key === "bb" || key === "tDarah") {
      const number = Number(value);
      if (isNaN(number)) {
        return;
      }
      setData({ ...data, [key]: value });
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const actionCreateCekup = async () => {
    try {
      await createCekup(id, { ...data, tDarah: Number(data.tDarah) });
      history.push("/pregnant");
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
              <h1 className="m-0">Buat riwayat cekup</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Riwayat cekup</li>
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
                  <h3 className="card-title">Masukkan Data cekup</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="keluhan">Keluhan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="keluhan"
                        placeholder="Masukkan keluhan"
                        onChange={changeData}
                        value={data.keluhan}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="uKehamilan">Usia Kehamilan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="uKehamilan"
                        placeholder="Masukkan Usia Kehamilan"
                        onChange={changeData}
                        value={data.uKehamilan}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bb">Berat Badan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bb"
                        placeholder="Masukkan bb"
                        onChange={changeData}
                        value={data.bb}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tensi">Tekanan Darah</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tensi"
                        placeholder="Masukkan tensi darah"
                        onChange={changeData}
                        value={data.tensi}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lila">Lila</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lila"
                        placeholder="lila"
                        onChange={changeData}
                        value={data.lila}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tDarah">Tablet Tambah Darah</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tDarah"
                        placeholder="jumlah tablet yang diminum"
                        onChange={changeData}
                        value={data.tDarah}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="peb">PEB</label>
                      <input
                        type="text"
                        className="form-control"
                        id="peb"
                        placeholder="PEB"
                        onChange={changeData}
                        value={data.peb}
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
                        actionCreateCekup();
                      }}
                    >
                      Simpan riwayat cekup
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

export default Cekup;
