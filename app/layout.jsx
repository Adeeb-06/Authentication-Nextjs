import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/libs/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = getServerSession()
  const isClient = typeof window !== "undefined";

return (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {isClient ? (
        <React.StrictMode>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </React.StrictMode>
      ) : (
        <SessionProvider session={session}>{children}</SessionProvider>
      )}
    </body>
  </html>
);

}
