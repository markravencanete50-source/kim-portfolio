import "./globals.css";
import { profile } from "@/data/profile";

export const metadata = {
  metadataBase: new URL("https://karl-caneda-portfolio.vercel.app"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.intro,
  keywords: [
    "Operations Manager",
    "BPO",
    "KPO",
    "Contact Center",
    "Cebu",
    "Philippines",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.intro,
    type: "website",
    images: [{ url: profile.photo }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0A0C10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
