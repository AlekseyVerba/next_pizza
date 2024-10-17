import { Plus, Minus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "./ui"
import { CountButtonProps } from "./count-button"

interface Props {
    type: 'add' | 'subtract'
    onClick: () => void
    disabled?: boolean
    size: CountButtonProps['size']
}

export const CountIconButton: React.FC<Props> = ({ type, disabled, onClick, size }) => {

    return (
        <Button
            variant='outline'
            disabled={disabled}
            className={cn('p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:text-gray-400', {
                'w-[30px] h-[30px] rounded-[10px]': size === 'xs',
                'w-[38px] h-[38px] rounded-md': size === 's',
            })}
        >
            {type === 'add' ? 
                <Plus onClick={onClick} className={size === 'xs' ? 'h-4' : 'h5'} /> : 
                <Minus onClick={onClick} className={size === 'xs' ? 'h-4' : 'h5'} />
            }
        </Button>
    )
}