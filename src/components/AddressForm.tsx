import React from "react";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, theme } from "antd";

const Address: React.FC = () => {
  const {
    token: { colorBorder, padding },
  } = theme.useToken();
  return (
    <Form.List name="addresses">
      {(fields, { add, remove, ...restField }) => (
        <>
          {fields.map(({ key, name }) => (
            <Flex
              vertical
              key={key}
              style={{
                border: `1px dotted ${colorBorder}`,
                padding: padding * 2,
                marginBottom: padding,
              }}
            >
              <Form.Item
                {...restField}
                label="Full Name"
                name={[name, "name"]}
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                {...restField}
                label="Mobile Number"
                name={[name, "mobile"]}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                {...restField}
                label="Pincode"
                name={[name, "pincode"]}
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                {...restField}
                label="Full Address"
                name={[name, "address"]}
                rules={[{ required: true }]}
                help="House No, Street, Village, Landmark, Mandal, District"
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item
                {...restField}
                label="Map Location"
                name={[name, "map"]}
                rules={[{ required: false }]}
              >
                <Input placeholder="Share map location" />
              </Form.Item>

              <Form.Item noStyle>
                <Button
                  block
                  type="link"
                  danger
                  icon={<CloseCircleFilled />}
                  onClick={() => remove(name)}
                >
                  Delete Address
                </Button>
              </Form.Item>
            </Flex>
          ))}
          <Form.Item>
            <Button
              onClick={() => add()}
              block
              type="dashed"
              icon={<PlusOutlined />}
            >
              Add New Address
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default Address;
