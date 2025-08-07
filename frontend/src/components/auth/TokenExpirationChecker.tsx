"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";

export const TokenExpirationChecker = () => {
  const { checkTokenExpiration } = useAuthStore();

  useEffect(() => {
    // Check token expiration on component mount
    checkTokenExpiration();

    // Set up interval to check token expiration every minute
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  // This component doesn't render anything
  return null;
};

export default TokenExpirationChecker;
