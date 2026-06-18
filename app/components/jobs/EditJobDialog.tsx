"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Pencil } from "lucide-react";
import { updateJob } from "@/app/actions/jobActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Job = {
  id: string;
  title: string;
  company_name: string;
  suburb: string | null;
  job_type: string | null;
  industry: string | null;
  description: string | null;
  requirements: string | null;
  apply_url: string | null;
  contact_email: string | null;
  hourly_rate: number | null;
  salary_note: string | null;
  closing_date: string | null;
  visa_friendly: boolean | null;
  visa_type: string | null;
  visa_type_other: string | null;
};

export default function EditJobDialog({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: job.title || "",
    company_name: job.company_name || "",
    suburb: job.suburb || "",
    job_type: job.job_type || "",
    industry: job.industry || "",
    hourly_rate: job.hourly_rate ? String(job.hourly_rate) : "",
    salary_note: job.salary_note || "",
    closing_date: job.closing_date || "",
    visa_friendly: Boolean(job.visa_friendly),
    visa_type: job.visa_type || "",
    visa_type_other: job.visa_type_other || "",
    description: job.description || "",
    requirements: job.requirements || "",
    apply_url: job.apply_url || "",
    contact_email: job.contact_email || "",
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await updateJob({
      id: job.id,
      title: form.title,
      company_name: form.company_name,
      suburb: form.suburb,
      job_type: form.job_type,
      industry: form.industry,
      description: form.description,
      requirements: form.requirements,
      apply_url: form.apply_url,
      contact_email: form.contact_email,
      hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
      salary_note: form.salary_note,
      closing_date: form.closing_date || null,
      visa_friendly: form.visa_friendly,
      visa_type: form.visa_type,
      visa_type_other:
        form.visa_type === "Other" ? form.visa_type_other : null,
    });

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Updated" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-violet-400 px-3 py-2 text-xs font-bold text-[#160524] hover:bg-violet-300">
          <Pencil className="mr-1 inline h-3 w-3" />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Update job details, pay information, visa suitability, and
            application method.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Job Title" required>
            <input
              required
              className="input-style"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" required>
              <input
                required
                className="input-style"
                value={form.company_name}
                onChange={(e) => updateField("company_name", e.target.value)}
              />
            </Field>

            <Field label="Suburb">
              <input
                className="input-style"
                value={form.suburb}
                onChange={(e) => updateField("suburb", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Job Type">
              <select
                className="input-style bg-[#1d0f33] text-white"
                value={form.job_type}
                onChange={(e) => updateField("job_type", e.target.value)}
              >
                <option value="">Select job type</option>
                <option value="Casual">Casual</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </Field>

            <Field label="Industry">
              <select
                className="input-style bg-[#1d0f33] text-white"
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
              >
                <option value="">Select industry</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Retail">Retail</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Support Work">Support Work</option>
                <option value="Delivery">Delivery</option>
                <option value="IT">IT</option>
                <option value="Administration">Administration</option>
                <option value="Other">Other</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Hourly Rate">
              <input
                type="number"
                min="0"
                className="input-style"
                value={form.hourly_rate}
                onChange={(e) => updateField("hourly_rate", e.target.value)}
              />
            </Field>

            <Field label="Closing Date">
              <input
                type="date"
                className="input-style"
                value={form.closing_date}
                onChange={(e) => updateField("closing_date", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Salary Information">
            <input
              className="input-style"
              value={form.salary_note}
              onChange={(e) => updateField("salary_note", e.target.value)}
              placeholder="$32/hr + weekend penalties"
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
            <input
              type="checkbox"
              checked={form.visa_friendly}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  visa_friendly: e.target.checked,
                }))
              }
            />

            <span className="text-sm font-medium">
              Suitable for international students
            </span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Suitable Visa Type">
              <select
                className="input-style bg-[#1d0f33] text-white"
                value={form.visa_type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    visa_type: e.target.value,
                    visa_type_other:
                      e.target.value === "Other" ? prev.visa_type_other : "",
                  }))
                }
              >
                <option value="">Select visa type</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Working Holiday Visa">
                  Working Holiday Visa
                </option>
                <option value="Temporary Graduate Visa">
                  Temporary Graduate Visa
                </option>
                <option value="Permanent Resident">Permanent Resident</option>
                <option value="Australian Citizen">Australian Citizen</option>
                <option value="Any valid work rights">
                  Any valid work rights
                </option>
                <option value="Other">Other</option>
              </select>
            </Field>

            {form.visa_type === "Other" && (
              <Field label="Explain Visa Type">
                <input
                  className="input-style"
                  value={form.visa_type_other}
                  onChange={(e) =>
                    updateField("visa_type_other", e.target.value)
                  }
                  placeholder="Example: Bridging visa with work rights"
                />
              </Field>
            )}
          </div>

          <Field label="Description">
            <textarea
              rows={4}
              className="input-style resize-none"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>

          <Field label="Requirements">
            <textarea
              rows={4}
              className="input-style resize-none"
              value={form.requirements}
              onChange={(e) => updateField("requirements", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Apply URL">
              <input
                className="input-style"
                value={form.apply_url}
                onChange={(e) => updateField("apply_url", e.target.value)}
                placeholder="https://..."
              />
            </Field>

            <Field label="Contact Email">
              <input
                type="email"
                className="input-style"
                value={form.contact_email}
                onChange={(e) => updateField("contact_email", e.target.value)}
              />
            </Field>
          </div>

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-violet-50">
        {label}
        {required && <span className="ml-1 text-fuchsia-300">*</span>}
      </label>
      {children}
    </div>
  );
}