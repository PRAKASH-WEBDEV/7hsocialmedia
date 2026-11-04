import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";
import { connection } from "next/server";
import type { Category, Project } from "@/data/projects";

// Admin-managed content. On Vercel everything lives in Vercel Blob (one JSON file per item,
// written once and never overwritten, plus the uploaded media). Without a Blob token, local
// dev falls back to .content/items.json and public/uploads.

type Base = { id: string; createdAt: string };

export type VideoItem = Base & {
  kind: "video";
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  videoUrl: string;
  thumbnail?: string;
};

export type PostItem = Base & { kind: "post"; caption: string; images: string[] };

export type BlogItem = Base & {
  kind: "blog";
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  /** Plain text: blank-line paragraphs, `## ` headings, `- ` lists and `![alt](url)` images. */
  body: string;
};

export type ContentItem = VideoItem | PostItem | BlogItem;
export type Kind = ContentItem["kind"];
type NewItem<T extends ContentItem> = Omit<T, "id" | "createdAt">;

export const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const LOCAL_FILE = path.join(/*turbopackIgnore: true*/ process.cwd(), ".content", "items.json");
export const LOCAL_UPLOADS = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");

function assertWritable() {
  if (!blobEnabled() && process.env.VERCEL) {
    throw new Error("Storage is not connected. Create a Blob store in the Vercel project (Storage tab) and redeploy.");
  }
}

async function readLocal(): Promise<ContentItem[]> {
  try {
    return JSON.parse(await readFile(LOCAL_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeLocal(items: ContentItem[]) {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(items, null, 2));
}

async function readBlob(): Promise<ContentItem[]> {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "content/", cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const items = await Promise.all(
    blobs.map(async (b) => {
      const res = await fetch(b.url, { cache: "no-store" });
      return res.ok ? ((await res.json()) as ContentItem) : null;
    }),
  );
  return items.filter((i): i is ContentItem => i !== null);
}

/** All items, newest first. Always read per request so new uploads show immediately. */
export async function getAll(): Promise<ContentItem[]> {
  await connection();
  try {
    const items = blobEnabled() ? await readBlob() : await readLocal();
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.error("[content] read failed", err);
    return [];
  }
}

export async function getByKind<K extends Kind>(kind: K) {
  return (await getAll()).filter((i): i is Extract<ContentItem, { kind: K }> => i.kind === kind);
}

/** Uploaded videos in the shape the portfolio grid expects. */
export async function getUploadedProjects(): Promise<Project[]> {
  return (await getByKind("video")).map((v) => ({
    id: v.id,
    title: v.title,
    subtitle: v.subtitle,
    category: v.category,
    thumbnail: v.thumbnail || "/img/work-1.webp",
    videoUrl: v.videoUrl,
    description: v.description,
  }));
}

export async function getBlog(slug: string) {
  return (await getByKind("blog")).find((b) => b.slug === slug);
}

export async function createItem<T extends ContentItem>(data: NewItem<T>) {
  assertWritable();
  const item = { ...data, id: randomUUID(), createdAt: new Date().toISOString() } as T;
  if (blobEnabled()) {
    await put(`content/${item.kind}/${item.id}.json`, JSON.stringify(item), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } else {
    await writeLocal([item, ...(await readLocal())]);
  }
  return item;
}

function mediaOf(item: ContentItem) {
  if (item.kind === "video") return [item.videoUrl, item.thumbnail];
  if (item.kind === "post") return item.images;
  return [item.cover, ...[...item.body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1])];
}

/** Deletes the item and the media that was uploaded for it. */
export async function deleteItem(id: string) {
  assertWritable();
  const item = (await getAll()).find((i) => i.id === id);
  if (!item) return;
  const media = mediaOf(item).filter((u): u is string => Boolean(u));

  if (blobEnabled()) {
    const own = media.filter((u) => u.includes(".blob.vercel-storage.com/"));
    await del([...own, `content/${item.kind}/${item.id}.json`]);
  } else {
    await writeLocal((await readLocal()).filter((i) => i.id !== id));
    await Promise.all(
      media
        .filter((u) => u.startsWith("/uploads/"))
        .map((u) => unlink(path.join(/*turbopackIgnore: true*/ LOCAL_UPLOADS, u.slice("/uploads/".length))).catch(() => {})),
    );
  }
}

export function slugify(text: string) {
  const base = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 60);
  return `${base || "post"}-${randomUUID().slice(0, 6)}`;
}
