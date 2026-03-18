import { Route, Routes } from "react-router-dom";

import Sidebar from "../layouts/Sidebar.tsx";
import Header from "../layouts/Header.tsx";
import BookResumeSide from "../layouts/BookResumeSide.tsx";

import CatalogPage from "./CatalogPage.tsx";
import PageNotFound from "@/pages/PageNotFound.tsx";

import {useSidebarContext} from "@/contexts/SidebarBookContext.tsx";

function DashboardPage() {
    const { sidebarStatus } = useSidebarContext();

    return (
        <div className="flex bg-main h-screen w-screen font-display p-0 md:p-5 justify-start select-none overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col w-full min-h-0">
                <Header />
                <div className="flex flex-1 w-full min-h-0">
                    <div className="flex flex-1 w-full min-h-0 overflow-y-auto desktop:px-3 desktop:pt-3">
                        <Routes>
                            <Route path="/" element={<CatalogPage />} />
                            <Route path="/not" element={<PageNotFound />} />
                        </Routes>
                    </div>
                    {sidebarStatus &&(
                        <BookResumeSide />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
