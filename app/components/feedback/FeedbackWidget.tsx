"use client";

import { useState } from "react";
import { MessageSquareText, X, HeartHandshake } from "lucide-react";
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
        text: "Please share your feedback before submitting.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("feedback").insert({
      name: name || null,
      email: email || null,
      feedback,
      page_url: window.location.pathname,
    });

    setLoading(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
      });

      return;
    }

    setName("");
    setEmail("");
    setFeedback("");
    setOpen(false);

    Swal.fire({
      icon: "success",
      title: "Thank you 💜",
      text: "Your feedback helps us improve NT Student Hub.",
      timer: 1800,
      showConfirmButton: false,
      background: "#0f172a",
      color: "#fff",
    });
  }

  return (
    <>
      {/* Floating Card */}

      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <div className="w-72 rounded-3xl border border-violet-100/10 bg-gradient-to-br from-slate-900 to-blue-950 p-5 shadow-2xl backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-violet-500/20 p-3">
              <HeartHandshake className="h-6 w-6 text-fuchsia-300" />
            </div>

            <div>
              <h3 className="font-black text-white">
                Help us improve
              </h3>

              <p className="text-xs text-violet-100/60">
                Your ideas matter.
              </p>
            </div>

          </div>

          <p className="mt-4 text-sm leading-6 text-violet-50/70">
            Found a bug? Missing a feature? Have an idea that would make
            NT Student Hub better?
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-5 w-full rounded-2xl bg-violet-500 py-3 font-bold text-white transition hover:bg-violet-400"
          >
            Give Feedback
          </button>
        </div>
      </div>

      {/* Mobile Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500 shadow-xl md:hidden"
      >
        <MessageSquareText className="h-6 w-6 text-white" />
      </button>

      {/* Dialog */}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end bg-black/40 p-4 backdrop-blur-sm md:p-6">

          <div className="w-full max-w-md rounded-[2rem] border border-violet-100/10 bg-gradient-to-b from-slate-900 to-blue-950 p-6 text-white shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                  Feedback
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Help us improve
                </h2>

                <p className="mt-3 text-sm leading-7 text-violet-50/70">
                  We'd love to hear your ideas, report bugs, or know what
                  features you'd like to see next.
                </p>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >

              <input
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-violet-100/10 bg-white/5 px-4 py-3 outline-none"
              />

              <input
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-violet-100/10 bg-white/5 px-4 py-3 outline-none"
              />

              <textarea
                rows={6}
                placeholder="Tell us what we can improve..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full resize-none rounded-2xl border border-violet-100/10 bg-white/5 px-4 py-3 outline-none"
              />

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-violet-500 py-3 font-bold transition hover:bg-violet-400 disabled:opacity-60"
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