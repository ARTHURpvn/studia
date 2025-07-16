"use client";

import { FormBuilder } from "@/components/shared/FormBuilder";
import { FolderFormValues } from "@/lib/features/folders/schema";
import { formConfigs, FormType } from "@/lib/forms";
import { FormActions } from "@/lib/forms/types";

export function DynamicForm({
  type,
  action,
  parentId,
  defaultValue,
  onClose,
}: {
  type: FormType;
  action: FormActions;
  parentId?: string;
  defaultValue?: FolderFormValues;
  onClose: () => void;
}) {
  const config = formConfigs[type];

  if (!config) {
    return <p>⚠️ Formulário não encontrado para: {type}</p>;
  }

  const { schema, fields, onSubmit } = config;

  if (!schema || !fields || !onSubmit) {
    return <p> Falta informacoes no formulario</p>;
  }

  const enhancedSubmit = (data: FolderFormValues, action: FormActions) => {
    onSubmit(data, action, parentId);
    onClose();
  };

  return (
    <FormBuilder
      schema={schema}
      fields={fields}
      action={action}
      onSubmit={enhancedSubmit}
      defaultValues={defaultValue || {}}
    />
  );
}
