import service from "@/lib/service";
import GlobalError from "@/app/not-found";
import Product from "@/components/Product";
import ItemGrid from "@/components/ItemGrid";
import { Divider, Flex } from "antd";
import { Metadata } from "next";
import { SITE_DESCRIPTION, appName, siteAddress } from "@/utils/config";
import { getImage } from "@/utils/util";

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await service.getItem(params.productId);

  if (!item) return {};

  return {
    title: `${appName} | ${item?.name}`,
    openGraph: {
      title: item?.name,
      url: `${siteAddress}/products/${params.productId}`,
      description: item?.description ?? SITE_DESCRIPTION,
      siteName: appName,
      images: getImage(item?.images[0]),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const item = await service.getItem(params.productId);

  if (!item) {
    return <GlobalError />;
  }

  const itemsWithCategory = await service.getItemsByCategory(item.category);

  return (
    <main>
      <Product item={item} />
      <Flex vertical>
        <Divider>Similar Products</Divider>
        <ItemGrid
          data={itemsWithCategory?.filter(
            (item) => item.id !== params.productId
          )}
        />
      </Flex>
    </main>
  );
}
