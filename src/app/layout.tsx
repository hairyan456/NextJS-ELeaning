import type { Metadata } from 'next'
import './globals.scss'
import { manrope } from '@/fonts/font'
import { ClerkProvider } from '@clerk/nextjs'
import { Bounce, ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@/shared/components'

export const metadata: Metadata = {
  title: 'EAcademy',
  description: 'the online platform for developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            {children}
            <ToastContainer
              draggable
              pauseOnFocusLoss
              autoClose={2500}
              closeOnClick={false}
              hideProgressBar={true}
              newestOnTop={false}
              pauseOnHover={false}
              position="top-right"
              rtl={false}
              theme="light"
              transition={Bounce}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
