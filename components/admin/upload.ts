import { upload } from "@vercel/blob/client";

export type UploadFolder = "videos" | "thumbnails" | "posts" | "blog";

/**
 * Uploads one file and returns its public URL. `blob` mirrors whether the server has a
 * Vercel Blob token: if so the browser uploads directly to Blob, otherwise to /api/upload.
 */
export async function uploadFile(file: File, folder: UploadFolder, blob: boolean, onProgress?: (pct: number) => void) {
  if (blob) {
    const res = await upload(`${folder}/${file.name}`, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
      multipart: file.size > 20 * 1024 * 1024,
      onUploadProgress: (e) => onProgress?.(e.percentage),
    });
    return res.url;
  }

  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  onProgress?.(100);
  return data.url as string;
}
