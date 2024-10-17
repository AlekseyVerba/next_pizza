import { cn } from "@/lib/utils"

export interface Variant {
    name: string
    value: string
    disabled?: boolean
}

interface Props {
    items: Variant[]
    value: Variant['value']
    setValue: (value: Variant['value']) => void
}

export const GroupVariants: React.FC<Props> = (props) => {
    const { items, value, setValue } = props

    return (
        <div className="flex justify-between bg-[#d8d5d5] rounded-3xl select-none p-1">
            {items.map((item) => (
                <button
                    key={item.value}
                    className={cn('flex items-center justify-center h-[30px] cursor-pointer rounded-3xl flex-1', {
                        'bg-white shadow': item.value === value,
                        'text-gray-500 opacity-50 pointer-events-none': item.disabled,
                    })}
                    onClick={() => setValue(item.value)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}