"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { PlusCircle } from "lucide-react";
import RichTextEditor from "@/app/components/editor/RichTextEditor";
import { createCommunityPost } from "@/app/actions/communityActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "General Questions",
  "Accommodation Advice",
  "Jobs & Work",
  "Events & Activities",
  "Transport & Suburbs",
  "Food & Shopping",
  "Study & University",
  "Buy / Sell / Swap",
  "Safety & Warnings",
];

export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content || content === "<p></p>") {
      Swal.fire({
        icon: "warning",
        title: "Write something first",
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    setLoading(true);

    const result = await createCommunityPost({
      title,
      category,
      content,
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
      setTitle("");
      setCategory(categories[0]);
      setContent("");
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center rounded-full bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] hover:bg-violet-300">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Community Post</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Your post will be visible after admin approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
          <Field label="Title" required>
            <input
              required
              className="input-style"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Which suburb is better for CDU students?"
            />
          </Field>

          <Field label="Category">
            <select
              className="input-style bg-[#1d0f33] text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Post Details">
            <RichTextEditor value={content} onChange={setContent} />
          </Field>

          <button
            disabled={loading}
            className="rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit for Approval"}
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