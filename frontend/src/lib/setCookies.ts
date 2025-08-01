"use server";

import { cookies } from "next/headers";

interface CookieProps {
  name: string;
  value: string;
}

const setCookies = async ({ name, value }: CookieProps) => {
  const cookie = await cookies();
  cookie.set(name, value);
  // Colocar { httpOnly: true, secure: true } quando fizer sistema de logout

  return true;
};

export default setCookies;
