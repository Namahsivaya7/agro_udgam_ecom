"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  List,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { getThumbnail } from "@/utils/util";
import Link from "antd/es/typography/Link";
import { CartItem } from "@prisma/client";

export default function OrderedItemList({
  data,
  onClose,
}: {
  data?: CartItem[];
  onClose: () => void;
}) {
  return (
    <Drawer
      title="Ordered Items"
      placement="right"
      onClose={onClose}
      open={!!data}
    >
      {data?.map((item) => (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          key={item.id}
        >
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={getThumbnail(item.image)}
                  style={{ borderRadius: "0%" }}
                />
              }
              title={
                <Link href="" target="_blank">
                  {item.name}
                </Link>
              }
            />
            <Space>
              <Typography>{item.price}/-</Typography>
              <Typography>{item.quantity}</Typography>
            </Space>
          </List.Item>
        </List>
      ))}
    </Drawer>
  );
}
