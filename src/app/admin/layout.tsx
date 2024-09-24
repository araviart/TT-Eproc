import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import '../globals.css';
import { nuckleRegular } from "@/lib/fonts";

export default function WithLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          "relative h-full antialiased",
          nuckleRegular.className        
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className={cn("flex-grow flex-1", nuckleRegular.className)}>{children}</div>
        </main>
      </body>
    </html>
  );
}

