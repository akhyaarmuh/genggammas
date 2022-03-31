import { Switch, Route } from "react-router-dom";
import { Header, Sidebar, Footer } from "../../components";
import Home from "./home";
import Pregnant from "./pregnant";
import Kader from "./kader";
import { getToken } from "../../services/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Private = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    iat: 0,
    exp: 0,
  });
  useEffect(() => {
    actionGetToken();
  }, []);
  const actionGetToken = async () => {
    try {
      const res = await getToken();
      setUser(res.data);
      if (res.data.role === "Kader") history.push("/pregnant");
      setLoading(false);
    } catch (error) {
      if (error.response) {
        history.push("/login");
      }
    }
  };

  if (loading)
    return (
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTELogo"
            height={60}
            width={60}
          />
        </div>
      </div>
    );

  return (
    <div className="wrapper">
      <Header name={user.name} />
      <Sidebar role={user.role} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pregnant">
          <Pregnant role={user.role} idKader={user.id} />
        </Route>
        <Route path="/kader">
          <Kader />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default Private;
