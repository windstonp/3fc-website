"use client";
import { companySchema, ICompanyDTO } from "@/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { InputControlled } from "../InputControlled";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

export function CompanyForm() {
  const { control, handleSubmit, setValue } = useForm<ICompanyDTO>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      email: "",
      address: "",
      whatsappNumber: "",
      instagram: "",
      facebook: "",
      whatsappLink: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(true);

  const fetchCompanyData = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const companyDocRef = doc(db, "company", "company-data");
      const docSnap = await getDoc(companyDocRef);

      if (docSnap.exists()) {
        setValue("whatsappLink", docSnap.data().whatsappLink || "");
        setValue("email", docSnap.data().email || "");
        setValue("address", docSnap.data().address || "");
        setValue("whatsappNumber", docSnap.data().whatsappNumber || "");
        setValue("instagram", docSnap.data().instagram || "");
        setValue("facebook", docSnap.data().facebook || "");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da empresa:", error);
      toast({
        variant: "error",
        title: "Erro ao buscar empresa",
        description: "Não foi possível carregar os dados da empresa.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [setValue]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  const handleCompanySubmit = async (data: ICompanyDTO) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const companyDocRef = doc(db, "company", "company-data");
      await setDoc(companyDocRef, data, { merge: true });

      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Os dados da empresa foram atualizados.",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados da empresa:", error);
      toast({
        variant: "error",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar os dados da empresa.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AccordionItem className="p-4" value="Company">
      <AccordionTrigger>Empresa</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit(handleCompanySubmit)}
          className="space-y-2 border p-4 rounded-md my-4"
        >
          <InputControlled
            control={control}
            name="email"
            label="Email"
            placeholder="E-mail"
          />
          <InputControlled
            control={control}
            name="address"
            label="Endereço"
            placeholder="Endereço"
          />
          <InputControlled
            control={control}
            name="whatsappNumber"
            label="numere do Whatsapp"
            placeholder="Numero do whatsapp"
          />
          <InputControlled
            control={control}
            name="whatsappLink"
            label="link para o orçamento"
            placeholder="link para orçamento pelo whatsapp"
          />
          <InputControlled
            control={control}
            name="email"
            label="Email"
            placeholder="E-mail"
          />
          <InputControlled
            control={control}
            name="instagram"
            label="Instagram"
            placeholder="Link do Instagram"
          />
          <InputControlled
            control={control}
            name="facebook"
            label="Facebook"
            placeholder="Link do Facebook"
          />
          <div className="flex flex-col justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar dados da Empresa!"}
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
