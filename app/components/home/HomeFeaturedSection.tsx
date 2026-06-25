import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
  Star,
} from "lucide-react";

type FeaturedContent = {
  listing: any | null;
  job: any | null;
  event: any | null;
  post: any | null;
};

export default function HomeFeaturedSection({
  featured,
}: {
  featured: FeaturedContent;
}) {
  const items = [
    featured.listing && {
      title: featured.listing.title,
      label: "Featured Housing",
      description: `${featured.listing.suburb} · $${featured.listing.rent_per_week}/week`,
      href: `/listings/${featured.listing.id}`,
      icon: Home,
    },
    featured.job && {
      title: featured.job.title,
      label: "Featured Job",
      description: `${featured.job.company_name} · ${featured.job.suburb || "Darwin"}`,
      href: `/jobs/${featured.job.slug}`,
      icon: Briefcase,
    },
    featured.event && {
      title: featured.event.title,
      label: "Featured Event",
      description:
        featured.event.location_name || featured.event.suburb || "Event",
      href: `/events/${featured.event.slug || featured.event.id}`,
      icon: CalendarDays,
    },
    featured.post && {
      title: featured.post.title,
      label: "Featured Discussion",
      description: featured.post.category,
      href: `/community/${featured.post.id}`,
      icon: MessageCircle,
    },
  ].filter(Boolean) as {
    title: string;
    label: string;
    description: string;
    href: string;
    icon: React.ElementType;
  }[];

  if (!items.length) return null;

  return (
    <section className="px-6 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm font-bold text-yellow-200">
            <Star className="h-4 w-4 fill-yellow-200" />
            Featured This Week
          </div>

          <h2 className="mt-4 text-2xl font-black md:text-2xl">
            Recommended for students.
          </h2>

          <p className="mt-4 max-w-2xl text-violet-50/70">
            Hand-picked housing, jobs, events and discussions from NT Student
            Hub.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[2rem] border border-yellow-300/15 bg-gradient-to-br from-yellow-300/10 to-fuchsia-400/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-yellow-300/40"
            >
              <item.icon className="h-8 w-8 text-yellow-200" />

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-yellow-200">
                {item.label}
              </p>

              <h3 className="mt-3 text-2xl font-black text-white group-hover:text-fuchsia-200">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-violet-50/70">
                {item.description}
              </p>

              <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300">
                View <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
