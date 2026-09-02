import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { BleProvider } from "@/context/BleContext";
import AppHeader from "@/components/AppHeader";
import BluetoothConnectionGate from "@/components/BluetoothConnectionGate";
import BluetoothNotificationBanner from "@/components/BluetoothNotificationBanner";
import BottomNav from "@/components/BottomNav";
import UserSync from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ESP32 Controller UI",
  description: "Robot controller portal and playground",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClerkProvider>
          <UserSync />
          <BleProvider>
            <AppHeader />
            <BluetoothNotificationBanner />
            <BluetoothConnectionGate />
            <div className="pb-20">{children}</div>
            <BottomNav />
          </BleProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
