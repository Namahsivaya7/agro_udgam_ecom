import Landing from "@/components/Landing";
import service from "@/lib/service";

export const dynamic = "force-dynamic"; // 👈🏽

export default async function Home() {
  const items = await service.getItems();

  return (
    <main>
      <Landing data={items} />
    </main>
  );
}
