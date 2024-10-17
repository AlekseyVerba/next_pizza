'use client';

import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Title } from "./title";
import { useIntersection } from 'react-use'
import React, { useEffect } from "react";
import { useCategoryState } from "../store";
import { Ingredient, Product } from "@prisma/client";

interface Props {
  title: string;
  items: any[]
  categoryId: number;
  className?: string;
}

export const ProductGroupList: React.FC<Props> = (props) => {
  const { className, items, title, categoryId } = props;

  const setActiveCategoryId = useCategoryState((state) => state.setActiveCategoryId);

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={cn(className)} id={title} ref={intersectionRef}>

    <Title text={title} size="lg" className="font-bold mb-6" />

      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item) => {
          return (
            <ProductCard
              id={item.id}
              title={item.name}
              ingredients={item.ingredients}
              price={item.items[0].price}
              imageUrl={item.imageUrl}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};
