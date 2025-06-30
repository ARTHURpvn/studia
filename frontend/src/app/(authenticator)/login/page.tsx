"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { loginUserByEmail } from "@/lib/auth";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres.")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .regex(/\d/, "A senha deve conter pelo menos um número.")
  .regex(/[@$!%*?#&]/, "A senha deve conter pelo menos um caractere especial.");

export default function LoginPage() {
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email("Email inválido"),
    password: passwordSchema,
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // 1. Chame a função de login E capture a resposta dela
      const responseData = await loginUserByEmail({
        email: data.email,
        password: data.password,
      });

      // 2. Verifique se a resposta contém o token de acesso
      if (responseData && responseData.access_token) {
        // 3. Mostre a mensagem de sucesso CORRETA
        toast.success("Login realizado com sucesso!");

        // 4. Salve o token no navegador para manter o usuário logado
        localStorage.setItem('accessToken', responseData.access_token);

        // 5. Redirecione o usuário para a página principal (dashboard)
        router.push("/"); // ou '/home', etc.

      } else {
        // Caso a resposta do servidor não venha como o esperado
        toast.error("Não foi possível obter o token de acesso.");
      }

    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // 6. Mensagem de erro CORRETA
      const errorMsg = error.response?.data?.message || "Credenciais inválidas ou erro no servidor.";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="max-w-sm space-y-10 mx-10 mt-10">
      <p> Login </p>
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
            />{" "}
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
              <Button variant={"ghost"} type="button" asChild>
                <Link href={"/signup"}>Cadastrar</Link>
              </Button>
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
