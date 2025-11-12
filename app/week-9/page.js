"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

   const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (err) {
      console.error("Login error:", err);
      alert("Sign-in failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (err) {
      console.error("Logout error:", err);
      alert("Sign-out failed. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Week 9 — Authentication</h1>

      {!user ? (

        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-700 text-center">
            Sign in with GitHub to access your shopping list.
          </p>
          <button
            onClick={handleLogin}
            className="rounded bg-black text-white px-5 py-2 hover:opacity-90 transition"
          >
            Sign in with GitHub
          </button>
        </div>
      ) : (

<div className="space-y-5 border rounded-lg p-6 shadow-sm text-center bg-white">
          <p>
            Welcome,{" "}
            <span className="font-semibold">
              {user.displayName ?? "User"}
            </span>{" "}
            ({user.email})
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/week-9/shopping-list"
              className="rounded bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 transition"
            >
              Go to Shopping List
            </Link>

            <button
              onClick={handleLogout}
              className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 transition"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
