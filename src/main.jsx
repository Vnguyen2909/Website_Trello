import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { store } from "~/redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
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
  </Provider>,
);
