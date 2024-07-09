import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orderBody = await req.json();
  console.log({ orderBody });
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
