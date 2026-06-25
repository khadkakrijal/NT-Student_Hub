import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { educationAgencies } from "@/app/data/educationAgencies";

export default function EducationAgenciesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/living-in-darwin"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Student Guide
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <GraduationCap className="relative h-11 w-11 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Student Support
          </p>

          <h1 className="relative mt-4 text-2xl font-black leading-tight md:text-2xl">
            Education & Migration Services
          </h1>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
            Looking for help with university admissions, student visas, course
            transfers or migration advice? Here are some trusted education and
            migration agencies serving international students in Darwin.
          </p>
        </section>

        {/* Cards */}
        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {educationAgencies.map((agency) => (
            <a
              key={agency.name}
              href={agency.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2.2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
            >
              <div className="absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl transition group-hover:bg-fuchsia-500/20" />

              <div className="relative flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-violet-100/10 bg-white/[0.08] p-4">
                  <Image
                    src={agency.logo}
                    alt={agency.name}
                    width={110}
                    height={110}
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="relative mt-6 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                  Education Agency
                </p>

                <h2 className="mt-3 text-2xl font-black text-white">
                  {agency.name}
                </h2>

                <p className="mt-4 min-h-[110px] text-sm leading-7 text-violet-50/70">
                  {agency.description}
                </p>
              </div>

              <div className="relative mt-6 rounded-2xl border border-violet-100/10 bg-white/[0.05] p-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-fuchsia-300" />

                  <div>
                    <p className="text-xs text-violet-50/50">
                      Services Available
                    </p>

                    <p className="font-semibold text-white">
                      Education • Visa • Student Support
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-center gap-2 rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] transition group-hover:bg-violet-300">
                Visit Facebook
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </section>

        {/* Information */}
        <section className="mt-12 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-black">How can these agencies help?</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "University & college admissions",
              "Student visa (Subclass 500) applications",
              "Course transfers & provider changes",
              "Visa extensions & enrolment support",
              "Overseas Student Health Cover (OSHC)",
              "Migration advice & consultation",
              "Education counselling",
              "General student support and guidance",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl bg-white/[0.05] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" />

                <p className="text-sm leading-7 text-violet-50/75">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-300/20 bg-yellow-400/10 p-5">
            <p className="text-sm leading-7 text-yellow-100">
              <strong>Important:</strong> NT Student Hub lists these agencies
              for student convenience only. Always confirm visa requirements,
              education advice and migration information directly with the
              agency and the Australian Department of Home Affairs before making
              important decisions.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
