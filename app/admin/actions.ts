"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials } from "@/lib/auth";
import { categories, type Category } from "@/data/projects";
import { CONTENT_TAG, createItem, deleteItem, slugify, type BlogItem, type PostItem, type VideoItem } from "@/lib/content";
import { endSession, requireAdmin, startSession } from "@/lib/session";

export type ActionResult = { ok: boolean; error?: string; email?: string };

const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
/** Media must be something our upload route produced: a Blob URL or a local /uploads path. */
const media = (v: unknown) => {
  const s = text(v, 1000);
  return /^https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\//.test(s) || /^\/uploads\/[\w./-]+$/.test(s) ? s : "";
};

async function run(fn: () => Promise<unknown>): Promise<ActionResult> {
  await requireAdmin();
  try {
    await fn();
    updateTag(CONTENT_TAG);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Something went wrong." };
  }
}

export async function login(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = text(form.get("email"), 200);
  if (!checkCredentials(email, String(form.get("password") ?? ""))) {
    return { ok: false, error: "Wrong email or password.", email };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function createVideo(input: Record<string, unknown>) {
  return run(async () => {
    const videoUrl = media(input.videoUrl);
    const title = text(input.title, 120);
    if (!title || !videoUrl) throw new Error("Title and video are required.");
    const category = categories.includes(input.category as Category) && input.category !== "All" ? (input.category as Category) : "Reels";
    await createItem<VideoItem>({
      kind: "video",
      title,
      subtitle: text(input.subtitle, 120),
      category,
      description: text(input.description, 1000),
      videoUrl,
      thumbnail: media(input.thumbnail) || undefined,
    });
  });
}

export async function createPost(input: { caption?: string; images?: string[] }) {
  return run(async () => {
    const images = (input.images ?? []).map(media).filter(Boolean).slice(0, 10);
    if (!images.length) throw new Error("Add at least one image.");
    await createItem<PostItem>({ kind: "post", caption: text(input.caption, 2200), images });
  });
}

export async function createBlog(input: Record<string, unknown>) {
  return run(async () => {
    const title = text(input.title, 160);
    const body = text(input.body, 50000);
    if (!title || !body) throw new Error("Title and content are required.");
    await createItem<BlogItem>({
      kind: "blog",
      slug: slugify(title),
      title,
      excerpt: text(input.excerpt, 300) || body
          .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
          .replace(/^\s*(#{1,3}|[-*])\s+/gm, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 180),
      cover: media(input.cover) || undefined,
      body,
    });
  });
}

export async function removeItem(id: string) {
  return run(() => deleteItem(text(id, 64)));
}
