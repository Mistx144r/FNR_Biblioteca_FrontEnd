import axios from "axios";
import clsx from "clsx";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getErrorMessageAuthor } from "@/lib/utils.ts";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner.tsx";
import { type Author, type CreateAuthorForm, createAuthorSchema } from "@/schemas/authorDataSchemas";

const serverIP: string = import.meta.env.VITE_SERVER_IP;

const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10";

const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function FormAuthor() {
    const queryClient = useQueryClient();
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateAuthorForm>({
        resolver: zodResolver(createAuthorSchema),
        defaultValues: { name: "" }
    });

    const { data: authors, error: authorError, isLoading: authorLoading } = useQuery<Author[]>({
        queryKey: ["allAuthors"],
        staleTime: 5000,
        queryFn: () => axios.get(`${serverIP}/v1/authors/`).then((res) => res.data)
    });

    const { mutate: createAuthor, isPending: isCreating } = useMutation({
        mutationFn: (data: CreateAuthorForm) =>
            axios.post(`${serverIP}/v1/authors/`, data),
        onSuccess: () => {
            setMutationError(null);
            toast.success("Autor criado com sucesso.", { position: "top-right" });
            queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
            reset({ name: "" });
        },
        onError: (error) => setMutationError(getErrorMessageAuthor(error))
    });

    const { mutate: updateAuthor, isPending: isUpdating } = useMutation({
        mutationFn: (data: CreateAuthorForm) =>
            axios.put(`${serverIP}/v1/authors/${editingAuthor?.id_author}`, data),
        onSuccess: () => {
            setMutationError(null);
            toast.success("Autor atualizado com sucesso.", { position: "top-right" });
            queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
            setEditingAuthor(null);
            reset({ name: "" });
        },
        onError: (error) => setMutationError(getErrorMessageAuthor(error))
    });

    const { mutate: deleteAuthor, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => axios.delete(`${serverIP}/v1/authors/${id}`),
        onSuccess: () => {
            setMutationError(null);
            toast.success("Autor deletado com sucesso.", { position: "top-right" });
            queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
        },
        onError: (error) => setMutationError(getErrorMessageAuthor(error))
    });

    function onSubmit(data: CreateAuthorForm) {
        if (editingAuthor) {
            updateAuthor(data);
        } else {
            createAuthor(data);
        }
    }

    function handleEdit(author: Author) {
        setEditingAuthor(author);
        setValue("name", author.name);
    }

    function handleCancelEdit() {
        setEditingAuthor(null);
        reset({ name: "" });
    }

    function handleDelete(author: Author) {
        deleteAuthor(author.id_author);
        setEditingAuthor(null);
        reset({ name: "" });
    }

    const filteredAuthors = authors?.filter((author) =>
        removeAccents(author.name.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
        )
    );

    return (
        <div className="flex bg-white w-full h-full gap-5 p-3 tablet:p-6 desktop:rounded-3xl">
            <div className="flex w-full h-full">
                {authorLoading && (
                    <Spinner className="size-8 text-four ml-auto mr-auto" />
                )}

                {authorError && (
                    <p className="text-sm text-red-500">Erro ao carregar autores.</p>
                )}

                {filteredAuthors && (
                    <div className="flex flex-col w-full gap-3">
                        {filteredAuthors.length <= 0 && (
                            <h3 className="text-sm">Nenhum autor encontrado.</h3>
                        )}
                        {filteredAuthors.map((author) => (
                            <div
                                key={author.id_author}
                                className={clsx(
                                    "bg-second border rounded-xl px-4 py-3 shadow-sm flex items-center justify-between gap-2 transition-all",
                                    editingAuthor?.id_author === author.id_author
                                        ? "border-five ring-2 ring-five/20"
                                        : "border-slate-200"
                                )}
                            >
                                <span className="text-sm font-medium text-slate-700 truncate">
                                    {author.name}
                                </span>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        aria-label={`Editar autor ${author.name}`}
                                        onClick={() => handleEdit(author)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-five hover:bg-slate-100 transition-all"
                                    >
                                        <Pencil size={15} />
                                    </button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label={`Deletar autor ${author.name}`}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                                disabled={isDeleting}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Deletar autor "{author.name}"?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não pode ser desfeita. Todos os livros vinculados
                                                    ao autor <strong>{author.name}</strong> também serão
                                                    permanentemente deletados.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-red-500 hover:bg-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(author)}
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
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Pesquisar autor..."
                            aria-label="Pesquisar autor"
                            className="w-full text-sm text-slate-800 placeholder:text-four outline-none bg-transparent"
                        />
                        {search.length > 0 && (
                            <X className="size-4 text-four cursor-pointer" onClick={() => setSearch("")} />
                        )}
                    </div>

                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                            {editingAuthor ? `Editando: ${editingAuthor.name}` : "Novo Autor"}
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
                                        placeholder="Ex: Machado de Assis, J.K. Rowling"
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
                            {editingAuthor
                                ? isUpdating ? "Salvando..." : "Salvar Alterações"
                                : isCreating ? "Criando..." : "Criar Autor"
                            }
                        </button>

                        {editingAuthor && (
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

export default FormAuthor;