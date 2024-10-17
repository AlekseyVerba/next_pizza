import * as z from "zod"

export const passwordSchema = z.string().min(6, "Пароль должен содержать минимум 6 символов")

export const AuthFormSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: passwordSchema,
})

export const RegisterFormSchema = AuthFormSchema.merge(z.object({
    fullName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    confirmPassword: passwordSchema,  
})).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
})

export type AuthFormValues = z.infer<typeof AuthFormSchema>;
export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;