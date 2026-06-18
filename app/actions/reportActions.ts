"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

type ReportType = "listing" | "job" | "event" | "community";

export async function createContentReport(input: {
  itemId: string;
  itemType: ReportType;
  reason: string;
  details: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Please login first to report content." };
  }

  if (!input.reason.trim()) {
    return { success: false, message: "Please select a report reason." };
  }

  const { error } = await supabase.from("content_reports").insert({
    reporter_id: user.id,
    item_id: input.itemId,
    item_type: input.itemType,
    reason: input.reason,
    details: input.details || null,
    status: "pending",
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/reports");

  return {
    success: true,
    message: "Report submitted. Admin will review it soon.",
  };
}

export async function updateReportStatus(input: {
  reportId: string;
  status: "pending" | "reviewed" | "dismissed" | "resolved";
  adminNote?: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return { success: false, message: "Only admins can update reports." };
  }

  const { error } = await supabase
    .from("content_reports")
    .update({
      status: input.status,
      admin_note: input.adminNote || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", input.reportId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/reports");

  return { success: true, message: "Report updated successfully." };
}