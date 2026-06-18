"use client";

import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPin } from "lucide-react";
import { darwinSuburbCoordinates } from "@/app/data/darwinSuburbCoordinates";

type Listing = {
  id: string;
  title: string;
  suburb: string;
  rent_per_week: number;
  room_type: string | null;
  furnished: boolean | null;
  bills_included: boolean | null;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ListingsMapView({ listings }: { listings: Listing[] }) {
  const mappedListings = listings
    .map((listing) => {
      const key = listing.suburb?.toLowerCase().trim();
      const position = darwinSuburbCoordinates[key];

      if (!position) return null;

      return {
        ...listing,
        position,
      };
    })
    .filter(Boolean) as (Listing & { position: [number, number] })[];

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-3 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 px-3 py-2 text-sm text-violet-50/70">
          <MapPin className="h-4 w-4 text-fuchsia-300" />
          Showing {mappedListings.length} mapped listings
        </div>

        <div className="h-[620px] overflow-hidden rounded-[1.5rem]">
          <MapContainer
            center={[-12.43, 130.88]}
            zoom={11}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mappedListings.map((listing) => (
              <Marker
                key={listing.id}
                position={listing.position}
                icon={markerIcon}
              >
                <Popup>
                  <div className="min-w-[220px]">
                    <p className="font-bold">{listing.title}</p>
                    <p className="mt-1 text-sm">{listing.suburb}</p>
                    <p className="mt-1 font-bold">
                      ${listing.rent_per_week}/week
                    </p>

                    <Link
                      href={`/listings/${listing.id}`}
                      className="mt-3 inline-block rounded-full bg-violet-500 px-4 py-2 text-xs font-bold text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}