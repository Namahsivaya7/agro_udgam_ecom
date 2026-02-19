import Landing from "@/components/Landing";
import service from "@/lib/service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [items, categories] = await Promise.all([
    service.getItems(),
    service.getCategories(),
  ]);

  return (
    <main>
      <Landing data={items} categories={categories} />
    </main>
  );
}
