import "./pregnant.css";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import Create from "./create";
import Detail from "./detail";
import Cekup from "./cekup";

const Pregnant = ({ idKader, role }) => {
  return (
    <Switch>
      <Route exact path="/pregnant">
        <List role={{ role, idKader }} />
      </Route>
      <Route path="/pregnant/create">
        <Create idKader={idKader} />
      </Route>
      <Route path="/pregnant/cekup/:id">
        <Cekup />
      </Route>
      <Route path="/pregnant/:id">
        <Detail />
      </Route>
    </Switch>
  );
};

export default Pregnant;
