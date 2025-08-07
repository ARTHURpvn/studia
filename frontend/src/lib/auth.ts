"use server";

import axios from "axios";
import { cookies } from "next/headers";

import getCookie from "@/lib/getCookie";
import { userProps } from "@/store/useAuthStore";

export const signupUserByEmail = async ({
  name,
  username,
  email,
  password,
}: userProps) => {
  try {
    const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

    const response = await axios.post(
      `${backend_host}/auth/signup`,
      {
        name,
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

export const loginUserByEmail = async ({ email, password }: userProps) => {
  try {
    const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
    const response = await axios.post(
      `${backend_host}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

export const loginUserByGoogle = async () => {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  try {
    const response = await axios.get(`${backend_host}/auth/signup`);
    console.log(response);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

export const validateToken = async () => {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  const token = await getCookie("accessToken");

  if (!token) {
    return { valid: false, reason: "no-token" };
  }

  try {
    await axios.get(`${backend_host}/auth/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the request is successful, the token is valid
    return { valid: true };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
      // Return specific error reason if provided by the backend
      return {
        valid: false,
        reason: err.response?.data?.reason || "invalid-token",
      };
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
      return { valid: false, reason: "unknown-error" };
    }
  }
};

export const logoutUser = async () => {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  const token = await getCookie("accessToken");
  const cookie = await cookies();
  try {
    const response = await axios.get(`${backend_host}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    cookie.delete("accessToken");
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};
