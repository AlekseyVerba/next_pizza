import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutItemDetails } from "./checkout/items/checkout-item-details";
import { WhiteBox } from "./white-box";
import { Button, Skeleton } from "./ui";
import { useMemo } from "react";

const PRICE_DELIVERY = 250;
const TAX_PERCANTAGE = 5;

interface Props {
  price: number;
  isLoading?: boolean;
  isSubmit?: boolean
}

export const CartSide: React.FC<Props> = ({ price, isLoading = false, isSubmit = false }) => {
  const priceForTax = useMemo(
    () => ((price + PRICE_DELIVERY) * TAX_PERCANTAGE) / 100,
    [price]
  );
  const fullPrice = useMemo(() => price + priceForTax, [priceForTax]);

  return (
    <WhiteBox>
      <div className="flex flex-col">
        <span className="text-xl">Итого:</span>
        {isLoading ? (
          <Skeleton className="h-10 w-40" />
        ) : (
          <span className="text-[36px] font-extrabold">{fullPrice} ₽</span>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <CheckoutItemDetails
          title={
            <>
              <Package size={18} className="text-gray-400" />
              Стоимость товаров:
            </>
          }
          isLoading={isLoading}
          value={price}
        />
        <CheckoutItemDetails
          title={
            <>
              <Percent size={18} className="text-gray-400" />
              Налоги:
            </>
          }
          isLoading={isLoading}
          value={priceForTax}
        />
        <CheckoutItemDetails
          title={
            <>
              <Truck size={18} className="text-gray-400" />
              Доставка:
            </>
          }
          isLoading={isLoading}
          value={PRICE_DELIVERY}
        />
      </div>

      <div className="mt-10">
        <Button
          loading={isLoading || isSubmit}
          className="w-full font-bold h-12 text-base gap-3"
          type="submit"
        >
          Перейти к оплате
          <ArrowRight />
        </Button>
      </div>
    </WhiteBox>
  );
};
