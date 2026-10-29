import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const lato = localFont({
  src: [
    {
      path: "./font/Lato/Lato-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./font/Lato/Lato-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./font/Lato/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/Lato/Lato-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./font/Lato/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Lato/Lato-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font/Lato/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/Lato/Lato-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./font/Lato/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./font/Lato/Lato-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PureShine | Professional Cleaning Services",
  description:
    "PureShine provides reliable, affordable, and eco-friendly cleaning services for homes, offices, and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${lato.className} min-h-full bg-white font-sans`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}