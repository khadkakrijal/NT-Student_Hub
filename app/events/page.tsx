import {
  getApprovedEvents,
  getMyEvents,
} from "@/app/api/apiServices/eventService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import EventsViewClient from "@/app/components/events/EventsViewClient";
import { getSavedItemIds } from "../api/apiServices/favoriteService";

export default async function EventsPage() {
  const events = await getApprovedEvents();
  const profile = await getCurrentProfile();
  const savedEventIds = await getSavedItemIds("event");

  const canCreateEvent =
    profile?.role === "student" ||
    profile?.role === "host" ||
    profile?.role === "admin";

  const myEvents = canCreateEvent ? await getMyEvents() : [];

  return (
    <EventsViewClient
      events={events}
      myEvents={myEvents}
      canCreateEvent={canCreateEvent}
      savedEventIds={savedEventIds}
    />
  );
}
