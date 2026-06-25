"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeEventsPreview({ events }: { events: any[] }) {
  return (
    <section className="px-6 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Events
            </p>
            <h2 className="mt-3 text-2xl font-black md:text-2xl">
              What’s happening around Darwin
            </h2>
            <p className="mt-4 max-w-2xl text-violet-50/70">
              Discover student events, cultural programs, sports, networking,
              and community activities.
            </p>
          </div>

          <Link
            href="/events"
            className="rounded-full border border-violet-100/15 px-5 py-3 text-sm font-bold text-violet-50 transition hover:bg-white/10"
          >
            View all events
          </Link>
        </div>

        {events.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/events/${event.slug || event.id}`}
                  className="block overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl transition hover:border-fuchsia-300/40"
                >
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

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                      {event.category || "Event"}
                    </p>

                    <h3 className="mt-3 text-xl font-black">{event.title}</h3>

                    <p className="mt-4 flex items-center gap-2 text-sm text-violet-50/70">
                      <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                      {formatDate(event.event_date)}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-violet-50/70">
                      <MapPin className="h-4 w-4 text-fuchsia-300" />
                      {event.location_name || event.suburb || "Location TBA"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyCard text="Approved events will appear here." />
        )}
      </div>
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

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-10 text-center text-violet-50/70">
      {text}
    </div>
  );
}
