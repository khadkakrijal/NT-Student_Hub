"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import FeedbackWidget from "./feedback/FeedbackWidget";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
        <FeedbackWidget />
    </>
  );
}