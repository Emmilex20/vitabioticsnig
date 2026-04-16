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

    const originalFileName = file.name || "resource";
    const dotIndex = originalFileName.lastIndexOf(".");
    const originalExtension =
      dotIndex > -1 ? originalFileName.slice(dotIndex + 1).toLowerCase() : "";
    const baseFileName =
      dotIndex > -1 ? originalFileName.slice(0, dotIndex) : originalFileName;

    const uploaded = await new Promise<{
      secure_url: string;
      resource_type: string;
      original_filename?: string;
      bytes?: number;
      format?: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vitabiotics-portal/resources",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
          filename_override: baseFileName,
          format: originalExtension || undefined,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
            return;
          }

          resolve(result as {
            secure_url: string;
            resource_type: string;
            original_filename?: string;
            bytes?: number;
            format?: string;
          });
        }
      );

      stream.end(buffer);
    });

    const resolvedExtension = uploaded.format || originalExtension;
    const fileTypeLabel = resolvedExtension
      ? resolvedExtension.toUpperCase()
      : file.type || "FILE";

    return NextResponse.json(
      {
        success: true,
        fileUrl: uploaded.secure_url,
        fileType: fileTypeLabel,
        name:
          resolvedExtension && !originalFileName.endsWith(`.${resolvedExtension}`)
            ? `${baseFileName}.${resolvedExtension}`
            : originalFileName,
        size: file.size,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload file" },
      { status: 500 }
    );
  }
}
