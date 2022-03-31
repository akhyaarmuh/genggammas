import { Switch, Route } from "react-router-dom";
import List from "./list";
import Create from "./create";
import Edit from "./edit";

const Kader = () => {
  return (
    <Switch>
      <Route exact path="/kader">
        <List />
      </Route>
      <Route path="/kader/create">
        <Create />
      </Route>
      <Route path="/kader/:id">
        <Edit />
      </Route>
    </Switch>
  );
};

export default Kader;
