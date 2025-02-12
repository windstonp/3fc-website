"use client";
import { Accordion } from "@/components/ui/accordion";
import { ProductForm } from "@/components/ProductForm";
import { CompanyForm } from "@/components/CompanyForm";
import { ClientsForm } from "@/components/ClientsForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="Company"
      >
        <CompanyForm />
        <ClientsForm />
        <ProductForm />
      </Accordion>
    </div>
  );
}
