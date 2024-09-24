import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import localFont from "next/font/local";
import '../globals.css';

const nuckleRegular = localFont({
  src: "../fonts/Nuckle-Regular.woff",
  weight: "100 900",
});

const nuckleMedium = localFont({
  src: "../fonts/Nuckle-Medium.woff",
  weight: "700",
});

export default function WithLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          nuckleRegular.className
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className={cn("flex-grow flex-1", nuckleMedium)}>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}

