import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/fonts/font";

export const metadata: Metadata = {
  title: "EAcademy",
  description: "the online platform for developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-primary`}>
        {children}
      </body>
    </html>
  );
}
