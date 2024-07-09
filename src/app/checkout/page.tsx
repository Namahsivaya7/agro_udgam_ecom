"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Steps,
  Collapse,
  Typography,
  theme,
  Flex,
  Radio,
  Row,
  Col,
  Affix,
  Divider,
  Skeleton,
  Form,
  Result,
  Grid,
} from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  DeliveredProcedureOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DELIVERY_FEE, MINIMUM_ORDER_VALUE, RUPEE } from "@/utils/config";
import { useCartStore } from "@/lib/cartStore";
import { useUserStore } from "@/lib/userStore";
import { Order, PaymentMode } from "@prisma/client";
import CartItems from "@/components/CartItems";
import Link from "next/link";
import { createOrder } from "@/lib/api";
import NewAddressForm from "@/components/NewAddressForm";

export default function Checkout() {
  const {
    token: { padding, colorFillAlter, colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form] = Form.useForm();

  const cart = useCartStore((s) => s.cart);
  const total = useCartStore((s) => s.total);
  const user = useUserStore((s) => s.user);
  const [order, setOrder] = useState<Order | undefined>();
  const { md } = Grid.useBreakpoint();

  if (!user && status === "unauthenticated") {
    router.push("/signin?redirect=/checkout");
    return <Typography>Redirecting to Signin...</Typography>;
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const onSubmit = async (values: any) => {
    if (!user) {
      message.error("Not logged in, please sign in to place the order.");
      return;
    }
    const { address, ...rest } = values;
    const order = await createOrder({
      ...rest,
      address: user?.addresses[address],
    });
    if (order) {
      setOrder(order);
    } else {
      message.error("Failed to place the order, try again.");
    }
  };

  const panelStyle: React.CSSProperties = {
    background: colorFillAlter,
  };

  const steps = [
    {
      title: "Address",
      icon: <SolutionOutlined />,
      content: (
        <Collapse
          defaultActiveKey="address"
          style={panelStyle}
          items={[
            {
              key: "address",
              label: "Address",
              children: (
                <Flex
                  vertical
                  gap={padding}
                  id="address"
                  style={{ width: "auto" }}
                >
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input delivery address",
                      },
                    ]}
                    noStyle
                  >
                    <Radio.Group>
                      {user?.addresses?.map((add, i) => (
                        <Radio value={i} key={add.name + i}>
                          <Flex
                            vertical
                            style={{
                              paddingLeft: padding,
                            }}
                          >
                            <Typography>
                              <b>{add.name}</b>
                            </Typography>
                            <Typography>{add.mobile}</Typography>
                            <Typography>{add.address}</Typography>
                            <Typography>{add.pincode}</Typography>
                            <Typography>{add.map}</Typography>
                          </Flex>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  <NewAddressForm />
                </Flex>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "Payment",
      icon: <BankOutlined />,
      content: (
        <Collapse
          defaultActiveKey="payment"
          style={panelStyle}
          items={[
            {
              key: "payment",
              label: "Payment",
              style: panelStyle,
              children: (
                <Flex vertical gap={padding}>
                  <Form.Item
                    name="payment"
                    rules={[
                      {
                        required: true,
                        message: "Please input payment mode",
                      },
                    ]}
                    noStyle
                  >
                    <Radio.Group>
                      <Radio value={PaymentMode.COD}>
                        Cash on Delivery (COD)
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Typography.Paragraph type="secondary">
                    Other payment options will be available soon.
                  </Typography.Paragraph>
                </Flex>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "Items and Delivery",
      icon: <DeliveredProcedureOutlined />,
      content: (
        <Collapse
          defaultActiveKey={"delivery"}
          style={panelStyle}
          items={[
            {
              key: "delivery",
              label: "Delivery",
              children: (
                <Flex vertical gap={padding}>
                  <Typography.Paragraph strong type="success">
                    Items ordered before 12PM will be delivered on the same day.
                  </Typography.Paragraph>
                  <CartItems />
                </Flex>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "Done",
      icon: <SmileOutlined />,
      content: (
        <Collapse
          defaultActiveKey="summary"
          style={panelStyle}
          items={[
            {
              key: "summary",
              label: "Order Summary",
              style: panelStyle,
              children: (
                <Flex vertical gap={padding}>
                  <Row gutter={padding}>
                    <Col span={12}>
                      <Typography.Text>Total Price :</Typography.Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Typography.Text>
                        {RUPEE}
                        {total.mrp}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <Row gutter={padding}>
                    <Col span={12}>
                      <Typography.Text>Discount :</Typography.Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Typography.Text type="success">
                        -{RUPEE}
                        {total.discount}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <Row gutter={padding}>
                    <Col span={12}>
                      <Typography.Text>Delivery Fee :</Typography.Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Typography.Text
                        delete={total.price > MINIMUM_ORDER_VALUE}
                      >
                        {RUPEE}
                        {DELIVERY_FEE}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <Divider />

                  <Row gutter={padding}>
                    <Col span={12}>
                      <Typography.Text>Order Total :</Typography.Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Typography.Text strong>
                        {RUPEE}
                        {total.amount}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <Button
                    type={current <= 3 ? "primary" : "default"}
                    htmlType="submit"
                    style={{ width: "fit-content", marginLeft: "auto" }}
                  >
                    <Link href={"#order-status"}>Place Order</Link>
                  </Button>
                </Flex>
              ),
            },
          ]}
        ></Collapse>
      ),
    },
  ];

  return (
    <Skeleton loading={status === "loading"}>
      <Form
        name="basic"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        initialValues={{
          address: 0,
          payment: PaymentMode.COD,
          items: Object.values(cart),
          userId: user?.id,
          total,
        }}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item name="items" noStyle></Form.Item>
        <Form.Item name="total" noStyle></Form.Item>
        <Flex style={{ padding }} vertical gap={padding * 2}>
          {md && (
            <Affix offsetTop={0}>
              <Steps
                current={current}
                items={steps}
                style={{ background: colorBgContainer, padding }}
              />
            </Affix>
          )}

          <Flex vertical gap={padding}>
            {steps.map((step, i) => (
              <Flex key={step.title} vertical id={i.toString()}>
                {step.content}
              </Flex>
            ))}
          </Flex>
          <Flex id="order-status">
            {order && (
              <Result
                status="success"
                title="Order placed successfully."
                subTitle={`Order number: ${order.id}, your order will reach you by end of the day.`}
                extra={[
                  <Link href="/" key="buy">
                    <Button type="primary" key="buy">
                      Continue Shopping
                    </Button>
                  </Link>,
                ]}
              />
            )}
          </Flex>
        </Flex>
      </Form>
    </Skeleton>
  );
}
