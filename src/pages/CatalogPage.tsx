import {Filter} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const serverIP: string = import.meta.env.VITE_SERVER_IP || "123";

function CatalogPage() {
    const {data: categories, error: categoryError, isLoading: categoryLoading} = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => axios.get(`${serverIP}/v1/categories/`).then((res) => res.data)
    });

    return (
        <div className="flex flex-col bg-white w-full h-full rounded-3xl p-6">
            {categoryLoading &&(
                <h1>Loading...</h1>
            )}

            {categoryError &&(
                <h1>Error...</h1>
            )}

            {(!categoryError && !categoryLoading) && (
                <>
                    <div className="flex w-full h-5 justify-between items-center">
                        <h1 className="text-six font-bold text-3xl">Catálogo</h1>
                        <button>
                            <Filter className="text-four"/>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CatalogPage;