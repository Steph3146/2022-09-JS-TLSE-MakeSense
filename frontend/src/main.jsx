import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/Language";
import { FolderProvider } from "./contexts/Folder";
import { AuthProvider } from "./contexts/useAuth";
import App from "./App";
import "./index.css";

const routes = ReactDOM.createRoot(document.getElementById("root"));

routes.render(
  <React.StrictMode>
    <LanguageProvider>
      <FolderProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </FolderProvider>
    </LanguageProvider>
  </React.StrictMode>
);
