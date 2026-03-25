import { Image } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBookSchema } from "@/schemas/bookDataSchemas.ts";

type CreateBookForm = z.infer<typeof createBookSchema>;

function FormBook() {
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateBookForm>({
        resolver: zodResolver(createBookSchema) as Resolver<CreateBookForm>,
    });

    function previewFile(e: ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;
        const url = URL.createObjectURL(image);
        setPreview(url);
        setValue("bookcover", url);
    }

    function removeFile() {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setValue("bookcover", "");
    }

    function onSubmit(data: CreateBookForm) {
        console.log(data);
    }

    return (
        <form className="flex bg-white w-full h-full gap-5 p-3 tablet:p-6 desktop:rounded-3xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full h-full gap-6 desktopHD:flex-row">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                            Informações básicas
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Título do livro:
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Autor:
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                        {...register("author")}
                                    />
                                    {errors.author && (
                                        <p className=" text-xs text-red-500 mt-1">
                                            {errors.author.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        ISBN (10 ou 13)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                        {...register("isbn")}
                                    />
                                    {errors.isbn && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.isbn.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                            Publicação e Classificação
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Editora:
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("publisher")}
                                />
                                {errors.publisher && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.publisher.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Ano de publicação:
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("published_at")}
                                />
                                {errors.published_at && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.published_at.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Gênero/Categoria:
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("category")}
                                />
                                {errors.category && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Linguagem
                                </label>
                                <input
                                    type="text"
                                    placeholder="pt-BR"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("language")}
                                />
                                {errors.language && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.language.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Edição
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("edition")}
                                />
                                {errors.edition && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.edition.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Número de páginas:
                                </label>
                                <input
                                    type="number"
                                    placeholder="180"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10"
                                    {...register("pages")}
                                />
                                {errors.pages && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.pages.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                            Sinopse
                        </h3>
                        <div>
                            <textarea
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 outline-none resize-none hover:border-slate-300 focus:border-five focus:ring-4 focus:ring-five/10 leading-relaxed"
                                rows={6}
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-auto h-auto mr-auto gap-6 desktopHD:ml-auto desktopHD:mr-0">
                    <div className="bg-second p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                            Capa do Livro
                        </h3>

                        <div className="flex flex-col items-center">
                            <div className="w-full h-80 aspect-3/4 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                                {preview ? (
                                    <img
                                        alt="Preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src={preview}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center p-4 text-center">
                                        <Image className="h-12 w-12 text-slate-400 mb-2" />
                                        <p className="text-xs text-slate-500">
                                            JPG, PNG ou WEBP (Max 2MB)
                                        </p>
                                        <p className="text-xs font-semibold text-five mt-1 cursor-pointer">
                                            Clique para carregar imagem
                                        </p>
                                    </div>
                                )}
                                <input
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    type="file"
                                    accept="image/*"
                                    onChange={previewFile}
                                />
                            </div>
                            {errors.bookcover && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.bookcover.message}
                                </p>
                            )}
                            {preview && (
                                <button
                                    className="mt-4 text-sm font-medium text-slate-600 hover:text-red-500 transition-colors"
                                    type="button"
                                    onClick={removeFile}
                                >
                                    Remover imagem
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <button
                            className="w-full bg-five hover:bg-six text-second font-semibold py-3 px-4 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-100"
                            type="submit"
                        >
                            Salvar Livro
                        </button>

                        <button
                            className="w-full bg-five hover:bg-six text-second font-semibold py-3 px-4 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-100"
                            type="reset"
                        >
                            Limpar Formulário
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default FormBook;