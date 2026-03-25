import { z } from "zod";

export const stateEnum = ["DISPONIVEL", "RESERVADO", "EMPRESTADO", "INDISPONIVEL"] as const;

export const createBookCopySchema = z.object({
    book: z.number({ error: "Livro é obrigatório." }).positive(),
    bookcase: z.number({ error: "Selecione uma estante." }).positive("Selecione uma estante."),
    institution: z.number({ error: "Selecione uma instituição." }).positive("Selecione uma instituição."),
    sector: z.number({ error: "Selecione um setor." }).positive("Selecione um setor."),
    is_consult: z.boolean({ error: "Informe se é consulta." }),
    is_virtual: z.boolean().optional(),
    state: z.enum(stateEnum).optional(),
    description: z.string().max(50, "Descrição deve ter no máximo 50 caracteres.").optional()
});

export const updateBookCopyStateSchema = z.object({
    state: z.enum(stateEnum)
});

export const updateBookCopySchema = z.object({
    bookcase: z.number().positive(),
    institution: z.number().positive(),
    description: z.string(),
}).partial();

//----------------------------
// Book Copy Return Data Type
//----------------------------
export type BookCopy = z.infer<typeof createBookCopySchema>;
export type StateEnum = typeof stateEnum[number];