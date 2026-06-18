"use client";

import {
  House,
  MapPin,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

type IconName = "house" | "shield" | "users" | "map";

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
};

const icons: Record<IconName, LucideIcon> = {
  house: House,
  shield: ShieldCheck,
  users: Users,
  map: MapPin,
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-3xl border border-violet-100/10 bg-white/[0.045] p-6 backdrop-blur-xl"
    >
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition duration-500 group-hover:bg-fuchsia-500/20" />

      <motion.div
        whileHover={{ rotate: 8, scale: 1.1 }}
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15"
      >
        <Icon className="h-7 w-7 text-fuchsia-300" />
      </motion.div>

      <h3 className="text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-violet-50/70">
        {description}
      </p>
    </motion.div>
  );
}