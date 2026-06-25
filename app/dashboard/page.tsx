import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Dashboard
              </p>

              <h1 className="mt-3 text-2xl font-black">
                Welcome, {profile?.full_name || user.email}
              </h1>

              <p className="mt-3 text-violet-50/70">
                Account type:{" "}
                <span className="font-semibold text-violet-200">
                  {profile?.role || "student"}
                </span>
              </p>
            </div>

            <LogoutButton />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Link
              href="/listings"
              className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <h2 className="text-xl font-bold">Browse Housing</h2>
              <p className="mt-2 text-sm text-violet-50/65">
                Find approved student accommodation.
              </p>
            </Link>

            <Link
              href="/listings/new"
              className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <h2 className="text-xl font-bold">Post Accommodation</h2>
              <p className="mt-2 text-sm text-violet-50/65">
                Submit a room listing for approval.
              </p>
            </Link>

            <Link
              href="/admin"
              className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <h2 className="text-xl font-bold">Admin Review</h2>
              <p className="mt-2 text-sm text-violet-50/65">
                Review pending listings if you are an admin.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
