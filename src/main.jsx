import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
//Cau hinh Redux Store
import { store } from "~/redux/store";
import { Provider } from "react-redux";
//Cau hinh react-router-dom voi BrowserRouter
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    basename="/"
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            dialogProps: {
              disableRestoreFocus: true,
              disableEnforceFocus: true,
              keepMounted: true,
            },
            cancellationButtonProps: { color: "inherit" },
            confirmationButtonProps: { color: "success", variant: "outlined" },
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>,
);
