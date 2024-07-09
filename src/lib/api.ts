import { API_ROOT } from "@/utils/config";
import { Item, Order, User, ItemCategory } from "@prisma/client";
import { message } from "antd";

export const getItems = async () => {
  const items = await fetch(`${API_ROOT}items`).then((res) => res.json());
  return items;
};

export const getItemsByQuery = async (q: string) => {
  const items = await fetch(`${API_ROOT}items?q=${q}`).then((res) =>
    res.json()
  );
  return items;
};

export const getCartItems = async () => {
  const user = await fetch(`${API_ROOT}cart`).then((res) => res.json());
  return user.cart;
};

export const addCartItem = async (itemId: string) => {
  const item = await fetch(`${API_ROOT}cart`, {
    method: "POST",
    body: JSON.stringify({ itemId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return item;
};

export const addItem = async (item: Item) => {
  const product = await fetch(`${API_ROOT}/items`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return product;
};

export const updateItem = async (itemId: string, updateBody: Partial<Item>) => {
  const item = await fetch(`${API_ROOT}/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(updateBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return item;
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number
) => {
  const item = await fetch(`${API_ROOT}cart/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return item;
};

export const getUser = async (userId: string) => {
  const user = await fetch(`${API_ROOT}users/${userId}`).then((res) =>
    res.json()
  );
  return user;
};

export const updateUser = async (
  userId: string,
  updateBody: Partial<User>
): Promise<User> => {
  const user = await fetch(`${API_ROOT}users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(updateBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return user;
};

export const createOrder = async (orderBody: Partial<Order>) => {
  const order = await fetch(`${API_ROOT}orders`, {
    method: "POST",
    body: JSON.stringify(orderBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return order;
};

export const addCategory = async (itemBody: ItemCategory) => {
  const item = await fetch(`${API_ROOT}admin/categories`, {
    method: "POST",
    body: JSON.stringify(itemBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return item;
};

export const getCategories = async (): Promise<ItemCategory[]> => {
  const categories = await fetch(`${API_ROOT}admin/categories`).then((res) =>
    res.json()
  );
  return categories;
};

export const deleteCategories = async (
  categoryId: string,
 
) => {
  const categories = await fetch(
    `${API_ROOT}admin/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return categories;
};
