import axios from "axios";
import clsx from "clsx";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getErrorMessageCategory } from "@/lib/utils.ts";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner.tsx";
import { type Category, type CreateCategoryForm, createCategorySchema } from "@/schemas/categoryDataSchemas";

const serverIP: string = import.meta.env.VITE_SERVER_IP;

const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10";

const removeAccents = (str: string) => {
    const normalizedStr = str.normalize("NFD");
    return normalizedStr.replace(/[\u0300-\u036f]/g, "");
};

function FormCategory() {
    const queryClient = useQueryClient();
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateCategoryForm>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: ""
        }
    });

    const { data: categories, error: categoryError, isLoading: categoryLoading } = useQuery<Category[]>({
        queryKey: ["allCategories"],
        staleTime: 5000,
        queryFn: () => axios.get(`${serverIP}/v1/categories/`).then((res) => res.data)
    });

    const { mutate: createCategory, isPending: isCreating } = useMutation({
        mutationFn: (data: CreateCategoryForm) =>
            axios.post(`${serverIP}/v1/categories/`, data),
        onSuccess: () => {
            setMutationError(null);
            toast.success("Categoria criada com sucesso.", { position: "top-right" })
            queryClient.invalidateQueries({queryKey: ["allCategories"]});
            reset({ name: "" });
        },
        onError: (error) => setMutationError(getErrorMessageCategory(error))
    });

    const { mutate: updateCategory, isPending: isUpdating } = useMutation({
        mutationFn: (data: CreateCategoryForm) =>
            axios.put(`${serverIP}/v1/categories/${editingCategory?.id_category}`, data),
        onSuccess: () => {
            setMutationError(null);
            toast.success("Categoria atualizada com sucesso.", { position: "top-right" })
            queryClient.invalidateQueries({ queryKey: ["allCategories"] });
            setEditingCategory(null);
            reset({ name: "" });
        },
        onError: (error) => setMutationError(getErrorMessageCategory(error))
    });

    const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => axios.delete(`${serverIP}/v1/categories/${id}`),
        onSuccess: () => {
            setMutationError(null);
            queryClient.invalidateQueries({ queryKey: ["allCategories"] })
        },
        onError: (error) => setMutationError(getErrorMessageCategory(error))
    });

    function onSubmit(data: CreateCategoryForm) {
        if (editingCategory) {
            updateCategory(data);
        } else {
            createCategory(data);
        }
    }

    function handleEdit(category: Category) {
        setEditingCategory(category);
        setValue("name", category.name);
    }

    function handleCancelEdit() {
        setEditingCategory(null);
        reset();
    }

    function handleDelete(category: Category) {
        deleteCategory(category.id_category);
        setEditingCategory(null);
        reset();
    }

    const filteredCategories = categories?.filter((category) =>
        removeAccents(category.name.toLowerCase()).includes(search.toLowerCase())
    );

    return (
        <div className="flex bg-white w-full h-full gap-5 p-3 tablet:p-6 desktop:rounded-3xl">
            <div className="flex w-full h-full">
                {categoryLoading && (
                    <Spinner className="size-8 text-four ml-auto mr-auto" />
                )}

                {categoryError && (
                    <p className="text-sm text-red-500">Erro ao carregar categorias.</p>
                )}

                {filteredCategories && (
                    <div className="flex flex-col w-full gap-3">
                        {filteredCategories?.length <= 0 && (
                            <h3 className="text-sm">Nenhuma categoria encontrada.</h3>
                        )}
                        {filteredCategories?.map((category) => (
                            <div
                                key={category.name}
                                className={clsx(
                                    "bg-second border rounded-xl px-4 py-3 shadow-sm flex items-center justify-between gap-2 transition-all",
                                    editingCategory?.name === category.name
                                        ? "border-five ring-2 ring-five/20"
                                        : "border-slate-200"
                                )}
                            >
                                <span className="text-sm font-medium text-slate-700 truncate">
                                    {category.name}
                                </span>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        aria-label={`Editar categoria ${category.name}`}
                                        onClick={() => handleEdit(category)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-five hover:bg-slate-100 transition-all"
                                    >
                                        <Pencil size={15} />
                                    </button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label={`Deletar categoria ${category.name}`}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                                disabled={isDeleting}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Deletar categoria "{category.name}"?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não pode ser desfeita. Todos os livros vinculados
                                                    à categoria <strong>{category.name}</strong> também serão
                                                    permanentemente deletados.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-red-500 hover:bg-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(category)}
                                                >
                                                    Sim, deletar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col w-150 h-auto">
                <form
                    className="sticky top-0 flex flex-col w-full h-fit gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex items-center gap-2 w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-slate-300 focus-within:border-five focus-within:ring-4 focus-within:ring-five/10">
                        <Search className="size-4 text-four shrink-0" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {setSearch(e.target.value)}}
                            placeholder="Pesquisar categoria..."
                            aria-label="Pesquisar categoria"
                            className="w-full text-sm text-slate-800 placeholder:text-four outline-none bg-transparent"
                        />
                        {search.length > 0 && (
                            <X className="size-4 text-four cursor-pointer" onClick={() => setSearch("")}/>
                        )}
                    </div>

                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                            {editingCategory ? `Editando: ${editingCategory.name}` : "Nova Categoria"}
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nome:
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setMutationError(null);
                                        }}
                                        type="text"
                                        placeholder="Ex: Ficção, Aventura, Tecnologia"
                                        className={inputClass}
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="w-full bg-five hover:bg-six text-second font-semibold py-3 px-4 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                        >
                            {editingCategory
                                ? isUpdating ? "Salvando..." : "Salvar Alterações"
                                : isCreating ? "Criando..." : "Criar Categoria"
                            }
                        </button>

                        {editingCategory && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg shadow-sm transition-all"
                            >
                                Cancelar Edição
                            </button>
                        )}

                        {mutationError && (
                            <p className="text-xs text-red-500 text-center">{mutationError}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormCategory;