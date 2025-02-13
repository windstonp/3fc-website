"use client";

import { useState, useEffect } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function ClientsForm() {
  const queryClient = useQueryClient();
  const [removedClients, setRemovedClients] = useState<string[]>([]);

  const { control, handleSubmit, reset, watch } = useForm<IClientDTO>({
    resolver: yupResolver(clientSchema),
    defaultValues: {
      clients: [{ firebaseId: "", clientName: "", clientImage: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "clients",
  });

  const fetchClients = async (): Promise<
    { firebaseId: string; clientName: string; clientImage: string }[]
  > => {
    const clientsCollectionRef = collection(db, "clients");
    const querySnapshot = await getDocs(clientsCollectionRef);
    return querySnapshot.docs.map((docSnap) => ({
      firebaseId: docSnap.id,
      clientName: docSnap.data().clientName || "",
      clientImage: docSnap.data().clientImage || "",
    }));
  };

  const { data: clientsData } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (clientsData) {
      reset({
        clients:
          clientsData.length > 0
            ? clientsData
            : [{ firebaseId: "", clientName: "", clientImage: "" }],
      });
    }
  }, [clientsData, reset]);

  const mutation = useMutation({
    mutationFn: async (data: IClientDTO) => {
      const updatePromises = (data.clients ?? []).map(async (client) => {
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
      await Promise.all(updatePromises);

      const deletionPromises = removedClients.map(async (id) => {
        const clientRef = doc(db, "clients", id);
        await deleteDoc(clientRef);
      });
      await Promise.all(deletionPromises);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Clientes atualizados!",
        description: "Os dados dos clientes foram atualizados com sucesso.",
      });
      setRemovedClients([]);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar/adicionar os clientes.",
      });
    },
  });

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

  const onSubmit: SubmitHandler<IClientDTO> = (data) => {
    mutation.mutate(data);
  };

  return (
    <AccordionItem className="p-4" value="Clients">
      <AccordionTrigger>Clientes</AccordionTrigger>
      <AccordionContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => {
            const clientImage = watch(`clients.${index}.clientImage`);
            return (
              <div
                key={field.id}
                className="space-y-4 border p-4 rounded-md my-4"
              >
                <h1>Cliente {index + 1}</h1>
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
                {clientImage && (
                  <div className="flex justify-center">
                    <img
                      src={clientImage}
                      alt="Pré-visualização"
                      className="w-[300px] h-[300px] object-cover rounded-md border"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
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
                      handleRemoveItem(index, field.firebaseId || undefined)
                    }
                    variant="destructive"
                    disabled={fields.length === 1 || mutation.isPending}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center  mt-4 flex-wrap">
            <Button
              type="button"
              onClick={() =>
                append({ firebaseId: "", clientName: "", clientImage: "" })
              }
              disabled={mutation.isPending}
            >
              Adicionar Cliente
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Salvar Clientes!"}
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
