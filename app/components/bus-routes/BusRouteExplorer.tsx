"use client";

import { useEffect, useMemo, useState } from "react";
import { Bus, MapPin, Search } from "lucide-react";

type BusStop = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

type BusRoute = {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  route_color?: string;
};

export default function BusRouteExplorer({
  stops,
  routes,
  routeStops,
  routeShapes,
}: {
  stops: BusStop[];
  routes: BusRoute[];
  routeStops: Record<string, BusStop[]>;
  routeShapes: Record<string, [number, number][]>;
}) {
  const [LeafletMap, setLeafletMap] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState("");

  useEffect(() => {
    async function loadMap() {
      const leaflet = await import("react-leaflet");
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setLeafletMap({
        MapContainer: leaflet.MapContainer,
        TileLayer: leaflet.TileLayer,
        Marker: leaflet.Marker,
        Popup: leaflet.Popup,
        Polyline: leaflet.Polyline,
      });
    }

    loadMap();
  }, []);

  const selectedRoute = routes.find((r) => r.route_id === selectedRouteId);

  const visibleStops = useMemo(() => {
    const baseStops = selectedRouteId
      ? routeStops[selectedRouteId] || []
      : stops;
    const q = search.trim().toLowerCase();

    const filtered = q
      ? baseStops.filter(
          (stop) =>
            stop.stop_name?.toLowerCase().includes(q) ||
            stop.stop_id?.toLowerCase().includes(q),
        )
      : baseStops;

    return selectedRouteId ? filtered : filtered.slice(0, 500);
  }, [search, selectedRouteId, routeStops, stops]);

  const selectedShape = selectedRouteId
    ? routeShapes[selectedRouteId] || []
    : [];

  if (!LeafletMap) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl bg-white/[0.06] text-violet-50/70">
        Loading Darwin bus map...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline } = LeafletMap;

  return (
    <div className="space-y-6">
      <section className="w-full overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:p-5">
        <div className="grid w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <div className="relative min-w-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stop name or stop ID..."
              className="w-full min-w-0 rounded-2xl border border-violet-100/10 bg-white/[0.06] px-11 py-4 text-sm text-white outline-none placeholder:text-violet-100/45"
            />
          </div>

          <select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="w-full min-w-0 rounded-2xl border border-violet-100/10 bg-slate-900 px-4 py-4 text-sm font-semibold text-white outline-none"
          >
            <option value="">All stops</option>
            {routes.map((route) => (
              <option key={route.route_id} value={route.route_id}>
                Route {route.route_short_name || route.route_id}
                {route.route_long_name ? ` — ${route.route_long_name}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Visible stops" value={visibleStops.length} />
          <StatCard label="Total routes" value={routes.length} />
          <StatCard
            label="Selected route"
            value={
              selectedRoute
                ? `Route ${selectedRoute.route_short_name || selectedRoute.route_id}`
                : "All"
            }
          />
        </div>
      </section>

      {selectedRoute && (
        <section className="rounded-[2rem] border border-fuchsia-300/15 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10 p-5 backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
                Selected Route
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Route {selectedRoute.route_short_name || selectedRoute.route_id}
              </h2>
              <p className="mt-2 text-sm text-violet-50/70">
                {selectedRoute.route_long_name || "Darwin bus service"}
              </p>
            </div>

            <button
              onClick={() => setSelectedRouteId("")}
              className="rounded-full border border-violet-100/10 px-5 py-3 text-sm font-bold text-violet-50/80 transition hover:bg-white/10"
            >
              Clear route
            </button>
          </div>
        </section>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-2 backdrop-blur-xl">
        <MapContainer
          center={[-12.4634, 130.8456]}
          zoom={11}
          className="h-[700px] w-full rounded-[1.5rem]"
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedShape.length > 0 && (
            <Polyline
              positions={selectedShape}
              pathOptions={{
                color: "#d946ef",
                weight: 5,
                opacity: 0.85,
              }}
            />
          )}

          {visibleStops.map((stop, index) => (
            <Marker
              key={`${selectedRouteId || "all"}-${stop.stop_id}-${index}`}
              position={[Number(stop.stop_lat), Number(stop.stop_lon)]}
            >
              <Popup>
                <div className="space-y-2">
                  <p className="font-bold">{stop.stop_name}</p>
                  <p>Stop ID: {stop.stop_id}</p>
                  {selectedRoute && (
                    <p>
                      Route:{" "}
                      {selectedRoute.route_short_name || selectedRoute.route_id}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleStops.slice(0, 12).map((stop, index) => (
          <div
            key={`${stop.stop_id}-${index}`}
            className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl"
          >
            <MapPin className="h-6 w-6 text-fuchsia-300" />
            <h3 className="mt-3 font-black text-white">{stop.stop_name}</h3>
            <p className="mt-2 text-sm text-violet-50/60">
              Stop ID: {stop.stop_id}
            </p>
          </div>
        ))}
      </section>

      {!visibleStops.length && (
        <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-10 text-center">
          <Bus className="mx-auto h-12 w-12 text-fuchsia-300" />
          <h3 className="mt-4 text-2xl font-black">No bus stops found</h3>
          <p className="mt-2 text-violet-50/70">
            Try another stop name, stop ID or route.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/[0.05] p-4">
      <p className="text-xs text-violet-50/50">{label}</p>
      <p className="mt-1 text-xl font-black text-fuchsia-200">{value}</p>
    </div>
  );
}
