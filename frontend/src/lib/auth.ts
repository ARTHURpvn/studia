import axios from "axios";
import { userProps } from "@/store/useAuthStore";

export const signupUserByEmail = async ({
  name,
  email,
  password,
}: userProps) => {
  try {
    // A requisição em si está correta
    const response = await axios.post(
      "http://localhost:8000/api/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // É bom retornar os dados em caso de sucesso
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err; // CORREÇÃO: Re-lança o erro para o formulário poder capturá-lo
  }
};

export const loginUserByEmail = async ({
  email,
  password,
}: Omit<userProps, "name">) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login", // CORREÇÃO: Adicionado o /api
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err; // CORREÇÃO: Re-lança o erro para o formulário poder capturá-lo
  }
};