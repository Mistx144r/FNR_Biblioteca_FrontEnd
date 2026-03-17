import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./layout/Sidebar.tsx";
import Header from "./layout/Header.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex bg-main h-screen w-screen font-display p-5 justify-start select-none">
        <Sidebar />
        <div className="flex flex-1 flex-col w-full">
            <Header />
        </div>
    </div>
  </StrictMode>,
);
