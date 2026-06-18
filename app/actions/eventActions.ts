"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";
import { createNotification } from "./notificationActions";

function createSlug(title: string, suburb: string) {
  const random = Math.random().toString(36).slice(2, 7);

  return `${title}-${suburb || "darwin"}-${random}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type EventInput = {
  title: string;
  organizer_name: string;
  category: string;
  description: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location_name: string;
  address: string;
  suburb: string;
  image_url: string | null;
  is_free: boolean;
  ticket_price: number | null;
  booking_url: string;
  contact_email: string;
  contact_phone: string;
};

export async function createEvent(input: EventInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const slug = createSlug(input.title, input.suburb);

  const { error } = await supabase.from("events").insert({
    ...input,
    slug,
    created_by: user.id,
    status: "pending",
    rejection_reason: null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return {
    success: true,
    message: "Event submitted for admin approval.",
  };
}

export async function updateMyEvent(input: EventInput & { id: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { error } = await supabase
    .from("events")
    .update({
      title: input.title,
      organizer_name: input.organizer_name || null,
      category: input.category || null,
      description: input.description || null,
      event_date: input.event_date,
      start_time: input.start_time,
      end_time: input.end_time,
      location_name: input.location_name || null,
      address: input.address || null,
      suburb: input.suburb || null,
      image_url: input.image_url || null,
      is_free: input.is_free,
      ticket_price: input.ticket_price,
      booking_url: input.booking_url || null,
      contact_email: input.contact_email || null,
      contact_phone: input.contact_phone || null,
      status: "pending",
      rejection_reason: null,
    })
    .eq("id", input.id)
    .eq("created_by", user.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return {
    success: true,
    message: "Event updated and sent back for admin approval.",
  };
}

export async function deleteMyEvent(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .eq("created_by", user.id)
    .select("id");

  if (error) return { success: false, message: error.message };

  if (!data || data.length === 0) {
    return {
      success: false,
      message: "Event not deleted. This event may not belong to your account.",
    };
  }

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return { success: true, message: "Event deleted successfully." };
}

export async function approveEvent(eventId: string) {
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, title, created_by, slug")
    .eq("id", eventId)
    .maybeSingle();

  const { error } = await supabase
    .from("events")
    .update({
      status: "approved",
      rejection_reason: null,
    })
    .eq("id", eventId);

  if (error) return { success: false, message: error.message };

  if (event?.created_by) {
    await createNotification({
      userId: event.created_by,
      title: "Event approved",
      message: `Your event "${event.title}" has been approved.`,
      type: "success",
      link: `/events/${event.slug || event.id}`,
    });
  }

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return { success: true, message: "Event approved successfully." };
}

export async function rejectEvent(eventId: string, reason: string) {
  if (!reason.trim()) {
    return { success: false, message: "Rejection reason is required." };
  }

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, title, created_by")
    .eq("id", eventId)
    .maybeSingle();

  const { error } = await supabase
    .from("events")
    .update({
      status: "rejected",
      rejection_reason: reason,
    })
    .eq("id", eventId);

  if (error) return { success: false, message: error.message };

  if (event?.created_by) {
    await createNotification({
      userId: event.created_by,
      title: "Event rejected",
      message: `Your event "${event.title}" was rejected. Reason: ${reason}`,
      type: "warning",
      link: "/events",
    });
  }

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return { success: true, message: "Event rejected successfully." };
}

export async function deleteEventAdmin(eventId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/events");
  revalidatePath("/my-events");
  revalidatePath("/admin/events");

  return { success: true, message: "Event deleted successfully." };
}

export async function toggleEventInterest(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { data: existing } = await supabase
    .from("event_interests")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("event_interests")
      .delete()
      .eq("id", existing.id);

    if (error) return { success: false, message: error.message };

    revalidatePath("/events");
    return { success: true, message: "Removed from interested." };
  }

  const { error } = await supabase.from("event_interests").insert({
    event_id: eventId,
    user_id: user.id,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/events");
  return { success: true, message: "Marked as interested." };
}
