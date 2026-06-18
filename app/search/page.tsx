import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Compass,
  Home,
  MessageCircle,
  Search,
} from "lucide-react";
import { globalSearch } from "@/app/api/apiServices/searchService";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  const results = await globalSearch(query);

  const totalResults =
    results.listings.length +
    results.events.length +
    results.jobs.length +
    results.posts.length +
    results.guides.length;

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <Search className="relative h-10 w-10 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Search
          </p>

          <h1 className="relative mt-4 text-5xl font-black md:text-5xl">
            Search NT Student Hub
          </h1>

          <p className="relative mt-5 max-w-3xl text-violet-50/70">
            Search housing, events, jobs, community discussions and Darwin guide
            topics in one place.
          </p>

          <form action="/search" className="relative mt-8 flex max-w-3xl gap-3">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search accommodation, jobs, events, suburbs..."
              className="w-full rounded-full border border-violet-100/10 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-violet-100/45 focus:border-fuchsia-300/50"
            />

            <button className="rounded-full bg-violet-400 px-7 py-4 font-bold text-[#160524] transition hover:bg-violet-300">
              Search
            </button>
          </form>
        </section>

        {query && (
          <section className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <p className="text-violet-50/70">
              Showing{" "}
              <span className="font-black text-fuchsia-200">
                {totalResults}
              </span>{" "}
              result{totalResults === 1 ? "" : "s"} for{" "}
              <span className="font-black text-white">“{query}”</span>
            </p>
          </section>
        )}

        {!query ? (
          <EmptySearch />
        ) : totalResults === 0 ? (
          <NoResults query={query} />
        ) : (
          <div className="mt-10 space-y-12">
            <ResultSection
              title="Housing"
              icon={Home}
              items={results.listings.map((item) => ({
                id: item.id,
                title: item.title,
                description:
                  item.description ||
                  `${item.suburb} · $${item.rent_per_week}/week`,
                href: `/listings/${item.id}`,
                meta: item.suburb,
              }))}
            />

            <ResultSection
              title="Events"
              icon={CalendarDays}
              items={results.events.map((item) => ({
                id: item.id,
                title: item.title,
                description:
                  item.description ||
                  `${item.location_name || item.suburb || "Location TBA"}`,
                href: `/events/${item.slug || item.id}`,
                meta: item.category || "Event",
              }))}
            />

            <ResultSection
              title="Jobs"
              icon={Briefcase}
              items={results.jobs.map((item) => ({
                id: item.id,
                title: item.title,
                description:
                  item.description ||
                  `${item.company_name} · ${item.suburb || "Darwin"}`,
                href: `/jobs/${item.slug || item.id}`,
                meta: item.job_type || item.industry || "Job",
              }))}
            />

            <ResultSection
              title="Community"
              icon={MessageCircle}
              items={results.posts.map((item) => ({
                id: item.id,
                title: item.title,
                description: stripHtml(item.content),
                href: `/community/${item.id}`,
                meta: item.category,
              }))}
            />

            <ResultSection
              title="Living in Darwin"
              icon={Compass}
              items={results.guides.map((item) => ({
                id: item.slug,
                title: item.title,
                description: item.description,
                href: `/living-in-darwin/${item.slug}`,
                meta: "Guide",
              }))}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function ResultSection({
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
    meta: string | null;
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
            className="group rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
          >
            {item.meta && (
              <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                {item.meta}
              </span>
            )}

            <h3 className="mt-4 text-2xl font-black group-hover:text-fuchsia-200">
              {item.title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-7 text-violet-50/70">
              {item.description}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300">
              Open <ArrowRight className="h-4 w-4" />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function EmptySearch() {
  return (
    <section className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
      <Search className="mx-auto h-14 w-14 text-fuchsia-300" />
      <h2 className="mt-5 text-2xl font-black">Start searching</h2>
      <p className="mt-2 text-violet-50/70">
        Try searching “Casuarina”, “jobs”, “weather”, “events”, or
        “accommodation”.
      </p>
    </section>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
      <Search className="mx-auto h-14 w-14 text-fuchsia-300" />
      <h2 className="mt-5 text-2xl font-black">No results found</h2>
      <p className="mt-2 text-violet-50/70">
        No matching results for “{query}”. Try another keyword.
      </p>
    </section>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>?/gm, "");
}
