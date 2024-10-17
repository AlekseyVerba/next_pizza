import { CartDTO } from "./dto/cart.dto"
import { CartCreateItemDTO } from "./dto/cartCreateItem.dto"
import { axiosInstance } from "./instance"

export const get = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>(`/cart`)).data
}

export const updateQuantity = async (productItemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(`/cart/${productItemId}`, { quantity })).data
}

export const deleteItem = async (productItemId: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`/cart/${productItemId}`)).data
}

export const addItem = async (data: CartCreateItemDTO): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>(`/cart`, data)).data
}