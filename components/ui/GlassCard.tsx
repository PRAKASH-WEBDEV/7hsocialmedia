import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { gold?: boolean };

export default function GlassCard({ gold, className = "", children, ...rest }: Props) {
  return (
    <div className={`glass rounded-2xl ${gold ? "glass-gold" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}
