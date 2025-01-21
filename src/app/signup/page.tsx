"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import Link from "next/link";

const Signup = () => {
  const router = useRouter();

  // TypeScript types for state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Store user data in localStorage (for this example)
    localStorage.setItem("user", JSON.stringify({ email, password }));

    // Redirect to Signin page
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full py-2 bg-blue-600 text-white rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
