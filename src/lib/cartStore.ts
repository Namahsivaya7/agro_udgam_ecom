import { DELIVERY_FEE, MINIMUM_ORDER_VALUE } from "@/utils/config";
import { CartItem, CartTotal } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  count: number;
  cart: Record<string, CartItem>;
  total: CartTotal;
  addItem: (itemId: string, item?: CartItem) => void;
  removeItem: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
}

enum CALC {
  ADD = "ADD",
  SUB = "SUB",
}

const calculateTotal = (total: CartTotal, item: CartItem, calc: CALC) => {
  total.mrp = total.mrp + (calc === CALC.ADD ? 1 : -1) * item.mrp;
  total.price = total.price + (calc === CALC.ADD ? 1 : -1) * item.price;
  total.discount = total.mrp - total.price;
  total.amount =
    total.price > MINIMUM_ORDER_VALUE
      ? total.price
      : total.price + DELIVERY_FEE;

  return total;
};

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      count: 0,
      cart: {},
      total: {
        mrp: 0,
        price: 0,
        discount: 0,
        amount: 0,
      },
      addItem: (id, item) => {
        const cart = { ...get().cart };
        if (cart[id]) {
          cart[id].quantity += 1;
        } else if (item) {
          cart[id] = item;
        }
        const total = calculateTotal(get().total, cart[id], CALC.ADD);

        set({ cart, count: get().count + 1, total });
      },
      removeItem: (itemId) => {
        const cart = { ...get().cart };
        let total = get().total;
        if (cart[itemId] && cart[itemId].quantity > 0) {
          cart[itemId].quantity -= 1;
          total = calculateTotal(total, cart[itemId], CALC.SUB);
        }
        if (cart[itemId].quantity === 0) {
          delete cart[itemId];
        }

        set({ cart, count: get().count - 1, total });
      },
      deleteItem: (itemId) => {
        const cart = get().cart;
        const count = get().count - cart[itemId].quantity;
        let quantity = cart[itemId].quantity;
        let total = get().total;
        while (quantity > 0) {
          total = calculateTotal(total, cart[itemId], CALC.SUB);
        }
        delete cart[itemId];
        set({ cart, count, total });
      },
    }),
    {
      name: "trisandya-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
