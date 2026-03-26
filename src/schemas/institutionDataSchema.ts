import { z } from "zod";

export const createInstitutionSchema = z.object({
    name: z.string().min(1)
});

export const updateInstitutionSchema = createInstitutionSchema.partial();

//--------------------------------
// Institution Return Data Type
//--------------------------------
export type InstitutionDataForm = z.infer<typeof createInstitutionSchema>
export type Institution = z.infer<typeof createInstitutionSchema> & { id_institution: number };