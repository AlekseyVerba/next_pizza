import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

interface Props {
    className?: string
}

export const SortPopup: React.FC<Props> = (props) => {
    const { className } = props

    return (
        <div className={cn('inline-flex items-center gap-1 h-[52px] bg-gray-50 rounded-2xl px-5 cursor-pointer', className)}>
            <ArrowUpDown size={16} />
            <b>Сортировка:</b>
            <span className="text-primary">рейтингу</span>
        </div>
    )
}