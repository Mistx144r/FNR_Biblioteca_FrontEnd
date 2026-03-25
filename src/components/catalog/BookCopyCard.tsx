import clsx from "clsx";
import axios from "axios";
import { ExternalLink, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const serverIP: string = import.meta.env.VITE_SERVER_IP;

type Sector = {
    id_sector: string;
    name: string;
    letter: string;
    fk_category_id: string;
};

type Bookcase = {
    id_bookcase: string;
    name: string;
    fk_sector_id: string;
    sector: Sector;
};

type Institution = {
    id_institution: string;
    name: string;
};

export type BookCopyCardProps = {
    index: number;
    id_book_copy: string;
    fk_book_id: string;
    fk_bookcase_id: string;
    fk_institution_id: string;
    is_consult: boolean;
    state: string;
    is_virtual: boolean;
    description: string;
    institution: Institution;
    bookcase: Bookcase;
    editing: boolean;
};

function colorChooser(state: string): string {
    switch (state) {
        case "DISPONIVEL":   return "bg-green-100 text-green-700";
        case "RESERVADO":    return "bg-yellow-100 text-yellow-700";
        case "EMPRESTADO":   return "bg-blue-100 text-blue-700";
        case "INDISPONIVEL": return "bg-red-100 text-red-700";
        default:             return "bg-gray-100 text-gray-700";
    }
}

function BookCopyCard({ index, id_book_copy, fk_book_id, description, bookcase, institution, is_virtual, state, editing }: BookCopyCardProps) {
    const queryClient = useQueryClient();
    const [visible, setVisible] = useState(true);

    const { mutate: deleteCopy, isPending: isDeleting } = useMutation({
        mutationFn: () =>
            axios.delete(`${serverIP}/v1/bookcopies/${id_book_copy}`, { withCredentials: true }),
        onSuccess: () => {
            setVisible(false);
            queryClient.invalidateQueries({ queryKey: [`copies-${fk_book_id}`] });
        },
    });

    function deleteBookCopy() {
        deleteCopy();
    }

    if (!visible) return null;

    return (
        <tr className="border-b border-black/5 hover:bg-black/5 cursor-pointer active:scale-[98%] desktop:active:scale-none desktopHDL:cursor-default transition-all">
            <td className="px-4 py-3 font-black text-gray-700">{index}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{description ? description : "Nenhuma descrição"}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{bookcase.name}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{bookcase.sector.name}</td>

            <td className="hidden px-4 py-3 text-gray-500 xs:table-cell">{institution.name}</td>

            <td className="px-4 py-3 text-gray-500">{is_virtual ? "Virtual" : "Físico"}</td>

            <td className="px-4 py-3 text-gray-500">
                <div className="flex justify-center text-center md:justify-start">
                    <span className={clsx("hidden px-2 py-0.5 rounded-full text-xs font-medium md:inline-flex", colorChooser(state))}>{state}</span>
                    <span className={clsx("flex p-3 w-4 h-4 rounded-full md:hidden items-center justify-center", colorChooser(state))}>{state[0]}</span>
                </div>
            </td>

            <td>
                <div className="flex items-center gap-3">
                    <button className="text-four desktopHDL:hidden cursor-pointer">
                        <ExternalLink />
                    </button>

                    {editing && (
                        <>
                            <button className="text-orange-300 cursor-pointer">
                                <SquarePen className="size-6" />
                            </button>

                            <button
                                onClick={deleteBookCopy}
                                disabled={isDeleting}
                                className="text-red-300 cursor-pointer disabled:opacity-40"
                            >
                                <Trash className="size-6" />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default BookCopyCard;