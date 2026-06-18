import { createClient } from "@/app/lib/supabase/server";

const eventSelect = `
  *,
  profiles:created_by (
    id,
    full_name,
    email,
    role
  ),
  event_interests (
    id,
    user_id
  )
`;

export async function getApprovedEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .eq("status", "approved")
    .order("event_date", { ascending: true });

  if (error) return [];

  return data || [];
}

export async function getEventBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error) return null;

  return data;
}

export async function getMyEvents() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data || [];
}

export async function getAllEventsForAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(eventSelect)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data || [];
}

export async function getCurrentUserEventInterest(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("event_interests")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .maybeSingle();

  return data;
}