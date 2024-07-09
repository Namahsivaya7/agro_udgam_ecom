"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectProps, Space, Typography } from "antd";
import { getCategories } from "@/lib/api";
import { DefaultOptionType } from "antd/es/select";

const SelectCategory: React.FC = ({ onChange }: Partial<SelectProps>) => {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  useEffect(() => {
    getCategories().then((catagories = []) => {
      const optionsOpt = catagories.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      setOptions(optionsOpt);
    });
  }, []);

  return (
      <Select
        defaultValue="Select category"
        style={{ width: "100%" }}
        onChange={onChange}
        options={options}
      />
  );
};

export default SelectCategory;
