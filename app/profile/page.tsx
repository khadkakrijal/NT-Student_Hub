import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  CalendarDays,
  Home,
  LayoutDashboard,
  MessageCircle,
  PlusCircle,
  User,
} from "lucide-react";
import { createClient } from "../lib/supabase/server";
import RecentlyViewedSection from "../components/recently-viewed/RecentlyViewedSection";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, email, role, phone, university, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile fetch error:", error.message);
  }

  const [savedCount, myListingsCount, myEventsCount, communityPostsCount] =
    await Promise.all([
      getCount(supabase, "favorites", "user_id", user.id),
      getCount(supabase, "accommodation_listings", "host_id", user.id),
      getCount(supabase, "events", "created_by", user.id),
      getCount(supabase, "community_posts", "user_id", user.id),
    ]);

  const role = profile?.role || "student";
  const firstName = profile?.full_name?.split(" ")[0] || "Student";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-400 text-2xl font-black text-[#160524]">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                My Dashboard
              </p>

              <h1 className="mt-3 text-2xl font-black md:text-2xl">
                Welcome back, {firstName} 👋
              </h1>

              <p className="mt-4 max-w-2xl text-violet-50/70">
                Manage your profile, saved items, listings, events and community
                activity from one place.
              </p>
            </div>

            <div className="rounded-full bg-violet-400/15 px-5 py-3 text-sm font-bold capitalize text-fuchsia-200">
              {role}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard
            icon={Bookmark}
            label="Saved Items"
            value={savedCount}
            href="/saved"
          />
          <StatCard
            icon={Home}
            label="My Listings"
            value={myListingsCount}
            href="/listings"
          />
          <StatCard
            icon={CalendarDays}
            label="My Events"
            value={myEventsCount}
            href="/events"
          />
          <StatCard
            icon={MessageCircle}
            label="Community Posts"
            value={communityPostsCount}
            href="/community"
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <User className="h-6 w-6 text-fuchsia-300" />
              <h2 className="text-2xl font-black">Profile Information</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ProfileItem label="Full Name" value={profile?.full_name} />
              <ProfileItem label="Email" value={profile?.email || user.email} />
              <ProfileItem label="Role" value={role} />
              <ProfileItem label="Phone" value={profile?.phone} />
              <ProfileItem label="University" value={profile?.university} />
              <ProfileItem
                label="Joined"
                value={
                  profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : "-"
                }
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Quick Actions</h2>

            <div className="mt-5 grid gap-3">
              <QuickAction
                href="/listings"
                icon={Home}
                label="Browse Housing"
              />
              <QuickAction href="/jobs" icon={Briefcase} label="Find Jobs" />
              <QuickAction
                href="/events"
                icon={CalendarDays}
                label="Explore Events"
              />
              <QuickAction
                href="/community"
                icon={MessageCircle}
                label="Ask Community"
              />

              {(role === "host" || role === "admin") && (
                <QuickAction
                  href="/listings"
                  icon={PlusCircle}
                  label="Post Accommodation"
                />
              )}

              {role === "admin" && (
                <QuickAction
                  href="/admin"
                  icon={LayoutDashboard}
                  label="Admin Dashboard"
                />
              )}
            </div>
          </div>
          <RecentlyViewedSection />
        </section>
      </div>
    </main>
  );
}

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  column: string,
  value: string,
) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(column, value);

  if (error) {
    console.error(`Count error for ${table}:`, error.message);
    return 0;
  }

  return count || 0;
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40"
    >
      <Icon className="h-7 w-7 text-fuchsia-300" />
      <p className="mt-4 text-sm text-violet-50/60">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </Link>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-violet-100/10 bg-white/[0.05] p-5">
      <p className="text-sm text-violet-50/50">{label}</p>
      <p className="mt-2 font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-3 text-sm font-bold text-violet-50/80 transition hover:bg-white/[0.09] hover:text-white"
    >
      <Icon className="h-5 w-5 text-fuchsia-300" />
      {label}
    </Link>
  );
}
