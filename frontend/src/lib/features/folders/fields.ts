import { FormField } from "@/lib/forms/types";

import { FolderFormValues } from "./schema";

export const folderFields: FormField<FolderFormValues>[] = [
  {
    name: "name",
    label: "Nome da pasta",
    type: "text",
    placeholder: "Ex: Projeto Pessoal",
  },
];
