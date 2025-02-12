"use client";
import Link from "next/link";
import { Container } from "../Container";
import Styles from "./style.module.css";
import { Button } from "../ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { ICompanyDTO } from "@/validators";
export function NavBar() {
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
    <menu
      className={`fixed z-10 top-0 right-0 left-0 menu-bg ${Styles.menu__bg}`}
    >
      <Container>
        <nav className="py-4">
          <div className="flex items-center justify-between">
            <img alt="3fc Logo" src="/img/logo.png" className="h-50" />
            <div className="flex items-center justify-between">
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
      </Container>
    </menu>
  );
}
