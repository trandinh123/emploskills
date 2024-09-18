import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import "./index.css";
import {Toaster} from "./components/ui/toaster.js";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>
);
