"use client";
import ItemList from "@/components/ItemList";
import { getItems } from "@/lib/api";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <Skeleton loading={loading} active avatar>
        <ItemList data={items} />
      </Skeleton>
    </main>
  );
}
