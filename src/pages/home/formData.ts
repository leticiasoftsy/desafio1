import { z } from "zod";

export const formSchema = z.object({
    name: z.object({
        firstname: z.string().min(2, "Nome é obrigatorio"),
        lastname: z.string().min(2, "Sobrenome é obrigatorio")
    }),
    email: z.string().min(2, "Email é obrigatorio"),
    password: z.string().min(2, "Senha é obrigatoria"),
})

export type DataForm = z.infer<typeof formSchema>