import { Category, Item, Order } from "@prisma/client";
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

const getItemsByCategory = async (category: Category): Promise<Item[]> => {
  const items = await prisma.item.findMany({
    where: {
      category: category,
    },
  });
  return items;
};

type Filter = {
  q?: string;
  brand?: string;
  category?: Category;
};

const getItemsByFilter = async ({
  q,
  brand,
  category,
}: Filter): Promise<Item[]> => {
  const items = await prisma.item.findMany({
    where: {
      category: category,
      brand: {
        contains: brand,
        mode: "insensitive",
      },
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
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
  getOrders,
  getItemsByCategory,
  getItemsByFilter,
  getItem,
};

export default service;
