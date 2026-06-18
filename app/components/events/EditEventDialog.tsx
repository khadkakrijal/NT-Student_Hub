"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Pencil } from "lucide-react";
import { updateMyEvent } from "@/app/actions/eventActions";
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
import { useRouter } from "next/navigation";

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

type EventItem = {
  id: string;
  title: string;
  organizer_name: string | null;
  category: string | null;
  description: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location_name: string | null;
  address: string | null;
  suburb: string | null;
  image_url: string | null;
  is_free: boolean | null;
  ticket_price: number | null;
  booking_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

export default function EditEventDialog({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    event.image_url || null,
  );

  const [form, setForm] = useState({
    title: event.title || "",
    organizer_name: event.organizer_name || "",
    category: event.category || "",
    description: event.description || "",
    event_date: event.event_date || "",
    start_time: event.start_time || "",
    end_time: event.end_time || "",
    location_name: event.location_name || "",
    address: event.address || "",
    suburb: event.suburb || "",
    is_free: Boolean(event.is_free),
    ticket_price: event.ticket_price ? String(event.ticket_price) : "",
    booking_url: event.booking_url || "",
    contact_email: event.contact_email || "",
    contact_phone: event.contact_phone || "",
  });

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    let imageUrl = event.image_url || "";

    if (selectedImage) {
      imageUrl = await uploadEventImage(selectedImage);
    }

    const result = await updateMyEvent({
      id: event.id,

      ...form,

      image_url: imageUrl,

      start_time: form.start_time || null,

      end_time: form.end_time || null,

      ticket_price: form.ticket_price ? Number(form.ticket_price) : null,
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
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-violet-400 px-4 py-2 text-xs font-bold text-[#160524] hover:bg-violet-300">
          <Pencil className="mr-1 inline h-3 w-3" />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Updating your event sends it back for admin approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Event Title" required>
            <input
              required
              className="input-style"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Organizer Name">
              <input
                className="input-style"
                value={form.organizer_name}
                onChange={(e) => updateField("organizer_name", e.target.value)}
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

          <Field label="Address">
            <input
              className="input-style"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
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
              />
            </Field>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Booking URL">
              <input
                className="input-style"
                value={form.booking_url}
                onChange={(e) => updateField("booking_url", e.target.value)}
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

          <Field label="Contact Phone">
            <input
              className="input-style"
              value={form.contact_phone}
              onChange={(e) => updateField("contact_phone", e.target.value)}
            />
          </Field>

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
