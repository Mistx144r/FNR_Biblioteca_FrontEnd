import clsx from "clsx";
import type { sideBarButtonType } from "@/types/sidebarButtonType.ts";

function SidebarButton({ label, icon: Icon, isSelected, onClick }: sideBarButtonType) {
    return (
        <div onClick={onClick} className="flex items-center gap-3 cursor-pointer">
            <button className={clsx(
                "flex w-10 h-10 rounded-xl items-center justify-center cursor-pointer hover:scale-110 transition-all",
                isSelected ? "bg-five" : "bg-third"
            )}>
                <Icon className={clsx("transition-colors", isSelected ? "text-white" : "text-four")} />
            </button>
            <h4 className={clsx(
                "text-xl transition-all",
                isSelected ? "font-bold text-six" : "font-light text-four"
            )}>
                {label}
            </h4>
        </div>
    );
}

export default SidebarButton;