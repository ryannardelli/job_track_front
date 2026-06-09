import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
        .string()
        .min(2, "O nome precisa ter pelo menos 2 letras.")
        .max(100, "O nome pode ter no máximo 100 caracteres."),
    email: z.string().email("Digite um email válido."),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem.",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData = z.infer<typeof RegisterSchema>;