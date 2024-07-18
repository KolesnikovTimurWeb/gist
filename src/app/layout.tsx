import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JobFilterValues } from "@/lib/validation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:'Gist',
    template:"%s | Gist Jobs"
  },
  description: "Find your dream job",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
