import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import AuthProvider from "./contexts/AuthContext.jsx";
import BarrelProvider from "./contexts/BarrelContext.jsx";
import CustomersProvider from "./contexts/CustomersContext.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0055FF",
    },
    secondary: {
      main: "#666666",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <BarrelProvider>
          <CustomersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CustomersProvider>
        </BarrelProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
