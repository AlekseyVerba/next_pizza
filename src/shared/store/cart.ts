import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartCreateItemDTO } from "../services/dto/cartCreateItem.dto";

interface State {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // Получение тоаваров из коррзины
  fetchItemsInCart: () => Promise<void>;

  // Обновление количества товара в корзине
  updateQuantity: (productItemId: number, quantity: number) => Promise<void>;

  // Удаление товара из корзины
  deleteItem: (productItemId: number) => Promise<void>;

  // Добавить товар
  addItem: (data: CartCreateItemDTO) => Promise<void>;
}

export const useCartState = create<State>((set) => ({
  loading: true,
  error: false,
  totalAmount: 0,
  items: [],

  fetchItemsInCart: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.get();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (productItemId: number, quantity: number) => {
    set({ loading: true, error: false });
    try {
      const data = await Api.cart.updateQuantity(productItemId, quantity);
      set({ ...getCartDetails(data) });
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  deleteItem: async (productItemId: number) => {
    set({ loading: true, error: false });
    try {
      const data = await Api.cart.deleteItem(productItemId);
      set({ ...getCartDetails(data) });
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (newData: CartCreateItemDTO) => {
    set({ loading: true, error: false });
    try {
      const data = await Api.cart.addItem(newData);
      set({ ...getCartDetails(data) });
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
