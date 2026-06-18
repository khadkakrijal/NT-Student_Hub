import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
} from "lucide-react";
import { getMyFavorites } from "@/app/api/apiServices/favoriteService";

export default async function SavedPage() {
  const saved = await getMyFavorites();

  const total =
    saved.listings.length +
    saved.events.length +
    saved.jobs.length +
    saved.posts.length;

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <Bookmark className="h-10 w-10 text-fuchsia-300" />

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Saved
          </p>

          <h1 className="mt-4 text-5xl font-black">My Saved Items</h1>

          <p className="mt-5 max-w-3xl text-violet-50/70">
            View accommodation, events, jobs and community posts you saved.
          </p>
        </section>

        {total === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
            <Bookmark className="mx-auto h-14 w-14 text-fuchsia-300" />
            <h2 className="mt-5 text-2xl font-black">No saved items yet</h2>
            <p className="mt-2 text-violet-50/70">
              Start saving housing, events, jobs or community posts.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            <SavedSection
              title="Housing"
              icon={Home}
              items={saved.listings.map((item) => ({
                id: item.id,
                title: item.title,
                description: `${item.suburb} · $${item.rent_per_week}/week`,
                href: `/listings/${item.id}`,
              }))}
            />

            <SavedSection
              title="Events"
              icon={CalendarDays}
              items={saved.events.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.suburb || item.location_name || "Event",
                href: `/events/${item.slug || item.id}`,
              }))}
            />

            <SavedSection
              title="Jobs"
              icon={Briefcase}
              items={saved.jobs.map((item) => ({
                id: item.id,
                title: item.title,
                description: `${item.company_name} · ${item.suburb || "Darwin"}`,
                href: `/jobs/${item.slug || item.id}`,
              }))}
            />

            <SavedSection
              title="Community"
              icon={MessageCircle}
              items={saved.posts.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.category,
                href: `/community/${item.id}`,
              }))}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function SavedSection({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: {
    id: string;
    title: string;
    description: string;
    href: string;
  }[];
}) {
  if (!items.length) return null;

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-7 w-7 text-fuchsia-300" />
        <h2 className="text-3xl font-black">{title}</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40"
          >
            <h3 className="text-2xl font-black group-hover:text-fuchsia-200">
              {item.title}
            </h3>

            <p className="mt-3 text-sm text-violet-50/70">{item.description}</p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300">
              Open <ArrowRight className="h-4 w-4" />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
