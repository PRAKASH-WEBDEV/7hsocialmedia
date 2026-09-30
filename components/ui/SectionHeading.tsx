import type { ReactNode } from "react";

export const Gold = ({ children }: { children: ReactNode }) => (
  <span className="text-gold-gradient">{children}</span>
);

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400">
      <span aria-hidden className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(232,173,85,0.9)]" />
      {children}
    </p>
  );
}

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 ${className}`}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Tag className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl">
          {title}
        </Tag>
      </div>
      {(description || action) && (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:max-w-xl lg:justify-end">
          {description && (
            <p className="max-w-md text-[15px] leading-relaxed text-white/55">{description}</p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
