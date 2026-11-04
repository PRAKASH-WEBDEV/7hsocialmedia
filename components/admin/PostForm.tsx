"use client";

import type { FormEvent } from "react";
import { createPost } from "@/app/admin/actions";
import FormStatus from "./FormStatus";
import { Field, field, fileField } from "./ui";
import { uploadFile } from "./upload";
import { useSubmit } from "./useSubmit";

export default function PostForm({ blob }: { blob: boolean }) {
  const s = useSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const files = (d.getAll("images") as File[]).filter((f) => f.size).slice(0, 10);

    const ok = await s.submit(async (step) => {
      const images: string[] = [];
      for (const [i, file] of files.entries()) {
        step(`Uploading image ${i + 1} of ${files.length}…`);
        images.push(await uploadFile(file, "posts", blob, (p) => s.setProgress(((i + p / 100) / files.length) * 95)));
      }
      step("Saving…");
      return createPost({ caption: String(d.get("caption") ?? ""), images });
    }, "Post published. It now shows on the Blog page.");
    if (ok) form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Images" hint="(up to 10)" className="sm:col-span-2">
        <input name="images" type="file" required multiple accept="image/*" className={fileField} />
      </Field>
      <Field label="Caption" className="sm:col-span-2">
        <textarea name="caption" rows={4} maxLength={2200} placeholder="What's this post about?" className={`${field} resize-y`} />
      </Field>
      <FormStatus {...s} label="Publish Post" />
    </form>
  );
}
