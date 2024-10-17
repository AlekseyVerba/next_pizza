import { cn } from "@/lib/utils"
import Link from "next/link"
import { Title } from "./title"
import { Button } from "./ui"
import { Plus } from "lucide-react"
import { Ingredient } from "@prisma/client"

export interface Props {
    id: number
    title: string
    ingredients: Ingredient[]
    price: number
    imageUrl: string
    className?: string
}

export const ProductCard: React.FC<Props> = (props) => {
    const { id, imageUrl, ingredients, price, title, className } = props

    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center bg-secondary h-[260px] w-[260px]">
                    <img src={imageUrl} alt={title}  />
                </div>
                <Title text={title} size="sm" className="font-bold mt-3 mb-1" />
                
                <p className="text-sm text-gray-400">
                    {ingredients.map(ingredient => ingredient.name).join(', ')}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>

                    <Button variant={'secondary'} className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    )
}