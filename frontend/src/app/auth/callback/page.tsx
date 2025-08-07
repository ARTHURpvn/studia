"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import setCookies from "@/lib/setCookies";
import { useAuthStore } from "@/store/useAuthStore";

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get token from URL hash
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("access_token");

        if (!token) {
          toast.error("Falha na autenticação: Token não encontrado");
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
          return;
        }

        // Save token to cookies
        await setCookies({
          name: "accessToken",
          value: token,
        });

        // Decode token to get user info
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );

        const { sub, user_metadata } = JSON.parse(jsonPayload);

        // Update auth store with user info
        setAuthUser({
          userId: sub || "",
          username: user_metadata?.username || "",
          name: user_metadata?.name || "",
        });

        toast.success("Login realizado com sucesso!");

        // Redirect to home page
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        console.error("Error in callback:", error);
        toast.error("Falha na autenticação");

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    }

    handleCallback();
  }, [setAuthUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? <p>Autenticando...</p> : <p>Redirecionando...</p>}
    </div>
  );
};

export default CallbackPage;
