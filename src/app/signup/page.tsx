"use client";
import React, { useEffect } from "react";
import {
  LineHeightOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Skeleton,
  Typography,
  theme,
} from "antd";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { message } from "@/lib/notify";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const {
    token: { padding },
  } = theme.useToken();
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [session, status]);

  const onFinish = async (values: any) => {
    const { error: err } = (await signIn("credentials", {
      redirect: false,
      ...values,
    })) ?? { error: true };
    if (err) {
      message.error("Failed to create account, email/phone already exists.");
    } else {
      // TODO: based on role
      router.replace("/");
    }
  };

  return (
    <Skeleton loading={status === "loading"}>
      <Flex justify="center" align="center" style={{ padding }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true, isRegister: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
        >
          <Typography.Title level={2}>Signup</Typography.Title>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your Full name!" },
            ]}
          >
            <Input
              prefix={<LineHeightOutlined className="site-form-item-icon" />}
              placeholder="name"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone number!" },
            ]}
          >
            <Input
              type="number"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: false, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="isRegister" hidden noStyle></Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-check">Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" href="/signin">
              Have account?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Skeleton>
  );
};

export default Signup;
