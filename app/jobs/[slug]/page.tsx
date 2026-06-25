import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  DollarSign,
  ExternalLink,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { getJobBySlug } from "@/app/api/apiServices/jobService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";
import SaveButton from "@/app/components/favorites/SaveButton";
import ReportButton from "@/app/components/reports/ReportButton";
import ShareButton from "@/app/components/share/ShareButton";
import RecentlyViewedTracker from "@/app/components/recently-viewed/RecentlyViewedTracker";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const job = await getJobBySlug(slug);
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/auth/login?redirectTo=/jobs/${slug}`);
  }

  if (!job || job.status !== "active") notFound();

  const savedJobIds = await getSavedItemIds("job");

  const visaLabel =
    job.visa_type === "Other" && job.visa_type_other
      ? job.visa_type_other
      : job.visa_type || null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <RecentlyViewedTracker
        item={{
          id: job.id,
          type: "job",
          title: job.title,
          subtitle: job.company_name,
          href: `/jobs/${job.slug}`,
          image: null,
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Link
          href="/jobs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative">
            <Briefcase className="h-10 w-10 text-fuchsia-300" />

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Job Opportunity
            </p>

            <h1 className="mt-4 text-2xl font-black leading-tight md:text-2xl">
              {job.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-violet-50/75">
              <Building2 className="h-5 w-5 text-fuchsia-300" />
              {job.company_name}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {job.job_type && <Badge text={job.job_type} />}
              {job.industry && <Badge text={job.industry} />}
              {job.hourly_rate && <Badge text={`$${job.hourly_rate}/hr`} />}
              {job.salary_note && <Badge text={job.salary_note} />}
              {job.visa_friendly && <Badge text="Student Friendly" />}
              {visaLabel && <Badge text={visaLabel} />}
              <Badge text={job.status} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <SaveButton
                itemId={job.id}
                itemType="job"
                initialSaved={savedJobIds.includes(job.id)}
              />
              <ShareButton
                title={job.title}
                text={`Check out this job on NT Student Hub: ${job.title}`}
              />
              <ReportButton itemId={job.id} itemType="job" />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SideInfo
                icon={Building2}
                label="Company"
                value={job.company_name}
              />

              <SideInfo
                icon={MapPin}
                label="Location"
                value={job.suburb || "Darwin / NT"}
              />

              <SideInfo
                icon={DollarSign}
                label="Hourly Rate"
                value={job.hourly_rate ? `$${job.hourly_rate}/hr` : "-"}
              />

              <SideInfo
                icon={CalendarDays}
                label="Closing Date"
                value={formatDate(job.closing_date)}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div className="space-y-6">
            <InfoBlock title="Job Description" text={job.description} />
            <InfoBlock title="Requirements" text={job.requirements} />

            <div className="rounded-[2rem] border border-yellow-300/20 bg-yellow-400/10 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-yellow-100">
                Student reminder
              </h2>

              <p className="mt-4 leading-8 text-yellow-50/80">
                Always confirm pay rate, work rights, shift hours, location,
                transport access, and employer details before applying. Do not
                pay money to get a job.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black">Apply</h2>

              {job.apply_url && (
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  Apply Now <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {!job.apply_url && job.contact_email && (
                <a
                  href={`mailto:${job.contact_email}`}
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  Email Employer <Mail className="h-4 w-4" />
                </a>
              )}

              {!job.apply_url && !job.contact_email && (
                <p className="mt-4 text-sm leading-7 text-violet-50/70">
                  No application link or email was provided.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black">Job Details</h2>

              <div className="mt-5 space-y-4">
                <SideInfo
                  icon={Briefcase}
                  label="Job Type"
                  value={job.job_type || "-"}
                />

                <SideInfo
                  icon={Briefcase}
                  label="Industry"
                  value={job.industry || "-"}
                />

                <SideInfo
                  icon={DollarSign}
                  label="Salary Info"
                  value={job.salary_note || "-"}
                />

                <SideInfo
                  icon={ShieldCheck}
                  label="Student Friendly"
                  value={job.visa_friendly ? "Yes" : "No"}
                />

                <SideInfo
                  icon={ShieldCheck}
                  label="Suitable Visa Type"
                  value={visaLabel || "-"}
                />

                <SideInfo
                  icon={Mail}
                  label="Email"
                  value={job.contact_email || "-"}
                />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function InfoBlock({ title, text }: { title: string; text: string | null }) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-black">{title}</h2>

      <p className="mt-4 whitespace-pre-line leading-8 text-violet-50/75">
        {text || "No information provided."}
      </p>
    </div>
  );
}

function SideInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.05] p-4">
      <Icon className="h-5 w-5 text-fuchsia-300" />
      <p className="mt-2 text-xs text-violet-50/50">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold capitalize text-violet-100">
      {text}
    </span>
  );
}
