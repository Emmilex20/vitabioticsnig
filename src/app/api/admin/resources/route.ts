import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    await prisma.portalResource.create({
      data: {
        title,
        description,
        fileUrl,
        fileType,
        audience,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Admin create resource error:", error);

    return NextResponse.json(
      { error: "Unable to create resource" },
      { status: 500 }
    );
  }
}
