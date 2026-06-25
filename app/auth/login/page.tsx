"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createClient } from "@/app/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Logged in",
      text: "Welcome back to NT Student Hub.",
      timer: 1200,
      showConfirmButton: false,
      background: "#1d0f33",
      color: "#fff",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 px-6 pt-24">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold">Welcome Back</h1>

        <p className="mt-2 text-sm text-violet-50/70">
          Login to continue using NT Student Hub.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-violet-100/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-violet-100/40"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-violet-100/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-violet-100/40"
            required
          />

          <button className="w-full rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300">
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-violet-50/70">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-fuchsia-300">
            Create account
          </Link>
        </p>
      </form>
    </main>
  );
}
