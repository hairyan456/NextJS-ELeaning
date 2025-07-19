import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/fonts/font";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
