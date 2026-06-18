"use client";

import { useState } from "react";
import { Megaphone, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import { createBanner } from "@/app/actions/bannerActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddBannerDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createBanner(formData);

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Created" : "Failed",
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
        <button className="inline-flex items-center rounded-full bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] transition hover:bg-violet-300">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Banner
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-fuchsia-300" />
            Create Homepage Banner
          </DialogTitle>

          <DialogDescription className="text-violet-100/70">
            This banner will appear on the homepage if active and within the
            selected date range.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Title" required>
            <input
              name="title"
              required
              placeholder="Example: CDU Orientation Week 2026"
              className="input-style"
            />
          </Field>

          <Field label="Description">
            <textarea
              name="description"
              placeholder="Add announcement details..."
              className="input-style min-h-28"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Button Text">
              <input
                name="button_text"
                placeholder="Example: Learn More"
                className="input-style"
              />
            </Field>

            <Field label="Button Link">
              <input
                name="button_link"
                placeholder="Example: /events"
                className="input-style"
              />
            </Field>
          </div>

          <Field label="Banner Image">
            <input
              name="image"
              type="file"
              accept="image/*"
              className="input-style file:mr-4 file:rounded-full file:border-0 file:bg-violet-400 file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#160524]"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Start Date">
              <input name="start_date" type="date" className="input-style" />
            </Field>

            <Field label="End Date">
              <input name="end_date" type="date" className="input-style" />
            </Field>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3 text-sm">
            <input name="is_active" type="checkbox" defaultChecked />
            Active banner
          </label>

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Banner"}
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
