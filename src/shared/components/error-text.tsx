import { cn } from "@/lib/utils"

interface Props {
    value: string
    className?: string
}

export const ErrorText: React.FC<Props> = ({ value, className }) => {
    return (
        <div className={cn('text-red-500 text-sm', className)}>
            {value}
        </div>
    )
}