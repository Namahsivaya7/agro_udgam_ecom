import { Item, ItemCategory, Order } from "@prisma/client";
import prisma from "./prisma";

const getItems = async (): Promise<Item[]> => {
  const items = await prisma.item.findMany({});
  return items;
};

const getItem = async (id: string): Promise<Item | null> => {
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  return item;
};

const getCategories = async (): Promise<ItemCategory[]> => {
  const categories = await prisma.itemCategory.findMany({});
  return categories;
};

const getItemsByCategory = async (categoryId: string): Promise<Item[]> => {
  const items = await prisma.item.findMany({
    where: {
      category: categoryId,
    },
  });
  return items;
};

type Filter = {
  q?: string;
  brand?: string;
  category?: string;
};

const getItemsByFilter = async ({
  q,
  brand,
  category,
}: Filter): Promise<Item[]> => {
  const items = await prisma.item.findMany({
    where: {
      ...(category && { category }),
      ...(brand && { brand: { contains: brand, mode: "insensitive" } }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
  });
  return items;
};

const getOrders = async (): Promise<OrderType[]> => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return orders;
};

const service = {
  getItems,
  getItem,
  getCategories,
  getItemsByCategory,
  getItemsByFilter,
  getOrders,
};

export default service;
