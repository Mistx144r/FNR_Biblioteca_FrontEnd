import { createContext, useContext, useState, type ReactNode } from "react";
import type { Book } from "@/schemas/bookDataSchemas.ts";

interface SidebarBookContextType {
    currentBook: Book | undefined;
    setCurrentBook: (book: Book) => void;
    sidebarStatus: boolean;
    setSidebarStatus: (boolean: boolean) => void;
}

const SidebarBookContext = createContext<SidebarBookContextType | null>(null);

export function BookSidebarProvider({ children }: { children: ReactNode }) {
    const [currentBook, setCurrentBook] = useState<Book>();
    const [sidebarStatus, setSidebarStatus] = useState(false);

    return (
        <SidebarBookContext.Provider value={{ currentBook, setCurrentBook, sidebarStatus, setSidebarStatus }}>
            {children}
        </SidebarBookContext.Provider>
    );
}

export const useSidebarContext = () => {
    const context = useContext(SidebarBookContext);

    if (!context) {
        throw new Error("useSidebarContext deve ser usado dentro de BookSidebarProvider");
    }

    return context;
};