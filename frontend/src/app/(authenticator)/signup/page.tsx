"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signupUserByEmail } from "@/lib/auth";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[a-z]/, "A senha deve conter uma letra minúscula.")
  .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula.")
  .regex(/\d/, "A senha deve conter um número.")
  .regex(/[@$!%*?#&]/, "A senha deve conter um caractere especial.");

// 🎯 Schema com validação cruzada entre senha e confirmação
const FormSchema = z
  .object({
    name: z.string().min(10, "Nome precisa ter no mínimo 10 caracteres."),
    email: z.string().email("Email inválido"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // 👁️ controle visibilidade

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await signupUserByEmail({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMsg: string =
        error.response?.data?.message ||
        error.message ||
        "Erro desconhecido ao criar conta.";

      toast.error("Erro ao criar conta: " + errorMsg);
    }
  }

  return (
    <div className="max-w-sm space-y-10 mx-10 mt-10">
      <p>Cadastrar</p>

      <div className={"py-2 px-4 w-full border rounded-sm"}>
        <p>Conectar com o Google</p>
      </div>

      <div className={"items-center my-4 flex gap-4"}>
        <Separator className="text-[var(--font)]" />
        <p>OU</p>
        <Separator className="text-[var(--font)]" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      {...field}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Confirmar</Button>`
          <div className="flex self-center mt-4 gap-2">
            <p>Já possui uma conta?</p>
            <Link href="/login" className="text-white">
              Entrar
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
