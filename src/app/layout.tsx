import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/providers/queryClientProvider";
import FloatingWhatsappButton from "@/components/WhatsappButton";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grafica 3fc",
  description: "Grafica 3fc Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster />
          <FloatingWhatsappButton />
          <ReactQueryDevtools initialIsOpen={true} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
