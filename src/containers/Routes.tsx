import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Namespaces from "../pages/Namespaces";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/authenticate" component={Home} />
      <Route exact path="/namespaces" component={Namespaces} />
    </Switch>
  );
};

export default Routes;
