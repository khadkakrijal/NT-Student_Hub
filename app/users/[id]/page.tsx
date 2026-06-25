import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Home,
  MessageCircle,
  PartyPopper,
  User,
} from "lucide-react";
import { createClient } from "@/app/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PublicUserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role, university, created_at")
    .eq("id", id)
    .maybeSingle();

  if (!profile) notFound();

  const [postsRes, eventsRes, listingsRes] = await Promise.all([
    supabase
      .from("community_posts")
      .select("id, title, category, created_at")
      .eq("user_id", id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6),

    supabase
      .from("events")
      .select("id, slug, title, category, event_date")
      .eq("created_by", id)
      .eq("status", "approved")
      .order("event_date", { ascending: false })
      .limit(6),

    supabase
      .from("accommodation_listings")
      .select("id, title, suburb, rent_per_week, created_at")
      .eq("host_id", id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const posts = postsRes.data || [];
  const events = eventsRes.data || [];
  const listings = listingsRes.data || [];

  const firstName = profile.full_name?.split(" ")[0] || "Student";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/community"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>

        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-400 text-3xl font-black text-[#160524]">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Public Profile
            </p>

            <h1 className="mt-3 text-2xl font-black">
              {profile.full_name || "Student"}
            </h1>

            <div className="mt-5 flex flex-wrap gap-3">
              <Badge text={profile.role || "student"} />
              {profile.university && <Badge text={profile.university} />}
              <Badge
                text={`Joined ${
                  profile.created_at
                    ? new Date(profile.created_at).getFullYear()
                    : "-"
                }`}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            icon={MessageCircle}
            label="Community Posts"
            value={posts.length}
          />
          <StatCard icon={PartyPopper} label="Events" value={events.length} />
          <StatCard icon={Home} label="Listings" value={listings.length} />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <ActivityPanel
            title="Community Posts"
            icon={MessageCircle}
            emptyText="No public posts yet."
            items={posts.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: item.category,
              href: `/community/${item.id}`,
            }))}
          />

          <ActivityPanel
            title="Events"
            icon={PartyPopper}
            emptyText="No public events yet."
            items={events.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: item.category || formatDate(item.event_date),
              href: `/events/${item.slug || item.id}`,
            }))}
          />

          <ActivityPanel
            title="Listings"
            icon={Home}
            emptyText="No public listings yet."
            items={listings.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: `${item.suburb} · $${item.rent_per_week}/week`,
              href: `/listings/${item.id}`,
            }))}
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <Icon className="h-7 w-7 text-fuchsia-300" />
      <p className="mt-4 text-sm text-violet-50/60">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function ActivityPanel({
  title,
  icon: Icon,
  items,
  emptyText,
}: {
  title: string;
  icon: React.ElementType;
  emptyText: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    href: string;
  }[];
}) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-6 w-6 text-fuchsia-300" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-2xl bg-white/[0.05] p-4 transition hover:bg-white/[0.09]"
          >
            <p className="font-bold">{item.title}</p>
            <p className="mt-2 text-sm text-violet-50/60">{item.subtitle}</p>
          </Link>
        ))}

        {!items.length && (
          <p className="rounded-2xl bg-white/[0.04] p-4 text-sm text-violet-50/60">
            {emptyText}
          </p>
        )}
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold capitalize text-fuchsia-200">
      {text}
    </span>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
