"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/shared/Navbar'
import ChatDialog from '@/components/shared/ChatDialog'
import { useUserStore } from "@/lib/zustand";
import { useEffect } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userType, isClient } = useUserStore();

  // Only render content when we're sure we're on the client
  const content = isClient ? (
    <>
      <Navbar userType={userType ?? "login"} />
      {children}
      <ChatDialog />
    </>
  ) : null;
  return (
    <html lang="en">
      <head>
        <title>Path2Grad</title>
        <meta name="description" content="Path2Grad is a platform for students to find their path to graduation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {content}
      </body>
    </html>
  );
}
