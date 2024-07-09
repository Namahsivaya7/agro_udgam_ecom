"use client";

import React from "react";
import { Flex, Space, Tag, Typography, theme } from "antd";
import { Card } from "antd";
import { Item } from "@prisma/client";
import { getThumbnail } from "@/utils/util";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { RUPEE } from "@/utils/config";
import Link from "next/link";

export default function ItemCard(props: Item) {
  const {
    id,
    images,
    name,
    price,
    mrp,
    details: { weight, capacity, units },
  } = props;
  const {
    token: { padding },
  } = theme.useToken();
  const offer = Math.ceil(((mrp - price) / mrp) * 100);
  return (
    <Card
      style={{
        maxWidth: 240,
      }}
      hoverable
      cover={
        <Link
          style={{ width: "100%", textAlign: "center" }}
          href={`/products/${id}`}
        >
          <Image
            src={getThumbnail(images[0])}
            width={200}
            height={200}
            alt={name}
            style={{
              padding: padding,
              maxWidth: "fit-content",
              margin: "0 auto",
              width: "100%",
            }}
          />
        </Link>
      }
      bodyStyle={{
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: 0,
      }}
    >
      <Link href={`/products/${id}`}>
        <Typography.Paragraph
          style={{ fontSize: 12, marginBottom: 0, minHeight: 40 }}
          ellipsis={{ rows: 2, tooltip: name }}
        >
          {name}
        </Typography.Paragraph>
      </Link>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {weight ?? capacity} {units}
      </Typography.Text>
      <Space
        split=""
        align="center"
        style={{
          width: "100%",
          fontSize: padding,
        }}
      >
        <Typography.Text strong>
          {RUPEE}
          {price}
        </Typography.Text>
        <Typography.Text type="secondary" delete>
          {RUPEE}
          {mrp}
        </Typography.Text>
      </Space>

      {offer && (
        <Tag style={{ marginBottom: padding / 2 }} color="purple">
          {offer}% off
        </Tag>
      )}
      <AddToCart id={props.id} item={props} />
    </Card>
  );
}
