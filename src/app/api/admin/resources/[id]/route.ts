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

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, fileUrl, fileType, audience } = body;

    if (!title || !description || !fileUrl || !fileType || !audience) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!["BOTH", "DOCTOR", "PHARMACIST"].includes(audience)) {
      return NextResponse.json(
        { error: "Invalid audience value" },
        { status: 400 }
      );
    }

    await prisma.portalResource.update({
      where: { id },
      data: {
        title,
        description,
        fileUrl,
        fileType,
        audience,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin update resource error:", error);

    return NextResponse.json(
      { error: "Unable to update resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.portalResource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin delete resource error:", error);

    return NextResponse.json(
      { error: "Unable to delete resource" },
      { status: 500 }
    );
  }
}
