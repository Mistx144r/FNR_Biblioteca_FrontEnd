import { z } from "zod";

//----------------------------
// Category Schemas
//----------------------------
export const createCategorySchema = z.object({
    name: z.string().min(3, "Uma categoria precisa ter no mínimo 3 letras.")
});

export const updateBookSchema = createCategorySchema.partial();

//----------------------------
// Category Return Data Type
//----------------------------
export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
export type Category = z.infer<typeof createCategorySchema> & { id_category: number };