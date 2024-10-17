import { cn } from "@/lib/utils"

interface Props {
    name: string
    details: string
    className?: string
}

export const CartItemDetailsInfo: React.FC<Props> = ({ details, name, className }) => {
    return (
        <div className={cn(className)}>
            <div>
                <h2 className="font-bold text-lg leading-6">{name}</h2>
            </div>

            {details && <p className="text-xs text-gray-400 width-[90%]">{details}</p>}
        </div>
    )
}