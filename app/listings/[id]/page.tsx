import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  DollarSign,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { getListingById } from "@/app/api/apiServices/listingService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";

import RecentlyViewedTracker from "@/app/components/recently-viewed/RecentlyViewedTracker";
import SaveButton from "@/app/components/favorites/SaveButton";
import ShareButton from "@/app/components/share/ShareButton";
import ReportButton from "@/app/components/reports/ReportButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;

  const listing = await getListingById(id);
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/auth/login?redirectTo=/listings/${id}`);
  }

  if (!listing) notFound();

  const images = listing.listing_images || [];
  const savedListingIds = await getSavedItemIds("listing");

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32">
      <RecentlyViewedTracker
        item={{
          id: listing.id,
          type: "listing",
          title: listing.title,
          subtitle: listing.suburb || "Darwin",
          href: `/listings/${listing.id}`,
          image: listing.listing_images?.[0]?.image_url || null,
        }}
      />

      <div className="mx-auto max-w-7xl">
        <Link
          href="/listings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl">
              {images.length > 0 ? (
                <div className="grid gap-2 p-2 md:grid-cols-2">
                  <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-white/10">
                    <Image
                      src={images[0].image_url}
                      alt={listing.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="grid gap-2">
                    {images.slice(1, 5).map((image: any) => (
                      <div
                        key={image.id}
                        className="relative h-[204px] overflow-hidden rounded-[1.5rem] bg-white/10"
                      >
                        <Image
                          src={image.image_url}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                  <Home className="h-20 w-20 text-violet-100/40" />
                </div>
              )}
            </div>

            <div className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
              <div className="flex flex-wrap gap-2">
                {listing.room_type && <Badge text={listing.room_type} />}
                {listing.furnished && <Badge text="Furnished" />}
                {listing.bills_included && <Badge text="Bills included" />}
                {listing.gender_preference && (
                  <Badge text={listing.gender_preference} />
                )}
              </div>

              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                {listing.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-violet-50/70">
                <MapPin className="h-5 w-5 text-fuchsia-300" />
                {listing.suburb}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <SaveButton
                  itemId={listing.id}
                  itemType="listing"
                  initialSaved={savedListingIds.includes(listing.id)}
                />

                <ShareButton
                  title={listing.title}
                  text={`Check out this accommodation on NT Student Hub: ${listing.title}`}
                />

                <ReportButton itemId={listing.id} itemType="listing" />
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <InfoCard
                  icon={DollarSign}
                  label="Rent"
                  value={`$${listing.rent_per_week}/week`}
                />

                <InfoCard
                  icon={DollarSign}
                  label="Bond"
                  value={
                    listing.bond_amount
                      ? `$${listing.bond_amount}`
                      : "Not listed"
                  }
                />

                <InfoCard
                  icon={CalendarDays}
                  label="Available"
                  value={
                    listing.available_from
                      ? new Date(listing.available_from).toLocaleDateString()
                      : "Flexible"
                  }
                />
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-black">Description</h2>

                <p className="mt-3 whitespace-pre-line leading-8 text-violet-50/75">
                  {listing.description || "No description provided."}
                </p>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
                Contact
              </p>

              <h2 className="mt-3 text-2xl font-black">Host Information</h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-fuchsia-300" />

                    <div>
                      <p className="text-xs text-violet-50/50">Host</p>

                      {listing.profiles?.id ? (
                        <Link
                          href={`/users/${listing.profiles.id}`}
                          className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200 hover:underline"
                        >
                          {listing.profiles.full_name || "Host"}
                        </Link>
                      ) : (
                        <p className="font-semibold text-white">
                          {listing.profiles?.full_name || "Host"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <SideInfo
                  icon={Phone}
                  label="Contact method"
                  value={
                    listing.contact_method || listing.profiles?.phone || "-"
                  }
                />

                <SideInfo
                  icon={ShieldCheck}
                  label="Safety"
                  value="Approved listing"
                />
              </div>

              {listing.contact_method && (
                <a
                  href={`tel:${listing.contact_method}`}
                  className="mt-6 block rounded-2xl bg-violet-400 px-5 py-3 text-center font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  Contact Host
                </a>
              )}
            </div>

            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <h3 className="text-xl font-black">Safety reminder</h3>

              <p className="mt-3 text-sm leading-7 text-violet-50/70">
                Always inspect the room, confirm the address, and avoid sending
                bond or rent before verifying the accommodation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold text-fuchsia-200">
      {text}
    </span>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-5">
      <Icon className="mb-3 h-5 w-5 text-fuchsia-300" />
      <p className="text-sm text-violet-50/50">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function SideInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-fuchsia-300" />
        <div>
          <p className="text-xs text-violet-50/50">{label}</p>
          <p className="font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}