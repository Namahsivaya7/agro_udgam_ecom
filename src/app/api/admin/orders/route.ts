import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user.role)
    return NextResponse.json({ error: "Not previleged!" }, { status: 401 });

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { orderBody } = await req.json();
  const order = await prisma.order.create({
    data: {
      ...orderBody,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });
  return NextResponse.json(order);
}
