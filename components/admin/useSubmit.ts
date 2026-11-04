"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ActionResult } from "@/app/admin/actions";

/** Runs an upload-then-save submit, tracking progress and errors, and refreshes the list after. */
export function useSubmit() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function submit(work: (step: (label: string) => void) => Promise<ActionResult>, success: string) {
    setBusy(true);
    setError("");
    setDone("");
    setProgress(0);
    try {
      const res = await work(setStatus);
      if (!res.ok) throw new Error(res.error);
      setDone(success);
      router.refresh();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      return false;
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  return { busy, progress, setProgress, status, error, done, submit };
}
