"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  MapPin,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

import DeleteMyEventButton from "./DeleteMyEventButton";
import EditEventDialog from "./EditEventDialog";
import AddEventDialog from "./AddEventDialog";

export default function MyEventsSection({ events }: { events: any[] }) {
  const stats = {
    total: events.length,
    pending: events.filter((item) => item.status === "pending").length,
    approved: events.filter((item) => item.status === "approved").length,
    rejected: events.filter((item) => item.status === "rejected").length,
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
        {events.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl"
              >
                <div className="relative h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                  {event.image_url && (
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  <div className="absolute left-4 top-4">
                    <StatusBadge status={event.status || "pending"} />
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-black">{event.title}</h2>

                  <div className="mt-4 space-y-2 text-sm text-violet-50/70">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-fuchsia-300" />
                      {formatDate(event.event_date)}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-fuchsia-300" />
                      {event.location_name || event.suburb || "Location TBA"}
                    </p>

                    <p className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                      {event.status === "approved"
                        ? "Visible to students"
                        : event.status === "rejected"
                          ? "Needs changes before approval"
                          : "Waiting for admin review"}
                    </p>

                    {event.status === "rejected" && event.rejection_reason && (
                      <div className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-4">
                        <p className="text-sm font-bold text-red-200">
                          Rejection reason
                        </p>
                        <p className="mt-2 text-sm leading-6 text-red-100/80">
                          {event.rejection_reason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {event.status === "approved" && (
                      <Link
                        href={`/events/${event.slug || event.id}`}
                        className="rounded-full border border-violet-100/15 px-4 py-2 text-xs font-bold text-violet-50 hover:bg-white/10"
                      >
                        <Eye className="mr-1 inline h-3 w-3" />
                        View
                      </Link>
                    )}

                    <EditEventDialog event={event} />
                    <DeleteMyEventButton eventId={event.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">
            <PlusCircle className="mx-auto h-14 w-14 text-fuchsia-300" />
            <h2 className="mt-5 text-2xl font-black">No events posted yet</h2>
            <p className="mt-2 text-violet-50/70">
              Create your first event and submit it for admin approval.
            </p>

            <div className="mt-6">
              <AddEventDialog />
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
function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
