import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {useState} from "react";
import FormBook from "@/components/forms/FormBook.tsx";

function capitalizeFirstLetter(string: string) {
    if (string.length === 0) {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const buttons = [
    "categoria",
    "sub-categoria",
    "autor",
    "setor",
    "estante",
    "livro"
]

function  RegistrationPage(){
    const [currentPage, setCurrentPage] = useState<string>("livro");
    const toggleItemClass = "transition-all data-[state=on]:bg-five data-[state=on]:text-white data-[state=on]:border-transparent cursor-pointer";

    return (
        <div className="flex flex-col bg-white w-full h-full gap-5 p-5 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                    <h2 className="text-2xl font-bold text-six">Cadastros</h2>
                        <ToggleGroup type="single" size="sm" onValueChange={(tg) => setCurrentPage(tg)} defaultValue="livro" variant="outline" spacing={2} className="hidden md:flex mt-5 flex-wrap">
                            {buttons.map(button => (
                                <ToggleGroupItem
                                    key={button}
                                    value={button}
                                    className={toggleItemClass}
                                >
                                    {capitalizeFirstLetter(button)}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <div className="flex w-full h-full">
                        {(currentPage === "livro") && (
                            <FormBook />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default  RegistrationPage