import { Briefcase } from "lucide-react";
import { getActiveJobs } from "@/app/api/apiServices/jobService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";
import JobsFilterClient from "@/app/components/jobs/JobsFilterClient";

export default async function JobsPage() {
  const jobs = await getActiveJobs();
  const savedJobIds = await getSavedItemIds("job");

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <Briefcase className="relative h-10 w-10 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Student Jobs
          </p>

          <h1 className="relative mt-4 max-w-5xl text-5xl font-black leading-tight md:text-5xl">
            Find student-friendly jobs in Darwin and the NT.
          </h1>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
            Browse casual, part-time, hospitality, retail, support work, admin,
            and entry-level opportunities suitable for students.
          </p>
        </section>

        <JobsFilterClient jobs={jobs} savedJobIds={savedJobIds} />
      </div>
    </main>
  );
}