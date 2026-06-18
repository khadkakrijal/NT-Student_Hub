"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { createBanner } from "@/app/actions/bannerActions";

export default function BannerForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createBanner({
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      button_text: String(formData.get("button_text") || ""),
      button_link: String(formData.get("button_link") || ""),
      image_url: String(formData.get("image_url") || ""),
      is_active: formData.get("is_active") === "on",
      start_date: String(formData.get("start_date") || "") || null,
      end_date: String(formData.get("end_date") || "") || null,
    });

    setLoading(false);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Created" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) {
      const form = document.getElementById("banner-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <form
      id="banner-form"
      action={handleSubmit}
      className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-black">Create Banner</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input name="title" required placeholder="Banner title" className="input-style" />

        <input name="button_text" placeholder="Button text" className="input-style" />

        <input name="button_link" placeholder="Button link e.g. /events" className="input-style" />

        <input name="image_url" placeholder="Image URL optional" className="input-style" />

        <input name="start_date" type="date" className="input-style" />

        <input name="end_date" type="date" className="input-style" />

        <textarea
          name="description"
          placeholder="Banner description"
          className="input-style md:col-span-2 min-h-28"
        />

        <label className="flex items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3 text-sm">
          <input name="is_active" type="checkbox" defaultChecked />
          Active
        </label>
      </div>

      <button
        disabled={loading}
        className="mt-5 rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Banner"}
      </button>
    </form>
  );
}