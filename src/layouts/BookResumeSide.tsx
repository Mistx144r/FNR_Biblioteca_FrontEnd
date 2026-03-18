import { useSidebarContext } from "@/contexts/SidebarBookContext.tsx";
import {X} from "lucide-react";
import NoCover from "../../public/NoCover.webp"
import ImageWithPlaceholder from "@/components/loading/ImageWithPlaceholder.tsx";

function BookResumeSide() {
    const { currentBook, setSidebarStatus } = useSidebarContext();

    function closeSidebar() {
        setSidebarStatus(false);
    }

    return (
        <div className="hidden flex-col p-7 bg-six w-92.5 h-full ml-auto gap-4 text-white rounded-br-3xl overflow-y-auto lg:flex [&::-webkit-scrollbar]:hidden">
            {!currentBook && (
              <h1>No Book</h1>
            )}

            {currentBook && (
                <>
                    <div className="flex justify-end">
                        <X className="cursor-pointer size-8" onClick={closeSidebar}/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <ImageWithPlaceholder key={currentBook?.bookcover} src={currentBook?.bookcover} sizeY={415} sizeX={314} fallbackSrc={NoCover} alt={"Bookcover"} ref={true}/>

                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-[1.75rem] font-bold text-wrap text-center">{currentBook?.name}</h1>
                            <div className="flex w-full gap-3 justify-center overflow-x-hidden text-center">
                                {currentBook?.authors.map(author => (
                                    <a key={author.id_author} className="font-extralight hover:underline cursor-pointer">{author.name}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-evenly text-sm gap-3">
                        <div className="flex flex-col justify-center items-center font-bold">
                            <h3>Páginas:</h3>
                            <h3 className="font-extralight">{currentBook?.pages}</h3>
                        </div>

                        <hr className="bg-white w-px h-auto rounded-full"/>

                        <div className="flex flex-col justify-center items-center font-bold">
                            <h3>Categoria:</h3>
                            <h3 key={currentBook?.category.id_category} className="font-extralight hover:underline cursor-pointer">{currentBook?.category.name}</h3>
                        </div>

                        <hr className="bg-white w-px h-auto rounded-full"/>

                        <div className="flex flex-col justify-center items-center font-bold">
                            <h3>Edição:</h3>
                            <h3 className="font-extralight">{currentBook?.edition}ª</h3>
                        </div>
                    </div>

                    <div className="flex flex-col font-bold">
                        <h3>Resumo: </h3>
                        <p className="font-extralight">
                            {currentBook?.description}
                        </p>
                    </div>

                    <button className="bg-five p-4 rounded-full mt-12 cursor-pointer hover:brightness-110 active:brightness-95 transition-all">
                        <h4>Ver Exemplares</h4>
                    </button>
                </>
            )}
        </div>
    );
}

export default BookResumeSide;