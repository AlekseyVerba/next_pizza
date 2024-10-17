'use client'

import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useCartState } from "../store";
import toast from 'react-hot-toast';


interface Props {
  product: ProductWithRelations;
}

export const ProductForm: React.FC<Props> = (props) => {
  const {
    product: { imageUrl, name, items, ingredients },
  } = props;
  const [addItemToCart, loading] = useCartState((state) => [ state.addItem, state.loading ]);

  const firstItem = items[0];
  const isPizza = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    const itemId = isPizza ? productItemId! : firstItem.id;

    try {
      await addItemToCart({ productItemId: itemId, ingredients });
      toast.success('Товар добавлен в корзину');
    } catch(err) {
      toast.error('Товар не был добавлен в корзину');
    }
  
  }

  if (isPizza) {
    return (
      <ChoosePizzaForm
        imageURL={imageUrl}
        name={name}
        ingredients={ingredients}
        items={items}
        addPizzaToCart={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageURL={imageUrl}
      name={name}
      price={firstItem.price}
      addProductToCart={onSubmit}
      loading={loading}
    />
  );
};
