"use client";

import { useEffect } from "react";

import setCookies from "@/lib/setCookies";

const CallbackPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("access_token");

    async function fetchCookies() {
      return await setCookies({
        name: "accessToken",
        value: token!,
      });
    }

    fetchCookies();

    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  }, []);
};

export default CallbackPage;
