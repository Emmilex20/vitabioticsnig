import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await new Promise<{
      secure_url: string;
      width?: number;
      height?: number;
      format?: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vitabiotics-portal/products",
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
            return;
          }

          resolve(result as {
            secure_url: string;
            width?: number;
            height?: number;
            format?: string;
          });
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json(
      {
        success: true,
        imageUrl: uploaded.secure_url,
        format: uploaded.format,
        width: uploaded.width,
        height: uploaded.height,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin product image upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload image" },
      { status: 500 }
    );
  }
}
