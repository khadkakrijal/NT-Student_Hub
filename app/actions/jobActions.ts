"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

function createSlug(title: string, suburb: string) {
  const random = Math.random().toString(36).slice(2, 7);

  return `${title}-${suburb}-${random}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createJob(input: {
  title: string;
  company_name: string;
  suburb: string;
  job_type: string;
  industry: string;
  description: string;
  requirements: string;
  apply_url: string;
  contact_email: string;

  hourly_rate: number | null;
  salary_note: string;
  closing_date: string | null;
  visa_friendly: boolean;
  visa_type: string;
  visa_type_other: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "You must be logged in." };

  const slug = createSlug(input.title, input.suburb);

  const { error } = await supabase.from("jobs").insert({
    ...input,
    slug,
    status: "active",
    created_by: user.id,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/jobs");
  revalidatePath("/admin/jobs");

  return { success: true, message: "Job posted successfully." };
}

export async function updateJobStatus(
  jobId: string,
  status: "active" | "closed" | "draft",
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/jobs");
  revalidatePath("/admin/jobs");

  return { success: true, message: "Job status updated." };
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/jobs");
  revalidatePath("/admin/jobs");

  return { success: true, message: "Job deleted successfully." };
}

export async function updateJob(input: {
  id: string;
  title: string;
  company_name: string;
  suburb: string;
  job_type: string;
  industry: string;
  description: string;
  requirements: string;
  apply_url: string;
  contact_email: string;
  hourly_rate: number | null;
  salary_note: string;
  closing_date: string | null;
  visa_friendly: boolean;
  visa_type: string;
  visa_type_other: string | null;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({
      title: input.title,
      company_name: input.company_name,
      suburb: input.suburb || null,
      job_type: input.job_type || null,
      industry: input.industry || null,
      description: input.description || null,
      requirements: input.requirements || null,
      apply_url: input.apply_url || null,
      contact_email: input.contact_email || null,
      hourly_rate: input.hourly_rate,
      salary_note: input.salary_note || null,
      closing_date: input.closing_date,
      visa_friendly: input.visa_friendly,
      visa_type: input.visa_type || null,
      visa_type_other:
        input.visa_type === "Other" ? input.visa_type_other : null,
    })
    .eq("id", input.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/jobs");
  revalidatePath("/admin/jobs");

  return { success: true, message: "Job updated successfully." };
}
