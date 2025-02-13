"use client";
import { companySchema, ICompanyDTO } from "@/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { InputControlled } from "../InputControlled";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

const fetchCompanyData = async (): Promise<ICompanyDTO> => {
  const companyDocRef = doc(db, "company", "company-data");
  const docSnap = await getDoc(companyDocRef);
  return docSnap.exists()
    ? (docSnap.data() as ICompanyDTO)
    : {
        email: "",
        address: "",
        whatsappNumber: "",
        instagram: "",
        facebook: "",
        whatsappLink: "",
        banner: "",
      };
};

const updateCompanyData = async (data: ICompanyDTO) => {
  const companyDocRef = doc(db, "company", "company-data");
  await setDoc(companyDocRef, data, { merge: true });
};

export function CompanyForm() {
  const queryClient = useQueryClient();
  const { data: companyData } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompanyData,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const mutation = useMutation({
    mutationFn: updateCompanyData,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Sucesso!",
        description: "Os dados da empresa foram atualizados.",
      });
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar os dados da empresa.",
      });
    },
  });

  const { control, handleSubmit, setValue, watch } = useForm<ICompanyDTO>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      email: "",
      address: "",
      whatsappNumber: "",
      instagram: "",
      facebook: "",
      whatsappLink: "",
      banner: "",
    },
  });

  useEffect(() => {
    if (companyData) {
      Object.entries(companyData).forEach(([key, value]) =>
        setValue(key as keyof ICompanyDTO, value || "")
      );
    }
  }, [companyData, setValue]);

  const bannerImage = watch("banner");

  return (
    <AccordionItem className="p-4" value="Company">
      <AccordionTrigger>Empresa</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-2 border p-4 rounded-md my-4"
        >
          {bannerImage && (
            <div className="flex justify-center">
              <img
                src={bannerImage}
                alt="Pré-visualização"
                className="object-cover rounded-md border"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
          <InputControlled
            control={control}
            name="banner"
            label="Banner inicial"
            placeholder="URL da imagem ou arquivo"
          />
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
            label="Número do Whatsapp"
            placeholder="Número do Whatsapp"
          />
          <InputControlled
            control={control}
            name="whatsappLink"
            label="Link para o orçamento"
            placeholder="Link para orçamento pelo Whatsapp"
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
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Salvar dados da Empresa!"}
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
