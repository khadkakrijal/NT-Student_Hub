"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

const safetyTips = [
  "Inspect rooms before paying bond or rent.",
  "Avoid sending money before confirming the address and host.",
  "Check transport access before choosing a suburb.",
  "Understand cyclone season and emergency preparation.",
];

export default function HomeSafetySection() {
  return (
    <section className="relative overflow-hidden px-6 py-5">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <ShieldCheck className="h-10 w-10 text-fuchsia-300" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Student Safety
            </p>
            <h2 className="mt-3 text-2xl font-black md:text-2xl">
              Safer than random social media posts.
            </h2>
            <p className="mt-5 text-lg leading-8 text-violet-50/70">
              NT Student Hub is designed to reduce accommodation scams and help
              new students make informed decisions before moving into a room.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {safetyTips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="rounded-3xl border border-violet-100/10 bg-white/[0.06] p-5"
              >
                {index === 0 ? (
                  <AlertTriangle className="h-6 w-6 text-yellow-300" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-fuchsia-300" />
                )}
                <p className="mt-4 font-semibold text-violet-50/85">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
