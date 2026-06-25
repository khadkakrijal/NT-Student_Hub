"use client";

import { useState } from "react";
import AddAccommodationDialog from "./AddAccommodationDialog";
import ListingsFilterClient from "./ListingsFilterClient";
import MyListingsSection from "./MyListingsSection";

export default function ListingsViewClient({
  listings,
  myListings,
  canCreateListing,
  savedListingIds = [],
}: {
  listings: any[];
  myListings: any[];
  canCreateListing: boolean;
  savedListingIds?: string[];
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
                {view === "mine" ? "Host Panel" : "Housing"}
              </p>

              <h1 className="mt-3 text-2xl font-black md:text-2xl">
                {view === "mine"
                  ? "My Accommodation Listings"
                  : "Find Student Accommodation"}
              </h1>

              <p className="mt-4 max-w-2xl text-violet-50/70">
                {view === "mine"
                  ? "Manage the rooms and accommodation you have submitted."
                  : "Browse approved student-friendly rooms, shared houses, and temporary stays across Darwin and the Northern Territory."}
              </p>
            </div>

            {canCreateListing && (
              <div className="flex flex-wrap gap-3">
                <AddAccommodationDialog />

                <button
                  type="button"
                  onClick={() => setView(view === "all" ? "mine" : "all")}
                  className="rounded-full border border-violet-100/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {view === "all" ? "See My Listings" : "See All Listings"}
                </button>
              </div>
            )}
          </div>
        </section>

        {view === "all" ? (
          <ListingsFilterClient
            listings={listings}
            savedListingIds={savedListingIds}
          />
        ) : (
          <MyListingsSection listings={myListings} />
        )}
      </div>
    </main>
  );
}
