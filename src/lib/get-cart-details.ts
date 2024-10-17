import { CartDTO } from "@/shared/services/dto/cart.dto";
import { caclCartItemsTotal } from "./calc-cart-items-total";

export type CartStateItem = {
    id: number
    quantity: number
    name: string
    imageUrl: string
    price: number
    disabled: boolean
    pizzaSize: number | null
    pizzaType: number | null
    ingredients: Array<{ price: number, name: string }>
}

interface ReturnProps {
    items: CartStateItem[]
    totalAmount: number
}

export const getCartDetails = (cart: CartDTO): ReturnProps => {

    const items: CartStateItem[] = cart.items.map(item => {
        return {
            id: item.id,
            quantity: item.quantity,
            name: item.productItem.product.name,
            disabled: false,
            imageUrl: item.productItem.product.imageUrl,
            ingredients: item.ingredients.map(({ name, price }) => ({ name, price })),
            pizzaSize: item.productItem.size,
            pizzaType: item.productItem.pizzaType,
            price: caclCartItemsTotal(item),
        }
    })

    return {
        items,
        totalAmount: cart.totalAmount,
    }
}