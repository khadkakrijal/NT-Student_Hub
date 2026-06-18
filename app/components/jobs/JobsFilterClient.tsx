"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import SaveButton from "@/app/components/favorites/SaveButton";
import ReportButton from "../reports/ReportButton";

type SortOption =
  | "featured"
  | "newest"
  | "highestPay"
  | "visaFriendly"
  | "closingSoon";

type Job = {
  id: string;
  slug: string;
  title: string;
  company_name: string;
  suburb: string | null;
  job_type: string | null;
  industry: string | null;
  description: string | null;
  hourly_rate: number | null;
  visa_friendly: boolean | null;
  salary_note?: string | null;
  closing_date?: string | null;
  featured?: boolean | null;
  created_at?: string | null;
};

export default function JobsFilterClient({
  jobs,
  savedJobIds = [],
}: {
  jobs: Job[];
  savedJobIds?: string[];
}) {
  const [search, setSearch] = useState("");
  const [suburb, setSuburb] = useState("");
  const [jobType, setJobType] = useState("");
  const [industry, setIndustry] = useState("");
  const [minRate, setMinRate] = useState("");
  const [visaFriendlyOnly, setVisaFriendlyOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const suburbs = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((job) => job.suburb).filter(Boolean)),
      ).sort() as string[],
    [jobs],
  );

  const jobTypes = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((job) => job.job_type).filter(Boolean)),
      ).sort() as string[],
    [jobs],
  );

  const industries = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((job) => job.industry).filter(Boolean)),
      ).sort() as string[],
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        !keyword ||
        job.title.toLowerCase().includes(keyword) ||
        job.company_name.toLowerCase().includes(keyword) ||
        job.suburb?.toLowerCase().includes(keyword) ||
        job.job_type?.toLowerCase().includes(keyword) ||
        job.industry?.toLowerCase().includes(keyword) ||
        job.description?.toLowerCase().includes(keyword);

      const matchesSuburb = !suburb || job.suburb === suburb;
      const matchesJobType = !jobType || job.job_type === jobType;
      const matchesIndustry = !industry || job.industry === industry;
      const matchesRate =
        !minRate || Number(job.hourly_rate || 0) >= Number(minRate);
      const matchesVisa = !visaFriendlyOnly || job.visa_friendly;

      return (
        matchesSearch &&
        matchesSuburb &&
        matchesJobType &&
        matchesIndustry &&
        matchesRate &&
        matchesVisa
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;

        return getTime(b.created_at) - getTime(a.created_at);
      }

      if (sortBy === "newest") {
        return getTime(b.created_at) - getTime(a.created_at);
      }

      if (sortBy === "highestPay") {
        return Number(b.hourly_rate || 0) - Number(a.hourly_rate || 0);
      }

      if (sortBy === "visaFriendly") {
        if (a.visa_friendly && !b.visa_friendly) return -1;
        if (!a.visa_friendly && b.visa_friendly) return 1;

        return getTime(b.created_at) - getTime(a.created_at);
      }

      if (sortBy === "closingSoon") {
        return getClosingTime(a.closing_date) - getClosingTime(b.closing_date);
      }

      return 0;
    });
  }, [
    jobs,
    search,
    suburb,
    jobType,
    industry,
    minRate,
    visaFriendlyOnly,
    sortBy,
  ]);

  function clearFilters() {
    setSearch("");
    setSuburb("");
    setJobType("");
    setIndustry("");
    setMinRate("");
    setVisaFriendlyOnly(false);
    setSortBy("featured");
  }

  return (
    <>
      <div className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-fuchsia-300">
          <SlidersHorizontal className="h-5 w-5" />
          <p className="font-bold">Filter jobs</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-100/45" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, company, suburb..."
              className="input-style !pl-11"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="featured">Featured first</option>
            <option value="newest">Newest</option>
            <option value="highestPay">Highest pay</option>
            <option value="visaFriendly">Visa friendly</option>
            <option value="closingSoon">Closing soon</option>
          </select>

          <select
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All suburbs</option>
            {suburbs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All job types</option>
            {jobTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All industries</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            placeholder="Min hourly rate"
            className="input-style"
          />

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={visaFriendlyOnly}
              onChange={(e) => setVisaFriendlyOnly(e.target.checked)}
            />
            Visa friendly only
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-violet-50/60">
            Showing{" "}
            <span className="font-bold text-fuchsia-300">
              {filteredJobs.length}
            </span>{" "}
            of {jobs.length} jobs
          </p>

          <button
            onClick={clearFilters}
            className="rounded-full border border-violet-100/10 px-4 py-2 text-sm font-semibold text-violet-50/80 transition hover:bg-white/10"
          >
            Clear filters
          </button>
        </div>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`group rounded-[2rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
              job.featured
                ? "border-yellow-300/30 bg-yellow-300/10 hover:border-yellow-300/50"
                : "border-violet-100/10 bg-white/[0.06] hover:border-fuchsia-300/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <Briefcase className="h-8 w-8 text-fuchsia-300" />

              <div className="flex items-center gap-2">
                <SaveButton
                  itemId={job.id}
                  itemType="job"
                  initialSaved={savedJobIds.includes(job.id)}
                />

                <ReportButton itemId={job.id} itemType="job" />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {isNew(job.created_at) && <Badge text="New" />}
              {job.closing_date && isClosingSoon(job.closing_date) && (
                <Badge text="Closing soon" />
              )}
              {job.job_type && <Badge text={job.job_type} />}
              {job.industry && <Badge text={job.industry} />}
              {job.visa_friendly && <Badge text="Visa friendly" />}
              {job.hourly_rate && <Badge text={`$${job.hourly_rate}/hr`} />}
            </div>

            <Link href={`/jobs/${job.slug}`}>
              <h2 className="mt-4 text-2xl font-black text-white transition hover:text-fuchsia-200">
                {job.title}
              </h2>
            </Link>

            <p className="mt-3 flex items-center gap-2 text-sm text-violet-50/70">
              <Building2 className="h-4 w-4 text-fuchsia-300" />
              {job.company_name}
            </p>

            <p className="mt-2 flex items-center gap-2 text-sm text-violet-50/70">
              <MapPin className="h-4 w-4 text-fuchsia-300" />
              {job.suburb || "Darwin / NT"}
            </p>

            {job.closing_date && (
              <p className="mt-2 flex items-center gap-2 text-sm text-violet-50/70">
                <Clock className="h-4 w-4 text-fuchsia-300" />
                Closes {formatDate(job.closing_date)}
              </p>
            )}

            <p className="mt-5 line-clamp-3 text-sm leading-7 text-violet-50/65">
              {job.description ||
                "View job details and application information."}
            </p>

            <Link
              href={`/jobs/${job.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300"
            >
              View job <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}

        {!filteredJobs.length && (
          <div className="col-span-full rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
            <Briefcase className="mx-auto h-14 w-14 text-fuchsia-300" />
            <h2 className="mt-5 text-2xl font-black">No matching jobs</h2>
            <p className="mt-2 text-violet-50/70">
              Try changing your filters or clearing them.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold text-violet-100">
      {text}
    </span>
  );
}

function getTime(date?: string | null) {
  return date ? new Date(date).getTime() : 0;
}

function getClosingTime(date?: string | null) {
  return date ? new Date(date).getTime() : Number.MAX_SAFE_INTEGER;
}

function isNew(date?: string | null) {
  if (!date) return false;

  const created = new Date(date).getTime();
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return now - created <= sevenDays;
}

function isClosingSoon(date?: string | null) {
  if (!date) return false;

  const closing = new Date(date).getTime();
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return closing >= now && closing - now <= sevenDays;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
