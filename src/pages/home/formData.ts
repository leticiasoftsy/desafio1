import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatorio"),
    email: z.string().min(1, "Email é obrigatorio"),
    password: z.string().min(1, "A senha é obrigatoria"),
})

export type DataForm = z.infer<typeof formSchema>