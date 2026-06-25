import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getLivingPage } from "@/app/data/livingInDarwinData";
import LivingPageTemplate from "@/app/components/living-in-darwin/LivingPageTemplate";
import { getBusExplorerData } from "@/app/lib/gtfs";
import BusRouteExplorer from "@/app/components/bus-routes/BusRouteExplorer";

export default async function Page() {
  const page = getLivingPage("bus-routes");
  if (!page) notFound();

  const data = await getBusExplorerData();

  return (
    <>
      <LivingPageTemplate page={page} />

      <section className="bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 pt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Darwinbus Explorer
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              Explore Darwin Bus Stops & Routes
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-violet-50/70">
              Search bus stops, choose a route, view stops on the map and see
              the route path using GTFS public transport data.
            </p>
          </div>

          <BusRouteExplorer
            stops={data.stops}
            routes={data.routes}
            routeStops={data.routeStops}
            routeShapes={data.routeShapes}
          />
        </div>
      </section>
    </>
  );
}
