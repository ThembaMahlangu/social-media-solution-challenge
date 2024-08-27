"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Authenticator() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  async function checkTokenValidity() {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register"
      ) {
        return;
      } else {
        router.push("/login");
      }
      return;
    }

    try {
      const response = await fetch("/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authToken }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        if (["/", "/login", "/register"].includes(pathname)) {
          router.push("/dashboard");
        }
        setLoading(false);
      } else {
        alert("Your session has expired, please log in again.");
        localStorage.clear();
        router.push("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error validating token:", error.message);
      localStorage.clear();
      router.push("/login");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      checkTokenValidity();
      hasFetched.current = true;
    }
  }, []);

  return null;
}
