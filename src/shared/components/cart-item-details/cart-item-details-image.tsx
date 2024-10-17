interface Props {
    imageURL: string
}

export const CartItemDetailsImage: React.FC<Props> = ({ imageURL }) => {
    return (
        <img src={imageURL} className="w-[60px] h-[60px]" />
    )
}