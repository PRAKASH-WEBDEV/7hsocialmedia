import { Fragment } from "react";
import Image from "next/image";

const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

/** Renders the admin's plain-text format. React escapes everything, so no HTML gets through. */
export default function BlogBody({ body }: { body: string }) {
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-6 text-[17px] leading-[1.8] text-white/75">
      {blocks.map((block, i) => {
        const img = block.match(IMAGE);
        if (img) {
          return (
            <figure key={i} className="overflow-hidden rounded-2xl border border-white/8">
              <Image src={img[2]} alt={img[1]} width={1200} height={800} sizes="(min-width: 800px) 760px, 100vw" className="h-auto w-full" />
            </figure>
          );
        }
        // A heading is one line; anything typed under it is its own paragraph or list.
        const [first, ...rest] = block.split("\n");
        const heading = first.match(/^(#{2,3}) (.+)/);
        if (heading) {
          const H = heading[1].length === 2 ? "h2" : "h3";
          return (
            <Fragment key={i}>
              <H className={H === "h2" ? "pt-4 text-2xl font-bold text-cream" : "pt-2 text-xl font-semibold text-cream"}>{heading[2]}</H>
              {rest.length > 0 && <Text lines={rest} />}
            </Fragment>
          );
        }
        return <Text key={i} lines={[first, ...rest]} />;
      })}
    </div>
  );
}

function Text({ lines }: { lines: string[] }) {
  if (lines.every((l) => /^[-*] /.test(l))) {
    return (
      <ul className="list-disc space-y-2 pl-6 marker:text-gold-400">
        {lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}
      </ul>
    );
  }
  return (
    <p>
      {lines.map((l, j) => (
        <Fragment key={j}>
          {j > 0 && <br />}
          {l}
        </Fragment>
      ))}
    </p>
  );
}
