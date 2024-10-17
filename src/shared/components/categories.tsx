'use client';

import { cn } from "@/lib/utils";
import { useCategoryState } from "../store";
import { Category } from "@prisma/client";

interface Props {
  items: Category[]
}

export const Categories: React.FC<Props> = (props) => {
  const { items } = props

  const activeCategoryId = useCategoryState((state) => state.activeCategoryId);

  return (
    <div className="inline-flex bg-gray-50 p-1 gap-1 rounded-2xl">
      {items.map((cat: Category) => {
        const isActive = cat.id === activeCategoryId;

        return (
          <a
            href={`/#${cat.name}`}
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5",
              isActive && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            key={cat.id}
          >
            <button>{cat.name}</button>
          </a>
        );
      })}
    </div>
  );
};
