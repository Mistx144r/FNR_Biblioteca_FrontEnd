import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex bg-slate-800 h-screen w-screen"></div>
  </StrictMode>,
);
