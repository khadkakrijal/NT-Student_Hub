"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) return;

    router.push(`/search?q=${encodeURIComponent(cleanQuery)}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="hidden xl:flex">
      <div className="flex items-center rounded-full border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl transition focus-within:border-fuchsia-300/40 focus-within:bg-white/[0.09]">
        <Search className="ml-4 h-4 w-4 text-violet-300" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search housing, jobs, events..."
          className="w-50 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-violet-100/40"
        />
      </div>
    </form>
  );
}
