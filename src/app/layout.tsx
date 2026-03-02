import type { Metadata } from "next";
import Link from "next/link";
import { AccountMenu } from "@/components/auth/account-menu";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SupportReply AI",
    template: "%s | SupportReply AI",
  },
  description:
    "Generate support replies in seconds with policy-safe tone controls and export formats for Gmail, Zendesk, and Intercom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-zinc-50">
          <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
              <Link href="/" className="text-sm font-semibold tracking-tight transition hover:opacity-80">
                SupportReply AI
              </Link>
              <AccountMenu />
            </div>
          </header>

          <div className="min-h-[calc(100vh-140px)]">{children}</div>

          <footer className="border-t border-black/10 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-4 text-xs text-black/70 sm:flex-row sm:items-center sm:px-6">
              <p>© {new Date().getFullYear()} SupportReply AI</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/terms" className="transition hover:text-black hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="transition hover:text-black hover:underline">
                  Privacy
                </Link>
                <Link href="/disclaimer" className="transition hover:text-black hover:underline">
                  Disclaimer
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
