"use client";
import React, { useEffect, useState } from "react";
import { appLogo, appName } from "@/utils/config";
import {
  Badge,
  Col,
  Dropdown,
  Flex,
  Grid,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingFilled,
  UserOutlined,
  BankOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/lib/cartStore";
import ItemSearch from "./ItemSearch";
import { useUserStore } from "@/lib/userStore";
import { useCategoryStore } from "@/lib/categoryStore";

const { useToken } = theme;

const profileMenuItems: MenuProps["items"] = [
  {
    key: "account",
    label: (
      <Link rel="noopener noreferrer" href="/account">
        <BankOutlined /> Account
      </Link>
    ),
  },
  {
    key: "orders",
    label: (
      <Link rel="noopener noreferrer" href="/orders">
        <ShoppingFilled /> My Orders
      </Link>
    ),
  },
  {
    key: "signout",
    label: (
      <Space onClick={() => signOut()}>
        <PoweroffOutlined /> Sign out
      </Space>
    ),
  },
];

const HeaderMenu: React.FC = () => {
  const { md } = Grid.useBreakpoint();

  const { data: session, status } = useSession();
  const cartCount = useCartStore((s) => s.count);
  const isLoggedIn = session?.user.id;

  const { setUser, reset, user } = useUserStore((s) => s);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user.id && (!user || user.id !== session?.user.id)) {
      setUser(session?.user.id);
    } else {
      reset();
    }
  }, [session?.user.id, status]);

  /**
   * Workaround for React Minified Error #418
   * https://github.com/vercel/next.js/discussions/43921#discussioncomment-5614536
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: md && <UserOutlined />,
      label: (
        <Space>
          {isLoggedIn ? (
            <Dropdown menu={{ items: profileMenuItems }}>
              {md ? (
                <Typography>{session?.user.name}</Typography>
              ) : (
                <UserOutlined />
              )}
            </Dropdown>
          ) : (
            <Link href="/signin">Signin</Link>
          )}
        </Space>
      ),
    },
    {
      key: "shoppingcart",
      icon: (
        <Link href="/cart">
          <Badge count={cartCount} dot size="small" status="warning">
            <ShoppingCartOutlined />
          </Badge>
        </Link>
      ),
      label: md && (
        <Badge count={cartCount} size="small" status="warning">
          <Link href="/cart">Cart</Link>
        </Badge>
      ),
    },
  ];

  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{
        flex: md ? 1 : 0,
        justifyContent: "end",
        border: "none",
        display: "flex",
      }}
      disabledOverflow
    />
  );
};

const Header: React.FC = () => {
  const {
    token: { padding, colorBgContainer },
  } = useToken();
  const { md } = Grid.useBreakpoint();

  const getCategory = useCategoryStore((s) => s.categories);

  const categoryMenuItems: MenuProps["items"] = getCategory.map((cat) => ({
    key: cat.id,
    label: (
      <Link rel="noopener noreferrer" href={`/category/${cat.id}`}>
        {cat.name}
      </Link>
    ),
  }));

  return (
    <Layout.Header
      style={{
        display: "flex",
        width: "100%",
        background: colorBgContainer,
        flexDirection: "column",
        minHeight: 144,
        paddingLeft: padding,
        paddingRight: padding,
      }}
    >
      <Flex align="center" gap={padding}>
        <Link href="/" style={{ color: "inherit" }}>
          {md ? (
            <Typography.Title level={3} style={{ fontWeight: 700, margin: 0 }}>
              {appName}
            </Typography.Title>
          ) : (
            <Image
              src={appLogo}
              alt={appName}
              width={48}
              height={48}
              preview={false}
            />
          )}
        </Link>
        <ItemSearch />
        <HeaderMenu />
      </Flex>
      <Row gutter={padding} align="middle">
        <Col xs={24} lg={24} >

          <Menu mode="horizontal" items={categoryMenuItems} />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
