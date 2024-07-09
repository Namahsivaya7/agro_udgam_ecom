"use client";
import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Row, theme } from "antd";
import Address from "./AddressForm";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/api";
import { User } from "@prisma/client";
import { message } from "@/lib/notify";

export default function Profile() {
  const {
    token: { padding },
  } = theme.useToken();
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!session?.user.id) return;
    getUser(session?.user.id).then(setUser);
  }, [session?.user.id]);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const onSubmit = async (formValues: Partial<User>) => {
    if (!user?.id) return;
    const updatedUser = await updateUser(user.id, formValues);
    if (updatedUser) {
      setUser(updatedUser);
      message.success("Updated successfully.");
    } else {
      message.error("Update failed.");
    }
  };

  return (
    <Form
      name="basic"
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      initialValues={user}
      onFinish={onSubmit}
      autoComplete="off"
      layout="vertical"
      form={form}
    >
      <Row gutter={padding * 2} style={{ padding }}>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your Email" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Phone No"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input type="phone" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Address />
        </Col>
      </Row>
    </Form>
  );
}
