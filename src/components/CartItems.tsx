"use client";
import React from "react";
import { Button, Flex, Grid, Space, Typography } from "antd";
import { theme } from "antd";
import { Avatar, Card } from "antd";
import { useCartStore } from "@/lib/cartStore";
import { getThumbnail } from "@/utils/util";
import { RUPEE } from "@/utils/config";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";
import { red } from "@ant-design/colors";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;
export default function CartItems() {
  const {
    token: { padding },
  } = theme.useToken();

  const { sm } = Grid.useBreakpoint();

  const cart = useCartStore((s) => s.cart);
  const cartItems = Object.values(cart);

  const isCartEmpty = cartItems.length === 0;

  if (isCartEmpty) {
    return (
      <Flex
        gap={padding}
        vertical
        align="center"
        justify="center"
        style={{ height: "60vh" }}
      >
        <ShoppingCartOutlined
          style={{ color: red.primary, fontSize: padding * 4 }}
        />
        <Typography.Text style={{ fontSize: padding * 2 }}>
          Your Cart is <span style={{ color: red.primary }}>Empty!</span>
        </Typography.Text>
        <Link href="/" type="primary">
          <Button type="primary">Continue shopping</Button>
        </Link>
      </Flex>
    );
  }

  return (
    <>
      {cartItems.map((item, i) => (
        <Card key={item.id} style={{ marginBottom: padding / 2 }}>
          <Flex justify="space-between" align="flex-start">
            <Meta
              avatar={
                <Avatar
                  src={getThumbnail(item.image)}
                  style={{
                    width: sm ? 100 : 64,
                    height: sm ? 100 : 64,
                    borderRadius: 0,
                  }}
                />
              }
              title={
                <Typography.Paragraph style={{ textWrap: "balance" }}>
                  {item.name}
                </Typography.Paragraph>
              }
              description={<AddToCart id={item.id} />}
              style={{ maxWidth: "60%", minWidth: 200 }}
            />
            <Space wrap>
              <Typography.Text strong>
                {RUPEE}
                {item.price * item.quantity}
              </Typography.Text>
              <Typography.Text delete type="secondary">
                {RUPEE}
                {item.mrp * item.quantity}
              </Typography.Text>
            </Space>
          </Flex>
        </Card>
      ))}
    </>
  );
}
