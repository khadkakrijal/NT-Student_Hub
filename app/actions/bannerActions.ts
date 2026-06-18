"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

async function isCurrentUserAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return data?.role === "admin";
}

export async function createBanner(formData: FormData) {
  if (!(await isCurrentUserAdmin())) {
    return { success: false, message: "Only admins can create banners." };
  }

  const supabase = await createClient();

  const imageFile = formData.get("image") as File | null;
  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `banner-${Date.now()}.${fileExt}`;
    const filePath = `homepage/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("homepage-banners")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { success: false, message: uploadError.message };
    }

    const { data } = supabase.storage
      .from("homepage-banners")
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("homepage_banners").insert({
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || "") || null,
    button_text: String(formData.get("button_text") || "") || null,
    button_link: String(formData.get("button_link") || "") || null,
    image_url: imageUrl,
    is_active: formData.get("is_active") === "on",
    start_date: String(formData.get("start_date") || "") || null,
    end_date: String(formData.get("end_date") || "") || null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/banners");

  return { success: true, message: "Banner created successfully." };
}

export async function deleteBanner(id: string) {
  if (!(await isCurrentUserAdmin())) {
    return { success: false, message: "Only admins can delete banners." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("homepage_banners")
    .delete()
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/banners");

  return { success: true, message: "Banner deleted successfully." };
}

export async function toggleBannerActive(id: string, isActive: boolean) {
  if (!(await isCurrentUserAdmin())) {
    return { success: false, message: "Only admins can update banners." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("homepage_banners")
    .update({ is_active: !isActive })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/banners");

  return {
    success: true,
    message: !isActive ? "Banner activated." : "Banner deactivated.",
  };
}