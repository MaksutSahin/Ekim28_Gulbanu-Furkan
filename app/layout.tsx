import './globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gülbanu & Furkan Düğün Davetiyesi",
  description: "Düğün törenimizde sizleri de aramızda görmekten mutluluk duyarız. LCV ve detaylar için tıklayın.",
  openGraph: {
    title: "Gülbanu & Furkan Düğün Davetiyesi",
    description: "Düğün törenimizde sizleri de aramızda görmekten mutluluk duyarız. LCV ve detaylar için tıklayın.",
    url: "https://ekim28-gulbanu-furkan-se7p.vercel.app/",
    siteName: "Gülbanu & Furkan Düğün",
    images: [
      {
        url: "https://ekim28-gulbanu-furkan-se7p.vercel.app/davetiye-arkaplan.png",
        width: 1200,
        height: 630,
        alt: "Gülbanu & Furkan Düğün Davetiyesi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
