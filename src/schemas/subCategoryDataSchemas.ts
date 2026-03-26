import { z } from "zod";

export const createSubCategorySchema = z.object({
    name: z.string().min(1)
});

export const updateSubCategorySchema = createSubCategorySchema.partial();

//----------------------------------
// Sub-Category Return Data Type
//-----------------------------------
export type CreateSubCategoryForm = z.infer<typeof createSubCategorySchema>;
export type SubCategory = z.infer<typeof createSubCategorySchema> & { id_sub_category: number };