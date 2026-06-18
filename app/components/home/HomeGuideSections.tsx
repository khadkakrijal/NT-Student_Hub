"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bus,
  CloudRain,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const guideSections = [
  {
    title: "Weather",
    href: "/guide/weather",
    icon: CloudRain,
    description:
      "Dry season, wet season, storms, humidity and cyclone awareness.",
  },
  {
    title: "Education",
    href: "/guide/education",
    icon: GraduationCap,
    description: "CDU Casuarina, CDU city campus, CIM and other providers.",
  },
  {
    title: "Food",
    href: "/guide/food",
    icon: Utensils,
    description: "Nepali, Thai, Asian and student-friendly food places.",
  },
  {
    title: "Shopping",
    href: "/guide/shopping",
    icon: ShoppingBag,
    description:
      "Woolworths, shopping centres, groceries and student essentials.",
  },
  {
    title: "Health",
    href: "/guide/health",
    icon: HeartPulse,
    description: "Chemists, clinics, hospitals, OSHC and emergency basics.",
  },
  {
    title: "Transport",
    href: "/guide/transport",
    icon: Bus,
    description: "Buses, car dependency, suburbs, cycling and walking tips.",
  },
];

export default function HomeGuideSections() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Living in Darwin
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Everything international students should know before moving to
              Darwin.
            </h2>

            <p className="mt-5 text-lg leading-8 text-violet-50/70">
              NT Student Hub is not just accommodation. It helps students
              understand Darwin’s weather, transport, colleges, shops, food,
              health services and daily life.
            </p>

            <Link
              href="/guide"
              className="mt-7 inline-flex rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
            >
              Start Your Darwin Journey
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {guideSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <Link
                  href={section.href}
                  className="block rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40"
                >
                  <section.icon className="h-7 w-7 text-fuchsia-300" />
                  <h3 className="mt-4 text-2xl font-black">{section.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-violet-50/70">
                    {section.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
