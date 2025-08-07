"use client";

import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  loginUserByEmail,
  logoutUser,
  signupUserByEmail,
  validateToken,
} from "@/lib/auth";
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
  logout: () => Promise<void>;
  setAuthUser: (user: userAuth) => void;
  checkTokenExpiration: () => Promise<void>;
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

      logout: async () => {
        await logoutUser();
        set({ authUser: { userId: "", username: "", name: "" } });
      },

      setAuthUser: (user: userAuth) => set({ authUser: user }),

      checkTokenExpiration: async () => {
        try {
          // Validate token using backend endpoint
          const validationResult = await validateToken();

          if (!validationResult.valid) {
            // Token is invalid or expired, log the user out
            console.log(`Token validation failed: ${validationResult.reason}`);
            await logoutUser();
            set({ authUser: { userId: "", username: "", name: "" } });

            // Only show toast for expired tokens, not for missing tokens (which is normal for non-logged in users)
            if (validationResult.reason !== "no-token") {
              toast.error(
                "Sua sessão expirou. Por favor, faça login novamente.",
              );
            }
          }
        } catch (error) {
          console.error("Error checking token validation:", error);
          // If there's an error, it's safer to logout
          await logoutUser();
          set({ authUser: { userId: "", username: "", name: "" } });
        }
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
