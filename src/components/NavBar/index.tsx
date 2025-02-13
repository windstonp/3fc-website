"use client";
import Link from "next/link";
import { useState } from "react";
import { Container } from "../Container";
import { Button } from "../ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { ICompanyDTO } from "@/validators";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  async function fetchCompanyData(): Promise<ICompanyDTO> {
    const companyDocRef = doc(db, "company", "company-data");
    const docSnapCompany = await getDoc(companyDocRef);
    return docSnapCompany.exists()
      ? (docSnapCompany.data() as ICompanyDTO)
      : ({} as ICompanyDTO);
  }

  const {
    data: company,
    isLoading: isLoadingCompany,
    isPending,
  } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompanyData,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <menu className="fixed z-10 top-0 right-0 left-0 md:bg-black md:bg-opacity-80">
      <Container>
        <nav className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex md:hidden justify-end">
              <button
                className="absolute top-5 right-5 text-white bg-black p-1 rounded"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={32} />
              </button>
            </div>
            <Image
              alt="3fc Logo"
              src="/img/logo.png"
              width={100}
              height={50}
              priority
              className="hidden md:flex"
            />
            <div className="hidden md:flex items-center">
              <ul className="flex space-x-6 mr-4">
                <li>
                  <Link href="#Home">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Início
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="#services">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Serviços
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="#about">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Sobre
                    </Button>
                  </Link>
                </li>
              </ul>
              <Button
                disabled={isLoadingCompany || isPending}
                className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200"
              >
                <Link href={company?.whatsappLink ?? "#"} target="_blank">
                  Faça um Orçamento
                </Link>
              </Button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-6 md:hidden z-20"
              onClick={() => setIsOpen(false)}
            >
              <button
                className="absolute top-5 right-5 text-white p-1"
                onClick={() => setIsOpen(false)}
              >
                <X size={32} />
              </button>
              <Link
                href="#Home"
                className="text-white text-2xl"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                href="#services"
                className="text-white text-2xl"
                onClick={() => setIsOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="#about"
                className="text-white text-2xl"
                onClick={() => setIsOpen(false)}
              >
                Sobre
              </Link>
              <Link href={company?.whatsappLink ?? "#"} target="_blank">
                <Button
                  disabled={isLoadingCompany || isPending}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Faça um Orçamento
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </menu>
  );
}
