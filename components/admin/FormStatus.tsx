import GoldButton from "@/components/ui/GoldButton";
import { ProgressBar } from "./ui";

type Props = { busy: boolean; progress: number; status: string; error: string; done: string; label: string };

export default function FormStatus({ busy, progress, status, error, done, label }: Props) {
  return (
    <div className="space-y-3 sm:col-span-2">
      {busy && (
        <div className="space-y-2">
          <ProgressBar value={progress} />
          <p className="text-xs text-white/50">{status || "Saving…"}</p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <GoldButton type="submit" disabled={busy}>{busy ? "Uploading…" : label}</GoldButton>
        {done && <p role="status" className="text-sm text-gold-300">{done}</p>}
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
