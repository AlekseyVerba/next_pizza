import { CartItemsDetails } from "./cart-item-details/cart-item-details.types"
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'
import * as CartItem from './cart-item-details' 

interface Props extends CartItemsDetails {
    onClickCountButton: (type: 'add' | 'subtract') => void
    onClickDeleteButton: () => void
}

export const CartDrawerItem: React.FC<Props> = ({ imageURL, details, name, price, quantity, onClickCountButton, onClickDeleteButton }) => {

    return (
        <div className="flex bg-white p-5 gap-4 mb-4">
            <CartItem.CartItemDetailsImage imageURL={imageURL} />
            <div className="flex-1">
                <CartItem.CartItemDetailsInfo name={name} details={details} />

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CountButton add={() => onClickCountButton('add')} subtract={() => onClickCountButton('subtract')} value={quantity} size="xs" />

                    <div className="flex items-center gap-3">
                        <CartItem.CartItemsDetailsPrice value={price} />
                        <Trash2Icon
                            className="cursor-pointer text-gray-400 hover:text-gray-600"
                            onClick={onClickDeleteButton}
                            size={22}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}