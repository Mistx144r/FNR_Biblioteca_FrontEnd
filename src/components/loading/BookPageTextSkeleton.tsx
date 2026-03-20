function BookPageTextSkeleton() {
    return (
        <div className="flex flex-1 w-full flex-col overflow-x-auto animate-pulse">
            {/* Título */}
            <div className="h-9 w-64 bg-gray-300 rounded-md" />

            {/* Autor • Categoria • Edição */}
            <div className="flex gap-2 mt-2">
                <div className="h-4 w-24 bg-gray-300 rounded-md" />
                <div className="h-4 w-2 bg-gray-300 rounded-md" />
                <div className="h-4 w-20 bg-gray-300 rounded-md" />
                <div className="h-4 w-2 bg-gray-300 rounded-md" />
                <div className="h-4 w-16 bg-gray-300 rounded-md" />
            </div>

            {/* Resumo */}
            <div className="flex flex-col h-36 mt-5 gap-2">
                <div className="h-4 w-16 bg-gray-300 rounded-md" />
                <div className="h-4 w-full bg-gray-300 rounded-md" />
                <div className="h-4 w-full bg-gray-300 rounded-md" />
                <div className="h-4 w-3/4 bg-gray-300 rounded-md" />
            </div>

            {/* Sub-Categorias */}
            <div className="flex flex-col gap-1">
                <div className="h-4 w-28 bg-gray-300 rounded-md" />
                <div className="flex gap-1 mt-1">
                    <div className="h-6 w-16 bg-gray-300 rounded-full" />
                    <div className="h-6 w-20 bg-gray-300 rounded-full" />
                    <div className="h-6 w-14 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* ISBN • Linguagem • Páginas */}
            <div className="flex flex-col mt-5 gap-2">
                <div className="h-4 w-40 bg-gray-300 rounded-md" />
                <div className="h-4 w-36 bg-gray-300 rounded-md" />
                <div className="h-4 w-32 bg-gray-300 rounded-md" />
            </div>
        </div>
    );
}

export default BookPageTextSkeleton;