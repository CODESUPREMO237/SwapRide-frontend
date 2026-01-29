import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiveChatWidget from '@/components/LiveChatWidget';
import CookieConsent from '@/components/common/CookieConsent';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'SwapRide - Buy, Sell & Swap Vehicles in Cameroon',
  description: 'The most trusted vehicle marketplace in Cameroon. Trade your car, find your dream vehicle, or swap with ease.',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/swapride-icon-180.png',
  },
  manifest: '/manifest.json', // If you create a PWA manifest
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body 
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <AuthProvider>
            <SocketProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <LiveChatWidget />
              <CookieConsent />
              <Toaster position="top-right" />
            </SocketProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
