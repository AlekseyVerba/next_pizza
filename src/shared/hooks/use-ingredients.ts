import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, []);
    
    return { ingredients, loading };
}