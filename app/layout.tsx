import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import updateOwnerActivity from "@/lib/cron/ownerActivity";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
  openGraph: {
    title: "Hypixel Guild Finder",
    description: "The best way to find a guild on Hypixel!",
    siteName: "Hypixel Guild Finder",
    images: [
      {
        url: "https://f005.backblazeb2.com/file/msb-random-bucket/H+(1)-modified.png",
        width: 800,
        height: 800,
      },
    ],
  },
};

//updateOwnerActivity();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-roboto" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="icon" href="/icon.ico" sizes="any" />
        {!process.env.NEXT_PUBLIC_DEV && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="44cec9ac-c7af-4d27-8c4b-8a315e7c5296"
          ></Script>
        )}
      </head>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav className="w-full flex justify-center border-b h-16 bg-neutral-950">
            <div className="w-full max-w-5xl flex gap-5 justify-between items-center p-3 px-5 text-sm">
              <div className="items-center">
                <Link
                  className="font-pixel uppercase text-2xl leading-4 md:text-4xl"
                  href={"/"}
                >
                  Hypixel Guild Finder
                </Link>
              </div>
              <HeaderAuth />
            </div>
          </nav>
          {children}

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
            &mdash;
            <Link className="text-purple-400" href="/privacy-policy">
              Privacy Policy
            </Link>
          </footer>
        </main>
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-32Z6CH2E8L" />
    </html>
  );
}
