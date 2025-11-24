import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SEOStructuredData from "./components/SEOStructuredData";
import { APP_NAME, APP_DESCRIPTION } from "./lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://carinfo.co.uk'),
  title: {
    default: APP_NAME + ' - Free Car Check, MOT History & HPI Check',
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  keywords: [
    'free car check UK',
    'free MOT check',
    'free tax check car',
    'UK number plate check free',
    'car history check UK',
    'HPI check UK',
    'full car history report',
    'vehicle history report',
    'check a used car before buying',
    'used car checker UK',
    'outstanding finance check',
    'write off check car',
    'stolen car check',
    'mileage check clocking',
    'DVLA car check',
    'DVLA vehicle data',
    'DVLA MOT history'
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://carinfo.co.uk',
    siteName: APP_NAME,
    title: APP_NAME + ' - Free Car Check, MOT History & HPI Check',
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME + ' - Free UK Vehicle History Check',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME + ' - Free Car Check, MOT History & HPI Check',
    description: APP_DESCRIPTION,
    creator: '@carinfo_uk',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <SEOStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Navbar />
        <main className="min-h-screen pt-20 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
