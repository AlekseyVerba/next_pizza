import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { updateTotalAmountCart } from "@/lib/update-total-amount-cart";
import { prisma } from "@/prisma/prisma-client";
import { CartCreateItemDTO } from "@/shared/services/dto/cartCreateItem.dto";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] })
    }

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

    return NextResponse.json(userCart)
}

export async function POST(req: NextRequest) {
    let token = await req.cookies.get('token')?.value
    const data = (await req.json()) as CartCreateItemDTO 

    data.ingredients = data.ingredients || []

    if (!token) {
        token = randomUUID()
    }

    const cart = await findOrCreateCart(token)

    const findCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productItemId: data.productItemId,
          ingredients: {
            every: {
              id: { in: data.ingredients },
            },
          },
        },
      });

    if (findCartItem) {
        await prisma.cartItem.update({
            where: {
                id: findCartItem.id
            },
            data: {
                quantity: findCartItem.quantity + 1
            }
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productItemId: data.productItemId,
                quantity: 1,
                ingredients: {
                    connect: data.ingredients.map(id => ({ id }))
                }
            }
        })
    }

    const updatedCart = await updateTotalAmountCart(token)
    const resp = NextResponse.json(updatedCart)
    resp.cookies.set('token', token)
    return resp
}