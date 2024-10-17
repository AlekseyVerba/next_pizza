"use client";

import { CartItemsDetails } from "../../cart-item-details/cart-item-details.types";
import { CountButton } from "../../count-button";
import { X } from "lucide-react";
import * as CartItem from "../../cart-item-details";

interface Props extends CartItemsDetails {
  onClickCountButton: (type: "add" | "subtract") => void;
  onClickDeleteButton: () => void;
}

export const CheckoutDrawerItem: React.FC<Props> = ({
  imageURL,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  onClickDeleteButton,
}) => {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="flex items-center gap-5">
        <CartItem.CartItemDetailsImage imageURL={imageURL} />
        <CartItem.CartItemDetailsInfo name={name} details={details} className="w-64" />
      </div>

      <CartItem.CartItemsDetailsPrice value={price} />

      <div className="flex items-center gap-3">
        <CountButton
          add={() => onClickCountButton("add")}
          subtract={() => onClickCountButton("subtract")}
          value={quantity}
          size="xs"
        />
        <X
          className="cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={onClickDeleteButton}
          size={22}
        />
      </div>
    </div>
  );
};
