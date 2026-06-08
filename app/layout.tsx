import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Proben.io - Meeting Readiness Assessment for Solo Founders",
  description: "Assess your readiness for product launches and critical meetings. Get clarity on your preparedness, identify gaps, and prioritize improvements.",
  keywords: ["readiness assessment", "solo founders", "product launch", "meeting preparation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col min-h-screen bg-grid-pattern">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
