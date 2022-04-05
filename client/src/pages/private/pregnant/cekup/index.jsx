import { Link, useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { createCekup } from "../../../../services/pregnant";

const Cekup = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    date: { status: false, value: "" },
    keluhan: "",
    bb: "",
    tensi: { value: "", msg: "" },
    lila: { value: "", msg: "" },
    hb: { value: "", msg: "" },
    proteinUrine: { value: "", msg: "" },
    reduksiUrine: "",
    tDarah: "",
    tm1: false,
    tm2: false,
  });

  const changeData = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    if (key === "bb" || key === "tDarah") {
      const number = Number(value);
      if (isNaN(number)) {
        return;
      }
      setData({ ...data, [key]: value });
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const changeDataWithMessage = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    if (key === "lila") {
      const number = Number(value);
      if (isNaN(number)) return;

      if (number < 23.5) {
        setData({ ...data, lila: { ...data.lila, msg: "kek", value } });
      } else {
        setData({ ...data, lila: { ...data.lila, msg: "", value } });
      }
    } else if (key === "hb") {
      const number = Number(value);
      if (isNaN(number)) return;

      if (number < 11) {
        setData({ ...data, hb: { ...data.hb, msg: "anemia", value } });
      } else {
        setData({ ...data, hb: { ...data.hb, msg: "", value } });
      }
    } else if (key === "proteinUrine") {
      if (value === "-") {
        setData({
          ...data,
          proteinUrine: { ...data.proteinUrine, msg: "Normal", value },
        });
      } else if (value === "+1" || value === "+2" || value === "+3") {
        setData({
          ...data,
          proteinUrine: { ...data.proteinUrine, msg: "Pre Eklamsi", value },
        });
      } else {
        setData({
          ...data,
          proteinUrine: { ...data.proteinUrine, msg: "", value },
        });
      }
    } else {
      setData({ ...data, tensi: { ...data.tensi, value, msg: "" } });
    }
  };

  const handleBlur = () => {
    const arr = data.tensi.value.split("/");
    if (arr.length !== 2 || isNaN(arr[0]) || isNaN(arr[1])) {
      setData({
        ...data,
        tensi: { ...data.tensi, msg: "Masukkan format yang benar" },
      });
    } else {
      if (Number(arr[0]) >= 140 || Number(arr[1]) > 90) {
        setData({
          ...data,
          tensi: { ...data.tensi, msg: "Hypertensi" },
        });
      }
    }
  };

  const actionCreateCekup = async () => {
    if (
      !data.bb ||
      !data.tensi.value ||
      !data.lila.value ||
      !data.hb.value ||
      !data.tDarah
    )
      return;

    if (data.date.status) {
      try {
        if (!data.tm1) {
          delete data.tm1;
        }
        if (!data.tm2) {
          delete data.tm2;
        }

        await createCekup(id, {
          ...data,
          date: data.date.value,
          tensi: data.tensi.value,
          lila: data.lila.value,
          hb: data.hb.value,
          tDarah: Number(data.tDarah),
          proteinUrine: data.proteinUrine.value,
        });
        history.push("/pregnant");
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.errorMessage);
        }
      }
    } else {
      const { date, ...newData } = data;
      try {
        if (!data.tm1) {
          delete data.tm1;
        }
        if (!data.tm2) {
          delete data.tm2;
        }

        await createCekup(id, {
          ...newData,
          tensi: data.tensi.value,
          lila: data.lila.value,
          hb: data.hb.value,
          tDarah: Number(data.tDarah),
          proteinUrine: data.proteinUrine.value,
        });
        history.push("/pregnant");
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.errorMessage);
        }
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
                      <div className="row">
                        <div className="col">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={data.date.status}
                              onChange={() =>
                                setData({
                                  ...data,
                                  date: {
                                    ...data.date,
                                    status: !data.date.status,
                                  },
                                })
                              }
                            />
                            <label className="form-check-label">
                              Tanggal manual
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="date"
                            placeholder="cth. 5 5 2022"
                            onChange={(e) =>
                              setData({
                                ...data,
                                date: { ...data.date, value: e.target.value },
                              })
                            }
                            value={data.date.value}
                            disabled={!data.date.status ? true : false}
                          />
                        </div>
                      </div>
                    </div>

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
                      <label htmlFor="bb">Berat Badan(Kg)</label>
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
                      <label htmlFor="tensi">Tekanan Darah(mmHg)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tensi"
                        placeholder="cnt. 120/100"
                        onChange={changeDataWithMessage}
                        value={data.tensi.value}
                        onBlur={handleBlur}
                      />
                      {data.tensi.msg && (
                        <small className="text-danger ">{data.tensi.msg}</small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lila">Lila(cm)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lila"
                        placeholder="lila"
                        onChange={changeDataWithMessage}
                        value={data.lila.value}
                      />
                      {data.lila.msg && (
                        <small className="text-danger ">{data.lila.msg}</small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lila">HB</label>
                      <input
                        type="text"
                        className="form-control"
                        id="hb"
                        placeholder="hb"
                        onChange={changeDataWithMessage}
                        value={data.hb.value}
                      />
                      {data.hb.msg && (
                        <small className="text-danger ">{data.hb.msg}</small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="tDarah">Reduksi Urine</label>
                      <input
                        type="text"
                        className="form-control"
                        id="reduksiUrine"
                        placeholder="reduksi urine"
                        onChange={changeData}
                        value={data.reduksiUrine}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tDarah">Protein Urine</label>
                      <input
                        type="text"
                        className="form-control"
                        id="proteinUrine"
                        placeholder="protein urine"
                        onChange={changeDataWithMessage}
                        value={data.proteinUrine.value}
                      />
                      {data.proteinUrine.msg &&
                      data.proteinUrine.msg === "Normal" ? (
                        <small className="text-success ">
                          {data.proteinUrine.msg}
                        </small>
                      ) : (
                        <small className="text-danger ">
                          {data.proteinUrine.msg}
                        </small>
                      )}
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
                      <label htmlFor="tDarah">Status USG</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={data.tm1}
                          onChange={() =>
                            setData({
                              ...data,
                              tm1: !data.tm1,
                            })
                          }
                        />
                        <label className="form-check-label">TM 1</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={data.tm2}
                          onChange={() =>
                            setData({
                              ...data,
                              tm2: !data.tm2,
                            })
                          }
                        />
                        <label className="form-check-label">TM 2</label>
                      </div>
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
