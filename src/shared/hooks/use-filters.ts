import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use"


interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface Filters {
    ingredients: Set<string>;
    types: Set<string>;
    sizes: Set<string>;
    prices: PriceProps;
}

interface QueryFilters extends PriceProps {
    ingredients: string;
    types: string;
    sizes: string;
}

export const useFilters = () => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>


    const [prices, setPrices] = useState<PriceProps>({ 
        priceFrom: Number(searchParams.get('priceFrom')) || undefined, 
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet<string>(new Set(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []))
    const [selectedTypes, { toggle: toggleTypes }] = useSet<string>(new Set(searchParams.has('types') ? searchParams.get('types')?.split(',') : []))
    const [selectedSizes, { toggle: toggleSizes }] = useSet<string>(new Set(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))

    const updatePrice = (name: keyof PriceProps, value: number ) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return {
        selectedIngredients,
        toggleIngredients,
        selectedTypes,
        toggleTypes,
        selectedSizes,
        toggleSizes,
        prices,
        updatePrice
    }
}