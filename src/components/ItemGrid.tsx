"use client";

import React from "react";
import ItemCard from "@/components/ItemCard";
import { List } from "antd";
import { Item } from "@prisma/client";
const { Item } = List;

export default function ItemGrid({ data }: { data: Item[] }) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
        xxl: 7,
      }}
      dataSource={data}
      renderItem={(item) => (
        <Item>
          <ItemCard {...item} />
        </Item>
      )}
    />
  );
}
