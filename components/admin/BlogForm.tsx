"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus } from "lucide-react";
import { createBlog } from "@/app/admin/actions";
import FormStatus from "./FormStatus";
import { Field, field, fileField } from "./ui";
import { uploadFile } from "./upload";
import { useSubmit } from "./useSubmit";

export default function BlogForm({ blob }: { blob: boolean }) {
  const s = useSubmit();
  const body = useRef<HTMLTextAreaElement>(null);
  const [inserting, setInserting] = useState(false);
  const [insertError, setInsertError] = useState("");

  /** Uploads an image and drops a `![alt](url)` line at the cursor. */
  const insertImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    const el = body.current;
    if (!file || !el) return;
    setInserting(true);
    setInsertError("");
    try {
      const url = await uploadFile(file, "blog", blob);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[[\]]/g, "");
      const at = el.selectionStart ?? el.value.length;
      const snippet = `\n\n![${alt}](${url})\n\n`;
      el.value = el.value.slice(0, at) + snippet + el.value.slice(at);
      el.focus();
      el.selectionStart = el.selectionEnd = at + snippet.length;
    } catch (err) {
      setInsertError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setInserting(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const coverFile = d.get("coverFile") as File;

    const ok = await s.submit(async (step) => {
      let cover = "";
      if (coverFile?.size) {
        step("Uploading cover image…");
        cover = await uploadFile(coverFile, "blog", blob, (p) => s.setProgress(p * 0.9));
      }
      step("Saving…");
      return createBlog({ title: d.get("title"), excerpt: d.get("excerpt"), body: d.get("body"), cover });
    }, "Blog published.");
    if (ok) form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Title" className="sm:col-span-2">
        <input name="title" required maxLength={160} placeholder="5 reels ideas that sell" className={field} />
      </Field>
      <Field label="Short summary" hint="(optional, shown on the blog list)">
        <input name="excerpt" maxLength={300} className={field} />
      </Field>
      <Field label="Cover image" hint="(optional)">
        <input name="coverFile" type="file" accept="image/*" className={fileField} />
      </Field>
      <div className="sm:col-span-2">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label htmlFor="blog-body" className="text-sm text-white/70">Content</label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gold-500/40 px-4 py-2 text-xs font-semibold text-gold-200 transition-colors hover:bg-gold-500/10">
            <ImagePlus aria-hidden className="size-4" />
            {inserting ? "Uploading image…" : "Insert image"}
            <input type="file" accept="image/*" className="sr-only" onChange={insertImage} disabled={inserting} />
          </label>
        </div>
        <textarea
          id="blog-body"
          ref={body}
          name="body"
          required
          rows={14}
          placeholder={"Write your post here.\n\nLeave an empty line between paragraphs.\n## A heading\n- A list item"}
          className={`${field} resize-y font-mono text-[13px] leading-relaxed`}
        />
        <p className="mt-2 text-xs text-white/40">
          Empty line = new paragraph · <code>## </code> heading · <code>- </code> list item · images go in where the cursor is.
        </p>
        {insertError && <p role="alert" className="mt-2 text-sm text-red-400">{insertError}</p>}
      </div>
      <FormStatus {...s} label="Publish Blog" />
    </form>
  );
}
