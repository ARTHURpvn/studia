// src/app/login/page.tsx
"use client";

import { useState } from "react";

import { useAuth } from "@/store/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login feito com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert("Erro ao logar: " + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <input
        className="block w-full p-2 border"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="block w-full p-2 border mt-2"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}
