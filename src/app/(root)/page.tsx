import {
  Container,
  Filters,
  ProductGroupList,
  Title,
  TopBar,
} from "@/shared/components";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams}) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* ФИЛЬТРАЦИЯ */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* СПИСОК ТОВАРОВ */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map((category) => {
                  return (
                    <ProductGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
