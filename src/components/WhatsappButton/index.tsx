"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { ICompanyDTO } from "@/validators";
import { Button } from "../ui/button";

export default function FloatingWhatsappButton() {
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
    <Button
      className="fixed bottom-1/4 right-2 transform -translate-y-1/2 bg-green-500 w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-lg  transition z-10 hover:bg-green-600"
      disabled={isLoadingCompany || isPending}
      aria-label="Fale conosco!"
    >
      <Link
        aria-label="Fale conosco!"
        href={company?.whatsappLink || "#"}
        target="_blank"
      >
        <FaWhatsapp className="text-white" style={{ width: 35, height: 35 }} />
      </Link>
    </Button>
  );
}
