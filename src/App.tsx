import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./containers/Theme";
import store from "./redux/store";
import Template from "./containers/Template";
import { CookiesProvider } from "react-cookie";
import useAuth from "./hooks/useAuth";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Theme>
          <CssBaseline />
          <Router>
            <Template />
          </Router>
        </Theme>
      </CookiesProvider>
    </Provider>
  );
};

export default App;
