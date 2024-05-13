import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/search.jsx";
import { PlanProvider } from "./context/plan.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AttractionProvider } from "./context/attractions.jsx";
import { SellerProvider } from "./context/sellers.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ZoneProvider } from "./context/zones.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <SearchProvider>
        <PlanProvider>
          <ZoneProvider>
            <AttractionProvider>
              <SellerProvider>
                <BrowserRouter>
                  <App />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition:Bounce
                  />
                </BrowserRouter>
              </SellerProvider>
            </AttractionProvider>
          </ZoneProvider>
        </PlanProvider>
      </SearchProvider>
    </AuthProvider>
  </ThemeProvider>
);
