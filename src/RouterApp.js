import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import Presente from "./Presentes";

const RouterApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/presentes">
          <Presente />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
}

export default RouterApp;
