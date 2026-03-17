import { useState } from "react";
import SidebarButton from "../components/sidebar/SidebarButton.tsx";
import {Archive, Book, Calendar, LogOut, Mail, Settings} from "lucide-react";

const buttonsMain = [
    { label: "Catálogo", icon: Archive },
    { label: "Reservas", icon: Calendar },
    { label: "Cadastro", icon: Book },
];

const buttonsEnd = [
    { label: "Configurações", icon: Settings },
    { label: "Suporte", icon: Mail },
];

function Sidebar() {
    const [selected, setSelected] = useState("Catálogo");

    return (
        <div className="hidden xl:flex flex-col bg-second w-auto h-full p-6 rounded-l-3xl shadow-xl z-20 overflow-x-hidden">
            <button className="inline w-70 cursor-pointer">
                <img src="../../public/logo_black.webp" alt="logo" className="h-24" />
            </button>
            <div className="flex flex-col gap-6 mt-15">
                {buttonsMain.map(({ label, icon }) => (
                    <SidebarButton
                        key={label}
                        label={label}
                        icon={icon}
                        isSelected={selected === label}
                        onClick={() => setSelected(label)}
                    />
                ))}
            </div>

            <div className="flex flex-col mt-auto gap-5">
                <div className="w-full h-px bg-[#F1F1F1]" />
                {buttonsEnd.map(({ label, icon }) => (
                    <SidebarButton
                        key={label}
                        label={label}
                        icon={icon}
                        isSelected={selected === label}
                        onClick={() => setSelected(label)}
                    />
                ))}
                <SidebarButton label={"Sair"} icon={LogOut} isSelected={false} />
            </div>
        </div>
    );
}

export default Sidebar;