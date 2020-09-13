import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import Presente from "./Presentes";
import Sorteio from "./Sorteio";

const RouterApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/presentes">
          <Presente />
        </Route>
        <Route path="/sorteio">
          <Sorteio />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
}

export default RouterApp;
