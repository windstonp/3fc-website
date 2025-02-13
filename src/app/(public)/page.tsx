import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import FloatingWhatsappButton from "@/components/WhatsappButton";
import Homepage from "@/screens/Homepage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gráfica 3FC | Início",
  description:
    "A Gráfica 3FC oferece rótulos e etiquetas personalizadas de alta qualidade, combinando design inovador, tecnologia avançada e sustentabilidade.",
  keywords: [
    "gráfica 3FC",
    "rótulos personalizados",
    "etiquetas personalizadas",
    "impressão de alta qualidade",
    "design de embalagens",
  ],
  authors: [
    {
      name: "Gráfica 3FC",
      url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/",
    },
  ],
  creator: "Gráfica 3FC",
  publisher: "Gráfica 3FC",
  openGraph: {
    title: "Gráfica 3FC | Início",
    description:
      "A Gráfica 3FC oferece rótulos e etiquetas personalizadas de alta qualidade, combinando design inovador, tecnologia avançada e sustentabilidade.",
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/",
    siteName: "Gráfica 3FC",
    images: [
      {
        url: new URL(
          "/img/logo.png",
          process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/"
        ).toString(),
        width: 1200,
        height: 630,
        alt: "Logo da Gráfica 3FC",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gráfica 3FC | Início",
    description:
      "A Gráfica 3FC transforma rótulos e etiquetas em ferramentas estratégicas para fortalecer a identidade da sua marca.",
    images: [
      new URL(
        "/img/logo.png",
        process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/"
      ).toString(),
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/",
  },
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/").replace(
      /\/?$/,
      "/"
    )
  ),
};

export default function Home() {
  return (
    <>
      <NavBar />
      <Homepage />
      <FloatingWhatsappButton />
      <Footer />
    </>
  );
}
