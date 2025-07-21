import { v4 as uuidv4 } from "uuid";

import {
  Materias,
  useMateriasStore,
} from "@/store/features/materias/useMateriasStore";

import { materiasFields } from "./fields";
import { MateriasFormValues, materiasSchema } from "./schema";

export const materiasFormConfig = {
  schema: materiasSchema,
  fields: materiasFields,
  onSubmit: (
    data: MateriasFormValues,
    action: "create" | "edit" | "delete",
    materiaId?: string,
  ) => {
    const id: string = uuidv4();
    const materias: Materias = {
      ...data,
      id,
    };

    const { addMateria, updateMateria } = useMateriasStore.getState();

    switch (action) {
      case "create":
        addMateria(materias);
        break;

      case "edit":
        updateMateria(materiaId!, data);
        break;
    }
  },
};
