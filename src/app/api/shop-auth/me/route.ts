import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getAuthUser();

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch auth user error:", error);

    return NextResponse.json(
      { error: "Unable to fetch user" },
      { status: 500 }
    );
  }
}
