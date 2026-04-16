import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      authUser.role !== "ADMIN" &&
      authUser.role !== "DOCTOR" &&
      authUser.role !== "PHARMACIST"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const prisma = getPrisma();
    const where =
      authUser.role === "ADMIN"
        ? undefined
        : {
            OR: [
              { audience: "BOTH" as const },
              { audience: authUser.role },
            ],
          };

    const resources = await prisma.portalResource.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        fileUrl: true,
        fileType: true,
      },
    });

    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error("Portal resources fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while fetching resources" },
      { status: 500 }
    );
  }
}
