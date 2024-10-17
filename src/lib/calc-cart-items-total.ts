import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const caclCartItemsTotal = (item: CartItemDTO): number => {
    const ingredientsTotal = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    
    return (item.productItem.price + ingredientsTotal) * item.quantity;
}