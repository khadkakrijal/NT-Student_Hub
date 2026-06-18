"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { PlusCircle } from "lucide-react";
import { createEvent } from "@/app/actions/eventActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUploader from "../shared/ImageUploader";
import { uploadEventImage } from "@/app/lib/uploadEventImage";

const categories = [
  "University",
  "Community",
  "Cultural",
  "Sports",
  "Workshop",
  "Networking",
  "Market",
  "Volunteering",
  "Entertainment",
  "Other",
];

const initialForm = {
  title: "",
  organizer_name: "",
  category: "",
  description: "",
  event_date: "",
  start_time: "",
  end_time: "",
  location_name: "",
  address: "",
  suburb: "",
  image_url: "",
  is_free: true,
  ticket_price: "",
  booking_url: "",
  contact_email: "",
  contact_phone: "",
};

export default function AddEventDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (selectedImage) {
      imageUrl = await uploadEventImage(selectedImage);
    }

    const result = await createEvent({
      ...form,
      image_url: imageUrl,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      ticket_price: form.ticket_price ? Number(form.ticket_price) : null,
    });

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Submitted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) {
      setOpen(false);
      setForm(initialForm);

      setSelectedImage(null);
      setImagePreview(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center rounded-full bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] hover:bg-violet-300">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Your event will be visible after admin approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Event Title" required>
            <input
              required
              className="input-style"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Student Networking Night"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Organizer Name">
              <input
                className="input-style"
                value={form.organizer_name}
                onChange={(e) => updateField("organizer_name", e.target.value)}
                placeholder="CDU Student Group"
              />
            </Field>

            <Field label="Category">
              <select
                className="input-style bg-[#1d0f33] text-white"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              rows={4}
              className="input-style resize-none"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the event, who can attend, and what students can expect."
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Event Date" required>
              <input
                required
                type="date"
                className="input-style"
                value={form.event_date}
                onChange={(e) => updateField("event_date", e.target.value)}
              />
            </Field>

            <Field label="Start Time">
              <input
                type="time"
                className="input-style"
                value={form.start_time}
                onChange={(e) => updateField("start_time", e.target.value)}
              />
            </Field>

            <Field label="End Time">
              <input
                type="time"
                className="input-style"
                value={form.end_time}
                onChange={(e) => updateField("end_time", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Location Name">
              <input
                className="input-style"
                value={form.location_name}
                onChange={(e) => updateField("location_name", e.target.value)}
                placeholder="Darwin Waterfront"
              />
            </Field>

            <Field label="Suburb">
              <input
                className="input-style"
                value={form.suburb}
                onChange={(e) => updateField("suburb", e.target.value)}
                placeholder="Darwin CBD"
              />
            </Field>
          </div>

          <Field label="Address">
            <input
              className="input-style"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Full event address"
            />
          </Field>

          <Field label="Event Banner">
            <ImageUploader
              preview={imagePreview}
              onFileChange={(file) => {
                setSelectedImage(file);

                if (!file) {
                  setImagePreview(null);
                  return;
                }

                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
            <input
              type="checkbox"
              checked={form.is_free}
              onChange={(e) => updateField("is_free", e.target.checked)}
            />
            <span className="text-sm font-medium">This is a free event</span>
          </label>

          {!form.is_free && (
            <Field label="Ticket Price">
              <input
                type="number"
                className="input-style"
                value={form.ticket_price}
                onChange={(e) => updateField("ticket_price", e.target.value)}
                placeholder="25"
              />
            </Field>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Booking URL">
              <input
                className="input-style"
                value={form.booking_url}
                onChange={(e) => updateField("booking_url", e.target.value)}
                placeholder="https://..."
              />
            </Field>

            <Field label="Contact Email">
              <input
                type="email"
                className="input-style"
                value={form.contact_email}
                onChange={(e) => updateField("contact_email", e.target.value)}
                placeholder="events@example.com"
              />
            </Field>
          </div>

          <Field label="Contact Phone">
            <input
              className="input-style"
              value={form.contact_phone}
              onChange={(e) => updateField("contact_phone", e.target.value)}
              placeholder="04..."
            />
          </Field>

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Event"}
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
