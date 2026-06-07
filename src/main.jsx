import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
//Cau hinh Redux Store
import { store } from "~/redux/store";
import { Provider } from "react-redux";
//Cau hinh react-router-dom voi BrowserRouter
import { BrowserRouter } from "react-router-dom";
//Cau hinh Redux-Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);

//Ky thuat inject store
import { injectStore } from "~/utils/authorizeAxios";
injectStore(store);

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    basename="/"
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
              confirmationButtonProps: {
                color: "success",
                variant: "outlined",
              },
            }}
          >
            <GlobalStyles
              styles={{
                a: { textDecoration: "none" },
              }}
            />
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
