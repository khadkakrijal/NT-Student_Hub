"use client";

import { useState } from "react";
import AddEventDialog from "./AddEventDialog";
import MyEventsSection from "./MyEventsSection";
import EventsFilterClient from "./EventsFilterClient";

export default function EventsViewClient({
  events,
  myEvents,
  canCreateEvent,
  savedEventIds = [],
}: {
  events: any[];
  myEvents: any[];
  canCreateEvent: boolean;
  savedEventIds?: string[];
}) {
  const [view, setView] = useState<"all" | "mine">("all");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-10">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-[-80px] left-[-80px] h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                {view === "mine" ? "Event Panel" : "Events"}
              </p>

              <h1 className="mt-3 text-2xl font-black md:text-2xl">
                {view === "mine" ? "My Events" : "Discover Events"}
              </h1>

              <p className="mt-4 max-w-2xl text-violet-50/70">
                {view === "mine"
                  ? "Manage events you have submitted. Approved events are visible to students."
                  : "Browse approved student, community, cultural, sports, and networking events across Darwin and NT."}
              </p>
            </div>

            {canCreateEvent && (
              <div className="flex flex-wrap gap-3">
                <AddEventDialog />

                <button
                  type="button"
                  onClick={() => setView(view === "all" ? "mine" : "all")}
                  className="rounded-full border border-violet-100/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {view === "all" ? "See My Events" : "See All Events"}
                </button>
              </div>
            )}
          </div>
        </section>

        {view === "all" ? (
          <EventsFilterClient events={events} savedEventIds={savedEventIds} />
        ) : (
          <MyEventsSection events={myEvents} />
        )}
      </div>
    </main>
  );
}
