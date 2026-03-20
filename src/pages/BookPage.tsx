import axios, {type AxiosError} from "axios";
import { Barcode, BookOpen, LanguagesIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import NoCover from "../../public/NoCover.webp";

import { Spinner } from "@/components/ui/spinner.tsx";
import ImageWithPlaceholder from "@/components/loading/ImageWithPlaceholder.tsx";
import BookCopyTable from "@/components/catalog/BookCopyTable.tsx";
import BookPageTextSkeleton from "@/components/loading/BookPageTextSkeleton.tsx";

import type { Book } from "@/schemas/bookDataSchemas.ts";
import type { BookCopyCardProps } from "@/components/catalog/BookCopyCard.tsx";
import clsx from "clsx";

// Tipagem temporaria
type Subcategories = {
    subCategories: {
        id_sub_category: number,
        name: string
    }[]
}

const serverIP: string = import.meta.env.VITE_SERVER_IP;

function BookPage() {
    const { bookId } = useParams();

    const {data: book, error: bookError, isLoading: bookLoading} = useQuery<Book & Subcategories, AxiosError>({
        queryKey: [`book-${bookId}`],
        queryFn: () => axios.get(`${serverIP}/v1/books/${bookId}/everything`).then((res) => res.data)
    });

    const {data: copies, error: copiesError, isLoading: copiesLoading} = useQuery<BookCopyCardProps[], AxiosError>({
        queryKey: [`copies-${bookId}`],
        queryFn: () => axios.get(`${serverIP}/v1/books/${bookId}/bookcopies/everything`).then((res) => res.data)
    });

    if (bookError) {
        return (
            <div className="flex flex-col bg-white w-full h-full gap-5 p-5 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
                <h1>Erro</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-white w-full h-full gap-5 p-5 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
            <div className="flex flex-col-reverse justify-between gap-5 tablet:flex-row-reverse desktop:flex-row">
                {bookLoading && (
                    <BookPageTextSkeleton />
                )}

                {!bookLoading && (
                    <div className="flex flex-1 w-full flex-col overflow-x-auto">
                        <h1 className="text-4xl font-bold">{book?.name}</h1>

                        <div className="flex text-sm font-light gap-2">
                            <h3 className="cursor-pointer hover:underline">{book?.authors[0].name}</h3>
                            <p>•</p>
                            <h3 className="cursor-pointer hover:underline">{book?.category.name}</h3>
                            <p>•</p>
                            <h3>{book?.edition}ª Edição</h3>
                        </div>

                        <div className="flex flex-col h-36 mt-5 font-light text-wrap">
                            <h4 className="font-bold">Resumo:</h4>
                            <p className="text-left overflow-y-auto">
                                {book?.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-px">
                            <h3 className="font-bold text-sm">Sub-Categorias: </h3>
                            <div className="flex gap-1 text-sm">
                                {(!book || book.subCategories.length <= 0) && (
                                    <h1 className="font-light">Nenhuma sub-categoria encontrada.</h1>
                                )}

                                {book?.subCategories.map((subcategory) => (
                                    <button className="w-auto h-auto text-white bg-five p-1 px-2 rounded-full">
                                        {subcategory.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <div className="flex text-sm gap-1 items-center">
                                <Barcode className="size-3" />
                                <h3 className="font-bold">ISBN:</h3>
                                <h3>{book?.isbn}</h3>
                            </div>

                            <div className="flex text-sm gap-1 items-center">
                                <LanguagesIcon className="size-3" />
                                <h3 className="font-bold">Linguagem:</h3>
                                <h3>{book?.language}</h3>
                            </div>

                            <div className="flex text-sm gap-1 items-center">
                                <BookOpen className="size-3" />
                                <h3 className="font-bold">Páginas:</h3>
                                <h3>{book?.pages}</h3>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-71 h-95 desktopHDL:flex">
                    <ImageWithPlaceholder
                        key={book?.bookcover}
                        src={book?.bookcover as string}
                        fallbackSrc={NoCover}
                        alt={"Bookcover"}
                        ref={true}
                    />
                </div>
            </div>

            <div className="flex flex-col w-full h-auto gap-3">
                <h2 className="font-semibold text-base">Exemplares: </h2>
                <div className={clsx("flex flex-col bg-third w-full h-auto p-3 gap-2 rounded-b-2xl", copiesLoading ? "justify-center items-center" : "")}>
                    {copiesLoading && (
                        <Spinner className="size-8 text-four" />
                    )}

                    {!copiesLoading && (
                        <BookCopyTable data={copies} />
                    )}

                    {((!copies || copiesError?.response?.status === 404 || copies.length === 0) && !copiesLoading) && (
                        <h1 className="font-light text-sm">Nenhuma cópia desse livro foi encontrada.</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookPage;