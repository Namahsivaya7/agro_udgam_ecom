"use client";

import React from "react";
import {
  Button,
  Collapse,
  Divider,
  Flex,
  Layout,
  Select,
  Space,
  Typography,
} from "antd";

import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
const options = [
  { label: "Bangles & Bracelets", value: "Bangles & Bracelets" },
  { label: "Bike Covers", value: "Bike Covers" },
  { label: "Cups & Mugs", value: "Cups & Mugs" },
  { label: "Earrings & Studs", value: "Earrings & Studs" },
  { label: "Hair accessories", value: "Hair accessories" },
  { label: "Handbags", value: "Handbags" },
  { label: "Dresses", value: "Dresses" },

  { label: "Bedsheets", value: "Bedsheets" },
];

const plainOptions = ["combos", "pack of 2"];

export default function Sider() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  const { Panel } = Collapse;
  return (
    <Layout.Sider className="sideresponsive">
      <h1>Products For You</h1>

      <Select
        defaultValue="Sort by :"
        style={{ width: "100%", padding: "0 10px" }}
        onChange={handleChange}
        options={[
          { value: "Relevance", label: "Sort by: Relevance" },
          { value: "New Arrivals", label: "New Arrivals" },
          { value: "Price (High to Low)", label: "Price (High to Low)" },
          { value: "Price (Low to High)", label: "Price (Low to High)" },
          { value: "Ratings", label: "Ratings" },

          { value: "Discount", label: "Discount", disabled: true },
        ]}
      />

      <Divider style={{ margin: "10px auto" }} />

      <Flex vertical style={{ textAlign: "start", padding: "0 25px" }}>
        <Typography>
          <b>FILTERS</b>
        </Typography>
        <Typography>1000+ Products</Typography>
      </Flex>
      <Divider style={{ margin: "10px auto" }} />
      <Space>
        <Typography>Category</Typography>
      </Space>
      <Flex>
        <Select
          mode="multiple"
          style={{ width: "100%", margin: "auto 5px" }}
          placeholder="search"
          onChange={onChange}
          optionLabelProp="label"
          options={options}
        />
      </Flex>
      <Space>
        <Collapse
          expandIconPosition="right"
          defaultActiveKey={["1"]}
          style={{
            borderTop: "1px solid grey",
            borderRadius: 0,
            marginTop: "15px",
          }}
          ghost
        >
          <Panel header="color" key="1">
            <Space style={{ flexWrap: "wrap" }}>
              <Button style={{ borderRadius: "22px" }}>Multicolor</Button>
              <Button style={{ borderRadius: "22px" }}>purple</Button>
              <Button style={{ borderRadius: "22px" }}>white</Button>
              <Button style={{ borderRadius: "22px" }}>Black</Button>
              <Button style={{ borderRadius: "22px" }}>orange</Button>
              <Button style={{ borderRadius: "22px" }}>red</Button>
              <Button style={{ borderRadius: "22px" }}>Blue</Button>
            </Space>
          </Panel>
        </Collapse>
      </Space>
      <Collapse
        expandIconPosition="right"
        size="large"
        defaultActiveKey={["1"]}
        style={{ borderTop: "1px solid grey", borderRadius: 0 }}
        ghost
      >
        <Panel header="Price" key="1">
          <Space style={{ flexWrap: "wrap", maxWidth: "100%" }}>
            <Button style={{ borderRadius: "22px" }}>under $ 234</Button>
            <Button style={{ borderRadius: "22px" }}>under $ 111</Button>
            <Button style={{ borderRadius: "22px" }}>under $ 456</Button>
            <Button style={{ borderRadius: "22px" }}>under $ 150</Button>
          </Space>
        </Panel>
      </Collapse>

      <Collapse
        expandIconPosition="right"
        defaultActiveKey={["1"]}
        ghost
        style={{
          borderTop: "1px solid grey",
          borderRadius: 0,
        }}
      >
        <Panel header="Combo" key="1">
          <Checkbox.Group
            options={plainOptions}
            defaultValue={["combos"]}
            onChange={onChange}
          />
        </Panel>
      </Collapse>
    </Layout.Sider>
  );
}
