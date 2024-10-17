'use client'

import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import { usePizzaOptions } from "../hooks";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { getPizzaDetails } from "@/lib/get-pizza-details";
import { Button } from "./ui";

interface Props {
  imageURL: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  className?: string;
  loading?: boolean
  addPizzaToCart: (productItemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = (props) => {
  const { imageURL, ingredients, items, name, addPizzaToCart, loading } = props;
  const { availableSizes, size, type, setSize, setType, selectedIngredients, currentItemId, addIngredient } = usePizzaOptions(items)

  const { textDetaills, totalPrice } = getPizzaDetails(type, size, items, ingredients, selectedIngredients)

  return (
    <div className={cn("flex flex-1")}>
      <PizzaImage imageURL={imageURL} size={size} />
      <div className="w-[490px] p-7 bg-[#f7f6f5]">
        <Title size="lg" text={name} className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 my-5 ">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            setValue={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            setValue={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <Title text="Ингредиенты" className="mb-3" />
        <div className="h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                imageURL={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                addItem={() => addIngredient(ingredient.id)}
                key={ingredient.id}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={() => addPizzaToCart(currentItemId!, Array.from(selectedIngredients))}
          className="w-full mt-10 h-[55px] px-10 text-base"
        >
          Добавить в корзину за {totalPrice}₽
        </Button>
      </div>
    </div>
  );
};
