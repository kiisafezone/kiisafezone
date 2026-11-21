import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  title: {
    default: "KII — Beyond the Interface",
    template: "%s — KII",
  },
  description:
    "The personal portfolio of KII, also known as kiisafezone — independent developer building thoughtful digital experiences and open-source software.",
  applicationName: "KII Portfolio",
};

export const viewport: Viewport = {
  themeColor: "#0250B0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
