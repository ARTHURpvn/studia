"use client";

import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginUserByEmail, signupUserByEmail } from "@/lib/auth";
import setCookies from "@/lib/setCookies";

export interface userProps {
  name?: string;
  username?: string;
  email: string;
  password: string;
}

interface userAuth {
  userId: string;
  username: string;
  name: string;
}

interface AuthStore {
  authUser: userAuth;
}

interface AuthStoreActions {
  login: (user: userProps) => Promise<boolean>;
  register: (user: userProps) => Promise<void>;
  logout: () => void;
  setAuthUser: (user: userAuth) => void;
}

export const useAuthStore = create<AuthStore & AuthStoreActions>()(
  persist(
    (set) => ({
      authUser: {
        userId: "",
        username: "",
        name: "",
      },

      login: async (data: userProps) => {
        const responseData = await loginUserByEmail(data);

        if (responseData) {
          toast.success("Login realizado com sucesso!");
          await setCookies({
            name: "accessToken",
            value: responseData.access_token,
          });

          set({
            authUser: {
              userId: responseData.id,
              username: responseData.username,
              name: responseData.name,
            },
          });
          return true;
        } else {
          toast.error("Não foi possível obter o token de acesso.");
          return false;
        }
      },

      register: async (data: userProps) => await signupUserByEmail(data),
      logout: () => set({ authUser: { userId: "", username: "", name: "" } }),
      setAuthUser: (user: userAuth) => set({ authUser: user }),
    }),
    {
      name: "auth-store",
    },
  ),
);
