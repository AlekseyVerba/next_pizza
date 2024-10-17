import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  types?: string;
  sizes?: string;
  priceFrom?: string;
  priceTo?: string;
  ingredients?: string;
}

const DEFAULT_LOW_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async ({ ingredients, types, sizes, priceFrom, priceTo }: GetSearchParams) => {
  const sizesArr = sizes?.split(",").map(Number);
  const typesArr = types?.split(",").map(Number);
  const ingredientsArr = ingredients?.split(",").map(Number);

  const lowPrice = priceFrom ? Number(priceFrom) : DEFAULT_LOW_PRICE;
  const maxPrice = priceTo ? Number(priceTo) : DEFAULT_MAX_PRICE;

  return prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsArr
            ? {
                some: {
                  id: {
                    in: ingredientsArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizesArr,
              },
              pizzaType: {
                in: typesArr,
              },
              price: {
                gte: lowPrice,
                lte: maxPrice
              }
            },
          },
        },
        include: {
          ingredients: {},
          items: {
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });
};
