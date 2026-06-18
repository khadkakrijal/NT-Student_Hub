"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function GuideWelcomeDialog() {
  const router = useRouter();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("nt-guide-popup-shown");

    if (alreadyShown || shown) return;

    setShown(true);

    Swal.fire({
      icon: "info",
      title: "New to Darwin?",
      html: `
        <div style="text-align:left; line-height:1.6">
          <p>Before hunting for accommodation, it is important to understand Darwin’s:</p>
          <ul style="margin-top:10px; padding-left:20px">
            <li>Weather and cyclone season</li>
            <li>Transport and suburbs</li>
            <li>CDU Casuarina and Darwin city campus areas</li>
            <li>Groceries, chemists, restaurants, and student essentials</li>
          </ul>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Open Darwin Guide",
      cancelButtonText: "Maybe later",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "rounded-popup",
      },
    }).then((result) => {
      localStorage.setItem("nt-guide-popup-shown", "true");

      if (result.isConfirmed) {
        router.push("/living-in-darwin");
      }
    });
  }, [router, shown]);

  return null;
}