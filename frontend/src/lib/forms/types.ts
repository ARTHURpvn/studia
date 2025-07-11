import { Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "email"
  | "password";

export interface FormField<TFormValues> {
  name: Path<TFormValues>;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
}
