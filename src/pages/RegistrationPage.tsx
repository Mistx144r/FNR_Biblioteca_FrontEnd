import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormCategory from "@/components/forms/FormCategory.tsx";
import FormSubCategory from "@/components/forms/FormSubCategory.tsx";
import FormAuthor from "@/components/forms/FormAuthor.tsx";

const buttons = [
    {
        name: "Categoria",
        page: FormCategory
    },
    {
        name: "Sub-Categoria",
        page: FormSubCategory
    },
    {
        name: "Autor",
        page: FormAuthor
    },
    {
        name: "Setor",
        page: null
    },
    {
        name: "Estante",
        page: null
    },
    {
        name: "Livro",
        page: null
    }
]

function RegistrationPage(){
    const [currentButton, setCurrentButton] = useState<string>("Livro");
    const currentPage = buttons.find((button) => button.name === currentButton);
    const PageComponent = currentPage?.page;

    return (
        <div className="flex flex-col bg-white w-full h-full p-3 tablet:p-6 overflow-y-auto desktop:rounded-3xl">
            <div className="flex flex-col gap-2">
                <h1 className="text-six font-bold text-3xl">Cadastro</h1>
                <Tabs defaultValue={"Livro"} onValueChange={(newVal) => setCurrentButton(newVal)}>
                    <TabsList variant={"line"}>
                        {buttons.map((button) => (
                            <TabsTrigger key={button.name} value={button.name}>{button.name}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div className="mb-px">
                {PageComponent && <PageComponent />}
            </div>
        </div>
    )
}

export  default  RegistrationPage