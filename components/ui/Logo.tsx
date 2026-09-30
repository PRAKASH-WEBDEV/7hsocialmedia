import Image from "next/image";
import Link from "next/link";

type Props = { size?: number; showText?: boolean; priority?: boolean };

export default function Logo({ size = 44, showText = true, priority = false }: Props) {
  return (
    <Link href="/" aria-label="7H Media — home" className="flex items-center gap-2.5 sm:gap-3">
      <Image
        src="/img/logo-mark.webp"
        alt="7H Media logo"
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        className="rounded-full shadow-[0_0_24px_-6px_rgba(217,154,58,0.6)]"
      />
      {showText && (
        <span className="min-w-0 leading-none">
          <span className="block text-base font-bold sm:text-lg tracking-wide text-gold-200">7H MEDIA</span>
          <span className="mt-1 hidden text-[10px] tracking-wide min-[400px]:block text-gold-400/90">
            Your Face = Your Business
          </span>
        </span>
      )}
    </Link>
  );
}
