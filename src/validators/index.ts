import * as yup from "yup";

export const companySchema = yup.object().shape({
  whatsappNumber: yup.string().required(),
  whatsappLink: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().min(5).required(),
  instagram: yup.string().required(),
  facebook: yup.string().required(),
  about: yup.string().required(),
});

export const productSchema = yup.object({
  products: yup.array().of(
    yup.object({
      firebaseId: yup.string().nullable(),
      name: yup.string().required("O nome do produto é obrigatório"),
      image: yup
        .string()
        .url("O link da imagem precisa ser uma URL válida")
        .required("O link da imagem é obrigatório"),
      description: yup.string().required("A descrição é obrigatória"),
    })
  ),
});
export const clientSchema = yup.object().shape({
  clients: yup.array().of(
    yup.object({
      firebaseId: yup.string().nullable(),
      clientName: yup.string().required("O nome do cliente é obrigatório"),
      clientImage: yup
        .string()
        .url("O link da imagem precisa ser uma URL válida")
        .required("O link da imagem é obrigatório"),
    })
  ),
});

export type IClientDTO = yup.InferType<typeof clientSchema>;
export type IProductDTO = yup.InferType<typeof productSchema>;
export type ICompanyDTO = yup.InferType<typeof companySchema>;
