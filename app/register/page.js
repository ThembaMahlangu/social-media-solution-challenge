"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Authenticator from "@/components/background/authenticator";

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", data.user.email);
        setIsLoading(false);
        router.push("/dashboard");
      } else if (!response.ok) {
        setError(data.message);
        console.log(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center">
      <Authenticator />
      <div className="container mx-auto p-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/70 border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-indigo-700">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your details to register for ArticleAI Pro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-gray-600 text-center w-full">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline">
                  Log in here
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
