import type { ElementType } from "react";

export interface sideBarButtonType {
    label: string
    icon: ElementType
    isSelected: boolean
    onClick?: () => void
}