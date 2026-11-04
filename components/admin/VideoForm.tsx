"use client";

import type { FormEvent } from "react";
import { categories } from "@/data/projects";
import { createVideo } from "@/app/admin/actions";
import FormStatus from "./FormStatus";
import { Field, field, fileField } from "./ui";
import { uploadFile } from "./upload";
import { useSubmit } from "./useSubmit";

export default function VideoForm({ blob }: { blob: boolean }) {
  const s = useSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const video = d.get("video") as File;
    const thumb = d.get("thumbnail") as File;

    const ok = await s.submit(async (step) => {
      step("Uploading video…");
      const videoUrl = await uploadFile(video, "videos", blob, (p) => s.setProgress(p * 0.9));
      let thumbnail = "";
      if (thumb?.size) {
        step("Uploading thumbnail…");
        thumbnail = await uploadFile(thumb, "thumbnails", blob);
      }
      s.setProgress(95);
      step("Saving…");
      return createVideo({ ...Object.fromEntries(d), video: undefined, videoUrl, thumbnail });
    }, "Video published. It now shows on Our Work.");
    if (ok) form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Title">
        <input name="title" required maxLength={120} placeholder="Brand Campaign" className={field} />
      </Field>
      <Field label="Client / subtitle" hint="(optional)">
        <input name="subtitle" maxLength={120} placeholder="Education Sector" className={field} />
      </Field>
      <Field label="Category">
        <select name="category" defaultValue="Reels" className={field}>
          {categories.filter((c) => c !== "All").map((c) => (
            <option key={c} value={c} className="bg-ink-900">{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Description" hint="(optional)">
        <input name="description" maxLength={1000} placeholder="One line about the project" className={field} />
      </Field>
      <Field label="Video file" hint="(MP4, WebM or MOV)">
        <input name="video" type="file" required accept="video/mp4,video/webm,video/quicktime" className={fileField} />
      </Field>
      <Field label="Thumbnail image" hint="(optional, recommended)">
        <input name="thumbnail" type="file" accept="image/*" className={fileField} />
      </Field>
      <FormStatus {...s} label="Publish Video" />
    </form>
  );
}
