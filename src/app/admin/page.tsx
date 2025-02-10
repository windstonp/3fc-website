"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccordionContent } from "@radix-ui/react-accordion";
import { clientSchema, companySchema, productSchema } from "@/validators";
import "./dashboardStyles.css";
import { ProductForm } from "@/components/ProductForm";

export default function Dashboard() {
  const companyForm = useForm({ resolver: yupResolver(companySchema) });

  const clientForm = useForm({ resolver: yupResolver(clientSchema) });

  const handleCompanySubmit = async (data: any) => {};

  const handleClientSubmit = async (data: any) => {};

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard CRM</h1>
      <Accordion type="single" collapsible>
        <AccordionItem className="p-4" value="Empresa">
          <AccordionTrigger>Empresa</AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={companyForm.handleSubmit(handleCompanySubmit)}
              className="space-y-4"
            >
              <Input
                {...companyForm.register("whatsappNumber")}
                placeholder="WhatsApp Number"
              />
              <Input {...companyForm.register("email")} placeholder="Email" />
              <Input
                {...companyForm.register("address")}
                placeholder="Address"
              />
              <Input
                {...companyForm.register("instagram")}
                placeholder="Instagram"
              />
              <Input
                {...companyForm.register("facebook")}
                placeholder="Facebook"
              />
              <Input type="file" {...companyForm.register("logo")} />
              <Button type="submit">Update Company</Button>
            </form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="p-4" value="Clients">
          <AccordionTrigger>Clientes</AccordionTrigger>

          <AccordionContent>
            <form
              onSubmit={clientForm.handleSubmit(handleClientSubmit)}
              className="space-y-4"
            >
              <Input
                {...clientForm.register("clientName")}
                placeholder="Client Name"
              />
              <Input type="file" {...clientForm.register("clientImage")} />
              <Button type="submit">Update Client</Button>
            </form>
          </AccordionContent>
        </AccordionItem>
        <ProductForm />
      </Accordion>
    </div>
  );
}
