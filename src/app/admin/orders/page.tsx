import React from "react";
import service from "@/lib/service";
import OrderList from "@/components/OrderList";

const Orders: React.FC = async () => {
  const orders = await service.getOrders();
  return <OrderList data={orders} />;
};

export default Orders;
