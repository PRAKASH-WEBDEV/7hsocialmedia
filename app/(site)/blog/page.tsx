import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/layout/CtaSection";
import { formatDate } from "@/components/blog/format";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import { getAll, type BlogItem, type PostItem } from "@/lib/content";
import { breadcrumbNode, graph, pageMetadata, webPageJsonLd } from "@/lib/seo";

const seo = {
  title: "Blog & Updates",
  description: "Marketing ideas, behind-the-scenes posts and updates from the 7H Media team.",
  path: "/blog",
};

export const metadata = pageMetadata(seo);

export default async function BlogPage() {
  const items = await getAll();
  const blogs = items.filter((i): i is BlogItem => i.kind === "blog");
  const posts = items.filter((i): i is PostItem => i.kind === "post");

  return (
    <div className="pt-24 sm:pt-28">
      <JsonLd data={graph(webPageJsonLd(seo, "CollectionPage"), breadcrumbNode(seo.path, "Blog"))} />
      <section className="py-16 sm:py-20" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title={<span id="blog-heading">Ideas, Stories &amp; <Gold>Updates.</Gold></span>}
            description={seo.description}
          />

          {blogs.length === 0 && posts.length === 0 && (
            <p className="mt-16 text-center text-white/50">New articles and posts are on the way. Check back soon.</p>
          )}

          {blogs.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60 transition-colors hover:border-gold-500/40"
                >
                  <div className="relative aspect-[16/10] bg-ink-800">
                    <Image
                      src={b.cover || "/img/work-2.webp"}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold-300">{formatDate(b.createdAt)}</p>
                    <h2 className="mt-2 text-lg font-semibold leading-snug text-cream">{b.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{b.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <>
              <h2 className="mt-20 text-2xl font-bold text-cream sm:text-3xl">Latest Posts</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <article key={p.id} className="overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60">
                    <div className={`grid gap-0.5 ${p.images.length > 1 ? "grid-cols-2" : ""}`}>
                      {p.images.slice(0, 4).map((src, i) => (
                        <div key={src} className={`relative aspect-square bg-ink-800 ${p.images.length === 3 && i === 0 ? "col-span-2 aspect-[2/1]" : ""}`}>
                          <Image src={src} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                          {i === 3 && p.images.length > 4 && (
                            <span className="absolute inset-0 grid place-items-center bg-black/60 text-xl font-semibold text-cream">
                              +{p.images.length - 4}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gold-300">{formatDate(p.createdAt)}</p>
                      {p.caption && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/70">{p.caption}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <CtaSection />
    </div>
  );
}
