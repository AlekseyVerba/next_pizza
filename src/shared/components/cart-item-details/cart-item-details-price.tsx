import { cn } from "@/lib/utils"
import React from "react"

export interface Props {
    value: number
    className?: string
}

export const CartItemsDetailsPrice: React.FC<Props> = ({ value, className }) => {
    return (
        <h2 className={cn('font-bold', className)}>{value} ₽</h2>
    )
}