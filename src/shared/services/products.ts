import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"

export const search = async (query: string): Promise<Product[]> => {
    return (await axiosInstance.get<Product[]>(`/products/search`, { params: { query } })).data
}