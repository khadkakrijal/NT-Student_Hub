import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import MainLayoutWrapper from "./components/MainLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nt-student-hub.vercel.app"),

  title: {
    default: "NT Student Hub",
    template: "%s | NT Student Hub",
  },

  description:
    "Accommodation, jobs, events, community and support for students in the Northern Territory.",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "NT Student Hub",
    description:
      "Find accommodation, jobs, events and connect with students across Darwin and the Northern Territory.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "NT Student Hub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-red-500 text-white">
        {/* <Navbar /> */}
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
