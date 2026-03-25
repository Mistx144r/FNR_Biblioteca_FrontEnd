import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

function RegistrationPage(){
    const [currentPage, setCurrentPage] = useState<string>("livro");

    return (
        <div className="flex bg-white w-full h-full gap-5 p-3 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
            <div className="flex-1">
                <div className="flex flex-col gap-10 md:gap-5">
                    <section>
                        <h2 className="text-3xl font-bold text-six">Cadastro</h2>
                        <Tabs defaultValue="livro" onValueChange={(newValue) => setCurrentPage(newValue)}>
                            <TabsList variant="line" className="flex-wrap">
                                {buttons.map(button => (
                                    <TabsTrigger
                                        key={button}
                                        value={button}
                                    >
                                        {capitalizeFirstLetter(button)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </section>

                    <div className="flex w-full h-full overflow-y-auto">
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