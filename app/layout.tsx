import { inter } from "./ui/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./ui/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
      <SpeedInsights />
    </html>
  );
}
