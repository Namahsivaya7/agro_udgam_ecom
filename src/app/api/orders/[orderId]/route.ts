import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface orderRequestParams {
  params: { orderId: string };
}

export async function GET(req: Request, { params }: orderRequestParams) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
    },
  });
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: orderRequestParams) {
  const orderBody = await req.json();
  const order = await prisma.order.update({
    data: orderBody,
    where: {
      id: params.orderId,
    },
  });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: orderRequestParams) {
  const { status } = await req.json();
  const order = await prisma.order.update({
    data: {
      status,
    },
    where: {
      id: params.orderId,
    },
  });
  return NextResponse.json(order);
}
