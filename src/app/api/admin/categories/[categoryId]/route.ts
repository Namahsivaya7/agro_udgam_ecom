import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ categoryId: string }> };

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { categoryId } = await params;
  const deleted = await prisma.itemCategory.delete({
    where: { id: categoryId },
  });
  return NextResponse.json(deleted);
}
