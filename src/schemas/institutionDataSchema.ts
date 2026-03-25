import { z } from "zod";

export const createInstitutionSchema = z.object({
    name: z.string().min(1)
});

export const updateInstitutionSchema = createInstitutionSchema.partial();

export type Institution = z.infer<typeof createInstitutionSchema> & { id_institution: number };