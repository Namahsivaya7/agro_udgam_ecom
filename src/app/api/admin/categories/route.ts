import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
  const itemBody = await req.json();
  const item = await prisma.itemCategory.create({
    data: {
      ...itemBody,
      id: itemBody?.name.split(" ").join("_"),
    },
  });
  return NextResponse.json(item);
}

export async function GET(req: Request, res: Response) {
  const items = await prisma.itemCategory.findMany({});
  return NextResponse.json(items);
}


