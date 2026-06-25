"use client";

import { motion } from "framer-motion";
import { Briefcase, CalendarDays, Map, ShoppingBag } from "lucide-react";

const roadmap = [
  {
    title: "Student Jobs",
    description:
      "Casual work, hospitality jobs, resume tips and employer posts.",
    icon: Briefcase,
  },
  {
    title: "Marketplace",
    description: "Buy and sell student items, furniture, bikes and essentials.",
    icon: ShoppingBag,
  },
  {
    title: "Events",
    description:
      "Student events, cultural programs, sports and community gatherings.",
    icon: CalendarDays,
  },
  {
    title: "Map View",
    description:
      "Browse accommodation by suburb, campus distance and transport access.",
    icon: Map,
  },
];

export default function HomeRoadmap() {
  return (
    <section className="px-6 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            What’s next
          </p>
          <h2 className="mt-3 text-2xl font-black md:text-2xl">
            Built to grow with NT students.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {roadmap.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
            >
              <item.icon className="h-8 w-8 text-fuchsia-300" />
              <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-violet-50/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
