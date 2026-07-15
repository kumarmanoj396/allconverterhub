import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP.URL),
  title: {
    default: `${APP.NAME} | Free Online Tools`,
    template: `%s | ${APP.NAME}`,
  },
  description: APP.DESCRIPTION,
  openGraph: {
    description: APP.DESCRIPTION,
    siteName: APP.NAME,
    title: `${APP.NAME} | Free Online Tools`,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    description: APP.DESCRIPTION,
    title: `${APP.NAME} | Free Online Tools`,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
