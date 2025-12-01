import type { MenuItem } from "@/app/components/navbar/interfaces/menu-item/MenuItem.interface";

export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    menu: MenuItem[];
}