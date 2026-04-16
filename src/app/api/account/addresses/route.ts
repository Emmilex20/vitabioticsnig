import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  addressLine1: z.string().min(3, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: authUser.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error("Get addresses error:", error);

    return NextResponse.json(
      { error: "Unable to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = addressSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { error: firstIssue?.message || "Invalid address data" },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      country,
      state,
      city,
      addressLine1,
      addressLine2,
      isDefault,
    } = parsed.data;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: authUser.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: authUser.id,
        fullName,
        phone,
        country,
        state,
        city,
        addressLine1,
        addressLine2: addressLine2 || null,
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json({ success: true, address }, { status: 201 });
  } catch (error) {
    console.error("Create address error:", error);

    return NextResponse.json(
      { error: "Unable to create address" },
      { status: 500 }
    );
  }
}
