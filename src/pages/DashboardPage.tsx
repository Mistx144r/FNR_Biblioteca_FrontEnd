import Sidebar from "../layouts/Sidebar.tsx";
import Header from "../layouts/Header.tsx";

function DashboardPage() {
    return (
        <>
            <div className="flex bg-main h-screen w-screen font-display p-5 justify-start select-none">
                <Sidebar />
                <div className="flex flex-1 flex-col w-full">
                    <Header />
                </div>
            </div>
        </>
    );
}

export default DashboardPage;