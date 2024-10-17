import { updateTotalAmountCart } from "@/lib/update-total-amount-cart"
import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const body = (await req.json()) as { quantity: number }
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: Number(id),
        }
    })

    if (!cartItem) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await prisma.cartItem.update({
        where: {
            id: Number(id),
        },
        data: {
            quantity: body.quantity,
        }
    })

    const updatedCart = await updateTotalAmountCart(token)

    return NextResponse.json(updatedCart)
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: Number(id),
        }
    })

    if (!cartItem) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await prisma.cartItem.delete({
        where: {
            id: Number(id),
        },
    })

    const updatedCart = await updateTotalAmountCart(token)

    return NextResponse.json(updatedCart)
}