"use client";

import { FormBuilder } from "@/components/shared/FormBuilder";
import { FolderFormValues } from "@/lib/features/folders/schema";
import { formConfigs, FormType } from "@/lib/forms";

export function DynamicForm({
  type,
  parentId,
}: {
  type: FormType;
  parentId?: string;
}) {
  const config = formConfigs[type];

  if (!config) {
    return <p>⚠️ Formulário não encontrado para: {type}</p>;
  }

  const { schema, fields, onSubmit } = config;

  if (!schema || !fields || !onSubmit) {
    return <p> Falta informacoes no formulario</p>;
  }

  const enhancedSubmit = (data: FolderFormValues, action: "create" | "edit") =>
    onSubmit(data, action, parentId);

  return (
    <FormBuilder
      schema={schema}
      fields={fields}
      action="create"
      onSubmit={enhancedSubmit}
      defaultValues={{}}
    />
  );
}
