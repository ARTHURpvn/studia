import { folderFormConfig } from "@/lib/features/folders/formConfig";
import { materiasFormConfig } from "@/lib/features/materias/formConfig";

export const formConfigs = {
  folder: folderFormConfig,
  note: folderFormConfig,
  kanban: folderFormConfig,
  materia: materiasFormConfig,
};

export type FormType = keyof typeof formConfigs;
