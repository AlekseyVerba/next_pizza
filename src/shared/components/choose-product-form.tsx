import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "./ui";

interface Props {
  imageURL: string;
  name: string;
  price: number;
  className?: string;
  loading?: boolean
  addProductToCart: () => void;
}

export const ChooseProductForm: React.FC<Props> = (props) => {
  const { imageURL, name, price, addProductToCart, loading, className } = props;

  return (
    <div className={cn("flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageURL}
          alt="products"
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          )}
        />
      </div>
      <div className="w-[490px] p-7 bg-[#f7f6f5]">
        <Title size="lg" text={name} className="font-extrabold mb-1" />
        <Button
          loading={loading}
          onClick={addProductToCart}
          className="w-full mt-10 h-[55px] px-10 text-base"
        >
          Добавить в корзину за {price}₽
        </Button>
      </div>
    </div>
  );
};
