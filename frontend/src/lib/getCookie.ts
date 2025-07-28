"use server";

import { cookies } from "next/headers";

const getCookie = async (name: string) => {
  const cookie = await cookies();
  return cookie.get(name)?.value;
};

export default getCookie;
