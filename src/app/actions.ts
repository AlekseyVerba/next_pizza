'use server'

import { CheckoutFormValues } from "@/constants"
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers"

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value;

        if (!token) {
            throw new Error('Token not found')
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token
            }
        })

        if (!userCart) {
            throw new Error('Cart not found')
        }

        if (!userCart.items.length) {
            throw new Error('Cart is empty')
        }

        await prisma.order.create({
            data: {
                fullName: `${data.firstName} ${data.lastName}`,
                address: data.address,
                comment: data.comment,
                email: data.email,
                phone: data.phone,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.SUCCEEDED,
                token,
                items: JSON.stringify(userCart.items)
            }
        })

        await prisma.cart.update({
            data: {
                totalAmount: 0
            },
            where: {
                id: userCart.id
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        return 'https://www.google.com/'
    } catch(err) {
        console.log('[CreateOrder] Server error', err);
    }
}

export async function registerUser(data: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
    
        if (user) {
            throw new Error('Пользователь с таким email уже существует')
        }
    
        await prisma.user.create({
            data: {
                email: data.email,
                fullName: data.fullName,
                password: hashSync(data.password, 10)
            }
        })
    } catch(err) {
        console.log('[registerUser] Server error', err);
        throw err
    }
}

export async function updateUserInformation(data: Prisma.UserUpdateInput) {
    try {
        const userSession = await getUserSession()

        if (!userSession) {
            throw new Error('Пользователь не найден')
        }

        const user = await prisma.user.findFirst({
            where: {
                id: Number(userSession.id)
            }
        })

        await prisma.user.update({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: data.password ? hashSync(data.password as string, 10) : user?.password
            },
            where: {
                id: Number(userSession.id)
            }
        })

    } catch(err) {
        console.log('[updateUserInformation] Server error', err);
        throw err
    }
}