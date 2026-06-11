import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proben.io - Meeting Readiness Assessment",
  description: "Meeting readiness simulator for important conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
