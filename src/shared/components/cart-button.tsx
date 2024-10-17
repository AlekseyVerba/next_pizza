'use client';

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "./ui";
import { CartDrawer } from "./cart-drawer";
import { useCartState } from "../store";
import { cn } from "@/lib/utils";

export const CartButton = () => {
  const { items, totalAmount, loading } = useCartState(
    (state) => state
  );

  return (
    <CartDrawer>
      <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading })}>
        <b>{totalAmount}</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          size={20}
        />
      </Button>
    </CartDrawer>
  );
};
