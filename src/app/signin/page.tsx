"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for next 13+
import Link from "next/link"; // Import Link component for navigation

const Signin = () => {
  const router = useRouter();

  // TypeScript types for state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignin = () => {
    // Fetch the stored user data from localStorage (simulating database check)
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      setError("User not found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      // Check if user has admin credentials
      if (email === "areesha@gmail.com" && password === "12345678") {
        router.push("/AdminDashboard");
      } else {
        router.push("/UserDashboard");
      }
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-16 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
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
        <button
          className="w-full py-2 bg-blue-600 text-white rounded"
          onClick={handleSignin}
        >
          Sign In
        </button>
        <p className="text-center mt-4">
          Not registered?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
