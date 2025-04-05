import type React from "react";
import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Load Quicksand for body text
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

// Load Inter for headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RavvyS | Data Engineer",
  description:
    "Cutting-edge data consulting, pipeline development, analytics, leadership, and innovation.",
  icons: {
    icon: "https://auywayc9wlk0qvk2.public.blob.vercel-storage.com/file-BaXiIMwT4zcH7SZIKu4FnAmqRQglyH.svg",
    shortcut:
      "https://auywayc9wlk0qvk2.public.blob.vercel-storage.com/file-BaXiIMwT4zcH7SZIKu4FnAmqRQglyH.svg",
    apple:
      "https://auywayc9wlk0qvk2.public.blob.vercel-storage.com/file-BaXiIMwT4zcH7SZIKu4FnAmqRQglyH.svg",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
