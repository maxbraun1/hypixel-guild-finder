import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-display" suppressHydrationWarning>
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
      <body className="bg-neutral-950 text-foreground">
        {children}
      </body>
      <GoogleAnalytics gaId="G-32Z6CH2E8L" />
    </html>
  );
}
