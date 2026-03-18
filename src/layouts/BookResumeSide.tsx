import {useEffect, useRef, useState} from "react";
import {X} from "lucide-react";
import VanillaTilt from "vanilla-tilt";

function BookResumeSide() {
    const tiltRef = useRef(null);
    const [bookData] = useState({
        name: "O Mítico Homem-Mês",
        authors: ["Frederick P. Brooks Jr."],
        bookcoverURL: "https://m.media-amazon.com/images/I/51Rpep4MPnL._SY445_SX342_ML2_.jpg",
        category: "Tecnologia",
        pages: 123,
        edicao: 4,
        resumo: ""
    })

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 10,
                speed: 100,
                glare: true,
                "max-glare": 0.1,
            });
        }
    }, []);

    return (
        <div className="hidden flex-col p-7 bg-six w-92.5 h-full ml-auto gap-4 text-white rounded-br-3xl overflow-y-auto lg:flex [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-end">
                <X className="cursor-pointer size-8"/>
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
                <img src={bookData.bookcoverURL} ref={tiltRef} className="rounded-[28px] shadow-xl" alt="Bookcover"/>

                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-[1.75rem] font-bold">{bookData.name}</h1>
                    <div className="flex w-full gap-3 justify-center overflow-x-hidden">
                        <a href="#" className="text-sm font-extralight hover:underline">{bookData.authors[0]}</a>
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-evenly text-sm gap-3">
                <div className="flex flex-col justify-center items-center font-bold">
                    <h3>Páginas:</h3>
                    <h3 className="font-extralight">{bookData.pages}</h3>
                </div>

                <hr className="bg-white w-px h-auto rounded-full"/>

                <div className="flex flex-col justify-center items-center font-bold">
                    <h3>Categoria:</h3>
                    <h3 className="font-extralight">{bookData.category}</h3>
                </div>

                <hr className="bg-white w-px h-auto rounded-full"/>

                <div className="flex flex-col justify-center items-center font-bold">
                    <h3>Edição:</h3>
                    <h3 className="font-extralight">{bookData.edicao}ª</h3>
                </div>
            </div>

            <div className="flex flex-col font-bold">
                <h3>Resumo: </h3>
                <p className="font-extralight">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    Quisque faucibus ex sapien vitae pellentesque sem placerat.
                    In id cursus mi pretium tellus duis convallis.
                    Tempus leo eu aenean sed diam urna tempor.
                    Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
                    Iaculis massa nisl malesuada lacinia integer nunc posuere.
                    Ut hendrerit semper vel class aptent taciti sociosqu.
                    Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
            </div>

            <button className="bg-five p-4 rounded-full mt-12 cursor-pointer hover:brightness-110 active:brightness-95 transition-all">
                <h4>Ver Exemplares</h4>
            </button>
        </div>
    );
}

export default BookResumeSide;