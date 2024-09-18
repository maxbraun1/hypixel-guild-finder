import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-roboto" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav className="w-full flex justify-center border-b h-16 bg-neutral-950">
            <div className="w-full max-w-5xl flex gap-5 justify-between items-center p-3 px-5 text-sm">
              <div className="items-center">
                <Link
                  className="font-pixel uppercase text-lg leading-4 lg:text-4xl md:text-2xl"
                  href={"/"}
                >
                  Hypixel Guild Finder
                </Link>
              </div>
              <HeaderAuth />
            </div>
          </nav>
          <div className="w-full max-w-5xl p-5 flex-grow flex flex-col">
            {children}
          </div>

          <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-5 bg-neutral-950">
            <p>
              Developed by{" "}
              <a target="_blank" href="https://maxbraun.us">
                Max Braun
              </a>
            </p>{" "}
            &mdash;
            <Link className="text-purple-400" href="/contact">
              Contact Me
            </Link>
          </footer>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
