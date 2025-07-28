"use server";

import axios from "axios";

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
