import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
  PlusCircle,
} from "lucide-react";

type RecentlyAdded = {
  listings: any[];
  jobs: any[];
  events: any[];
  posts: any[];
};

export default function HomeRecentlyAdded({
  recentlyAdded,
}: {
  recentlyAdded: RecentlyAdded;
}) {
  return (
    <section className="relative overflow-hidden px-6 py-5">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-fuchsia-300">
            <PlusCircle className="h-4 w-4" />
            Recently Added
          </div>

          <h2 className="mt-4 text-2xl font-black md:text-2xl">
            New on NT Student Hub.
          </h2>

          <p className="mt-4 max-w-2xl text-violet-50/70">
            Latest housing, jobs, events and community discussions added to the
            platform.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-4">
          <RecentColumn
            title="Housing"
            href="/listings"
            icon={Home}
            items={recentlyAdded.listings.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: `${item.suburb} · $${item.rent_per_week}/week`,
              href: `/listings/${item.id}`,
            }))}
          />

          <RecentColumn
            title="Jobs"
            href="/jobs"
            icon={Briefcase}
            items={recentlyAdded.jobs.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: `${item.company_name} · ${item.suburb || "Darwin"}`,
              href: `/jobs/${item.slug || item.id}`,
            }))}
          />

          <RecentColumn
            title="Events"
            href="/events"
            icon={CalendarDays}
            items={recentlyAdded.events.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle:
                item.location_name || item.suburb || item.category || "Event",
              href: `/events/${item.slug || item.id}`,
            }))}
          />

          <RecentColumn
            title="Community"
            href="/community"
            icon={MessageCircle}
            items={recentlyAdded.posts.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: item.category,
              href: `/community/${item.id}`,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function RecentColumn({
  title,
  href,
  icon: Icon,
  items,
}: {
  title: string;
  href: string;
  icon: React.ElementType;
  items: {
    id: string;
    title: string;
    subtitle: string;
    href: string;
  }[];
}) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-fuchsia-300" />
          <h3 className="text-2xl font-black">{title}</h3>
        </div>

        <Link
          href={href}
          className="text-sm font-bold text-fuchsia-300 hover:text-fuchsia-200"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-2xl bg-white/[0.05] p-4 transition hover:bg-white/[0.09]"
          >
            <p className="line-clamp-2 font-bold text-white">{item.title}</p>
            <p className="mt-2 text-sm text-violet-50/60">{item.subtitle}</p>

            <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-fuchsia-300">
              Open <ArrowRight className="h-3 w-3" />
            </p>
          </Link>
        ))}

        {!items.length && (
          <div className="rounded-2xl bg-white/[0.04] p-4 text-sm text-violet-50/60">
            No recent items yet.
          </div>
        )}
      </div>
    </div>
  );
}
