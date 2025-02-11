"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { clientSchema, IClientDTO } from "@/validators";
import { InputControlled } from "../InputControlled";
import { FaTrash } from "react-icons/fa";

export function ClientsForm() {
  const [removedClients, setRemovedClients] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, setValue } = useForm<IClientDTO>({
    resolver: yupResolver(clientSchema),
    defaultValues: {
      clients: [{ firebaseId: "", clientName: "", clientImage: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "clients",
  });

  const fetchClients = useCallback(async () => {
    try {
      const clientsCollectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(clientsCollectionRef);
      const clientsData = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          firebaseId: docSnap.id,
          clientName: data.clientName || "",
          clientImage: data.clientImage || "",
        };
      });

      setValue(
        "clients",
        clientsData.length > 0
          ? clientsData
          : [{ firebaseId: "", clientName: "", clientImage: "" }]
      );
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      toast({
        variant: "error",
        title: "Erro ao buscar clientes",
        description: "Não foi possível carregar os dados dos clientes.",
      });
    }
  }, [setValue]);

  const handleRemoveItem = (index: number, firebaseId?: string) => {
    if (fields.length === 1) {
      toast({
        variant: "error",
        title: "Atenção",
        description: "Deve existir pelo menos um cliente.",
      });
      return;
    }

    if (firebaseId) {
      setRemovedClients((prev) => [...prev, firebaseId]);
    }
    remove(index);
  };

  const handleClientSubmit: SubmitHandler<IClientDTO> = async (
    data: IClientDTO
  ) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const promises = (data.clients || []).map(async (client) => {
        if (client.firebaseId) {
          const clientRef = doc(db, "clients", client.firebaseId);
          await updateDoc(clientRef, {
            clientName: client.clientName,
            clientImage: client.clientImage,
          });
        } else {
          await addDoc(collection(db, "clients"), {
            clientName: client.clientName,
            clientImage: client.clientImage,
          });
        }
      });

      await Promise.all(promises);

      const deletionPromises = removedClients.map(async (id) => {
        const clientRef = doc(db, "clients", id);
        await deleteDoc(clientRef);
      });

      await Promise.all(deletionPromises);
      setRemovedClients([]);

      await fetchClients();

      toast({
        variant: "success",
        title: "Clientes atualizados!",
        description: "Os dados dos clientes foram atualizados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar/adicionar clientes:", error);
      toast({
        variant: "error",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar/adicionar os clientes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <AccordionItem className="p-4" value="Clients">
      <AccordionTrigger>Clientes</AccordionTrigger>
      <AccordionContent>
        <form onSubmit={handleSubmit(handleClientSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-2 border p-4 rounded-md my-4"
            >
              <InputControlled
                label=""
                control={control}
                name={`clients.${index}.firebaseId`}
                type="hidden"
              />
              <InputControlled
                control={control}
                name={`clients.${index}.clientName`}
                label="Nome do Cliente"
                placeholder="Nome do Cliente"
              />
              <InputControlled
                control={control}
                name={`clients.${index}.clientImage`}
                label="Imagem do Cliente"
                placeholder="URL da imagem ou arquivo"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() =>
                    handleRemoveItem(
                      index,
                      field.firebaseId as string | undefined
                    )
                  }
                  variant="destructive"
                  disabled={fields.length === 1 || isSubmitting}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              onClick={() =>
                append({ firebaseId: "", clientName: "", clientImage: "" })
              }
              disabled={isSubmitting}
            >
              Adicionar Cliente
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Clientes!"}
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
