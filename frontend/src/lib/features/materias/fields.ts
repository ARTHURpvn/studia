import { FormField } from "@/lib/forms/types";

import { MateriasFormValues } from "./schema";

export const materiasFields: FormField<MateriasFormValues>[] = [
  {
    name: "name",
    label: "Nome da Matéria",
    type: "text",
    placeholder: "Ex: Matemática Discreta I",
  },
  {
    name: "teacher",
    label: "Nome do Professor",
    type: "text",
    placeholder: "Ex: Arthur",
  },
  {
    name: "semester",
    label: "Semestre Atual",
    type: "number",
    placeholder: "2",
  },
  {
    name: "rating",
    label: "Insira sua Nota",
    type: "number",
    placeholder: "10",
  },
];
