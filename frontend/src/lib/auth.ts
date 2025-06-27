import axios from "axios";

import { userProps } from "@/store/useAuthStore";

export const signupUserByEmail = async ({
  name,
  email,
  password,
}: userProps) => {
  try {
    await axios.post(
      "http://localhost:8000/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
  }
};

export const loginUserByEmail = async ({ email, password }: userProps) => {
  try {
    return await axios
      .post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => res.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
  }
};
