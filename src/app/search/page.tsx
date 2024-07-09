import React from "react";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import service from "@/lib/service";
import { Category } from "@prisma/client";
import ItemGrid from "@/components/ItemGrid";
import { Divider } from "antd";

type Props = {
  searchParams: {
    q?: string;
    brand?: string;
    category?: Category;
  };
  params: {
    categoryId: Category;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let title = `${appName} | Products`;
  if (searchParams.brand) {
    title += " by " + searchParams.brand;
  }
  if (searchParams.q) {
    title += " matching " + searchParams.q;
  }
  return {
    title,
  };
}

export default async function Search({ searchParams }: Props) {
  const { brand, q, category } = searchParams;

  const items = await service.getItemsByFilter({
    q,
    category,
    brand,
  });

  return (
    <main>
      <Divider orientation="left" style={{ marginTop: 0 }}>
        {[
          category?.replaceAll("_", " "),
          brand,
          ` products matching ${q}`,
        ].join(" | ")}
      </Divider>
      <ItemGrid data={items} />
    </main>
  );
}
