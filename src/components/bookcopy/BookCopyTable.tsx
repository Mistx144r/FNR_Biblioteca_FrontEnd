import BookCopyCard, { type BookCopyCardProps } from "@/components/bookcopy/BookCopyCard.tsx";

type BookCopyTableProps = {
    data: BookCopyCardProps[] | undefined;
};

function BookCopyTable({ data }: BookCopyTableProps) {
    return (
        <table className="table-auto w-full text-sm font-display items-center">
            <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-black/5">
                <th className="px-4 py-3 font-medium">Nº</th>
                <th className="hidden px-4 py-3 font-medium desktopHDL:table-cell">Descrição</th>
                <th className="hidden px-4 py-3 font-medium desktopHDL:table-cell">Estante</th>
                <th className="hidden px-4 py-3 font-medium desktopHDL:table-cell">Setor</th>
                <th className="hidden px-4 py-3 font-medium xs:table-cell">Instituição</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium text-center md:text-left">Estado</th>
            </tr>
            </thead>

            <tbody>
            {data?.map((copy, index) => (
                <BookCopyCard key={copy.id_book_copy} {...copy} index={index + 1} />
            ))}
            </tbody>
        </table>
    );
}

export default BookCopyTable;