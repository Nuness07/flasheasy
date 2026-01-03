import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Flasheasy - SRS Flashcard App for English Learning",
  description: "An intuitive SRS (Spaced Repetition System) flashcard web app designed to make learning English easier, smarter, and more effective.",
};

/**
 * Provides the application's root HTML structure and applies global font classes.
 *
 * @param children - The page content to render inside the document body.
 * @returns The root JSX element (<html> with <body>) that wraps `children`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}