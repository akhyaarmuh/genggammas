import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const actionLogin = async () => {
    try {
      await login({ noHp, password });
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.errorMessage);
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
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Genggam</b>MAS
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Masuk untuk memulai sesi anda</p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="no. handphone"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
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
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
            </form>
            <p className="text-danger text-center">{msg}</p>
            <div className="social-auth-links text-center mb-3">
              <button
                onClick={actionLogin}
                className="btn btn-block btn-primary"
              >
                Masuk
              </button>
            </div>
            <p className="mb-1">
              <Link to="/register">Daftar akun</Link>
            </p>

            {/* /.social-auth-links */}
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
};

export default Login;
