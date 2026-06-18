"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";


export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-violet-100/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
    >
      Logout
    </button>
  );
}