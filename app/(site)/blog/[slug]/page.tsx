import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BlogBody from "@/components/blog/BlogBody";
import { formatDate } from "@/components/blog/format";
import CtaSection from "@/components/layout/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { getBlog } from "@/lib/content";
import { breadcrumbNode, graph, pageMetadata, webPageJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog((await params).slug);
  if (!blog) return { title: "Not found" };
  const meta = pageMetadata({ title: blog.title, description: blog.excerpt, path: `/blog/${blog.slug}` });
  if (blog.cover) {
    meta.openGraph = { ...meta.openGraph, type: "article", images: [blog.cover] };
    meta.twitter = { ...meta.twitter, images: [blog.cover] };
  }
  return meta;
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlog((await params).slug);
  if (!blog) notFound();
  const path = `/blog/${blog.slug}`;

  return (
    <div className="pt-24 sm:pt-28">
      <JsonLd
        data={graph(webPageJsonLd({ path, title: blog.title, description: blog.excerpt }), breadcrumbNode(path, blog.title))}
      />
      <article className="mx-auto max-w-[800px] px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-gold-300">
          <ArrowLeft aria-hidden className="size-4" />
          All posts
        </Link>
        <p className="mt-8 text-sm text-gold-300">{formatDate(blog.createdAt)}</p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-cream sm:text-5xl">{blog.title}</h1>
        {blog.excerpt && <p className="mt-5 text-lg leading-relaxed text-white/60">{blog.excerpt}</p>}
        {blog.cover && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/8">
            <Image src={blog.cover} alt="" fill priority sizes="(min-width: 800px) 760px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="mt-10">
          <BlogBody body={blog.body} />
        </div>
      </article>
      <CtaSection />
    </div>
  );
}
