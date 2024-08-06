"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/app/firebase/config"; // Adjust the path as needed
import { Input } from "@/components/input"; // Adjust the path as needed
import { Label } from "@/components/label"; // Adjust the path as needed
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"; // Adjust import if using Next.js routing

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleEmailSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const credential = googleProvider.credentialFromResult(result);
      const token = credential.accessToken;

      console.log("User signed in with Google:", user);

      router.push("/dashboard");

    } catch (error) {
      console.error("Google sign-up error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <div className="max-w-sm w-full p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" /> {/* Replace with your logo */}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-500">Sign Up</h1>
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-purple-300">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error.message}</p>}
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm mb-2 text-purple-300">Or sign up with</p>
          <Input
            type="button"
            value="    Google    "
            onClick={handleGoogleSignUp}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md transition cursor-pointer"
          />
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-purple-300">Already have an account? <a href="/sign-in" className="text-purple-500 hover:underline">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
