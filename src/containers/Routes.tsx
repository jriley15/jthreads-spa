import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Namespaces from "../pages/Namespaces";
import CreateNamespace from "../pages/CreateNamespace";
import ViewNamespace from "../pages/ViewNamespace";
import ViewThread from "../pages/ViewThread";
import Profile from "../pages/Profile";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/namespaces" component={Namespaces} />
      <Route path="/namespaces/create" component={CreateNamespace} />
      <Route
        path="/namespaces/:namespaceId/setup"
        component={ViewNamespace}
        props={{ init: "setup" }}
      />
      <Route path="/namespaces/:namespaceId/:threadId" component={ViewThread} />

      <Route path="/namespaces/:namespaceId" component={ViewNamespace} />
    </Switch>
  );
};

export default Routes;
