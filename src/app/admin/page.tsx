"use client";
import { db, storage } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

export default function Dashboard() {
  const companyForm = useForm({ resolver: yupResolver(companySchema) });
  const productForm = useForm({ resolver: yupResolver(productSchema) });
  const clientForm = useForm({ resolver: yupResolver(clientSchema) });

  const handleCompanySubmit = async (data: any) => {
    if (data.logo && data.logo.length > 0) {
      const logoRef = ref(storage, `company/${data.logo[0].name}`);
      await uploadBytes(logoRef, data.logo[0]);
      data.logo = await getDownloadURL(logoRef);
    }
    await updateDoc(doc(db, "company", "company-id"), data);
  };

  const handleProductSubmit = async (data: any) => {
    if (data.image && data.image.length > 0) {
      const imageRef = ref(storage, `products/${data.image[0].name}`);
      await uploadBytes(imageRef, data.image[0]);
      data.image = await getDownloadURL(imageRef);
    }
    await updateDoc(doc(db, "products", "product-id"), data);
  };

  const handleClientSubmit = async (data: any) => {
    if (data.clientImage && data.clientImage.length > 0) {
      const clientImageRef = ref(
        storage,
        `clients/${data.clientImage[0].name}`
      );
      await uploadBytes(clientImageRef, data.clientImage[0]);
      data.clientImage = await getDownloadURL(clientImageRef);
    }
    await updateDoc(doc(db, "clients", "client-id"), data);
  };

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
        <AccordionItem className="p-4" value="Products">
          <AccordionTrigger>Produtos</AccordionTrigger>
          <AccordionContent>
            <AccordionContent>
              <form
                onSubmit={productForm.handleSubmit(handleProductSubmit)}
                className="space-y-4"
              >
                <Input
                  {...productForm.register("name")}
                  placeholder="Product Name"
                />
                <Input type="file" {...productForm.register("image")} />
                <Input
                  {...productForm.register("description")}
                  placeholder="Description"
                />
                <Button type="submit">Update Product</Button>
              </form>
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
