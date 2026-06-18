"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Grid3X3,
  Home,
  Map,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import SaveButton from "@/app/components/favorites/SaveButton";

const ListingsMapView = dynamic(() => import("./ListingsMapView"), {
  ssr: false,
});

type Listing = {
  id: string;
  title: string;
  description: string | null;
  suburb: string;
  rent_per_week: number;
  bond_amount: number | null;
  available_from: string | null;
  room_type: string | null;
  furnished: boolean | null;
  bills_included: boolean | null;
  gender_preference: string | null;
  contact_method: string | null;
  listing_images?: {
    id: string;
    image_url: string;
  }[];
};

export default function ListingsFilterClient({
  listings,
  savedListingIds = [],
}: {
  listings: Listing[];
  savedListingIds?: string[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [search, setSearch] = useState("");
  const [suburb, setSuburb] = useState("");
  const [roomType, setRoomType] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [furnishedOnly, setFurnishedOnly] = useState(false);
  const [billsIncludedOnly, setBillsIncludedOnly] = useState(false);

  const suburbs = useMemo(
    () => Array.from(new Set(listings.map((item) => item.suburb))).sort(),
    [listings],
  );

  const roomTypes = useMemo(
    () =>
      Array.from(
        new Set(listings.map((item) => item.room_type).filter(Boolean)),
      ).sort() as string[],
    [listings],
  );

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        !keyword ||
        listing.title.toLowerCase().includes(keyword) ||
        listing.suburb.toLowerCase().includes(keyword) ||
        listing.description?.toLowerCase().includes(keyword) ||
        listing.room_type?.toLowerCase().includes(keyword);

      const matchesSuburb = !suburb || listing.suburb === suburb;
      const matchesRoomType = !roomType || listing.room_type === roomType;
      const matchesGender =
        !genderPreference || listing.gender_preference === genderPreference;
      const matchesMaxRent =
        !maxRent || Number(listing.rent_per_week) <= Number(maxRent);
      const matchesFurnished = !furnishedOnly || listing.furnished;
      const matchesBills = !billsIncludedOnly || listing.bills_included;

      return (
        matchesSearch &&
        matchesSuburb &&
        matchesRoomType &&
        matchesGender &&
        matchesMaxRent &&
        matchesFurnished &&
        matchesBills
      );
    });
  }, [
    listings,
    search,
    suburb,
    roomType,
    genderPreference,
    maxRent,
    furnishedOnly,
    billsIncludedOnly,
  ]);

  function clearFilters() {
    setSearch("");
    setSuburb("");
    setRoomType("");
    setGenderPreference("");
    setMaxRent("");
    setFurnishedOnly(false);
    setBillsIncludedOnly(false);
  }

  return (
    <>
      <div className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-fuchsia-300">
          <SlidersHorizontal className="h-5 w-5" />
          <p className="font-bold">Filter accommodation</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-100/45" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, suburb, room type..."
              className="input-style !pl-11"
            />
          </div>

          <select
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            className="input-style bg-[#1d0f33] text-white uppercase"
          >
            <option value="">All suburbs</option>
            {suburbs.map((item) => (
              <option key={item} value={item} className="uppercase">
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            placeholder="Max rent/week"
            className="input-style"
          />

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All room types</option>
            {roomTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">Any gender preference</option>
            <option value="Male preferred">Male preferred</option>
            <option value="Female preferred">Female preferred</option>
            <option value="Couple accepted">Couple accepted</option>
          </select>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={furnishedOnly}
              onChange={(e) => setFurnishedOnly(e.target.checked)}
            />
            Furnished only
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={billsIncludedOnly}
              onChange={(e) => setBillsIncludedOnly(e.target.checked)}
            />
            Bills included
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-violet-50/60">
            Showing{" "}
            <span className="font-bold text-fuchsia-300">
              {filteredListings.length}
            </span>{" "}
            of {listings.length} listings
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
              onClick={() => setViewMode("map")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                viewMode === "map"
                  ? "bg-violet-400 text-[#160524]"
                  : "border border-violet-100/10 text-violet-50/80 hover:bg-white/10"
              }`}
            >
              <Map className="mr-1 inline h-4 w-4" />
              Map
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

      {viewMode === "map" ? (
        <ListingsMapView listings={filteredListings} />
      ) : (
        <section className="mt-10">
          {filteredListings.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredListings.map((listing) => {
                const imageUrl = listing.listing_images?.[0]?.image_url;

                return (
                  <div
                    key={listing.id}
                    className="group overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
                  >
                    <Link href={`/listings/${listing.id}`}>
                      <div className="relative h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={listing.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Home className="h-14 w-14 text-violet-100/40" />
                          </div>
                        )}

                        <div className="absolute left-4 top-4 rounded-full bg-[#1d0f33]/85 px-4 py-2 text-xs font-bold text-fuchsia-200 backdrop-blur">
                          Approved
                        </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {listing.room_type && (
                            <Badge text={listing.room_type} />
                          )}
                          {listing.furnished && <Badge text="Furnished" />}
                          {listing.bills_included && (
                            <Badge text="Bills included" />
                          )}
                        </div>

                        <SaveButton
                          itemId={listing.id}
                          itemType="listing"
                          initialSaved={savedListingIds.includes(listing.id)}
                        />
                      </div>

                      <Link href={`/listings/${listing.id}`}>
                        <h2 className="text-xl font-black text-white transition hover:text-fuchsia-200">
                          {listing.title}
                        </h2>
                      </Link>

                      <div className="mt-4 space-y-3 text-sm text-violet-50/70">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-fuchsia-300" />
                          {listing.suburb}
                        </p>

                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                          {listing.available_from
                            ? `Available from ${formatDate(
                                listing.available_from,
                              )}`
                            : "Availability flexible"}
                        </p>

                        <p className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                          Admin approved listing
                        </p>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-violet-50/50">Rent</p>
                          <p className="text-2xl font-black text-fuchsia-300">
                            ${listing.rent_per_week}/week
                          </p>
                        </div>

                        <Link
                          href={`/listings/${listing.id}`}
                          className="rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
              <Home className="mx-auto h-14 w-14 text-fuchsia-300" />
              <h2 className="mt-5 text-2xl font-black">
                No matching listings
              </h2>
              <p className="mt-2 text-violet-50/70">
                Try changing your filters or clearing them.
              </p>
            </div>
          )}
        </section>
      )}
    </>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
      {text}
    </span>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}