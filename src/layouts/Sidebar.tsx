import { useState } from "react";
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

const buttonsMain = [
  { label: "Catálogo", icon: Archive },
  { label: "Reservas", icon: Calendar },
  { label: "Cadastro", icon: Book },
  { label: "Dashboard", icon: LayoutDashboard },
];

const buttonsEnd = [
  { label: "Configurações", icon: Settings },
  { label: "Suporte", icon: Mail },
];

function Sidebar() {
  const [selected, setSelected] = useState("Catálogo");

  return (
    <div className="hidden flex-col bg-second w-auto h-full p-6 rounded-l-3xl shadow-xl z-20 desktop:flex">
      {/* Side Bar Logo */}
      <button className="inline w-70 cursor-pointer">
        <img src="../../public/LogoBlack.webp" alt="logo" className="h-24" />
      </button>

      {/* Conjunto de botões das abas principais */}
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

      {/* Conjunto de botões das abas secundárias */}
      <div className="flex flex-col mt-auto gap-5">
        <hr className="w-full h-px text-[#F1F1F1]" />

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
