import { FolderFormValues } from "@/lib/features/folders/schema";
import { FormField } from "@/lib/forms/types";

export const noteFields: FormField<FolderFormValues>[] = [
  {
    name: "name",
    label: "Nome da Anotação",
    type: "text",
    placeholder: "Ex: Projeto Pessoal",
  },
];
