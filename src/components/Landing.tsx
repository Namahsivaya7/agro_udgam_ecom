"use client";
import ItemGrid from "@/components/ItemGrid";
import { Item, ItemCategory } from "@prisma/client";
import { Card, theme } from "antd";
import Link from "next/link";

type LandingProps = {
  data: Item[];
  categories: ItemCategory[];
};

export default function Landing({ data, categories }: LandingProps) {
  const {
    token: { padding },
  } = theme.useToken();

  const itemsByCategory = data.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = [];
    acc[d.category].push(d);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <>
      {categories.map((cat) => {
        const items = (itemsByCategory[cat.id] ?? []).slice(0, 7);
        if (items.length === 0) return null;
        return (
          <Card
            key={cat.id}
            title={cat.name}
            bordered={false}
            extra={<Link href={`/category/${cat.id}`}>View More</Link>}
            style={{ marginBottom: padding }}
          >
            <ItemGrid data={items} />
          </Card>
        );
      })}
    </>
  );
}
