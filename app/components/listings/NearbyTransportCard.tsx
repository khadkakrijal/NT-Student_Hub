import { Bus, ExternalLink, MapPin, Route } from "lucide-react";
import type { NearestBusStopInfo } from "@/app/lib/gtfs";

export default function NearbyTransportCard({
  transport,
}: {
  transport: NearestBusStopInfo | null;
}) {
  if (!transport) {
    return (
      <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
        <Bus className="h-7 w-7 text-fuchsia-300" />
        <h3 className="mt-4 text-xl font-black">Nearby Public Transport</h3>
        <p className="mt-3 text-sm leading-7 text-violet-50/70">
          Bus stop information is not available for this suburb yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Bus className="h-7 w-7 text-fuchsia-300" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
            Nearby Transport
          </p>
          <h3 className="mt-1 text-2xl font-black">Closest Bus Stop</h3>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <InfoRow
          icon={MapPin}
          label="Nearest stop"
          value={transport.stop_name}
        />

        <InfoRow
          icon={Bus}
          label="Walking distance"
          value={`${transport.distanceMeters}m • approx. ${transport.walkingMinutes} min walk`}
        />

        <div className="rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
          <div className="flex items-center gap-3">
            <Route className="h-5 w-5 text-fuchsia-300" />
            <div>
              <p className="text-xs text-violet-50/50">Routes nearby</p>

              {transport.routes.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {transport.routes.map((route) => (
                    <span
                      key={route.route_id}
                      className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200"
                    >
                      Route {route.route_short_name || route.route_id}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-violet-50/70">
                  Routes not available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <a
        href={transport.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] transition hover:bg-violet-300"
      >
        Open Stop in Google Maps
        <ExternalLink className="h-4 w-4" />
      </a>

      <p className="mt-4 text-xs leading-6 text-violet-50/45">
        Distance is estimated from suburb centre using static Darwin GTFS bus
        data. Confirm exact travel time before renting.
      </p>
    </div>
  );
}

function InfoRow({
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