import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import RouteComponents from "./routes/index";
import { store } from "./store/index";
import i18n from "./i18n";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <RouteComponents />
          <CssBaseline />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
