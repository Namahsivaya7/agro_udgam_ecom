import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
export interface categoryParams {
    params: { categoryId: string };
  }
export async function DELETE(req: Request, {params} :categoryParams) {
    const Category = await prisma.itemCategory.delete({
      where: { id: params.categoryId},
    });
    return NextResponse.json(Category);
  }