import "./detail.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailPregnant } from "../../../../services/pregnant";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    actionGetDetailPregnant();
  }, []);

  const actionGetDetailPregnant = async () => {
    try {
      const res = await getDetailPregnant(id);
      setData(res.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.erroMessage);
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
              <h1 className="m-0">Detail Ibu Hamil</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Detail Ibu Hamil</li>
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
              {/* <Link
                to="/pregnant/create"
                type="button"
                className="btn btn-primary btn-sm"
              >
                Edit data
              </Link> */}
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
                      <th>NIK</th>
                      <th>No. BPJS</th>
                      <th>HPHT</th>
                      <th>HTP</th>
                      <th>Gol. Darah</th>
                      <th>No. HP</th>
                      <th>Resiko</th>
                      <th>Umur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.husband}</td>
                      <td>{data.nik}</td>
                      <td>{data.bpjs}</td>
                      <td>{data.hpht}</td>
                      <td>{data.htp}</td>
                      <td>{data.golDarah}</td>
                      <td>{data.noHp}</td>
                      <td>{data.allRisk}</td>
                      <td>{data.umur} Tahun</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="mt-3">Riwayat Pemeriksaan Kehamilan (ANC)</h3>
              <Link
                to={`/pregnant/cekup/${data._id}`}
                type="button"
                className="btn btn-primary btn-sm ml-2"
              >
                Buat ANC
              </Link>
              <div className="card-body table-responsive p-0">
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Keluhan</th>
                      <th>Usia Kehamilan</th>
                      <th>BB</th>
                      <th>HB</th>
                      <th>Tensi</th>
                      <th>Lila</th>
                      <th>Tablet Tambah Darah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.cekup?.map((cek, i) => (
                      <tr key={i}>
                        <td>{cek.date}</td>
                        <td>{cek.keluhan}</td>
                        <td>{cek.uKehamilan} Minggu</td>
                        <td>{cek.bb} Kg</td>
                        <td>{cek.hb}</td>
                        <td>{cek.tensi} mmHg</td>
                        <td>{cek.lila} cm</td>
                        <td>{cek.tDarah} Tablet</td>
                      </tr>
                    ))}
                    <tr>
                      <th colSpan={8}>
                        Total tablet tambah darah : {data.allTablet} Tablet
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={8}>
                        Status TM awal :{" "}
                        {data.tm1 ? (
                          <span className="badge badge-success">Selesai</span>
                        ) : (
                          <span className="badge badge-danger">Belum</span>
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={8}>
                        Status TM awal :{" "}
                        {data.tm2 ? (
                          <span className="badge badge-success">Selesai</span>
                        ) : (
                          <span className="badge badge-danger">Belum</span>
                        )}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
