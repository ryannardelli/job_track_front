import { z } from "zod";

export const ApplicationSchema = z.object({
  company: z
    .string()
    .nonempty("A empresa não pode ficar vazia.")
    .max(100, "O nome da empresa pode ter no máximo 100 caracteres."),

  position: z
    .string()
    .nonempty("O cargo não pode ficar vazio.")
    .max(100, "O cargo pode ter no máximo 100 caracteres."),

  vacancyUrl: z
    .string()
    .url("Informe uma URL válida.")
    .optional()
    .or(z.literal("")),

  status: z.enum(
    ["WISHLIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"],
    {
      error: () => "Selecione um status válido.",
    }
  ),

  applicationDate: z
    .string()
    .nonempty("A data da candidatura é obrigatória."),

  notes: z
    .string()
    .max(1000, "As observações podem ter no máximo 1000 caracteres.")
    .optional(),
});

export type ApplicationFormData = z.infer<typeof ApplicationSchema>;