import { CountIconButton } from './count-icon-button'

export interface CountButtonProps {
    value: number
    add: () => void
    subtract: () => void
    size: 'xs' | 's'
}

export const CountButton: React.FC<CountButtonProps> = ({ value, add, subtract, size }) => {

    return (
        <div className='inline-flex items-center gap-3 justify-between'>
            <CountIconButton onClick={subtract} type='subtract' size={size} disabled={value === 1} />
                <b className={size === 's' ? 'text-sm' : 'text-md'}>{value}</b>
            <CountIconButton onClick={add} type='add' size={size} />
        </div>
    )
}