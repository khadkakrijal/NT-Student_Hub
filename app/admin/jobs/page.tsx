import AddJobDialog from "@/app/components/jobs/AddJobDialog";
import AdminJobActions from "@/app/components/jobs/AdminJobActions";
import { getAllJobsForAdmin } from "@/app/api/apiServices/jobService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditJobDialog from "@/app/components/jobs/EditJobDialog";
import FeatureButton from "@/app/components/admin/FeatureButton";

export default async function AdminJobsPage() {
  const jobs = await getAllJobsForAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Admin Jobs
          </p>

          <h1 className="mt-3 text-2xl font-black">Jobs Management</h1>

          <p className="mt-3 text-violet-50/70">
            Post and manage student-friendly jobs in Darwin and the NT.
          </p>
        </div>

        <AddJobDialog />
      </div>

      <div className="overflow-hidden rounded-[1rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-violet-100/10 hover:bg-transparent">
                <TableHead className="text-violet-100/70">Job</TableHead>
                <TableHead className="text-violet-100/70">Company</TableHead>
                <TableHead className="text-violet-100/70">Suburb</TableHead>
                <TableHead className="text-violet-100/70">Type</TableHead>
                <TableHead className="text-violet-100/70">Rate</TableHead>
                <TableHead className="text-violet-100/70">Visa</TableHead>
                <TableHead className="text-violet-100/70">Closing</TableHead>
                <TableHead className="text-violet-100/70 ">Status</TableHead>
                <TableHead className="text-right text-violet-100/70 flex justify-center items-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="border-violet-100/10 hover:bg-white/[0.04]"
                >
                  <TableCell>
                    <div>
                      <p className="font-bold text-white">{job.title}</p>
                      {job.featured && (
                        <p className="mt-1 w-fit rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-[#160524]">
                          Featured
                        </p>
                      )}
                      <p className="text-xs text-violet-50/50">
                        {job.industry || "General"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {job.company_name}
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {job.suburb || "-"}
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {job.job_type || "-"}
                  </TableCell>

                  <TableCell className="font-bold text-emerald-300">
                    {job.hourly_rate ? `$${job.hourly_rate}/hr` : "-"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        job.visa_friendly
                          ? "bg-emerald-400/15 text-emerald-200"
                          : "bg-red-400/15 text-red-200"
                      }`}
                    >
                      {job.visa_friendly ? "Yes" : "No"}
                    </span>
                  </TableCell>

                  <TableCell className="text-violet-50/70">
                    {job.closing_date || "-"}
                  </TableCell>

                  <TableCell>
                    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold capitalize text-fuchsia-200">
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell className="min-w-[260px] ">
                    <div className="flex flex-wrap justify-center gap-2">
                      <FeatureButton
                        itemId={job.id}
                        itemType="job"
                        featured={job.featured || false}
                      />

                      <EditJobDialog job={job} />

                      <AdminJobActions jobId={job.id} status={job.status} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!jobs.length && (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center">
                    No jobs posted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
