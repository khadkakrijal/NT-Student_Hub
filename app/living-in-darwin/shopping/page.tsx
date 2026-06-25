import { shoppingPlaces } from "@/app/data/guideData";
import { ShoppingBag } from "lucide-react";

export default function ShoppingGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <ShoppingBag className="h-9 w-9 text-fuchsia-300" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Shopping
          </p>
          <h1 className="mt-4 text-2xl font-black">
            Groceries, shopping centres, and everyday student essentials
          </h1>
          <p className="mt-5 max-w-3xl leading-8 text-violet-50/75">
            Students should choose accommodation with access to groceries,
            pharmacy, transport, and essential shops.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          {shoppingPlaces.map((place) => (
            <div
              key={place.name}
              className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6"
            >
              <h2 className="text-2xl font-black">{place.name}</h2>
              <p className="mt-2 text-sm font-semibold text-fuchsia-200">
                {place.type}
              </p>
              <p className="mt-1 text-sm text-violet-50/60">{place.area}</p>
              <p className="mt-4 leading-7 text-violet-50/75">{place.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
