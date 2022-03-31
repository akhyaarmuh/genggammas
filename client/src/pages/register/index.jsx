import { useState } from "react";
import { useHistory } from "react-router-dom";
import { register as regist } from "../../services/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [dataRegister, setdataRegister] = useState({
    name: "",
    noHp: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");

  const register = async () => {
    if (
      !dataRegister.name ||
      !dataRegister.noHp ||
      !dataRegister.password ||
      !dataRegister.confirmPassword
    ) {
      setMsg("Semua input wajib diisi");
    } else if (dataRegister.password !== dataRegister.confirmPassword) {
      setMsg("Konformasi katasandi tidaksama");
    } else {
      try {
        await regist({
          name: dataRegister.name,
          noHp: dataRegister.noHp,
          password: dataRegister.password,
        });
        history.push("/login");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.errorMessage);
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Genggam</b>Mas
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Daftar sebagai kader</p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  value={dataRegister.name}
                  onChange={(e) =>
                    setdataRegister({ ...dataRegister, name: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="no. Handphone"
                  value={dataRegister.noHp}
                  onChange={(e) =>
                    setdataRegister({ ...dataRegister, noHp: e.target.value })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={dataRegister.password}
                  onChange={(e) =>
                    setdataRegister({
                      ...dataRegister,
                      password: e.target.value,
                    })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  value={dataRegister.confirmPassword}
                  onChange={(e) =>
                    setdataRegister({
                      ...dataRegister,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
            </form>
            <p className="text-danger text-center">{msg}</p>
            <button onClick={register} className="btn btn-block btn-primary">
              Daftar
            </button>
          </div>
          <p className="mb-1">
            <Link to="/login">Sudah punya akun? Login disini.</Link>
          </p>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};

export default Register;
