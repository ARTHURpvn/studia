// src/store/auth.ts
import { create } from "zustand";

import { supabase } from "@/lib/supabase";

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ user: data.user, loading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();
    set({ user: data.user });
  },
}));
