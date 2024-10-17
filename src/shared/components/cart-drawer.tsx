"use client";

import { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui";
import { PizzaSize, PizzaType } from "@/constants";
import { Title } from "./title";
import { useCart } from "../hooks";

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const { updateQuantity, totalAmount, deleteItem, items, loading } = useCart()

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "add" | "subtract"
  ) => {
    quantity = type === "add" ? quantity + 1 : quantity - 1;
    updateQuantity(id, quantity);
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE]">
        {totalAmount && <SheetHeader>
          <SheetTitle>
            В корзине{" "}
            <span className="font-bold">{items.length} товар(ов)</span>
          </SheetTitle>
        </SheetHeader>}
        {
          !totalAmount && <div className="flex-1 flex flex-col items-center text-center justify-center">
              <Image src='/empty_box.png' alt='box' width={120} height={120} />
              <Title size="md" className="font-bold mt-3" text="Корзина пустая" />
              <p className="text-gray-400 mb-5">Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
              <SheetTrigger>
                <Button
                  className="mt-3 w-56 h-12 text-base"
                  size="lg"
                >
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetTrigger>
          </div>
        }

        <div className="flex-1 -mx-6 overflow-auto">
          {items.map((item) => {
            return (
              <CartDrawerItem
                key={item.id}
                imageURL={item.imageUrl}
                id={item.id}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaSize as PizzaSize,
                  item.pizzaType as PizzaType
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) => { onClickCountButton(item.id, item.quantity, type) }}
                onClickDeleteButton={() => deleteItem(item.id)}
              />
            );
          })}
        </div>

        {totalAmount && <SheetFooter className="bg-white p-8 -mx-6">
          <div className="w-full">
            <div className="flex mb-6">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
              </span>
              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link className="w-full h-12" href="/checkout">
              <Button loading={loading} className="w-full h-12 text-base gap-3">
                Оформить заказ
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </SheetFooter>}
      </SheetContent>
    </Sheet>
  );
};
