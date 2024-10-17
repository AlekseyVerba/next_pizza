import { PizzaSize } from "@/constants";
import { mapPizzaSize, mapPizzaType, PizzaType } from "@/constants/pizza";
import { Ingredient } from "@prisma/client";

export const getCartItemDetails = (ingredients: Pick<Ingredient, 'name'>[], size?: PizzaSize, type?: PizzaType): string => {
    const details: string[] = []

    if (size && type) {
        details.push(`${mapPizzaType[type]} ${mapPizzaSize[size]}`)
    }

    ingredients.forEach(ingredient => {
        details.push(ingredient.name)
    })

    return details.join(', ')
}