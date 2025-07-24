import type { Metadata } from "next";
import "./globals.scss";
import { manrope } from "@/fonts/font";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Bounce, ToastContainer } from 'react-toastify';

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="light"
              transition={Bounce}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
