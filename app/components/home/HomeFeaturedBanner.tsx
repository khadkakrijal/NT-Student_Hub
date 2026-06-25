"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Banner = {
  id: string;
  title: string;
  description: string | null;
  button_text: string | null;
  button_link: string | null;
  image_url: string | null;
};

export default function HomeFeaturedBanner({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;

  const banner = banners[index];

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-fuchsia-300/20 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-120px] top-[-120px] h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45 }}
              className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm font-bold text-yellow-200">
                  <Megaphone className="h-4 w-4" />
                  Featured Announcement
                </div>

                <h2 className="mt-5 max-w-4xl text-2xl font-black leading-tight md:text-2xl">
                  {banner.title}
                </h2>

                {banner.description && (
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-violet-50/75">
                    {banner.description}
                  </p>
                )}

                {banner.button_text && banner.button_link && (
                  <Link
                    href={banner.button_link}
                    className="mt-7 inline-flex items-center rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                  >
                    {banner.button_text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>

              <div className="hidden lg:block">
                {banner.image_url ? (
                  <div
                    className="h-72 rounded-[2rem] bg-cover bg-center shadow-2xl shadow-black/30"
                    style={{ backgroundImage: `url(${banner.image_url})` }}
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center rounded-[2rem] border border-violet-100/10 bg-white/[0.06]">
                    <Megaphone className="h-20 w-20 text-fuchsia-300" />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {banners.length > 1 && (
            <div className="relative mt-8 flex gap-2">
              {banners.map((item, itemIndex) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-2 rounded-full transition ${
                    index === itemIndex
                      ? "w-8 bg-fuchsia-300"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
