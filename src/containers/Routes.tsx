import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Namespaces from "../pages/Namespaces";
import CreateNamespace from "../pages/CreateNamespace";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/authenticate" component={Home} />

      <Route exact path="/namespaces" component={Namespaces} />
      <Route path="/namespaces/create" component={CreateNamespace} />
    </Switch>
  );
};

export default Routes;
