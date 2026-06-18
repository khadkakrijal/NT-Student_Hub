import { createClient } from "@/app/lib/supabase/server";

export async function getActiveHomepageBanners() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_banners")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Banner fetch error:", error.message);
    return [];
  }

  console.log("ACTIVE BANNERS:", data);

  return data || [];
}

export async function getAllHomepageBannersForAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_banners")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin banner fetch error:", error.message);
    return [];
  }

  return data || [];
}
