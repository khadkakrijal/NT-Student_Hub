"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createClient } from "@/app/lib/supabase/client";

type UserRole = "student" | "host";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (role === "student" && !university.trim()) {
      Swal.fire({
        icon: "warning",
        title: "University required",
        text: "Please enter your university name.",
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          phone,
          university: role === "student" ? university : null,
        },
      },
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: error.message,
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Account created",
      text: "Welcome to NT Student Hub.",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#12091f] px-6 py-32">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-3xl border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold">Join NT Student Hub</h1>

        <p className="mt-2 text-sm text-violet-50/70">
          Create your account to find or post accommodation.
        </p>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-violet-100/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-violet-100/40"
            required
          />

          <select
            value={role}
            onChange={(e) => {
              const selectedRole = e.target.value as UserRole;
              setRole(selectedRole);

              if (selectedRole !== "student") {
                setUniversity("");
              }
            }}
            className="w-full rounded-2xl border border-violet-100/10 bg-[#1d0f33] px-4 py-3 text-white outline-none"
          >
            <option value="student">Student</option>
            <option value="host">Host / Housemate</option>
          </select>

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-violet-100/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-violet-100/40"
            required
          />

          {role === "student" && (
            <input
              placeholder="University name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full rounded-2xl border border-violet-100/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-violet-100/40"
              required
            />
          )}

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
            Create Account
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-violet-50/70">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-fuchsia-300">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
