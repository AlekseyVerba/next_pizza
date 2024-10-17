import * as z from "zod"

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
    email: z.string().email("Некорректный email"),
    phone: z.string().min(10, "Телефон должен содержать минимум 10 символов"),
    address: z.string().min(5, "Адрес должен содержать минимум 5 символов"),
    comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;