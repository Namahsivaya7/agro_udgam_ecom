import ItemGrid from "@/components/ItemGrid";
import service from "@/lib/service";
import {
  SITE_DESCRIPTION,
  appLogo,
  appName,
  siteAddress,
} from "@/utils/config";
// import { Category } from "@prisma/client";
import { Divider, Typography } from "antd";
import { Metadata } from "next";

type Props = {
  params: { categoryId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.categoryId.replaceAll("_", " ");

  return {
    title: `${appName} | ${category}`,
    openGraph: {
      title: `${appName} | ${category}`,
      url: `${siteAddress}/category/${params.categoryId}`,
    },
  };
}

export default async function CategoryItems({ params }: Props) {
  const items = await service.getItemsByCategory(params.categoryId);

  return (
    <main>
      <Divider orientation="left" style={{ marginTop: 0 }}>
        {params.categoryId.replaceAll("_", " ")}
      </Divider>
      <ItemGrid data={items} />
    </main>
  );
}
