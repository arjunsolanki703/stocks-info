import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <main className="max-w-screen-lg mx-auto px-4 py-6 space-y-8">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
