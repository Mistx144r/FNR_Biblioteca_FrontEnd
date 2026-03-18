import { ChevronsRight } from "lucide-react";
import NoCover from "../../../public/NoCover.webp"

//----------------------------
// Components
//----------------------------
import ImageWithPlaceholder from "@/components/loading/ImageWithPlaceholder.tsx";

//----------------------------
// Data Schemas
//----------------------------
import type { Book } from "@/schemas/bookDataSchemas.ts";
import {useSidebarContext} from "@/contexts/SidebarBookContext.tsx";

type Props = {
    book: Book;
};

function CatalogCard({ book }: Props) {
    const { setCurrentBook, setSidebarStatus } = useSidebarContext();

    function handleClickResume() {
        setCurrentBook(book);
        setSidebarStatus(true);
    }

    return (
        <div className="flex flex-col bg-[#FAFAFA] gap-2 w-48 h-94 rounded-xl p-3 overflow-x-hidden">
            {/* Imagem do album / Botão para abrir resumo */}
            <button className="cursor-pointer hover:scale-[103%] transition-all" onClick={handleClickResume}>
                <ImageWithPlaceholder src={book.bookcover} alt={"Bookcover"} sizeX={"48"} sizeY={"240px"} fallbackSrc={NoCover} ref={false}/>
            </button>

            {/* Nome do livro / Nome dos autores */}
            <div className="overflow-x-hidden">
                <h1 className="font-bold truncate w-auto">{book.name}</h1>

                <div className="flex truncate gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {book.authors.map((author) => (
                        <h4 key={author.id_author} className="cursor-pointer font-light text-xs hover:underline">{author.name}</h4>
                    ))}
                </div>
            </div>

            {/* Botão ver exemplares */}
            <button className="flex bg-five text-white justify-center items-center rounded-xl mt-3 p-2 cursor-pointer hover:brightness-110 active:brightness-90 transition-all">
                <ChevronsRight />
                Ver Exemplares
            </button>
        </div>
    );
}

export default CatalogCard;