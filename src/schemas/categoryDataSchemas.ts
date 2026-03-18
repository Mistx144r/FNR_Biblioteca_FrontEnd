import { z } from "zod";

//----------------------------
// Category Schemas
//----------------------------
export const createCategorySchema = z.object({
    name: z.string().min(1)
});

export const updateBookSchema = createCategorySchema.partial();

//----------------------------
// Category Return Data Type
//----------------------------
export type Category = z.infer<typeof createCategorySchema>;