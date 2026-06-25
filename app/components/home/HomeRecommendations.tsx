import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Lightbulb,
  MessageCircle,
} from "lucide-react";

type RecommendationData = {
  suburbs: string[];
  jobs: any[];
  events: any[];
  posts: any[];
};

export default function HomeRecommendations({
  recommendations,
}: {
  recommendations: RecommendationData;
}) {
  const hasRecommendations =
    recommendations.jobs.length ||
    recommendations.events.length ||
    recommendations.posts.length;

  if (!recommendations.suburbs.length || !hasRecommendations) {
    return null;
  }

  const suburbText = recommendations.suburbs.slice(0, 3).join(", ");

  return (
    <section className="relative overflow-hidden px-6 py-5">
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-fuchsia-300">
            <Lightbulb className="h-4 w-4" />
            Recommended for you
          </div>

          <h2 className="mt-4 text-2xl font-black md:text-2xl">
            Based on your saved housing.
          </h2>

          <p className="mt-4 max-w-2xl text-violet-50/70">
            You saved accommodation around{" "}
            <span className="font-bold text-fuchsia-200">{suburbText}</span>.
            Here are related jobs, events and discussions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <RecommendationColumn
            title="Nearby Jobs"
            href="/jobs"
            icon={Briefcase}
            items={recommendations.jobs.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: `${item.company_name} · ${item.suburb || "Darwin"}`,
              href: `/jobs/${item.slug || item.id}`,
            }))}
          />

          <RecommendationColumn
            title="Nearby Events"
            href="/events"
            icon={CalendarDays}
            items={recommendations.events.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: item.location_name || item.suburb || item.category,
              href: `/events/${item.slug || item.id}`,
            }))}
          />

          <RecommendationColumn
            title="Related Discussions"
            href="/community"
            icon={MessageCircle}
            items={recommendations.posts.map((item) => ({
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

function RecommendationColumn({
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
  if (!items.length) return null;

  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-fuchsia-300" />
          <h3 className="text-2xl font-black">{title}</h3>
        </div>

        <Link href={href} className="text-sm font-bold text-fuchsia-300">
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
      </div>
    </div>
  );
}
