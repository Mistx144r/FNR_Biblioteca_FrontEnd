import { Bell, ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";

function Header() {
    const navigateHistory = window.history;

    function gotoPreviousPage() {
        navigateHistory.back();
    }

    function gotoNextPage() {
        navigateHistory.forward()
    }

  return (
    <div className="flex flex-col bg-second w-auto h-auto py-3 px-5 md:rounded-t-3xl xl:rounded-tr-3xl xl:rounded-t-none overflow-x-hidden text-[#7F838C] gap-5 items-end">
        <div className="flex mr-auto mt-1 gap-3 items-center">
            <button onClick={gotoPreviousPage} className="cursor-pointer hover:scale-110 transition-all">
                <ChevronLeft className="size-7" />
            </button>

            <button onClick={gotoNextPage} className="cursor-pointer hover:scale-110 transition-all">
                <ChevronRight className="size-7" />
            </button>
        </div>
        <div className="flex items-end w-full gap-5">
            {/* Menu hambúrguer para telas menores */}
            <button className="inline xl:hidden mb-auto mt-auto md:mb-2 md:mt-0 size-8 cursor-pointer active:scale-90 transition-transform">
                <Menu />
            </button>

            {/* Barra de pesquisa em telas maiores */}
            <div className="hidden md:flex bg-[#F1F5FF] h-12 rounded-xl items-center px-3 w-110 gap-3">
                <Search />
                <input id="SearchBar" placeholder="Pesquise..." className="w-full h-full outline-0" />
            </div>

            {/* Barra de pesquisa em telas menores */}
            <div className="flex flex-1 md:hidden bg-[#F1F5FF] h-12 rounded-xl items-center mt-auto mb-auto px-3 w-full gap-3">
                <input id="SearchBarMobile" placeholder="Pesquisar..." className="w-full h-full outline-0" />
            </div>

            {/* Notificações e User */}
            <div className="flex gap-6 items-center justify-end ml-auto mb-auto mt-auto md:mb-2 md:mt-0">
                <Bell className="hidden md:inline hover:scale-110 cursor-pointer transition-all" />
                <div className="flex items-center gap-3">
                    <img
                        src="../../public/defaultuser.webp"
                        className="size-8 rounded-full"
                        alt="user_icon"
                    />
                    <h3 className="hidden lg:inline truncate">Nova Roma Faculdade</h3>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header;
