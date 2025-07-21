import { z } from "zod";

export const materiasSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  teacher: z.string().min(3, "Nome obrigatório"),
  semester: z.number().int().min(1, "Semestre deve ser maior ou igual a 1"),
  rating: z.number().min(0, "Nota deve ser maior ou igual a 0"),
});

export type MateriasFormValues = z.infer<typeof materiasSchema>;
