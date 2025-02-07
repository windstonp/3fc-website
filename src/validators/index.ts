import * as yup from "yup";

export const companySchema = yup.object().shape({
  whatsappNumber: yup.string().min(10).required(),
  email: yup.string().email().required(),
  address: yup.string().min(5).required(),
  instagram: yup.string().optional(),
  facebook: yup.string().optional(),
  logo: yup.mixed().optional(),
});

export const productSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  description: yup.string().min(5).required(),
  image: yup.mixed().optional(),
});

export const clientSchema = yup.object().shape({
  clientName: yup.string().min(2).required(),
  clientImage: yup.mixed().optional(),
});

export type IClientDTO = yup.InferType<typeof clientSchema>;
export type IProductDTO = yup.InferType<typeof productSchema>;
export type ICompanyDTO = yup.InferType<typeof companySchema>;
