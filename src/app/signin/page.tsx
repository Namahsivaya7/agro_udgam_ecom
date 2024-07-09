"use client";
import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
import { useRouter, useSearchParams } from "next/navigation";

const Signin: React.FC = () => {
  const router = useRouter();
  const {
    token: { padding },
  } = theme.useToken();

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(searchParams.get("redirect") ?? "/");
    }
  }, [session, status]);

  const onFinish = async (values: any) => {
    const { error: err, status } = (await signIn("credentials", {
      redirect: false,
      ...values,
    })) ?? { error: true };
    if (err || status === 401) {
      message.error("Email or password incorrect.");
    } else {
      router.replace(searchParams.get("redirect") ?? "/");
    }
  };

  return (
    <Skeleton loading={status === "loading"}>
      <Flex justify="center" align="center" style={{ padding }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
          layout="vertical"
        >
          <Typography.Title level={2}>Signin</Typography.Title>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email! or phone number",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email or phone"
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
          <Form.Item style={{ justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-check">Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Signin
            </Button>
            <Link href="/signup"> Or signup</Link>
          </Form.Item>
        </Form>
      </Flex>
    </Skeleton>
  );
};

export default Signin;
