import { prisma } from "@/prisma/prisma-client"
import { caclCartItemsTotal } from "./calc-cart-items-total"

export const updateTotalAmountCart = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            items: {
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            },
        }
    })

    if (!userCart) {
        return;
    }
    
    const updatedAmount = userCart.items.reduce((acc, item) => {
        return acc + caclCartItemsTotal(item)
    }, 0)

    return prisma.cart.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount: updatedAmount
        },
        include: {
            items: {
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            },
        }
    })
}