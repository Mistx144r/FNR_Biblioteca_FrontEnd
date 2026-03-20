import {
    Archive,
    Book,
    Calendar,
    LayoutDashboard,
    LogOut,
    Mail,
    Settings,
} from "lucide-react";
import SidebarButton from "../components/sidebar/SidebarButton.tsx";
import { useNavigate, useLocation } from "react-router-dom";

const buttonsMain = [
    { label: "Catálogo", icon: Archive, path: "/" },
    { label: "Reservas", icon: Calendar, path: "/reservations" },
    { label: "Cadastro", icon: Book, path: "/register" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
];

const buttonsEnd = [
    { label: "Configurações", icon: Settings, path: "/settings" },
    { label: "Suporte", icon: Mail, path: "/support" },
];

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="hidden flex-col bg-second w-auto h-full p-6 rounded-l-3xl shadow-xl z-20 desktop:flex">
            <button className="inline w-70 cursor-pointer" onClick={() => navigate("/")}>
                <img src="../../public/LogoBlack.webp" alt="logo" className="h-24" />
            </button>

            <div className="flex flex-col gap-6 mt-15">
                {buttonsMain.map(({ label, icon, path }) => (
                    <SidebarButton
                        key={label}
                        label={label}
                        icon={icon}
                        isSelected={location.pathname === path}
                        onClick={() => navigate(path)}
                    />
                ))}
            </div>

            <div className="flex flex-col mt-auto gap-5">
                <hr className="w-full h-px text-[#F1F1F1]" />

                {buttonsEnd.map(({ label, icon, path }) => (
                    <SidebarButton
                        key={label}
                        label={label}
                        icon={icon}
                        isSelected={location.pathname === path}
                        onClick={() => navigate(path)}
                    />
                ))}
                <SidebarButton label={"Sair"} icon={LogOut} isSelected={false} />
            </div>
        </div>
    );
}

export default Sidebar;