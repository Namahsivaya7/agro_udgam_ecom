"use client";

import React from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Form, Input, InputNumber, theme } from "antd";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/api";
import { Address, User } from "@prisma/client";
import { message } from "@/lib/notify";
import { useUserStore } from "@/lib/userStore";

export default function NewAddressForm() {
  const {
    token: { padding },
  } = theme.useToken();
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const user = useUserStore((s) => s.user);
  const updateUser = useUserStore((s) => s.updateUser);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formValues: Address) => {
    if (!user?.id) return;
    const userWithNewAddress = {
      ...user,
      addresses: [...user.addresses, formValues],
    };
    updateUser(userWithNewAddress);
  };

  useEffect(() => {
    form.resetFields();
    onClose();
  }, [user?.addresses]);

  return (
    <>
      <Button type="link" style={{ width: "fit-content" }} onClick={showDrawer}>
        Add New Address
      </Button>
      <Drawer title="Add New Address" onClose={onClose} open={open}>
        <Form
          name="new-address"
          onFinish={onSubmit}
          autoComplete="on"
          layout="vertical"
          form={form}
        >
          <Flex vertical>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Full Address"
              name="address"
              rules={[{ required: true }]}
              help="House No, Street, Village, Landmark, Mandal, District"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Map Location"
              name="map"
              rules={[{ required: false }]}
            >
              <Input placeholder="Share map location" />
            </Form.Item>

            <Form.Item noStyle>
              <Button
                type="link"
                icon={<SendOutlined />}
                style={{ width: "fit-content", marginLeft: "auto" }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Drawer>
    </>
  );
}
