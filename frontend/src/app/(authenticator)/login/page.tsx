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
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();

  const FormSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
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
      const { login } = useAuthStore.getState();

      const responseData: boolean = await login({
        email: data.email,
        password: data.password,
      });

      if (responseData) {
        router.push("/");
      }
    } catch (err) {
      const errr = err as AxiosError<{ message?: string }>;
      const errorMsg =
        errr.response?.data?.message ||
        "Credenciais inválidas ou erro no servidor.";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="space-y-10 w-full lg:w-1/4 h-fit lg:py-8 lg:px-6 lg:bg-[var(--background)] mx-10 mt-10">
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
                    <Input type={"email"} placeholder="Email" {...field} />
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
                    <Input type={"password"} placeholder="Senha" {...field} />
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
