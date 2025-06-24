"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Erro ao criar conta");
    if (!res.ok) setError("Erro ao registrar conta");

    // Redireciona para login após cadastro
    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-red-500">Criar Conta</h1>

        <div>
          <label className="block mb-1 text-sm">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Senha</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition p-2 rounded font-semibold"
        >
          Criar Conta
        </button>

        <p className="text-center text-sm text-zinc-400">
          Já tem uma conta?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </main>
  );
}
