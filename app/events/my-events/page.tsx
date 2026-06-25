import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Eye,
  MapPin,
  PartyPopper,
  PlusCircle,
  Star,
} from "lucide-react";
import AddEventDialog from "@/app/components/events/AddEventDialog";
import EditEventDialog from "@/app/components/events/EditEventDialog";
import DeleteMyEventButton from "@/app/components/events/DeleteMyEventButton";
import { getMyEvents } from "@/app/api/apiServices/eventService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";

export default async function MyEventsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/auth/login");

  const events = await getMyEvents();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-10">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                My Events
              </p>

              <h1 className="mt-3 text-2xl font-black md:text-2xl">
                Manage Your Events
              </h1>

              <p className="mt-4 max-w-2xl text-violet-50/70">
                Create events, track approval status, edit rejected events, and
                see how many students are interested.
              </p>
            </div>

            <AddEventDialog />
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
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

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {events.map((event) => {
            const count = event.event_interests?.length || 0;

            return (
              <div
                key={event.id}
                className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl"
              >
                <div className="grid md:grid-cols-[220px_1fr]">
                  <div className="relative h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 md:h-full">
                    {event.image_url ? (
                      <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <PartyPopper className="h-12 w-12 text-violet-100/40" />
                      </div>
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
                        {event.suburb || event.location_name || "Darwin"}
                      </p>

                      <p className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-300" />
                        {count} interested
                      </p>
                    </div>

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

                    <div className="mt-6 flex flex-wrap gap-3">
                      {event.status === "approved" && (
                        <Link
                          href={`/events/${event.slug}`}
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
              </div>
            );
          })}

          {!events.length && (
            <div className="col-span-full rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
              <PlusCircle className="mx-auto h-14 w-14 text-fuchsia-300" />
              <h2 className="mt-5 text-2xl font-black">No events yet</h2>
              <p className="mt-2 text-violet-50/70">
                Create your first event and submit it for admin approval.
              </p>

              <div className="mt-6">
                <AddEventDialog />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
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
      ? "bg-emerald-400/15 text-emerald-200"
      : status === "rejected"
        ? "bg-red-400/15 text-red-200"
        : "bg-yellow-400/15 text-yellow-200";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${style}`}
    >
      {status}
    </span>
  );
}
