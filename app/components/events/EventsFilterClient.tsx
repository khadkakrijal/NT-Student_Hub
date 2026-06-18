"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Grid3X3,
  MapPin,
  PartyPopper,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import SaveButton from "@/app/components/favorites/SaveButton";

type ViewMode = "grid" | "calendar";
type SortOption = "featured" | "upcoming" | "free";

type EventItem = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  event_date: string;
  location_name: string | null;
  suburb: string | null;
  image_url: string | null;
  is_free: boolean | null;
  ticket_price: number | null;
  featured?: boolean | null;
};

export default function EventsFilterClient({
  events,
  savedEventIds = [],
}: {
  events: EventItem[];
  savedEventIds?: string[];
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [suburb, setSuburb] = useState("");
  const [priceType, setPriceType] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.category).filter(Boolean)),
      ).sort() as string[],
    [events],
  );

  const suburbs = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.suburb).filter(Boolean)),
      ).sort() as string[],
    [events],
  );

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        !keyword ||
        event.title.toLowerCase().includes(keyword) ||
        event.description?.toLowerCase().includes(keyword) ||
        event.category?.toLowerCase().includes(keyword) ||
        event.suburb?.toLowerCase().includes(keyword) ||
        event.location_name?.toLowerCase().includes(keyword);

      const matchesCategory = !category || event.category === category;
      const matchesSuburb = !suburb || event.suburb === suburb;

      const matchesPrice =
        !priceType ||
        (priceType === "free" && event.is_free) ||
        (priceType === "paid" && !event.is_free);

      const matchesDate = matchesDateFilter(event.event_date, dateFilter);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSuburb &&
        matchesPrice &&
        matchesDate
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return getDateTime(a.event_date) - getDateTime(b.event_date);
      }

      if (sortBy === "free") {
        if (a.is_free && !b.is_free) return -1;
        if (!a.is_free && b.is_free) return 1;
        return getDateTime(a.event_date) - getDateTime(b.event_date);
      }

      return getDateTime(a.event_date) - getDateTime(b.event_date);
    });
  }, [events, search, category, suburb, priceType, dateFilter, sortBy]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSuburb("");
    setPriceType("");
    setDateFilter("");
    setSortBy("featured");
  }

  return (
    <>
      <div className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-fuchsia-300">
          <SlidersHorizontal className="h-5 w-5" />
          <p className="font-bold">Filter events</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-100/45" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event, category, suburb..."
              className="input-style !pl-11"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="featured">Featured first</option>
            <option value="upcoming">Upcoming first</option>
            <option value="free">Free first</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All suburbs</option>
            {suburbs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">Free or paid</option>
            <option value="free">Free only</option>
            <option value="paid">Paid only</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">Any date</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-violet-50/60">
            Showing{" "}
            <span className="font-bold text-fuchsia-300">
              {filteredEvents.length}
            </span>{" "}
            of {events.length} events
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                viewMode === "grid"
                  ? "bg-violet-400 text-[#160524]"
                  : "border border-violet-100/10 text-violet-50/80 hover:bg-white/10"
              }`}
            >
              <Grid3X3 className="mr-1 inline h-4 w-4" />
              Grid
            </button>

            <button
              onClick={() => setViewMode("calendar")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                viewMode === "calendar"
                  ? "bg-violet-400 text-[#160524]"
                  : "border border-violet-100/10 text-violet-50/80 hover:bg-white/10"
              }`}
            >
              <CalendarDays className="mr-1 inline h-4 w-4" />
              Calendar
            </button>

            <button
              onClick={clearFilters}
              className="rounded-full border border-violet-100/10 px-4 py-2 text-sm font-semibold text-violet-50/80 transition hover:bg-white/10"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <EventsCalendarView events={filteredEvents} />
      ) : (
        <EventsGrid events={filteredEvents} savedEventIds={savedEventIds} />
      )}
    </>
  );
}

function EventsGrid({
  events,
  savedEventIds,
}: {
  events: EventItem[];
  savedEventIds: string[];
}) {
  return (
    <section className="mt-10">
      {events.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`overflow-hidden rounded-[2rem] border backdrop-blur-xl transition hover:-translate-y-1 ${
                event.featured
                  ? "border-yellow-300/30 bg-yellow-300/10"
                  : "border-violet-100/10 bg-white/[0.06] hover:bg-white/[0.1]"
              }`}
            >
              <Link href={`/events/${event.slug || event.id}`}>
                <div className="relative h-52 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                  {event.image_url ? (
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PartyPopper className="h-14 w-14 text-violet-100/40" />
                    </div>
                  )}

                  {event.featured && (
                    <div className="absolute left-4 top-4 rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-[#160524]">
                      <Star className="mr-1 inline h-3 w-3 fill-[#160524]" />
                      Featured
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {isToday(event.event_date) && <Badge text="Today" />}
                    {isThisWeek(event.event_date) && <Badge text="This week" />}
                    <Badge text={event.category || "Event"} />
                    <Badge
                      text={
                        event.is_free
                          ? "Free"
                          : event.ticket_price
                            ? `$${event.ticket_price}`
                            : "Paid"
                      }
                    />
                  </div>

                  <SaveButton
                    itemId={event.id}
                    itemType="event"
                    initialSaved={savedEventIds.includes(event.id)}
                  />
                </div>

                <Link href={`/events/${event.slug || event.id}`}>
                  <h2 className="mt-4 text-2xl font-black text-white hover:text-fuchsia-200">
                    {event.title}
                  </h2>
                </Link>

                <div className="mt-4 space-y-2 text-sm text-violet-50/70">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                    {formatDate(event.event_date)}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-fuchsia-300" />
                    {event.location_name || event.suburb || "Location TBA"}
                  </p>
                </div>

                <Link
                  href={`/events/${event.slug || event.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300"
                >
                  View event <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyEvents />
      )}
    </section>
  );
}

function EventsCalendarView({ events }: { events: EventItem[] }) {
  const now = new Date();

  const monthEvents = events.filter((event) => {
    const date = new Date(event.event_date);
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <section className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black">
            {now.toLocaleString("en-AU", { month: "long", year: "numeric" })}
          </h2>
          <p className="mt-1 text-sm text-violet-50/60">
            Calendar view for this month.
          </p>
        </div>

        <p className="rounded-full bg-violet-400/15 px-4 py-2 text-sm font-bold text-fuchsia-200">
          {monthEvents.length} event{monthEvents.length === 1 ? "" : "s"} this
          month
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-violet-50/50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((day, index) => {
          const dayEvents =
            day === null
              ? []
              : monthEvents.filter(
                  (event) => new Date(event.event_date).getDate() === day,
                );

          return (
            <div
              key={index}
              className="min-h-28 rounded-2xl border border-violet-100/10 bg-white/[0.04] p-2"
            >
              {day && (
                <>
                  <p className="mb-2 text-sm font-bold text-violet-50/70">
                    {day}
                  </p>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug || event.id}`}
                        className="block rounded-xl bg-fuchsia-400/15 px-2 py-1 text-left text-[11px] font-bold text-fuchsia-100 hover:bg-fuchsia-400/25"
                      >
                        {event.title}
                      </Link>
                    ))}

                    {dayEvents.length > 2 && (
                      <p className="text-[11px] text-violet-50/50">
                        +{dayEvents.length - 2} more
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EmptyEvents() {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
      <PartyPopper className="mx-auto h-14 w-14 text-fuchsia-300" />
      <h2 className="mt-5 text-2xl font-black text-white">
        No matching events
      </h2>
      <p className="mt-2 text-violet-50/70">
        Try changing your filters or clearing them.
      </p>
    </div>
  );
}

function matchesDateFilter(eventDate: string, filter: string) {
  if (!filter) return true;

  if (filter === "today") return isToday(eventDate);
  if (filter === "week") return isThisWeek(eventDate);
  if (filter === "month") return isThisMonth(eventDate);

  return true;
}

function getDateTime(date: string) {
  return new Date(date).getTime();
}

function isToday(date: string) {
  const now = new Date();
  const eventDate = new Date(date);

  return (
    eventDate.getFullYear() === now.getFullYear() &&
    eventDate.getMonth() === now.getMonth() &&
    eventDate.getDate() === now.getDate()
  );
}

function isThisWeek(date: string) {
  const now = new Date();
  const eventDate = new Date(date);

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekEnd = new Date(todayStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  return eventDate >= todayStart && eventDate < weekEnd;
}

function isThisMonth(date: string) {
  const now = new Date();
  const eventDate = new Date(date);

  return (
    eventDate.getFullYear() === now.getFullYear() &&
    eventDate.getMonth() === now.getMonth()
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
      {text}
    </span>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}