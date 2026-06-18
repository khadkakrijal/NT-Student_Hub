"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { X, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function AddAccommodationDialog() {
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    suburb: "",
    rent_per_week: "",
    bond_amount: "",
    available_from: "",
    room_type: "",
    furnished: false,
    bills_included: false,
    gender_preference: "",
    contact_method: "",
  });

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const validImages: File[] = [];

    for (const file of selectedFiles) {
      const fileSizeMb = file.size / 1024 / 1024;

      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "warning",
          title: "Invalid file",
          text: `${file.name} is not an image.`,
          background: "#1d0f33",
          color: "#fff",
          confirmButtonColor: "#a78bfa",
        });
        continue;
      }

      if (fileSizeMb > MAX_IMAGE_SIZE_MB) {
        Swal.fire({
          icon: "warning",
          title: "Image too large",
          text: `${file.name} is larger than ${MAX_IMAGE_SIZE_MB}MB.`,
          background: "#1d0f33",
          color: "#fff",
          confirmButtonColor: "#a78bfa",
        });
        continue;
      }

      validImages.push(file);
    }

    setImages((prev) => {
      const combined = [...prev, ...validImages];

      if (combined.length > MAX_IMAGE_COUNT) {
        Swal.fire({
          icon: "warning",
          title: "Too many images",
          text: `You can upload maximum ${MAX_IMAGE_COUNT} images.`,
          background: "#1d0f33",
          color: "#fff",
          confirmButtonColor: "#a78bfa",
        });
      }

      return combined.slice(0, MAX_IMAGE_COUNT);
    });

    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);

      await Swal.fire({
        icon: "warning",
        title: "Login required",
        text: "Please login before posting accommodation.",
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });

      router.push("/auth/login");
      return;
    }

    const { data: listing, error } = await supabase
      .from("accommodation_listings")
      .insert({
        host_id: user.id,
        title: form.title,
        description: form.description || null,
        suburb: form.suburb,
        rent_per_week: Number(form.rent_per_week),
        bond_amount: form.bond_amount ? Number(form.bond_amount) : null,
        available_from: form.available_from || null,
        room_type: form.room_type || null,
        furnished: form.furnished,
        bills_included: form.bills_included,
        gender_preference: form.gender_preference || null,
        contact_method: form.contact_method || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error || !listing) {
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.message || "Could not create listing.",
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });

      return;
    }

    for (const image of images) {
      const fileExt = image.name.split(".").pop();
      const filePath = `${user.id}/${listing.id}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError.message);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(filePath);

      await supabase.from("listing_images").insert({
        listing_id: listing.id,
        image_url: publicUrlData.publicUrl,
      });
    }

    setLoading(false);

    await Swal.fire({
      icon: "success",
      title: "Submitted",
      text: "Your listing has been submitted for admin approval.",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    setForm({
      title: "",
      description: "",
      suburb: "",
      rent_per_week: "",
      bond_amount: "",
      available_from: "",
      room_type: "",
      furnished: false,
      bills_included: false,
      gender_preference: "",
      contact_method: "",
    });

    setImages([]);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] transition hover:bg-violet-300">
          Add New Accommodation
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Accommodation
          </DialogTitle>

          <DialogDescription className="text-violet-100/70">
            Complete all accommodation details. Your listing will be reviewed by
            admin before it appears publicly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <FormGroup label="Accommodation Title" required>
            <input
              required
              placeholder="Example: Furnished room near CDU Casuarina"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input-style"
            />
          </FormGroup>

          <FormGroup label="Description">
            <textarea
              rows={4}
              placeholder="Describe the room, house rules, nearby transport, facilities, and who it is suitable for."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="input-style resize-none"
            />
          </FormGroup>

          <div className="grid gap-4 md:grid-cols-2">
            <FormGroup label="Suburb" required>
              <input
                required
                placeholder="Example: Casuarina"
                value={form.suburb}
                onChange={(e) => updateField("suburb", e.target.value)}
                className="input-style"
              />
            </FormGroup>

            <FormGroup label="Room Type">
              <select
                value={form.room_type}
                onChange={(e) => updateField("room_type", e.target.value)}
                className="input-style bg-[#1d0f33] text-white"
              >
                <option value="">Select room type</option>
                <option value="Single room">Single room</option>
                <option value="Shared room">Shared room</option>
                <option value="Master room">Master room</option>
                <option value="Studio">Studio</option>
                <option value="Whole unit">Whole unit</option>
                <option value="Temporary stay">Temporary stay</option>
              </select>
            </FormGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormGroup label="Rent Per Week" required>
              <input
                required
                type="number"
                min="0"
                placeholder="Example: 250"
                value={form.rent_per_week}
                onChange={(e) => updateField("rent_per_week", e.target.value)}
                className="input-style"
              />
            </FormGroup>

            <FormGroup label="Bond Amount">
              <input
                type="number"
                min="0"
                placeholder="Example: 500"
                value={form.bond_amount}
                onChange={(e) => updateField("bond_amount", e.target.value)}
                className="input-style"
              />
            </FormGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormGroup label="Available From">
              <input
                type="date"
                value={form.available_from}
                onChange={(e) => updateField("available_from", e.target.value)}
                className="input-style"
              />
            </FormGroup>

            <FormGroup label="Gender Preference">
              <select
                value={form.gender_preference}
                onChange={(e) =>
                  updateField("gender_preference", e.target.value)
                }
                className="input-style"
              >
                <option value="">No preference</option>
                <option value="Any">Any</option>
                <option value="Male preferred">Male preferred</option>
                <option value="Female preferred">Female preferred</option>
                <option value="Couple accepted">Couple accepted</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Contact Method">
            <input
              placeholder="Example: 04xxxxxxxx, WhatsApp, Messenger, email"
              value={form.contact_method}
              onChange={(e) => updateField("contact_method", e.target.value)}
              className="input-style"
            />
          </FormGroup>

          <div className="grid gap-4 md:grid-cols-2">
            <CheckboxCard
              label="Furnished"
              description="Room includes basic furniture."
              checked={form.furnished}
              onChange={(checked) => updateField("furnished", checked)}
            />

            <CheckboxCard
              label="Bills Included"
              description="Rent includes electricity, water, or internet."
              checked={form.bills_included}
              onChange={(checked) => updateField("bills_included", checked)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-violet-50">
              Accommodation Images
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-violet-100/20 bg-white/[0.05] px-6 py-8 text-center transition hover:bg-white/[0.08]">
              <UploadCloud className="mb-3 h-8 w-8 text-fuchsia-300" />
              <span className="font-semibold">Upload images</span>
              <span className="mt-1 text-xs text-violet-100/55">
                PNG, JPG, WEBP. Max {MAX_IMAGE_SIZE_MB}MB each. Up to{" "}
                {MAX_IMAGE_COUNT} images.
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative h-24 overflow-hidden rounded-2xl border border-violet-100/10 bg-white/10"
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Accommodation"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormGroup({
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
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.08]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
      />

      <span>
        <span className="block font-semibold text-white">{label}</span>
        <span className="text-sm text-violet-100/55">{description}</span>
      </span>
    </label>
  );
}
