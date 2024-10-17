import { CheckoutDrawerItemSkeleton } from "./checkout-drawer-item-skeletion";
import { CheckoutDrawerItem } from "./checkout-drawer-item";
import { CartStateItem } from "@/lib/get-cart-details";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/constants";

interface Props {
    loading: boolean
    items: CartStateItem[]
    updateQuantity: (productItemId: number, quantity: number) => void
    deleteItem: (productItemId: number) => void
}

export const CheckoutDrawerItems: React.FC<Props> = ({ items, loading, updateQuantity, deleteItem }) => {

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: "add" | "subtract"
      ) => {
        quantity = type === "add" ? quantity + 1 : quantity - 1;
        updateQuantity(id, quantity);
      };

    return (
        <div className="flex flex-col gap-7">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CheckoutDrawerItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutDrawerItem
                key={item.id}
                id={item.id}
                name={item.name}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaSize as PizzaSize,
                  item.pizzaType as PizzaType
                )}
                price={item.price}
                quantity={item.quantity}
                imageURL={item.imageUrl}
                onClickCountButton={(type) => {
                  onClickCountButton(item.id, item.quantity, type);
                }}
                onClickDeleteButton={() => deleteItem(item.id)}
              />
            ))}
      </div>
    )
};
