"use client";

import { z } from "zod";

import { FormBuilder } from "@/components/shared/FormBuilder";
import { formConfigs, FormType } from "@/lib/forms";
import { FormActions } from "@/lib/forms/types";

export function DynamicForm({
  type,
  action,
  parentId,
  onClose,
  defaultValues = {},
}: {
  type: FormType;
  action: FormActions;
  parentId?: string;
  onClose: () => void;
  defaultValues?: Record<string, unknown>;
}) {
  const config = formConfigs[type];

  if (!config) {
    return <p>⚠️ Formulário não encontrado para: {type}</p>;
  }

  const { schema, fields, onSubmit } = config;

  if (!schema || !fields || !onSubmit) {
    return <p> Falta informacoes no formulario</p>;
  }

  // Use a generic type that matches the schema
  const enhancedSubmit = (
    data: z.infer<typeof schema>,
    action: FormActions,
  ) => {
    // Use type assertion to tell TypeScript that the data is of the correct type for this specific form config
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit(data as any, action, parentId);
    onClose();
  };

  return (
    <FormBuilder
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fields={fields as any}
      action={action}
      onSubmit={enhancedSubmit}
      defaultValues={defaultValues}
    />
  );
}
