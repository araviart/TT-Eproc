import type { Metadata } from "next";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer";
import { nuckleRegular, nuckleMedium } from "../../lib/fonts";


export const metadata: Metadata = {
  title: "DAVRILSUPPLY",
  description: "Une boutique en ligne de vêtements streetwear (fictif)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
    <link rel="icon" href="../../../favicon.ico" sizes="any" />
      <body
        className={cn(
          "relative h-full antialiased",
          nuckleRegular.className        
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className={cn("flex-grow flex-1", nuckleMedium.className)}>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
