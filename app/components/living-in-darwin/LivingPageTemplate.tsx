import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { livingBasePath } from "@/app/data/livingInDarwinData";

type LivingPage = {
  title: string;
  description: string;
  icon: React.ElementType;
  sections: {
    heading: string;
    points: string[];
  }[];
};

export default function LivingPageTemplate({ page }: { page: LivingPage }) {
  const Icon = page.icon;

  return (
    <main className="min-h-screen bg-[#12091f] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link
          href={livingBasePath}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Living in Darwin
        </Link>

        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <Icon className="relative h-10 w-10 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Living in Darwin
          </p>

          <h1 className="relative mt-4 max-w-5xl text-5xl font-black leading-tight md:text-5xl">
            {page.title}
          </h1>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
            {page.description}
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {page.sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-black">{section.heading}</h2>

              <div className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3 rounded-2xl bg-white/[0.05] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" />
                    <p className="text-sm leading-7 text-violet-50/75">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <p className="mt-10 text-sm leading-7 text-violet-50/50">
          Details can change. Always confirm official information before making
          housing, travel, study, work, or safety decisions.
        </p>
      </div>
    </main>
  );
}