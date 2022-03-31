import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Private, Register } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Private />
        </Route>
        <Route path="/pregnant">
          <Private />
        </Route>
        <Route path="/kader">
          <Private />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
