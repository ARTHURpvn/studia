"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField as ShadFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormActions, FormField } from "@/lib/forms/types";

interface FormBuilderProps<
  TSchema extends z.ZodTypeAny,
  TFieldName extends Path<z.infer<TSchema>>,
> {
  schema: TSchema;
  fields: FormField<TFieldName>[];
  onSubmit: (data: z.infer<TSchema>, action: FormActions) => void;
  action?: FormActions;
  buttonText?: string;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
}

export function FormBuilder<
  TSchema extends z.ZodTypeAny,
  TFieldName extends Path<z.infer<TSchema>>,
>({
  schema,
  fields,
  onSubmit,
  action,
  buttonText = "Salvar",
  defaultValues,
}: FormBuilderProps<TSchema, TFieldName>) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, action!))}
        className="space-y-4"
      >
        {fields.map((field) => (
          <ShadFormField
            key={field.name as string}
            control={form.control}
            name={field.name}
            render={({ field: controllerField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      {...controllerField}
                    />
                  ) : field.type === "select" && field.options ? (
                    <Select
                      onValueChange={controllerField.onChange}
                      defaultValue={controllerField.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={field.placeholder || "Selecione..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...controllerField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}
