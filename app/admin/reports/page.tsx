import { Flag } from "lucide-react";
import { getAllReportsForAdmin } from "@/app/api/apiServices/reportService";
import AdminReportActions from "@/app/components/admin/AdminReportActions";

export default async function AdminReportsPage() {
  const reports = await getAllReportsForAdmin();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
        <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-red-500/20 blur-3xl" />

        <Flag className="relative h-10 w-10 text-red-300" />

        <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-red-300">
          Admin Reports
        </p>

        <h1 className="relative mt-3 text-2xl font-black">Content Reports</h1>

        <p className="relative mt-3 max-w-2xl text-violet-50/70">
          Review reports submitted by users for housing, jobs, events and
          community posts.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total" value={reports.length} />
        <StatCard
          label="Pending"
          value={reports.filter((item) => item.status === "pending").length}
        />
        <StatCard
          label="Resolved"
          value={reports.filter((item) => item.status === "resolved").length}
        />
        <StatCard
          label="Dismissed"
          value={reports.filter((item) => item.status === "dismissed").length}
        />
      </section>

      <section className="grid gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={report.status} />

                  <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold capitalize text-fuchsia-200">
                    {report.item_type}
                  </span>

                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-200">
                    {report.reason}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-black">
                  Reported {report.item_type}
                </h2>

                <p className="mt-2 text-sm text-violet-50/60">
                  Item ID: {report.item_id}
                </p>

                <p className="mt-2 text-sm text-violet-50/60">
                  Reported by:{" "}
                  {report.profiles?.full_name ||
                    report.profiles?.email ||
                    "Unknown user"}
                </p>

                {report.details && (
                  <p className="mt-4 max-w-3xl rounded-2xl bg-white/[0.05] p-4 text-sm leading-7 text-violet-50/75">
                    {report.details}
                  </p>
                )}

                {report.admin_note && (
                  <p className="mt-4 max-w-3xl rounded-2xl bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100/80">
                    <span className="font-bold">Admin note:</span>{" "}
                    {report.admin_note}
                  </p>
                )}
              </div>

              <AdminReportActions reportId={report.id} />
            </div>
          </div>
        ))}

        {!reports.length && (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center text-violet-50/70">
            No reports submitted yet.
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <p className="text-sm text-violet-50/55">{label}</p>
      <p className="mt-2 text-2xl font-black text-red-200">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "resolved"
      ? "bg-emerald-400/15 text-emerald-200"
      : status === "dismissed"
        ? "bg-red-400/15 text-red-200"
        : status === "reviewed"
          ? "bg-violet-400/15 text-violet-100"
          : "bg-yellow-400/15 text-yellow-200";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${style}`}
    >
      {status}
    </span>
  );
}
