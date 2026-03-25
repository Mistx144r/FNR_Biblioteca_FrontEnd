import { z } from "zod";

export const createSectorSchema = z.object({
    name: z.string().min(1),
    letter: z.string().max(1),
    category: z.coerce.number().positive(),
    institution: z.number().positive()
});

export const updateSectorSchema = createSectorSchema.partial();

export type Sector = z.infer<typeof createSectorSchema> & { id_sector: number };