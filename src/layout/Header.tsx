import {Bell, CircleUser, Menu, Search} from "lucide-react";

function Header() {
    return (
        <div className="flex bg-second w-auto h-26.25 py-3 px-8 rounded-t-3xl xl:rounded-tr-3xl xl:rounded-t-none overflow-x-hidden text-[#7F838C] gap-5 items-end">
            <Menu className="inline xl:hidden mb-auto mt-auto md:mb-2 md:mt-0 size-8" />

            <div className="hidden md:flex bg-[#F1F5FF] h-12 rounded-xl items-center px-3 w-110 gap-3">
                <Search />
                <input
                    placeholder="Pesquisar..."
                    className="w-full h-full outline-0"
                />
            </div>

            <div className="flex flex-1 md:hidden bg-[#F1F5FF] h-12 rounded-xl items-center mt-auto mb-auto px-3 w-full gap-3">
                <input
                    placeholder="Pesquisar..."
                    className="w-full h-full outline-0"
                />
            </div>

            <div className="flex gap-6 items-center justify-end ml-auto mb-auto mt-auto md:mb-2 md:mt-0">
                <Bell className="hidden md:inline hover:scale-110 cursor-pointer transition-all" />
                <div className="flex items-center gap-3">
                    <CircleUser className="size-8"/>
                    <h3 className="hidden md:inline">Username</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;