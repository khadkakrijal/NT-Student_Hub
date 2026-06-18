import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  Ticket,
  User,
} from "lucide-react";

import EventInterestButton from "@/app/components/events/EventInterestButton";
import SaveButton from "@/app/components/favorites/SaveButton";
import ReportButton from "@/app/components/reports/ReportButton";
import ShareButton from "@/app/components/share/ShareButton";

import {
  getCurrentUserEventInterest,
  getEventBySlug,
} from "@/app/api/apiServices/eventService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";
import RecentlyViewedTracker from "@/app/components/recently-viewed/RecentlyViewedTracker";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/auth/login?redirectTo=/events/${slug}`);
  }

  if (!event || event.status !== "approved") notFound();

  const currentInterest = await getCurrentUserEventInterest(event.id);
  const savedEventIds = await getSavedItemIds("event");
  const interestCount = event.event_interests?.length || 0;

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32">
      <RecentlyViewedTracker
        item={{
          id: event.id,
          type: "event",
          title: event.title,
          subtitle: event.organizer_name || "Community Event",
          href: `/events/${event.slug}`,
          image: event.image_url,
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>

        <section className="overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl">
          <div className="relative h-80 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
            {event.image_url ? (
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                unoptimized
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <PartyPopper className="h-20 w-20 text-violet-100/40" />
              </div>
            )}

            <div className="absolute left-6 top-6 rounded-full bg-[#1d0f33]/85 px-4 py-2 text-xs font-bold text-fuchsia-200 backdrop-blur">
              {event.category || "Event"}
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              {event.title}
            </h1>

            <p className="mt-4 text-violet-50/65">
              Organized by {event.organizer_name || "Community member"}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge text={event.is_free ? "Free event" : "Paid event"} />
              {event.featured && <Badge text="Featured" />}
              <Badge text={`${interestCount} interested`} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <EventInterestButton
                eventId={event.id}
                interested={Boolean(currentInterest)}
                count={interestCount}
              />

              <SaveButton
                itemId={event.id}
                itemType="event"
                initialSaved={savedEventIds.includes(event.id)}
              />

              <ShareButton
                title={event.title}
                text={`Check out this event on NT Student Hub: ${event.title}`}
              />

              <ReportButton itemId={event.id} itemType="event" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">About this event</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-violet-50/75">
              {event.description || "No description provided."}
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black">Event Info</h2>

              <div className="mt-5 space-y-4">
                <SideInfo
                  icon={CalendarDays}
                  label="Date"
                  value={formatDate(event.event_date)}
                />

                <SideInfo
                  icon={CalendarDays}
                  label="Time"
                  value={`${event.start_time || "TBC"}${
                    event.end_time ? ` - ${event.end_time}` : ""
                  }`}
                />

                <SideInfo
                  icon={MapPin}
                  label="Location"
                  value={event.location_name || event.suburb || "Darwin"}
                />

                <SideInfo
                  icon={MapPin}
                  label="Address"
                  value={event.address || "-"}
                />

                <SideInfo
                  icon={Ticket}
                  label="Price"
                  value={
                    event.is_free
                      ? "Free"
                      : event.ticket_price
                        ? `$${event.ticket_price}`
                        : "Paid"
                  }
                />

                <SideInfo
                  icon={User}
                  label="Organizer"
                  value={event.organizer_name || "-"}
                />

                <SideInfo
                  icon={Mail}
                  label="Email"
                  value={event.contact_email || "-"}
                />

                <SideInfo
                  icon={Phone}
                  label="Phone"
                  value={event.contact_phone || "-"}
                />
              </div>

              {event.booking_url && (
                <a
                  href={event.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  Book / Register <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold text-violet-100">
      {text}
    </span>
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
    <div className="rounded-2xl bg-white/[0.05] p-4">
      <Icon className="h-5 w-5 text-fuchsia-300" />
      <p className="mt-2 text-xs text-violet-50/50">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
