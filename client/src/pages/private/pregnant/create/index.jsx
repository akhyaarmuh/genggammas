import { Link } from "react-router-dom";
import { useState } from "react";
import { createPregnant } from "../../../../services/pregnant";
import { useHistory } from "react-router-dom";

const Create = ({ idKader }) => {
  const history = useHistory();
  const [data, setdata] = useState({
    name: "",
    husband: "",
    nik: "",
    bpjs: "",
    hpht: "",
    golDarah: "",
    noHp: "",
    born: "",
    otherRisk: "",
    allRisk: [
      { risk: "Terlalu muda", status: false },
      { risk: "Terlalu tua", status: false },
      { risk: "Jarak kehamilan yang terlalu jauh", status: false },
      { risk: "Terlalu banyak anak", status: false },
      { risk: "Usia untuk hamil terlalu tua", status: false },
      { risk: "KEK", status: false },
      { risk: "TB kurang dari 145cm", status: false },
      { risk: "Pernah SC", status: false },
      { risk: "Riwayat kehamilan yang jelek", status: false },
      { risk: "Anemia", status: false },
    ],
  });

  const [perencanaan, setPerencanaan] = useState({
    penolong: "",
    tempat: "",
    pendamping: "",
    transport: "",
    calonPendonor: "",
  });

  const changeRisk = (e) => {
    setdata({
      ...data,
      allRisk: [...data.allRisk].map((risk) => {
        if (risk.risk == e.target.value) {
          return {
            ...risk,
            status: e.target.checked,
          };
        }
        return risk;
      }),
    });
  };

  const changeData = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    if (key === "bpjs" || key === "nik" || key === "noHp") {
      const number = Number(value);
      if (isNaN(number)) {
        return;
      }
      setdata({ ...data, [key]: value.toString() });
    } else {
      setdata({ ...data, [key]: value });
    }
  };

  const changePerencanaan = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    setPerencanaan({ ...perencanaan, [key]: value });
  };

  const actionCreatePregnant = async () => {
    try {
      let allRisk = data.allRisk.filter((dat) => dat.status);
      allRisk = allRisk.map((risk) => risk.risk);
      if (data.otherRisk) allRisk = [...allRisk, data.otherRisk];
      const pregnant = { ...data, ...perencanaan };
      delete pregnant.otherRisk;
      pregnant.allRisk = allRisk;
      pregnant.kader = idKader;
      await createPregnant(pregnant);
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
              <h1 className="m-0">Tambah Ibu Hamil</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Beranda</Link>
                </li>
                <li className="breadcrumb-item active">Tambah Ibu Hamil</li>
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
                  <h3 className="card-title">Masukkan Data</h3>
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
                        value={data.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="husband">Suami</label>
                      <input
                        type="text"
                        className="form-control"
                        id="husband"
                        placeholder="Masukkan nama suami"
                        onChange={changeData}
                        value={data.husband}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nik">NIK</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nik"
                        placeholder="Masukkan no. KTP"
                        onChange={changeData}
                        value={data.nik}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bpjs">No. BPJS</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bpjs"
                        placeholder="Masukkan no. BPJS"
                        onChange={changeData}
                        value={data.bpjs}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hpht">HPHT</label>
                      <input
                        type="text"
                        className="form-control"
                        id="hpht"
                        placeholder="(tgl bulan tahun) cnth. 5 6 2022"
                        onChange={changeData}
                        value={data.hpht}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="golDarah">Golongan Darah</label>
                      <input
                        type="text"
                        className="form-control"
                        id="golDarah"
                        placeholder="gol. Darah"
                        onChange={changeData}
                        value={data.golDarah}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="noHp">Nomoh HP</label>
                      <input
                        type="text"
                        className="form-control"
                        id="noHp"
                        placeholder="no. Handphone"
                        onChange={changeData}
                        value={data.noHp}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="born">Tgl. Lahir</label>
                      <input
                        type="text"
                        className="form-control"
                        id="born"
                        placeholder="(tgl bulan tahun) cnth. 5 6 2022"
                        onChange={changeData}
                        value={data.born}
                      />
                    </div>

                    <div className="form-group">
                      <label>Resiko kehamilan</label>
                      <div className="form-check">
                        <div className="row">
                          {data.allRisk.map((risk, i) => (
                            <div className="col-md-6 col-12" key={i}>
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={changeRisk}
                                  value={risk.risk}
                                  checked={risk.status ? true : false}
                                />
                                {risk.risk}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="otherRisk">Resiko lainnya</label>
                      <input
                        type="text"
                        className="form-control"
                        id="otherRisk"
                        placeholder="pisahkan dengan koma , jika lebih dari satu"
                        onChange={changeData}
                        value={data.otherRisk}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="penolong">Penolong Persalinan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="penolong"
                        placeholder="Masukkan nama"
                        onChange={changePerencanaan}
                        value={perencanaan.penolong}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tempat">Tempat Persalinan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tempat"
                        placeholder="Masukkan nama"
                        onChange={changePerencanaan}
                        value={perencanaan.tempat}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pendamping">Pendamping Persalinan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pendamping"
                        placeholder="Masukkan nama pendamping"
                        onChange={changePerencanaan}
                        value={perencanaan.pendamping}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="transport">Transport Persalinan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="transport"
                        placeholder="Alat transportasi"
                        onChange={changePerencanaan}
                        value={perencanaan.transport}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pendonor">Calon Pendonor Darah</label>
                      <input
                        type="text"
                        className="form-control"
                        id="calonPendonor"
                        placeholder="Masukkan nama"
                        onChange={changePerencanaan}
                        value={perencanaan.calonPendonor}
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
                        actionCreatePregnant();
                      }}
                    >
                      Simpan
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

export default Create;
