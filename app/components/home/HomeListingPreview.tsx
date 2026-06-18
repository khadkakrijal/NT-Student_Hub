"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";

type Listing = {
  id: string;
  title: string;
  suburb: string;
  rent_per_week: number;
  room_type: string | null;
  furnished: boolean | null;
  bills_included: boolean | null;
  listing_images?: { id: string; image_url: string }[];
};

export default function HomeListingPreview({
  listings,
}: {
  listings: Listing[];
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Accommodation
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Latest approved rooms
            </h2>
            <p className="mt-4 max-w-2xl text-violet-50/70">
              Browse trusted accommodation listings reviewed for student safety.
            </p>
          </div>

          <Link
            href="/listings"
            className="rounded-full border border-violet-100/15 px-5 py-3 text-sm font-bold text-violet-50 transition hover:bg-white/10"
          >
            View all listings
          </Link>
        </div>

        {listings.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {listings.map((listing, index) => {
              const imageUrl = listing.listing_images?.[0]?.image_url;

              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={`/listings/${listing.id}`}
                    className="block overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl transition hover:border-fuchsia-300/40"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={listing.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Home className="h-14 w-14 text-violet-100/40" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-black">{listing.title}</h3>

                      <p className="mt-3 flex items-center gap-2 text-sm text-violet-50/70">
                        <MapPin className="h-4 w-4 text-fuchsia-300" />
                        {listing.suburb}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {listing.room_type && <Badge text={listing.room_type} />}
                        {listing.furnished && <Badge text="Furnished" />}
                        {listing.bills_included && (
                          <Badge text="Bills included" />
                        )}
                      </div>

                      <p className="mt-5 text-2xl font-black text-fuchsia-300">
                        ${listing.rent_per_week}/week
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-10 text-center">
            <Home className="mx-auto h-12 w-12 text-fuchsia-300" />
            <h3 className="mt-4 text-2xl font-black">No listings yet</h3>
            <p className="mt-2 text-violet-50/70">
              Approved accommodation listings will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
      {text}
    </span>
  );
}