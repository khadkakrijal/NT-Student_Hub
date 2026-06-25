import {
  MessageSquareText,
  Mail,
  User,
  CalendarDays,
  LinkIcon,
} from "lucide-react";
import { getAllFeedbackForAdmin } from "@/app/api/apiServices/feedbackService";

export default async function AdminFeedbackPage() {
  const feedback = await getAllFeedbackForAdmin();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
          Admin Feedback
        </p>

        <h1 className="mt-3 text-4xl font-black">User Feedback</h1>

        <p className="mt-3 text-violet-50/70">
          View suggestions, bug reports, and improvement ideas submitted by
          users.
        </p>
      </section>

      <section className="grid gap-5">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                    {item.status || "new"}
                  </span>

                  <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
                    {formatDate(item.created_at)}
                  </span>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-violet-50/80">
                  {item.feedback}
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <Info icon={User} label="Name" value={item.name || "-"} />
                  <Info icon={Mail} label="Email" value={item.email || "-"} />
                  <Info
                    icon={LinkIcon}
                    label="Page"
                    value={item.page_url || "-"}
                  />
                  <Info
                    icon={CalendarDays}
                    label="Submitted"
                    value={formatDate(item.created_at)}
                  />
                </div>
              </div>

              <MessageSquareText className="h-8 w-8 shrink-0 text-fuchsia-300" />
            </div>
          </div>
        ))}

        {!feedback.length && (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-10 text-center">
            <MessageSquareText className="mx-auto h-12 w-12 text-fuchsia-300" />
            <h2 className="mt-4 text-2xl font-black">No feedback yet</h2>
            <p className="mt-2 text-violet-50/70">
              User feedback will appear here after someone submits it.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
      <Icon className="h-4 w-4 text-fuchsia-300" />
      <p className="mt-2 text-xs text-violet-50/50">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
