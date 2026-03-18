import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

const serverIP: string = import.meta.env.VITE_SERVER_IP || "123";

//------------------------
// Components
//------------------------
import CatalogCard from "../components/catalog/CatalogCard.tsx";

//----------------------------
// Data Schemas
//----------------------------
import type {BookData, Book} from "@/schemas/bookDataSchemas.ts";
import type {Category} from "@/schemas/categoryDataSchemas.ts";

function CatalogPage() {
    const {data: categories, error: categoryError, isLoading: categoryLoading} = useQuery<Category[]>({
        queryKey: ["allCategories"],
        queryFn: () => axios.get(`${serverIP}/v1/categories/`).then((res) => res.data)
    });

    const {data: books, error: booksError, isLoading: booksLoading} = useQuery<BookData>({
        queryKey: ["Books:Page1:Limit10"],
        queryFn: () => axios.get(`${serverIP}/v1/books/`).then((res) => res.data)
    });

    const toggleItemClass = "transition-all data-[state=on]:bg-five data-[state=on]:text-white data-[state=on]:border-transparent";

    return (
        <div className="flex flex-col bg-white w-full h-full p-3 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
            {(categoryLoading || booksLoading) &&(
                <h1>Loading...</h1>
            )}

            {(categoryError || booksError) &&(
                <h1>Error...</h1>
            )}

            {(!categoryError && !categoryLoading) && (
                <>
                    {/* Nome da Aba + Filtro */}
                    <div className="flex w-full h-5 justify-between items-center">
                        <h1 className="text-six font-bold text-3xl">Catálogo</h1>
                        <button>
                            <Filter className="text-four"/>
                        </button>
                    </div>

                    {/* Grupo de filtro para as Categorias */}
                    <ToggleGroup type="single" size="sm" defaultValue="" variant="outline" spacing={2} className="hidden md:flex mt-5 flex-wrap">
                        {categories?.map((category: Category) => (
                            <ToggleGroupItem
                                key={category.name}
                                value={category.name}
                                aria-label={"Toggle " + category.name}
                                className={toggleItemClass}
                            >
                                {category.name}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>

                    {/* Catalogo dos livros */}
                    <div className="flex w-full h-full mt-5 flex-wrap gap-5 overflow-y-scroll">
                        {books?.data.map((book: Book) => (
                            <CatalogCard key={book.isbn} book={book} />
                        ))}
                    </div>

                    {/* Page controller */}
                    <div className="flex justify-center items-center gap-3 mt-5 text-four">
                        {books?.meta.hasPreviousPage && (
                            <button>
                                <ChevronLeft className="size-5" />
                            </button>
                        )}

                        <h3 className="text-xl font-bold text-four">{books?.meta.page}</h3>

                        {books?.meta.hasNextPage && (
                            <button>
                                <ChevronRight className="size-5" />
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CatalogPage;