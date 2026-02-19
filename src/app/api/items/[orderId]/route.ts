import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Dynamic segment is [orderId] so param name is orderId (used as item id in URL)
type RouteParams = { params: { orderId: string } };

function cleanUpdateBody(body: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (value === null || value === undefined) continue;
    if (key === "details" && typeof value === "object" && value !== null) {
      const details: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (v !== null && v !== undefined) details[k] = v;
      }
      if (Object.keys(details).length > 0) cleaned[key] = details;
    } else {
      cleaned[key] = value;
    }
  }
  if ("quantity" in body && (body.quantity === null || body.quantity === undefined)) {
    // Omit quantity so Prisma keeps existing value (required Int must not be null)
  } else if (typeof body.quantity === "number") {
    cleaned.quantity = body.quantity;
  }
  return cleaned;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const itemId = params.orderId;
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: RouteParams) {
  const itemId = params.orderId;
  const body = await req.json();
  const { id: _id, ...rest } = body;
  const data = cleanUpdateBody(rest as Record<string, unknown>);
  const item = await prisma.item.update({
    data: data as Parameters<typeof prisma.item.update>[0]["data"],
    where: { id: itemId },
  });
  return NextResponse.json(item);
}
