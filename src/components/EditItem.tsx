"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Row,
  Select,
  message,
} from "antd";
import { diff } from "@/utils/util";
import { Item } from "@prisma/client";
import ImageUpload from "./ImageUpload";
import { updateItem } from "@/lib/api";
import { useCategoryStore } from "@/lib/categoryStore";
import Link from "next/link";

export default function EditItem({
  data,
  onClose,
}: {
  data?: Item;
  onClose?: () => void;
}) {
  const [item, setItem] = useState<Item | undefined>(data);
  const [form] = Form.useForm();
  const onFinish = async (formValues: Partial<Item>) => {
    if (!item?.id) return;
    const update = diff(formValues, item);
    if (!update) return;
    const updatedItem = await updateItem(item.id, update);
    if (updatedItem) {
      setItem(updatedItem);
      message.success("Updated successfully.");
    } else {
      message.error("Update failed.");
    }
  };

  useEffect(() => {
    form.setFieldsValue(item);
  }, [item, form]);

  useEffect(() => {
    setItem(data);
  }, [data]);

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
    <Drawer
      title="Edit Items"
      placement="right"
      onClose={onClose}
      open={!!data}
      width={640}
    >
      <Flex>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          style={{ width: "100%" }}
          layout="vertical"
          form={form}
          initialValues={item}
        >
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Category" name="category">
                <Select>
                  {categoryMenuItems?.map(({ key, label }:any) => (
                    <Select.Option key={key} value={key}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <InputNumber
                  placeholder="Enter Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="mrp" label="MRP" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Max Retail Price"
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Quantity" name="quantity">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={5} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="images">
                <ImageUpload />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Brand" name="brand">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Sold By" name={["details", "soldBy"]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Type" name={["details", "type"]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Capacity" name={["details", "capacity"]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Origin" name={["details", "origin"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Weight" name={["details", "weight"]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Units" name={["details", "units"]}>
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Size" name={["details", "size"]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Pattern" name={["details", "pattern"]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Flavour" name={["details", "flavour"]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Style" name={["details", "style"]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Drawer>
  );
}
