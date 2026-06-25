"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function BusMap({ stops }: { stops: any[] }) {
  const [LeafletMap, setLeafletMap] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadMap() {
      const leaflet = await import("react-leaflet");
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setLeafletMap({
        MapContainer: leaflet.MapContainer,
        TileLayer: leaflet.TileLayer,
        Marker: leaflet.Marker,
        Popup: leaflet.Popup,
      });
    }

    loadMap();
  }, []);

  const filteredStops = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return stops.slice(0, 400);

    return stops
      .filter((stop) => {
        return (
          stop.stop_name?.toLowerCase().includes(q) ||
          stop.stop_id?.toLowerCase().includes(q)
        );
      })
      .slice(0, 400);
  }, [search, stops]);

  if (!LeafletMap) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl bg-white/[0.06] text-violet-50/70">
        Loading Darwin bus map...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = LeafletMap;

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stop name or stop ID..."
            className="w-full rounded-2xl border border-violet-100/10 bg-white/[0.06] px-11 py-4 text-sm text-white outline-none placeholder:text-violet-100/45"
          />
        </div>

        <p className="mt-3 text-sm text-violet-50/60">
          Showing{" "}
          <span className="font-bold text-fuchsia-300">
            {filteredStops.length}
          </span>{" "}
          stops
        </p>
      </div>

      <MapContainer
        center={[-12.4634, 130.8456]}
        zoom={11}
        className="h-[700px] w-full rounded-3xl"
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredStops.map((stop) => (
          <Marker
            key={stop.stop_id}
            position={[Number(stop.stop_lat), Number(stop.stop_lon)]}
          >
            <Popup>
              <div>
                <p className="font-bold">{stop.stop_name}</p>
                <p>Stop ID: {stop.stop_id}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}