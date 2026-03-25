import {useSidebarContext} from "@/contexts/SidebarBookContext.tsx";
import {useNavigate} from "react-router-dom";
import ImageWithPlaceholder from "@/components/loading/ImageWithPlaceholder.tsx";
import NoCover from "../../../public/NoCover.webp";
import {X} from "lucide-react";

function BookResumeMobile() {
    const { currentBook, setSidebarStatus } = useSidebarContext();
    const navigate = useNavigate();

    function closeSidebar() {
        setSidebarStatus(false);
    }

    function handleGoToBookPage() {
        navigate(`/book/${currentBook?.id_book}`);
        setSidebarStatus(false);
    }

    if (!currentBook) {
        return (
            <div className="bg-six absolute top-0 w-screen h-dvh text-white p-5">
                <div className="flex justify-end mb-10">
                    <X className="cursor-pointer size-10" onClick={closeSidebar}/>
                </div>
                <h1>No Book</h1>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-b from-five to-six fixed top-0 left-0 w-screen h-dvh text-white p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden z-50 animate-slide-up">
            <div className="flex justify-end mb-10">
                <X className="cursor-pointer size-10" onClick={closeSidebar}/>
            </div>
            <div className="flex flex-col w-full h-auto items-center gap-5">
                <button onClick={handleGoToBookPage} className="cursor-pointer">
                    <ImageWithPlaceholder key={currentBook.bookcover} src={currentBook.bookcover as string} sizeY={415} sizeX={314} fallbackSrc={NoCover} alt={"Bookcover"} ref={true}/>
                </button>

                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-[1.75rem] font-bold text-wrap text-center">{currentBook.name}</h1>
                    <div className="flex w-full gap-3 justify-center overflow-x-hidden text-center">
                        {currentBook.authors.map(author => (
                            <a key={author.id_author} className="font-extralight hover:underline cursor-pointer">{author.name}</a>
                        ))}
                    </div>
                </div>

                <div className="flex justify-evenly text-sm gap-3 ml-auto mr-auto">
                    <div className="flex flex-col justify-center items-center font-bold">
                        <h3>Páginas:</h3>
                        <h3 className="font-extralight">{currentBook.pages}</h3>
                    </div>

                    <hr className="bg-white w-px h-auto rounded-full"/>

                    <div className="flex flex-col justify-center items-center font-bold">
                        <h3>Categoria:</h3>
                        <h3 key={currentBook.category.id_category} className="font-extralight hover:underline cursor-pointer">{currentBook.category.name}</h3>
                    </div>

                    <hr className="bg-white w-px h-auto rounded-full"/>

                    <div className="flex flex-col justify-center items-center font-bold">
                        <h3>Edição:</h3>
                        <h3 className="font-extralight">{currentBook.edition}ª</h3>
                    </div>
                </div>

                <div className="flex flex-col font-bold text-center">
                    <h3>Resumo:</h3>
                    <p className="font-extralight">{currentBook.description}</p>
                </div>

                <button onClick={handleGoToBookPage} className="bg-third text-black px-20 p-4 mt-12 rounded-full cursor-pointer ml-auto mr-auto hover:brightness-110 active:brightness-95 transition-all">
                    <h4>Ver Exemplares</h4>
                </button>
            </div>
        </div>
    );
}

export default BookResumeMobile;