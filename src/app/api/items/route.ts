import prisma from "@/lib/prisma";
import service from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const items = await service.getItemsByFilter({ q });
  return NextResponse.json(items);
}

export async function POST(req: Request, res: Response) {
  const itemBody = await req.json();
  const item = await prisma.item.create({
    data: itemBody,
  });
  return NextResponse.json(item);
}
