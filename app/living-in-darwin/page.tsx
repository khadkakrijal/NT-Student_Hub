import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { livingPages } from "@/app/data/livingInDarwinData";

const studentChecklist = [
  "Check your campus location before booking accommodation",
  "Compare rent with bus access, work distance and grocery access",
  "Understand Dry season, Wet season, storms and cyclone preparation",
  "Prepare resume, TFN, bank account, phone plan and basic emergency savings",
  "Know emergency contacts, hospital, pharmacy and student support services",
  "Avoid paying bond or rent before confirming the room and host properly",
];

const quickStats = [
  { label: "Guide topics", value: livingPages.length },
  { label: "Student focus", value: "100%" },
  { label: "Safety-first", value: "Yes" },
];

export default function LivingInDarwinPage() {
  const featuredPages = livingPages.slice(0, 4);
  const remainingPages = livingPages.slice(4);

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-100px] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100/15 bg-white/[0.06] px-4 py-2 text-sm text-violet-100">
                <Sparkles className="h-4 w-4 text-fuchsia-300" />
                Darwin student survival guide
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Living in Darwin
              </p>

              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight md:text-6xl">
                Understand Darwin before you choose a room, job or suburb.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
                A practical guide for international students covering Darwin
                weather, suburbs, transport, jobs, education, food, cost of
                living, safety, crocodile awareness, health, contacts and
                weekend life.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#guide-sections"
                  className="inline-flex items-center rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  Explore the guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="/listings"
                  className="rounded-full border border-violet-100/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Browse housing
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-100/10 bg-[#180b2b]/80 p-6">
              <Compass className="h-10 w-10 text-fuchsia-300" />

              <h2 className="mt-5 text-2xl font-black">
                Start here before moving
              </h2>

              <p className="mt-3 text-sm leading-7 text-violet-50/70">
                In Darwin, a good room is not only about price. Students should
                also consider transport, weather, suburb access, work
                opportunities, safety and daily living costs.
              </p>

              <div className="mt-6 grid gap-3">
                {studentChecklist.slice(0, 4).map((item) => (
                  <InfoRow key={item} text={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {quickStats.map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
            >
              <p className="text-sm text-violet-50/55">{item.label}</p>
              <p className="mt-2 text-4xl font-black text-fuchsia-200">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Most important first
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Read these before choosing accommodation
            </h2>

            <p className="mt-4 max-w-3xl text-violet-50/70">
              These topics affect almost every new student’s first few weeks in
              Darwin.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredPages.map((page) => (
              <Link
                key={page.slug}
                href={`/living-in-darwin/${page.slug}`}
                className="group rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-violet-400/15 p-3">
                    <page.icon className="h-7 w-7 text-fuchsia-300" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-violet-50/40 transition group-hover:translate-x-1 group-hover:text-fuchsia-300" />
                </div>

                <h3 className="mt-5 text-2xl font-black group-hover:text-fuchsia-200">
                  {page.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-violet-50/70">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="guide-sections"
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {remainingPages.map((page) => (
            <Link
              key={page.slug}
              href={`/living-in-darwin/${page.slug}`}
              className="group rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-violet-400/15 p-3">
                  <page.icon className="h-7 w-7 text-fuchsia-300" />
                </div>

                <ArrowRight className="h-5 w-5 text-violet-50/40 transition group-hover:translate-x-1 group-hover:text-fuchsia-300" />
              </div>

              <h2 className="mt-5 text-2xl font-black group-hover:text-fuchsia-200">
                {page.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-violet-50/70">
                {page.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {page.sections.slice(0, 2).map((section) => (
                  <span
                    key={section.heading}
                    className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100"
                  >
                    {section.heading}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-14 rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <ShieldCheck className="h-10 w-10 text-fuchsia-300" />

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Student checklist
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Before you move into a room
              </h2>

              <p className="mt-4 text-violet-50/70">
                Use this checklist before paying bond, choosing a suburb or
                accepting accommodation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {studentChecklist.map((item) => (
                <Reason key={item} text={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2.5rem] border border-fuchsia-300/15 bg-gradient-to-r from-violet-400/15 to-fuchsia-400/15 p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Star className="h-10 w-10 text-fuchsia-300" />

              <h2 className="mt-5 text-4xl font-black">
                After reading the guide, compare real housing.
              </h2>

              <p className="mt-4 max-w-3xl text-violet-50/75">
                Once you understand Darwin suburbs, transport, weather and
                safety, you can compare approved student-friendly rooms with
                more confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/listings"
                className="rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
              >
                Browse accommodation
              </Link>

              <Link
                href="/community"
                className="rounded-full border border-violet-100/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Ask community
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
      <p className="text-sm leading-6 text-violet-50/75">{text}</p>
    </div>
  );
}

function Reason({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-violet-100/10 bg-white/[0.06] p-5">
      <CheckCircle2 className="h-5 w-5 text-fuchsia-300" />
      <p className="mt-3 text-sm leading-7 text-violet-50/75">{text}</p>
    </div>
  );
}