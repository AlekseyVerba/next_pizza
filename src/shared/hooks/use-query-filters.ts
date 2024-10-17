import { useEffect } from "react";
import { Filters } from "./use-filters";
import { useRouter } from 'next/navigation';
import qs from 'qs'

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()

    useEffect(() => {

        const params = {
            ...filters.prices,
            ingredients: Array.from(filters.ingredients),
            types: Array.from(filters.types),
            sizes: Array.from(filters.sizes)
        }

        const query = qs.stringify(params, { arrayFormat: 'comma' })

        router.push(`?${query}`, {
            scroll: false
        })

    }, [filters])
}