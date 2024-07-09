"use client";
import {
  OrderedListOutlined,
  ShoppingOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "/admin/orders",
    icon: <OrderedListOutlined />,
    label: <Link href="/admin/orders">Orders</Link>,
  },
  {
    key: "/admin/items",
    icon: <ShoppingOutlined />,
    label: <Link href="/admin/items">Items</Link>,
  },
  {
    key: "/admin/items/new",
    icon: <PlusOutlined />,
    label: <Link href="/admin/items/new">New Item</Link>,
  },{
    key: "/admin/categories",
    icon: <EditOutlined />,
    label: <Link href="/admin/categories">Categories</Link>,
  },

];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { padding, colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  return (
    <Layout>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={["/admin/orders"]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ padding, minHeight: "80vh" }}>
        <Content
          style={{
            padding: padding,
            margin: 0,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
