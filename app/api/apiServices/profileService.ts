import { createClient } from "@/app/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return user;
}

export async function getCurrentProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone, university, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Get current profile error:", error.message);
    return null;
  }

  return data;
}

export async function getProfileById(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone, university, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Get profile by ID error:", error.message);
    return null;
  }

  return data;
}