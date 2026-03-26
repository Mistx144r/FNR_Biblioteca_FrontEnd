import { z } from "zod";

export const createSectorSchema = z.object({
    name: z.string().min(1),
    letter: z.string().max(1),
    category: z.string(),
    institution: z.string()
});

export const updateSectorSchema = createSectorSchema.partial();

//---------------------------
// Sector Return Data Type
//---------------------------
export type SectorFormData = z.infer<typeof createSectorSchema>;
export type Sector = z.infer<typeof createSectorSchema> & { id_sector: number };