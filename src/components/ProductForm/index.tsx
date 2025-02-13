"use client";

import { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FaTrash } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { IProductDTO, productSchema } from "@/validators";
import { InputControlled } from "../InputControlled";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function ProductForm() {
  const queryClient = useQueryClient();
  const [removedProducts, setRemovedProducts] = useState<string[]>([]);

  const { control, handleSubmit, reset, watch } = useForm<IProductDTO>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      products: [{ firebaseId: "", name: "", image: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const fetchProducts = async (): Promise<
    Array<{
      firebaseId: string;
      name: string;
      image: string;
      description: string;
    }>
  > => {
    const productsCollectionRef = collection(db, "products");
    const querySnapshot = await getDocs(productsCollectionRef);
    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        firebaseId: docSnap.id,
        name: data.name || "",
        image: data.image || "",
        description: data.description || "",
      };
    });
  };

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsData) {
      reset({
        products:
          productsData.length > 0
            ? productsData
            : [{ firebaseId: "", name: "", image: "", description: "" }],
      });
    }
  }, [productsData, reset]);

  const mutation = useMutation({
    mutationFn: async (data: IProductDTO) => {
      const updatePromises = (data.products ?? []).map(async (product) => {
        if (product.firebaseId) {
          const productRef = doc(db, "products", product.firebaseId);
          await updateDoc(productRef, {
            name: product.name,
            image: product.image,
            description: product.description,
          });
        } else {
          await addDoc(collection(db, "products"), {
            name: product.name,
            image: product.image,
            description: product.description,
          });
        }
      });
      await Promise.all(updatePromises);

      const deletionPromises = removedProducts.map(async (id) => {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
      });
      await Promise.all(deletionPromises);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Produtos atualizados!",
        description: "Os produtos foram atualizados com sucesso.",
      });
      setRemovedProducts([]);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Erro",
        description: "Ocorreu um erro ao atualizar/adicionar os produtos.",
      });
    },
  });

  const handleRemoveItem = (index: number, firebaseId?: string) => {
    if (fields.length === 1) {
      toast({
        variant: "error",
        title: "Atenção",
        description: "Deve existir pelo menos um produto.",
      });
      return;
    }

    if (firebaseId) {
      setRemovedProducts((prev) => [...prev, firebaseId]);
    }
    remove(index);
  };

  const handleProductSubmit: SubmitHandler<IProductDTO> = (data) => {
    mutation.mutate(data);
  };

  return (
    <AccordionItem className="p-4" value="Products">
      <AccordionTrigger>Produtos</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit(handleProductSubmit)}
          className="justify-between"
        >
          {fields.map((field, index) => {
            const productImage = watch(`products.${index}.image`);
            return (
              <div
                key={field.id}
                className="space-y-2 border p-4 rounded-md my-4"
              >
                <InputControlled
                  control={control}
                  name={`products.${index}.firebaseId`}
                  label=""
                  type="hidden"
                />
                <InputControlled
                  control={control}
                  name={`products.${index}.name`}
                  label="Nome do Produto"
                  placeholder="Product Name"
                />
                {productImage && (
                  <div className="flex justify-center">
                    <img
                      src={productImage}
                      alt="Pré-visualização"
                      className="w-[300px] h-[200px] object-cover rounded-md border"
                    />
                  </div>
                )}
                <InputControlled
                  control={control}
                  name={`products.${index}.image`}
                  label="Imagem"
                  placeholder="Insira o link da imagem"
                />
                <InputControlled
                  control={control}
                  name={`products.${index}.description`}
                  label="Descrição"
                  placeholder="Description"
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
          <div className="flex justify-between items-center space-y-4 mt-4 flex-wrap">
            <Button
              type="button"
              onClick={() =>
                append({
                  firebaseId: "",
                  name: "",
                  image: "",
                  description: "",
                })
              }
              disabled={mutation.isPending}
            >
              Adicionar Produto
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Salvar Produtos!"}
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
