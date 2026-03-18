import Sidebar from "../layouts/Sidebar.tsx";
import Header from "../layouts/Header.tsx";
import BookResumeSide from "../layouts/BookResumeSide.tsx";
import CatalogPage from "./CatalogPage.tsx";

function DashboardPage() {
    return (
        <div className="flex bg-main h-screen w-screen font-display p-0 md:p-5 justify-start select-none overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col w-full min-h-0">
                <Header />
                <div className="flex flex-1 w-full min-h-0">
                    <div className="flex flex-1 w-full px-3 pt-3 min-h-0 overflow-hidden">
                        <CatalogPage />
                    </div>
                    <BookResumeSide />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
