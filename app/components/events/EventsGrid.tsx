"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import SaveButton from "@/app/components/favorites/SaveButton";

export default function EventsGrid({
  events,
  savedEventIds = [],
}: {
  events: any[];
  savedEventIds?: string[];
}) {
  return (
    <section className="mt-10">
      {events.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl transition hover:bg-white/[0.1]"
            >
              <Link href={`/events/${event.slug || event.id}`}>
                <div className="relative h-52 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                  {event.image_url && (
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                    {event.category || "Event"}
                  </p>

                  <SaveButton
                    itemId={event.id}
                    itemType="event"
                    initialSaved={savedEventIds.includes(event.id)}
                  />
                </div>

                <Link href={`/events/${event.slug || event.id}`}>
                  <h2 className="mt-2 text-2xl font-black text-white hover:text-fuchsia-200">
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">
            No approved events yet
          </h2>
          <p className="mt-2 text-violet-50/70">
            Approved events will appear here.
          </p>
        </div>
      )}
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}