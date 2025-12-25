import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supymem — Your Team Never Forgets",
  description:
    "Supymem is the AI layer that connects your code, conversations, and decisions — so your team stays aligned without endless meetings.",
  keywords: [
    "AI",
    "team collaboration",
    "GitHub integration",
    "Slack integration",
    "developer tools",
    "project management",
    "breaking change alerts",
    "productivity",
  ],
  authors: [{ name: "Supymem" }],
  openGraph: {
    title: "Supymem — Your Team Never Forgets",
    description:
      "Supymem is the AI layer that connects your code, conversations, and decisions — so your team stays aligned without endless meetings.",
    url: "https://supymem.com",
    siteName: "Supymem",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supymem — Your Team Never Forgets",
    description:
      "Supymem is the AI layer that connects your code, conversations, and decisions — so your team stays aligned without endless meetings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
