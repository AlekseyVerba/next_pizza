"use client";

import { useFilters, useIngredients, useQueryFilters } from "../hooks";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";
import { Input } from "./ui";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = (props) => {
  const { className } = props;

  const filters = useFilters();
  const { ingredients, loading } = useIngredients();

  useQueryFilters({
    ingredients: filters.selectedIngredients,
    types: filters.selectedTypes,
    sizes: filters.selectedSizes,
    prices: filters.prices,
  });

  const items = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  const updatePrices = (values: number[]) => {
    filters.updatePrice("priceFrom", values[0]);
    filters.updatePrice("priceTo", values[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="font-extrabold mb-5" />

      <CheckboxFiltersGroup
        title="Тип теста"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.toggleTypes}
        selected={filters.selectedTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        onClickCheckbox={filters.toggleSizes}
        selected={filters.selectedSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цены от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.updatePrice("priceFrom", Number(e.target.value) || 0)
            }
          />

          <Input
            type="number"
            placeholder="100"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.updatePrice("priceTo", Number(e.target.value) || 1000)
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
          step={10}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.toggleIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
