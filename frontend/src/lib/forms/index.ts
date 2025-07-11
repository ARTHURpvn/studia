import { folderFormConfig } from "@/lib/features/folders/formConfig";

export const formConfigs = {
  folder: folderFormConfig,
  note: folderFormConfig,
  kanban: folderFormConfig,
};

export type FormType = keyof typeof formConfigs;
