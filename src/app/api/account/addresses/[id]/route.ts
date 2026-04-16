import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { isDefault } = body as { isDefault?: boolean };

    const address = await prisma.address.findFirst({
      where: {
        id,
        userId: authUser.id,
      },
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: authUser.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const updated = await prisma.address.update({
      where: { id },
      data: {
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json(
      { success: true, address: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update address error:", error);

    return NextResponse.json(
      { error: "Unable to update address" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const address = await prisma.address.findFirst({
      where: {
        id,
        userId: authUser.id,
      },
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    await prisma.address.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete address error:", error);

    return NextResponse.json(
      { error: "Unable to delete address" },
      { status: 500 }
    );
  }
}
