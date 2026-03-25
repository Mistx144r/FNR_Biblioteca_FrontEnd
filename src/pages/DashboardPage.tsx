import { Route, Routes, useLocation } from "react-router-dom";
import { MobileView } from "react-device-detect";

import Sidebar from "../layouts/desktop/Sidebar.tsx";
import Header from "../layouts/Header.tsx";
import BookResumeSide from "../layouts/desktop/BookResumeSide.tsx";

import CatalogPage from "./CatalogPage.tsx";
import BookPage from "./BookPage.tsx";

import {useSidebarContext} from "@/contexts/SidebarBookContext.tsx";
import RegistrationPage from "@/pages/RegistrationPage.tsx";
import BookResumeMobile from "@/layouts/mobile/BookResumeMobile.tsx";

function DashboardPage() {
    const { sidebarStatus } = useSidebarContext();
    const location = useLocation();

    return (
        <div className="flex bg-main h-screen w-screen font-display p-0 md:p-5 justify-start select-none overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col w-full min-h-0">
                <Header />
                <div className="flex flex-1 w-full min-h-0">
                    <div className="flex flex-1 w-full min-h-0 overflow-y-auto desktop:px-3 desktop:pt-3">
                        <Routes>
                            <Route path="/" element={<CatalogPage />} />
                            <Route path="/book/:bookId" element={<BookPage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                        </Routes>
                    </div>
                    {(sidebarStatus && location.pathname != "/register") &&(
                        <BookResumeSide />
                    )}
                </div>
            </div>
            <MobileView>
                {sidebarStatus && (
                    <BookResumeMobile />
                )}
            </MobileView>
        </div>
    );
}

export default DashboardPage;
