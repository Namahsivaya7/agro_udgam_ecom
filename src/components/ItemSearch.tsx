import React, { useMemo, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Flex,
  Form,
  Input,
  List,
  SelectProps,
} from "antd";
import Link from "next/link";
import { debounce } from "@/utils/util";
import { Item } from "@prisma/client";
import { getItemsByQuery } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

const renderItem = (d: Item) => ({
  value: d.id,
  label: <Link href={`/products/${d.id}`}>{d.name}</Link>,
});

const ItemSearch: React.FC = () => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isInCategoryPage = pathname.startsWith("/category/");

  const category = useMemo(
    () => pathname.split("/").pop()?.replaceAll("_", " "),
    [pathname]
  );

  const getOptions = async (q: string) => {
    const items = await getItemsByQuery(q);
    const data = items?.map(renderItem);
    setOptions(data ?? []);
  };

  const handleSearch = async (query: string) => {
    setValue(query);
    if (query.trim().length === 0) return;
    debounce(getOptions, 300)(query);
  };

  const onSearchHandler = () => {
    let path = `/search?q=${value}`;
    if (isInCategoryPage) {
      path = `${pathname}${path}`;
    }
    router.push(path);
  };

  return (
    <Flex flex={2} style={{ maxWidth: 780 }}>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={true}
        style={{ width: "100%" }}
        options={options}
        onSearch={handleSearch}
        value={value}
        onSelect={() => setValue("")}
      >
        <Input.Search
          onSearch={onSearchHandler}
          onPressEnter={onSearchHandler}
          name="q"
          placeholder={`search products ${isInCategoryPage ? `in ${category}` : ''}`}
          />
      </AutoComplete>
    </Flex>
  );
};

export default ItemSearch;
