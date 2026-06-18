"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Pencil, UploadCloud, X } from "lucide-react";
import { updateMyListing } from "@/app/actions/listingActions";
import { createClient } from "@/app/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const MAX_IMAGE_SIZE_MB = 2;
const MAX_IMAGE_COUNT = 8;

type ListingImage = {
  id: string;
  image_url: string;
};

type Listing = {
  id: string;
  title: string;
  description: string | null;
  suburb: string;
  rent_per_week: number;
  bond_amount: number | null;
  available_from: string | null;
  room_type: string | null;
  furnished: boolean | null;
  bills_included: boolean | null;
  gender_preference: string | null;
  contact_method: string | null;
  listing_images?: ListingImage[];
};

export default function EditAccommodationDialog({
  listing,
}: {
  listing: Listing;
}) {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [existingImages, setExistingImages] = useState<ListingImage[]>(
    listing.listing_images || []
  );
  const [removedImages, setRemovedImages] = useState<ListingImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: listing.title || "",
    description: listing.description || "",
    suburb: listing.suburb || "",
    rent_per_week: String(listing.rent_per_week || ""),
    bond_amount: listing.bond_amount ? String(listing.bond_amount) : "",
    available_from: listing.available_from || "",
    room_type: listing.room_type || "",
    furnished: Boolean(listing.furnished),
    bills_included: Boolean(listing.bills_included),
    gender_preference: listing.gender_preference || "",
    contact_method: listing.contact_method || "",
  });

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleNewImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) => {
      const sizeMb = file.size / 1024 / 1024;

      if (!file.type.startsWith("image/")) return false;

      if (sizeMb > MAX_IMAGE_SIZE_MB) {
        Swal.fire({
          icon: "warning",
          title: "Image too large",
          text: `${file.name} is larger than ${MAX_IMAGE_SIZE_MB}MB.`,
          background: "#1d0f33",
          color: "#fff",
          confirmButtonColor: "#a78bfa",
        });

        return false;
      }

      return true;
    });

    const totalCount = existingImages.length + newImages.length + validFiles.length;

    if (totalCount > MAX_IMAGE_COUNT) {
      Swal.fire({
        icon: "warning",
        title: "Too many images",
        text: `Maximum ${MAX_IMAGE_COUNT} images allowed.`,
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
    }

    setNewImages((prev) =>
      [...prev, ...validFiles].slice(0, MAX_IMAGE_COUNT - existingImages.length)
    );

    e.target.value = "";
  }

  function removeExistingImage(image: ListingImage) {
    setExistingImages((prev) => prev.filter((item) => item.id !== image.id));
    setRemovedImages((prev) => [...prev, image]);
  }

  function removeNewImage(index: number) {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  }

  function getStoragePathFromPublicUrl(url: string) {
    return decodeURIComponent(url.split("/listing-images/")[1] || "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await updateMyListing({
      id: listing.id,
      title: form.title,
      description: form.description,
      suburb: form.suburb,
      rent_per_week: Number(form.rent_per_week),
      bond_amount: form.bond_amount ? Number(form.bond_amount) : null,
      available_from: form.available_from || null,
      room_type: form.room_type || null,
      furnished: form.furnished,
      bills_included: form.bills_included,
      gender_preference: form.gender_preference || null,
      contact_method: form.contact_method || null,
    });

    if (!result.success) {
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: result.message,
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });

      return;
    }

    for (const image of removedImages) {
      const path = getStoragePathFromPublicUrl(image.image_url);

      if (path) {
        await supabase.storage.from("listing-images").remove([path]);
      }

      await supabase.from("listing_images").delete().eq("id", image.id);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      for (const image of newImages) {
        const fileExt = image.name.split(".").pop();
        const filePath = `${user.id}/${listing.id}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(filePath, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) continue;

        const { data: publicUrlData } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);

        await supabase.from("listing_images").insert({
          listing_id: listing.id,
          image_url: publicUrlData.publicUrl,
        });
      }
    }

    setLoading(false);

    await Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Your listing has been updated and sent back for admin review.",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    setOpen(false);
    window.location.reload();
  }

  const totalImages = existingImages.length + newImages.length;

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
          <DialogTitle>Edit Accommodation</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Updating this listing sends it back to pending review.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Title" required>
            <input
              required
              className="input-style"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              className="input-style resize-none"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Suburb" required>
              <input
                required
                className="input-style"
                value={form.suburb}
                onChange={(e) => updateField("suburb", e.target.value)}
              />
            </Field>

            <Field label="Room Type">
              <input
                className="input-style"
                value={form.room_type}
                onChange={(e) => updateField("room_type", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Rent Per Week" required>
              <input
                required
                type="number"
                min="0"
                className="input-style"
                value={form.rent_per_week}
                onChange={(e) => updateField("rent_per_week", e.target.value)}
              />
            </Field>

            <Field label="Bond Amount">
              <input
                type="number"
                min="0"
                className="input-style"
                value={form.bond_amount}
                onChange={(e) => updateField("bond_amount", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Available From">
              <input
                type="date"
                className="input-style"
                value={form.available_from}
                onChange={(e) => updateField("available_from", e.target.value)}
              />
            </Field>

            <Field label="Gender Preference">
              <select
                className="input-style bg-[#1d0f33] text-white"
                value={form.gender_preference}
                onChange={(e) =>
                  updateField("gender_preference", e.target.value)
                }
              >
                <option value="">No preference</option>
                <option value="Any">Any</option>
                <option value="Male preferred">Male preferred</option>
                <option value="Female preferred">Female preferred</option>
                <option value="Couple accepted">Couple accepted</option>
              </select>
            </Field>
          </div>

          <Field label="Contact Method">
            <input
              className="input-style"
              value={form.contact_method}
              onChange={(e) => updateField("contact_method", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <CheckboxCard
              label="Furnished"
              checked={form.furnished}
              onChange={(checked) => updateField("furnished", checked)}
            />

            <CheckboxCard
              label="Bills Included"
              checked={form.bills_included}
              onChange={(checked) => updateField("bills_included", checked)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-violet-50">
              Listing Images
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-violet-100/20 bg-white/[0.05] px-6 py-7 text-center transition hover:bg-white/[0.08]">
              <UploadCloud className="mb-3 h-8 w-8 text-fuchsia-300" />
              <span className="font-semibold">Add more images</span>
              <span className="mt-1 text-xs text-violet-100/55">
                {totalImages}/{MAX_IMAGE_COUNT} images used. Max{" "}
                {MAX_IMAGE_SIZE_MB}MB each.
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewImages}
                className="hidden"
              />
            </label>

            {totalImages > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {existingImages.map((image) => (
                  <ImagePreview
                    key={image.id}
                    src={image.image_url}
                    onRemove={() => removeExistingImage(image)}
                  />
                ))}

                {newImages.map((image, index) => (
                  <ImagePreview
                    key={`${image.name}-${index}`}
                    src={URL.createObjectURL(image)}
                    onRemove={() => removeNewImage(index)}
                  />
                ))}
              </div>
            )}
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

function ImagePreview({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-violet-100/10 bg-white/10">
      <Image src={src} alt="Listing image" fill sizes="160px" className="object-cover" />

      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-400"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
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

function CheckboxCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="font-semibold">{label}</span>
    </label>
  );
}