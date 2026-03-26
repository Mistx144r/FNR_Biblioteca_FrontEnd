import axios, {type AxiosError} from "axios";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createBookCopySchema, type BookCopy } from "@/schemas/bookCopyDataSchema.ts";
import { type Institution } from "@/schemas/institutionDataSchema.ts";
import { type Sector } from "@/schemas/sectorDataSchemas.ts";
import { type Bookcase } from "@/schemas/bookcaseSchema.ts";

import { X } from "lucide-react";

import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Input } from "@/components/ui/input.tsx";

type props = {
    bookId: number
    onClose: () => void
}

const serverIP: string = import.meta.env.VITE_SERVER_IP;

function BookCopyModal({ bookId, onClose }: props) {
    const queryClient = useQueryClient();
    const form = useForm<BookCopy>({
        resolver: zodResolver(createBookCopySchema),
        defaultValues: {
            book: bookId,
            state: "DISPONIVEL",
            is_virtual: false,
            is_consult: false,
            description: ""
        }
    });

    const formWatcher = useWatch(form);
    const institutionId = formWatcher.institution;
    const sectorId = formWatcher.sector;
    const description = formWatcher.description;

    const { data: institutions, error: institutionsError, isLoading: institutionsLoading } = useQuery<Institution[], AxiosError>({
        queryKey: [`institutions-${bookId}`],
        queryFn: () => axios.get(`${serverIP}/v1/institutions/`).then((res) => res.data)
    });

    const { data: sectors, error: sectorsError, isLoading: sectorsLoading } = useQuery<Sector[], AxiosError>({
        queryKey: [`sectors-${institutionId}`],
        queryFn: () => axios.get(`${serverIP}/v1/institutions/${institutionId}/sectors`).then((res) => res.data),
        enabled: !!institutionId
    });

    const { data: bookcases, error: bookcasesError, isLoading: bookcasesLoading } = useQuery<Bookcase[], AxiosError>({
        queryKey: [`bookcases-${sectorId}`],
        queryFn: () => axios.get(`${serverIP}/v1/sectors/${sectorId}/bookcases`).then((res) => res.data),
        enabled: !!sectorId
    });

    const { mutate: createBookCopy, isPending: isCreationPending, error:creationError } = useMutation({
        mutationFn: (data: BookCopy) => axios.post(`${serverIP}/v1/bookcopies/`, data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`copies-${bookId}`] }).then(() => console.log("Cleaned Copy Books Cache"));
            onClose();
        },
        onError: (error: AxiosError) => {
            console.error(error);
        }
    });

    function onSubmit(data: BookCopy) {
        createBookCopy(data);
    }

    // Fazer Error Handling Depois
    if (institutionsError || sectorsError || bookcasesError) {
        return <h1>Error</h1>;
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex w-screen h-screen p-5 justify-center items-center font-display z-50 animate-fade-in">
            <div className="flex flex-col bg-white p-8 rounded-3xl w-full md:w-110 shadow-2xl gap-5">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <X className="text-four size-7 cursor-pointer"/>
                    </button>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} id="book-copy-form" className="flex flex-col w-full gap-5">
                    <div className="flex flex-col gap-2">
                        <Controller name="institution" control={form.control} render={({ field }) => (
                            <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(val) => {
                                    field.onChange(Number(val));
                                    form.resetField("sector");
                                }}
                            >
                                <Label htmlFor="institution">Instituição</Label>
                                <SelectTrigger id="institution" className="w-full">
                                    <SelectValue placeholder={
                                        institutionsLoading ? "Carregando..." : (institutions?.length ?? 0) ? "Selecione uma instituição." : "Nenhum instituição disponível."
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>instituições</SelectLabel>
                                        {institutions?.map((institution: Institution) => (
                                            <SelectItem key={institution.id_institution} value={String(institution.id_institution)}>{institution.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}/>
                        {form.formState.errors.institution && <span className="text-xs text-red-500">{form.formState.errors.institution.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Controller name="sector" control={form.control} render={({ field }) => (
                            <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(val) => {
                                    field.onChange(Number(val));
                                    form.resetField("bookcase");
                                }}
                                disabled={!institutionId}
                            >
                                <Label htmlFor="sector">Setor</Label>
                                <SelectTrigger id="sector" className="w-full">
                                    <SelectValue placeholder={
                                        sectorsLoading ? "Carregando..." : (sectors?.length ?? 0) ? "Selecione um setor." : "Nenhum setor disponível."
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Setores</SelectLabel>
                                        {sectors?.map((sector: Sector) => (
                                            <SelectItem key={sector.id_sector} value={String(sector.id_sector)}>{sector.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}/>
                        {form.formState.errors.sector && <span className="text-xs text-red-500">{form.formState.errors.sector.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Controller name="bookcase" control={form.control} render={({ field }) => (
                            <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(val) => field.onChange(Number(val))}
                                disabled={!sectorId}
                            >
                                <Label htmlFor="bookcase">Estante</Label>
                                <SelectTrigger id="bookcase" className="w-full">
                                    <SelectValue placeholder={
                                        bookcasesLoading ? "Carregando..." : (bookcases?.length ?? 0) > 0 ? "Selecione uma estante." : "Nenhuma estante disponível."
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Estantes</SelectLabel>
                                        {bookcases?.map((bookcase: Bookcase) => (
                                            <SelectItem key={bookcase.id_bookcase} value={String(bookcase.id_bookcase)}>{bookcase.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}/>
                        {form.formState.errors.bookcase && <span className="text-xs text-red-500">{form.formState.errors.bookcase.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="mr-auto">Descrição</Label>
                        <Controller name="description" control={form.control} render={({ field }) => (
                            <Input
                                {...field}
                                id="description"
                                maxLength={50}
                            />
                        )}/>
                        <div className="flex justify-between">
                            {form.formState.errors.description
                                ? <span className="text-xs text-red-500">{form.formState.errors.description.message}</span>
                                : <span />
                            }
                            <h6 className="text-xs text-four">{description?.length ?? 0}/50</h6>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex">
                            <Label htmlFor="is_consult" className="mr-auto">É consulta?</Label>
                            <Controller name="is_consult" control={form.control} render={({ field }) => (
                                <Switch
                                    id="is_consult"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}/>
                        </div>
                        {form.formState.errors.is_consult && <span className="text-xs text-red-500">{form.formState.errors.is_consult.message}</span>}
                    </div>

                    <button type="submit" className="bg-five text-white p-2 rounded-xl transition-all cursor-pointer hover:brightness-110 active:brightness-95">
                        {isCreationPending ? "Criando..." : "Adicionar exemplar"}
                    </button>

                    {(creationError?.status === 401) && <span className="text-xs text-red-500">Acesso não autorizado</span>}
                </form>
            </div>
        </div>
    );
}

export default BookCopyModal;