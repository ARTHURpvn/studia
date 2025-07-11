import { z } from "zod";

export const folderSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
});

export type FolderFormValues = z.infer<typeof folderSchema>;
