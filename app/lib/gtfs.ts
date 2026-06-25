import fs from "fs";
import path from "path";
import Papa from "papaparse";

export type BusStop = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
};

export type BusRoute = {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
  route_color?: string;
};

type Trip = {
  route_id: string;
  trip_id: string;
  shape_id?: string;
};

type StopTime = {
  trip_id: string;
  stop_id: string;
  stop_sequence: string;
};

type ShapePoint = {
  shape_id: string;
  shape_pt_lat: string;
  shape_pt_lon: string;
  shape_pt_sequence: string;
};

function readCsv<T>(fileName: string): T[] {
  const filePath = path.join(process.cwd(), "data", "gtfs", fileName);

  if (!fs.existsSync(filePath)) {
    console.warn(`Missing GTFS file: ${filePath}`);
    return [];
  }

  const csv = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

export async function getBusExplorerData() {
  const stops = readCsv<BusStop>("stops.txt").filter(
    (s) => s.stop_id && s.stop_lat && s.stop_lon,
  );

  const routes = readCsv<BusRoute>("routes.txt").filter((r) => r.route_id);
  const trips = readCsv<Trip>("trips.txt").filter((t) => t.route_id && t.trip_id);
  const stopTimes = readCsv<StopTime>("stop_times.txt").filter(
    (s) => s.trip_id && s.stop_id,
  );
  const shapes = readCsv<ShapePoint>("shapes.txt").filter(
    (s) => s.shape_id && s.shape_pt_lat && s.shape_pt_lon,
  );

  const stopsById = new Map(stops.map((stop) => [stop.stop_id, stop]));

  const tripsByRoute = new Map<string, Trip[]>();
  for (const trip of trips) {
    if (!tripsByRoute.has(trip.route_id)) tripsByRoute.set(trip.route_id, []);
    tripsByRoute.get(trip.route_id)!.push(trip);
  }

  const stopTimesByTrip = new Map<string, StopTime[]>();
  for (const stopTime of stopTimes) {
    if (!stopTimesByTrip.has(stopTime.trip_id)) {
      stopTimesByTrip.set(stopTime.trip_id, []);
    }
    stopTimesByTrip.get(stopTime.trip_id)!.push(stopTime);
  }

  const shapesById = new Map<string, ShapePoint[]>();
  for (const shape of shapes) {
    if (!shapesById.has(shape.shape_id)) shapesById.set(shape.shape_id, []);
    shapesById.get(shape.shape_id)!.push(shape);
  }

  const routeStops: Record<string, BusStop[]> = {};
  const routeShapes: Record<string, [number, number][]> = {};

  for (const route of routes) {
    const routeTrips = tripsByRoute.get(route.route_id) || [];
    const firstTrip = routeTrips[0];

    if (!firstTrip) {
      routeStops[route.route_id] = [];
      routeShapes[route.route_id] = [];
      continue;
    }

    const orderedStopTimes = (stopTimesByTrip.get(firstTrip.trip_id) || []).sort(
      (a, b) => Number(a.stop_sequence) - Number(b.stop_sequence),
    );

    routeStops[route.route_id] = orderedStopTimes
      .map((st) => stopsById.get(st.stop_id))
      .filter(Boolean) as BusStop[];

    if (firstTrip.shape_id) {
      routeShapes[route.route_id] =
        (shapesById.get(firstTrip.shape_id) || [])
          .sort(
            (a, b) =>
              Number(a.shape_pt_sequence) - Number(b.shape_pt_sequence),
          )
          .map((point) => [
            Number(point.shape_pt_lat),
            Number(point.shape_pt_lon),
          ]);
    } else {
      routeShapes[route.route_id] = [];
    }
  }

  return {
    stops,
    routes: routes.sort((a, b) =>
      (a.route_short_name || a.route_id).localeCompare(
        b.route_short_name || b.route_id,
        undefined,
        { numeric: true },
      ),
    ),
    routeStops,
    routeShapes,
  };
}
import { darwinSuburbCoordinates } from "@/app/data/darwinSuburbCoordinates";

type StopRouteInfo = {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
};

export type NearestBusStopInfo = {
  stop_id: string;
  stop_name: string;
  distanceMeters: number;
  walkingMinutes: number;
  routes: StopRouteInfo[];
  googleMapsUrl: string;
};

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function getDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const earthRadius = 6371000;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function getNearestBusStopBySuburb(
  suburb: string | null,
): Promise<NearestBusStopInfo | null> {
  if (!suburb) return null;

  const coordinates = darwinSuburbCoordinates[suburb.toLowerCase()];
  if (!coordinates) return null;

  const [listingLat, listingLon] = coordinates;

  const stops = readCsv<BusStop>("stops.txt").filter(
    (stop) => stop.stop_id && stop.stop_lat && stop.stop_lon,
  );

  const routes = readCsv<BusRoute>("routes.txt").filter((route) => route.route_id);
  const trips = readCsv<Trip>("trips.txt").filter((trip) => trip.route_id && trip.trip_id);
  const stopTimes = readCsv<StopTime>("stop_times.txt").filter(
    (item) => item.trip_id && item.stop_id,
  );

  let nearestStop: BusStop | null = null;
  let nearestDistance = Infinity;

  for (const stop of stops) {
    const distance = getDistanceMeters(
      listingLat,
      listingLon,
      Number(stop.stop_lat),
      Number(stop.stop_lon),
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestStop = stop;
    }
  }

  if (!nearestStop) return null;

  const tripIdsForStop = new Set(
    stopTimes
      .filter((item) => item.stop_id === nearestStop?.stop_id)
      .map((item) => item.trip_id),
  );

  const routeIdsForStop = new Set(
    trips
      .filter((trip) => tripIdsForStop.has(trip.trip_id))
      .map((trip) => trip.route_id),
  );

  const stopRoutes = routes
    .filter((route) => routeIdsForStop.has(route.route_id))
    .map((route) => ({
      route_id: route.route_id,
      route_short_name: route.route_short_name,
      route_long_name: route.route_long_name,
    }))
    .slice(0, 8);

  return {
    stop_id: nearestStop.stop_id,
    stop_name: nearestStop.stop_name,
    distanceMeters: Math.round(nearestDistance),
    walkingMinutes: Math.max(1, Math.round(nearestDistance / 80)),
    routes: stopRoutes,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${nearestStop.stop_lat},${nearestStop.stop_lon}`,
  };
}