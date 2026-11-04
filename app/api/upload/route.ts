import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { LOCAL_UPLOADS, blobEnabled } from "@/lib/content";
import { isAdmin } from "@/lib/session";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "video/mp4", "video/webm", "video/quicktime"];
const MAX_BYTES = 500 * 1024 * 1024;

/**
 * Admin media uploads. With Vercel Blob the browser uploads straight to Blob (no 4.5 MB
 * function body limit) and this route only issues the upload token; in local dev without a
 * Blob token the file is posted here and saved under public/uploads.
 */
export async function POST(request: Request) {
  if (request.headers.get("content-type")?.includes("multipart/form-data")) {
    if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (blobEnabled()) return NextResponse.json({ error: "Use Blob client uploads." }, { status: 400 });
    if (process.env.VERCEL) {
      return NextResponse.json({ error: "Storage is not connected. Add a Vercel Blob store." }, { status: 500 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
    }
    const folder = String(form.get("folder") || "misc").replace(/[^a-z]/g, "") || "misc";
    const name = `${randomUUID().slice(0, 8)}-${file.name.replace(/[^\w.-]+/g, "-")}`;
    await mkdir(path.join(/*turbopackIgnore: true*/ LOCAL_UPLOADS, folder), { recursive: true });
    await writeFile(path.join(/*turbopackIgnore: true*/ LOCAL_UPLOADS, folder, name), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: `/uploads/${folder}/${name}` });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    if (body.type === "blob.generate-client-token" && !(await isAdmin())) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) throw new Error("Not signed in.");
        return { allowedContentTypes: ALLOWED, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed." }, { status: 400 });
  }
}
