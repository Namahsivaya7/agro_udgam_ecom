import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface ItemRequestParams {
  params: { itemId: string };
}

export async function GET(req: Request, { params }: ItemRequestParams) {
  const item = await prisma.item.findUnique({
    where: {
      id: params.itemId,
    },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: ItemRequestParams) {
  const { id, ...itemBody } = await req.json();
  const item = await prisma.item.update({
    data: itemBody,
    where: {
      id: params.itemId,
    },
  });
  return NextResponse.json(item);
}
