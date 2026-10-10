import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bn",
  display: "swap",
});

export const metadata = {
  title: { default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazardor" className={hindSiliguri.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
