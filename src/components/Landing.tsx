"use client";
import ItemGrid from "@/components/ItemGrid";
import { categoryItems } from "@/utils/util";
import { Category, Item } from "@prisma/client";
import { Card, theme } from "antd";
import Link from "next/link";

export default function Landing({ data }: { data: Item[] }) {
  const {
    token: { padding },
  } = theme.useToken();

  const itemsByCategory = data.reduce((acc, d) => {
    if (!acc[d.category]) {
      acc[d.category] = [];
    }
    acc[d.category].push(d);
    return acc;
  }, {} as Record<Category, Item[]>);

  return (
    <>
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <Card
          key={category}
          title={category.replaceAll("_", " ")}
          bordered={false}
          extra={<Link href={`/category/${category}`}>View More</Link>}
          style={{ marginBottom: padding }}
        >
          <ItemGrid data={items.slice(0, 7)} />
        </Card>
      ))}
    </>
  );
}
