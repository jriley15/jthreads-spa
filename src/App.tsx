import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./containers/Theme";
import store from "./redux/store";
import Template from "./containers/Template";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <Router>
          <Template />
        </Router>
      </Theme>
    </Provider>
  );
};

export default App;
