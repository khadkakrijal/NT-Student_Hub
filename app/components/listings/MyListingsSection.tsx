"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  Home,
  MapPin,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import AddAccommodationDialog from "./AddAccommodationDialog";
import EditAccommodationDialog from "./EditAccommodationDialog";
import DeleteMyListingButton from "./DeleteMyListingButton";

export default function MyListingsSection({ listings }: { listings: any[] }) {
  const stats = {
    total: listings.length,
    pending: listings.filter((item) => item.status === "pending").length,
    approved: listings.filter((item) => item.status === "approved").length,
    rejected: listings.filter((item) => item.status === "rejected").length,
  };

  return (
    <>
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Approved" value={stats.approved} />
        <StatCard label="Rejected" value={stats.rejected} />
      </section>

      <section className="mt-10">
        {listings.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {listings.map((listing) => {
              const imageUrl = listing.listing_images?.[0]?.image_url;

              return (
                <div
                  key={listing.id}
                  className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl"
                >
                  <div className="grid md:grid-cols-[220px_1fr]">
                    <div className="relative h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 md:h-full">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={listing.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Home className="h-12 w-12 text-violet-100/40" />
                        </div>
                      )}

                      <div className="absolute left-4 top-4">
                        <StatusBadge status={listing.status || "pending"} />
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-2xl font-black">{listing.title}</h2>

                      <div className="mt-4 space-y-2 text-sm text-violet-50/70">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-fuchsia-300" />
                          {listing.suburb}
                        </p>

                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                          {listing.available_from
                            ? new Date(
                                listing.available_from,
                              ).toLocaleDateString()
                            : "Flexible availability"}
                        </p>

                        <p className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                          {listing.status === "approved"
                            ? "Visible to students"
                            : listing.status === "rejected"
                              ? "Needs changes before approval"
                              : "Waiting for admin review"}
                        </p>

                        {listing.status === "rejected" &&
                          listing.rejection_reason && (
                            <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4">
                              <p className="text-sm font-bold text-red-200">
                                Rejection reason
                              </p>
                              <p className="mt-2 text-sm leading-6 text-red-100/80">
                                {listing.rejection_reason}
                              </p>
                            </div>
                          )}
                      </div>

                      <p className="mt-5 text-2xl font-black text-fuchsia-300">
                        ${listing.rent_per_week}/week
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {listing.status === "approved" && (
                          <Link
                            href={`/listings/${listing.id}`}
                            className="rounded-full border border-violet-100/15 px-4 py-2 text-xs font-bold text-violet-50 hover:bg-white/10"
                          >
                            <Eye className="mr-1 inline h-3 w-3" />
                            View
                          </Link>
                        )}

                        <EditAccommodationDialog listing={listing} />
                        <DeleteMyListingButton listingId={listing.id} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
            <PlusCircle className="mx-auto h-14 w-14 text-fuchsia-300" />
            <h2 className="mt-5 text-2xl font-black">
              No accommodation posted yet
            </h2>
            <p className="mt-2 text-violet-50/70">
              Create your first listing and submit it for admin approval.
            </p>

            <div className="mt-6">
              <AddAccommodationDialog />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <p className="text-sm text-violet-50/55">{label}</p>
      <p className="mt-2 text-2xl font-black text-fuchsia-200">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "approved"
      ? "bg-emerald-400/15 text-emerald-200"
      : status === "rejected"
        ? "bg-red-400/15 text-red-200"
        : "bg-yellow-400/15 text-yellow-200";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize backdrop-blur ${style}`}
    >
      {status}
    </span>
  );
}
