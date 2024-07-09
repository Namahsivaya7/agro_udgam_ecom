"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Skeleton,
  Space,
  Typography,
  theme,
} from "antd";
import { List } from "antd";
import { Item } from "@prisma/client";
import { getThumbnail } from "@/utils/util";
import { StrikethroughOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { RUPEE } from "@/utils/config";
import EditItem from "./EditItem";

const { Item } = List;

export default function ItemList({ data }: { data: Item[] }) {
  const {
    token: { padding },
  } = theme.useToken();
  const [selectedItem, setItem] = useState<Item | undefined>();
  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={getThumbnail(item.images[0])}
                  style={{ borderRadius: "0%" }}
                />
              }
              title={
                <Link href={`/products/${item.id}`} target="_blank">
                  {item.name}
                </Link>
              }
              description={
                <Space>
                  <Typography.Text type="secondary">
                    {item.brand}/-
                  </Typography.Text>
                </Space>
              }
            />
            <Flex gap={padding * 4} style={{ marginRight: padding }}>
              <Typography style={{ textDecoration: "line-through" }}>
                {RUPEE}
                {item.mrp}
              </Typography>
              <Typography>
                {RUPEE} {item.price}
              </Typography>
              <Typography.Text strong>{item.quantity}</Typography.Text>

              <Button icon={<EditOutlined />} onClick={() => setItem(item)} />
            </Flex>
          </List.Item>
        )}
      />
      <EditItem data={selectedItem} onClose={() => setItem(undefined)} />
    </>
  );
}
