'use client';

import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/app/firebase/config"; // Adjust the path as needed
import { Input } from "@/components/input"; // Adjust the path as needed
import { Label } from "@/components/label"; // Adjust the path as needed
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation"; // Adjust import if using Next.js routing

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleEmailSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google:", result.user);
      router.push("/user-init"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/user-init"); // Redirect after successful sign-in with email
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <div className="max-w-sm w-full p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" /> {/* Replace with your logo */}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-500">Sign In</h1>
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-purple-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-purple-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm mb-2 text-purple-300">Or sign in with</p>
          <Input
            type="button"
            value="    Google    "
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md transition cursor-pointer"
          />
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-purple-300">Don't have an account? <a href="/sign-up" className="text-purple-500 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
