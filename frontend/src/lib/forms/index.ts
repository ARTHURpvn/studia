import { noteFormConfig } from "@/lib/features/annotations/formConfig";
import { folderFormConfig } from "@/lib/features/folders/formConfig";
import { materiasFormConfig } from "@/lib/features/materias/formConfig";

export const formConfigs = {
  folder: folderFormConfig,
  note: noteFormConfig,
  kanban: folderFormConfig,
  materia: materiasFormConfig,
  homework: folderFormConfig,
};

export type FormType = keyof typeof formConfigs;
