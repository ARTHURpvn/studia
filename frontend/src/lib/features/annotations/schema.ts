import { z } from "zod";

export const noteSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
