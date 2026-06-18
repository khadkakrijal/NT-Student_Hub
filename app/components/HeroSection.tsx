"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const trustPoints = [
  "Student-focused Darwin guide",
  "Approved housing and event posts",
  "Community questions reviewed before publishing",
];

const platformCards: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: Home,
    title: "Housing",
    description: "Browse approved rooms and shared accommodation.",
    href: "/listings",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description: "Find student, cultural, sports and community events.",
    href: "/events",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description: "Ask questions and learn from other students.",
    href: "/community",
  },
  {
    icon: BookOpen,
    title: "Darwin Guide",
    description: "Understand transport, suburbs, food, jobs and safety.",
    href: "/living-in-darwin",
  },
];

const miniCards: { icon: LucideIcon; label: string }[] = [
  { icon: CloudRain, label: "Wet season tips" },
  { icon: MapPin, label: "Suburb guidance" },
  { icon: Briefcase, label: "Jobs reality" },
  { icon: ShieldCheck, label: "Safety first" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#12091f]">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/nt-student-hub-hero.png')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#12091f] via-[#12091f]/86 to-[#12091f]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12091f] via-[#12091f]/20 to-[#12091f]/55" />

      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[-100px] h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-cent gap-12 px-6 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/25 bg-violet-400/10 px-4 py-2 text-sm text-violet-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-fuchsia-300" />
            Built for students starting life in Darwin
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-[1.04] tracking-tight md:text-6xl">
            Your student starting point for{" "}
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent">
              Darwin and the NT.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-violet-50/85">
            Find housing, explore local events, ask community questions, and
            understand Darwin life before making your next move.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/listings"
              className="inline-flex items-center rounded-full bg-violet-400 px-7 py-3 font-bold text-[#160524] shadow-lg shadow-violet-500/25 transition hover:-translate-y-1 hover:bg-violet-300"
            >
              Browse Housing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/living-in-darwin"
              className="rounded-full border border-violet-100/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
            >
              Start Darwin Guide
            </Link>

            <Link
              href="/community"
              className="rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 px-7 py-3 font-semibold text-fuchsia-100 backdrop-blur transition hover:-translate-y-1 hover:bg-fuchsia-300/15"
            >
              Ask Community
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-violet-50/85">
            {trustPoints.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.12, duration: 0.5 }}
                className="flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/[0.06] px-4 py-2 backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-fuchsia-300" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[2rem] border border-violet-100/15 bg-white/10 p-5 shadow-2xl shadow-violet-950/50 backdrop-blur-xl"
          >
            <div className="rounded-[1.5rem] bg-[#180b2b]/90 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-violet-200/65">
                    NT Student Hub
                  </p>
                  <h3 className="text-2xl font-bold">
                    One place to begin
                  </h3>
                </div>

                <div className="rounded-full bg-violet-300 px-4 py-2 text-sm font-bold text-[#160524]">
                  Student ready
                </div>
              </div>

              <div className="grid gap-4">
                {platformCards.map((card, index) => (
                  <PlatformCard key={card.title} card={card} index={index} />
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {miniCards.map((item) => (
                  <MiniCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-r from-violet-300 to-fuchsia-300 p-5 text-[#160524]">
                <p className="font-black">
                  More than accommodation.
                </p>
                <p className="mt-1 text-sm font-medium">
                  A practical hub for housing, events, community advice and
                  student life in Darwin.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PlatformCard({
  card,
  index,
}: {
  card: {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
  };
  index: number;
}) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.45 }}
    >
      <Link
        href={card.href}
        className="group flex items-start gap-4 rounded-3xl border border-violet-100/10 bg-white/[0.06] p-4 transition hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
      >
        <div className="rounded-2xl bg-violet-400/15 p-3">
          <Icon className="h-5 w-5 text-fuchsia-300" />
        </div>

        <div>
          <p className="font-black text-violet-50 group-hover:text-fuchsia-200">
            {card.title}
          </p>
          <p className="mt-1 text-sm leading-6 text-violet-50/65">
            {card.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function MiniCard({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="rounded-2xl border border-violet-100/10 bg-white/[0.06] p-4"
    >
      <Icon className="mb-3 h-5 w-5 text-fuchsia-300" />
      <p className="text-sm font-semibold text-violet-50/85">{label}</p>
    </motion.div>
  );
}