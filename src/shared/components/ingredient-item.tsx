import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"

interface Props {
    imageURL: string
    price: number
    name: string
    addItem: () => void
    active?: boolean
    className?: string
}

export const IngredientItem: React.FC<Props> = (props) => {
    const { imageURL, name, price, addItem, active } = props

    return (
        <div
            onClick={addItem}
            className={cn(
                'flex flex-col items-center rounded-md p-1 w-32 text-center relative cursor-pointer shadow-md bg-white', {
                    'border-2 border-primary': active
                })}
        >
            <img src={imageURL} alt={name} height={110} width={110} />
            <p className="text-xs mb-1">{name}</p>
            <p className="text-bold">{price} ₽</p>
            {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
        </div>
    )
}