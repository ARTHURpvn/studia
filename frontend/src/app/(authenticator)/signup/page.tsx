"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/\d/, "A senha deve conter pelo menos um número.")
  .regex(/[@$!%*?#&]/, "A senha deve conter pelo menos um caractere especial.");

export default function LoginPage() {
  const FormSchema = z.object({
    email: z.string().email("Email inválido"),
    name: z.string().min(10, "Nome precisa ser maior que 10 caracteres."),
    password: passwordSchema,
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="max-w-sm space-y-10 mx-10 mt-10">
      <p> Cadastrar </p>
      <div>
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
            className={"flex flex-col gap-4"}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      required={true}
                      placeholder="Nome"
                      {...field}
                    />
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
                    <Input
                      type={"email"}
                      required={true}
                      placeholder="Email"
                      {...field}
                    />
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
                    <Input
                      type={"password"}
                      required={true}
                      placeholder="Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"self-end"}>
              <Button type="submit">Confirmar</Button>
            </div>

            <div className={"flex self-center mt-4 gap-2"}>
              <p>Já possui uma conta?</p>
              <Link href="/login" className={"text-white"}>
                Entrar
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
