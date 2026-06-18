"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import Swal from "sweetalert2";
import { createContentReport } from "@/app/actions/reportActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ReportType = "listing" | "job" | "event" | "community";

const reasons = [
  "Spam",
  "Scam / suspicious",
  "Incorrect information",
  "Offensive content",
  "Duplicate",
  "Other",
];

export default function ReportButton({
  itemId,
  itemType,
}: {
  itemId: string;
  itemType: ReportType;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const result = await createContentReport({
      itemId,
      itemType,
      reason,
      details,
    });

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Report submitted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) {
      setDetails("");
      setReason(reasons[0]);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-red-300/15 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/20"
        >
          <Flag className="mr-1 h-3.5 w-3.5" />
          Report
        </button>
      </DialogTrigger>

      <DialogContent className="border-violet-100/10 bg-[#1d0f33] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription className="text-violet-100/70">
            Help keep NT Student Hub safe and useful for students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-violet-50">
              Reason
            </label>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input-style bg-[#1d0f33] text-white"
            >
              {reasons.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-violet-50">
              Details optional
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Add more details for admin..."
              className="input-style min-h-28"
            />
          </div>

          <button
            disabled={loading}
            className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-400 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}