"use server";

import axios from "axios";

import { userProps } from "@/store/useAuthStore";

export const signupUserByEmail = async ({
  name,
  email,
  password,
}: userProps) => {
  try {
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
    const response = await axios.post(
      "http://localhost:8000/api/login",
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

// export const getUserProfile = async () => {
//   const cookie = await cookies();
//   const token = cookie.get("accessToken")?.value;
//   console.log(token);
//   try {
//     const response = await axios.get("http://localhost:8000/api/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.error("Erro Axios:", err.response?.data || err.message);
//     } else {
//       console.error("Erro desconhecido:", (err as Error).message);
//     }
//     throw err;
//   }
// };
