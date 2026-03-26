import { z } from "zod";

export const createAuthorSchema = z.object({
    name: z.string().min(1)
});

export const updateAuthorSchema = createAuthorSchema.partial();

//----------------------------
// Author Return Data Type
//----------------------------
export type CreateAuthorForm = z.infer<typeof createAuthorSchema>;
export type Author = z.infer<typeof createAuthorSchema> & { id_author: number };