import type { Metadata } from "next";
import Link from "next/link";
import { AccountMenu } from "@/components/auth/account-menu";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://supportreply.ai"),
  title: {
    default: "SupportReply AI — AI-Powered Customer Support Reply Generator",
    template: "%s | SupportReply AI",
  },
  description:
    "Generate policy-safe customer support replies in seconds. Export to Gmail, Zendesk, and Intercom. 10 high-impact support templates for refunds, shipping delays, chargebacks, and more.",
  keywords: [
    "customer support reply generator",
    "AI support templates",
    "support email generator",
    "Zendesk macro generator",
    "Intercom snippet generator",
    "refund reply template",
    "shipping delay response",
    "customer service AI",
    "support ticket reply",
  ],
  openGraph: {
    type: "website",
    siteName: "SupportReply AI",
    title: "SupportReply AI — AI-Powered Customer Support Reply Generator",
    description:
      "Generate policy-safe customer support replies in seconds. Export to Gmail, Zendesk, and Intercom.",
    url: "https://supportreply.ai",
  },
  twitter: {
    card: "summary_large_image",
    site: "@supportreplyai",
    title: "SupportReply AI",
    description:
      "Generate support replies in seconds with AI. Export to Gmail, Zendesk, and Intercom.",
  },
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
