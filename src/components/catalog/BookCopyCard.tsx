import clsx from "clsx";

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
};

function colorChooser(state: string): string {
    switch (state) {
        case "DISPONIVEL":
            return "bg-green-100 text-green-700";
        case "RESERVADO":
            return "bg-yellow-100 text-yellow-700";
        case "EMPRESTADO":
            return "bg-blue-100 text-blue-700";
        case "INDISPONIVEL":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

// Centralizar esses types dps nos tipos corretos.

function BookCopyCard({ index, description, bookcase, institution, is_virtual, state, is_consult }: BookCopyCardProps) {
    return (
        <tr className="border-b border-black/5 hover:bg-black/5 transition-colors">
            <td className="px-4 py-3 font-black text-gray-700">{index}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{description}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{bookcase.name}</td>

            <td className="hidden px-4 py-3 text-gray-500 desktopHDL:table-cell">{bookcase.sector.name}</td>

            <td className="hidden px-4 py-3 text-gray-500 xs:table-cell">{institution.name}</td>

            <td className="px-4 py-3 text-gray-500">{is_virtual ? "Virtual" : "Físico"}</td>

            <td className="px-4 py-3">
                <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium", colorChooser(state))}>{state}</span>
            </td>

            {/* Possivelmente mudar a maneira de mostrar */}
            <td className="px-4 py-3">
                <span title={is_consult ? "Sim" : "Não"} className={clsx("flex h-4 w-4 rounded-full justify-self-center", is_consult ? "bg-green-300" : "bg-red-300")}></span>
            </td>
        </tr>
    );
}

export default BookCopyCard;