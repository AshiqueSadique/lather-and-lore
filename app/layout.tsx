import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Lather & Lore — Artisan Botanical Soaps",
  description:
    "Small-batch, cold-process soaps hand-poured in Provence. Each bar crafted from certified organic botanicals for a slow, sensory ritual.",
  keywords: [
    "artisan soap",
    "botanical soap",
    "cold process",
    "Provence",
    "handmade soap",
    "luxury soap",
  ],
  authors: [{ name: "Lather & Lore" }],
  openGraph: {
    title: "Lather & Lore — Artisan Botanical Soaps",
    description: "Small-batch soaps, hand-poured in the south of France.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EFE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis">
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
