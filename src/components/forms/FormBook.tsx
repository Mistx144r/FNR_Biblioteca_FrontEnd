function  FormBook () {

    return (
        <form className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                    className="w-full rounded-lg border-slate-300 focus:border-five focus:ring-five transition-shadow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormBook;