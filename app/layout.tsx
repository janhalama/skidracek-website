import type { Metadata } from "next";
import "../styles/variables.css";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";


export const metadata: Metadata = {
  title: "SkiDráček — Dětský vlek v Alšovicích",
  description: "Dětský vlek a škola lyžování v Alšovicích.",
  icons: [
    { rel: "icon", url: "/images/original/logo.png" },
    { rel: "apple-touch-icon", url: "/images/original/logo.png" },
  ],
  openGraph: {
    title: "SkiDráček — Dětský vlek v Alšovicích",
    description: "Dětský vlek a škola lyžování v Alšovicích.",
    siteName: "SkiDráček",
    images: [
      {
        url: "/images/original/logo.png",
        width: 1200,
        height: 630,
        alt: "SkiDráček",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkiDráček — Dětský vlek v Alšovicích",
    description: "Dětský vlek a škola lyžování v Alšovicích.",
    images: ["/images/original/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
