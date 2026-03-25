import { z } from "zod";

//----------------------------
// Book Schemas
//----------------------------
export const createBookSchema = z.object({
    name: z.string().min(6, "Título deve ter no mínimo 6 caracteres"),
    isbn: z.string().regex(/^(\d{10}|\d{13})$/, "ISBN deve ter 10 ou 13 dígitos"),
    author: z.string().min(3, "Nome do autor deve ter no mínimo 3 caracteres"),
    description: z.string().min(1, "Descrição é obrigatória"),
    publisher: z.string().min(1, "Editora é obrigatória"),
    language: z.string().regex(/^[a-z]{2}-[A-Z]{2}$/, "Formato inválido. Ex: pt-BR"),
    category: z.coerce.number({ error: "Categoria é obrigatória" }).positive("Categoria inválida"),
    edition: z.coerce.number({ error: "Edição é obrigatória" }).positive("Edição inválida"),
    pages: z.coerce.number({ error: "Número de páginas é obrigatório" }).positive("Número de páginas inválido"),
    bookcover: z.url("URL da capa inválida").optional(),
    published_at: z.coerce.date({ error: "Data de publicação inválida" }),
});

export const bookFilterSchema = z.object({
    name: z.string().min(1),
    isbn: z.string().min(1),
    language: z.string().min(1).max(5),
    category: z.coerce.number().positive(),
    edition: z.coerce.number().positive(),
    published_at: z.coerce.date()
}).partial();

export const updateBookSchema = createBookSchema.partial();

//----------------------------
// Book Return Data Type
//----------------------------
type AuthorsAndCategory = {
    id_book: number
    category: { id_category: number, name: string }
    authors: { id_author: number, name: string }[]
}

export type Book = z.infer<typeof createBookSchema> & AuthorsAndCategory;

export type BookData = {
    data: Book[];
    meta: {
        total: number,
        page: number,
        limit: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean
    }
}