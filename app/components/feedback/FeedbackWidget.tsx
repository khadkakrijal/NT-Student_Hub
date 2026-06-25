"use client";

import { useState } from "react";
import { MessageSquareText, X } from "lucide-react";
import Swal from "sweetalert2";
import { createClient } from "@/app/lib/supabase/client";

export default function FeedbackWidget() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!feedback.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback required",
        text: "Please write your feedback before submitting.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("feedback").insert({
      name: name.trim() || null,
      email: email.trim() || null,
      feedback: feedback.trim(),
      page_url: window.location.pathname,
    });

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Could not submit",
        text: error.message,
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    setName("");
    setEmail("");
    setFeedback("");
    setOpen(false);

    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted.",
      timer: 1600,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#fff",
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-violet-100/10 bg-violet-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-violet-500/30 transition hover:-translate-y-1 hover:bg-violet-400"
      >
        <MessageSquareText className="h-5 w-5" />
        Feedback
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm md:p-6">
          <div className="w-full max-w-md rounded-[2rem] border border-violet-100/10 bg-gradient-to-b from-slate-900 to-blue-950 p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
                  Help us improve
                </p>
                <h2 className="mt-2 text-2xl font-black">Share Feedback</h2>
                <p className="mt-2 text-sm leading-6 text-violet-50/65">
                  Tell us what is missing, confusing, or what features we should
                  add next.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-2xl border border-violet-100/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-violet-100/45"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full rounded-2xl border border-violet-100/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-violet-100/45"
              />

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="What should we improve or add?"
                className="w-full resize-none rounded-2xl border border-violet-100/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 outline-none placeholder:text-violet-100/45"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}