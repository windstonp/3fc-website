"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Container } from "../Container";
import Image from "next/image";
import { ICompanyDTO } from "@/validators";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function Footer() {
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
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompanyData,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return (
    <footer className="bg-[#4D4D4D] text-white py-6 mt-8">
      <Container styles="flex flex-wrap justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/img/logo.png"
            alt="3fc Logo"
            width={300}
            height={300}
            className="w-24 h-24"
          />

          <nav className="flex flex-col ml-4">
            <Link href="#Home" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Início
              </Button>
            </Link>
            <Link href="#services" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Serviços
              </Button>
            </Link>
            <Link href="#about" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Sobre
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap">
          <div className="flex flex-col text-gray-300 my-4 mr-4">
            <div className="flex items-center mx-2">
              <FaWhatsapp className="text-green-500 mr-4" />
              {isLoadingCompany || isFetching || isPending ? (
                <div className="w-32 h-4 bg-gray-500 animate-pulse my-1 rounded-md" />
              ) : (
                <span>{company?.whatsappNumber}</span>
              )}
            </div>
            <div className="flex items-center mx-2">
              <MdEmail className="text-blue-400 mr-4" />
              {isLoadingCompany || isFetching || isPending ? (
                <div className="w-32 h-4 bg-gray-500 animate-pulse my-1 rounded-md" />
              ) : (
                <span>{company?.email}</span>
              )}
            </div>
            <div className="flex items-center mx-2">
              <MdLocationOn className="text-blue-400 mr-4" />
              {isLoadingCompany || isFetching || isPending ? (
                <div className="w-40 h-4 bg-gray-500 animate-pulse my-1 rounded-md" />
              ) : (
                <span>{company?.address}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="font-semibold">Siga-nos</span>
            <div className="flex space-x-3">
              <Button
                className="bg-black rounded-full"
                size="icon"
                disabled={isLoadingCompany || isFetching || isPending}
              >
                <Link href={company?.instagram ?? "#"} target="_blank">
                  <FaInstagram className="text-white" />
                </Link>
              </Button>
              <Button
                className="bg-black rounded-full"
                size="icon"
                disabled={isLoadingCompany || isFetching}
              >
                <Link href={company?.facebook ?? "#"} target="_blank">
                  <FaFacebook className="text-white" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
