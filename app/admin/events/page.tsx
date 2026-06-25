import Image from "next/image";
import { CalendarDays, MapPin, PartyPopper, Star, User } from "lucide-react";
import AdminEventActions from "@/app/components/events/AdminEventActions";
import { getAllEventsForAdmin } from "@/app/api/apiServices/eventService";
import FeatureButton from "@/app/components/admin/FeatureButton";

export default async function AdminEventsPage() {
  const events = await getAllEventsForAdmin();
  console.log(events, "events in admin");
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
          Admin Events
        </p>

        <h1 className="mt-3 text-2xl font-black">Events Management</h1>

        <p className="mt-3 text-violet-50/70">
          Approve, reject, review, and manage student-submitted events.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total" value={events.length} />
        <StatCard
          label="Pending"
          value={events.filter((e) => e.status === "pending").length}
        />
        <StatCard
          label="Approved"
          value={events.filter((e) => e.status === "approved").length}
        />
        <StatCard
          label="Rejected"
          value={events.filter((e) => e.status === "rejected").length}
        />
      </section>

      <section className="grid gap-6">
        {events.map((event) => {
          const count = event.event_interests?.length || 0;

          return (
            <div
              key={event.id}
              className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl"
            >
              <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
                <div className="relative h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 lg:h-full">
                  {event.image_url ? (
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      unoptimized
                      sizes="260px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PartyPopper className="h-14 w-14 text-violet-100/40" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4">
                    <StatusBadge status={event.status || "pending"} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                    <div>
                      <p className="text-sm font-semibold text-fuchsia-300">
                        {event.category || "Event"}
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {event.title}
                      </h2>

                      <div className="mt-4 grid gap-3 text-sm text-violet-50/70 md:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                          {formatDate(event.event_date)}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-fuchsia-300" />
                          {event.suburb || event.location_name || "Darwin"}
                        </p>

                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4 text-fuchsia-300" />
                          {event.profiles?.full_name || "User"}
                        </p>

                        <p className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-300" />
                          {count} interested
                        </p>
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm leading-7 text-violet-50/60">
                        {event.description || "No description provided."}
                      </p>

                      {event.rejection_reason && (
                        <div className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-100/80">
                          <span className="font-bold text-red-200">
                            Rejection reason:
                          </span>{" "}
                          {event.rejection_reason}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <FeatureButton
                        itemId={event.id}
                        itemType="event"
                        featured={event.featured || false}
                      />

                      <AdminEventActions eventId={event.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {!events.length && (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
            No events submitted yet.
          </div>
        )}
      </section>
    </div>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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
      ? "bg-green-600 text-white"
      : status === "rejected"
        ? "bg-red-400 text-white"
        : "bg-yellow-500 text-white";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${style}`}
    >
      {status}
    </span>
  );
}
