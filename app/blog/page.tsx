import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/sections/Footer";
import { Navbar } from "@/app/components/sections/Navbar";
import {
  formatBlogDate,
  getBlogCategories,
  getBlogPostSummaries,
  getBlogThumbnail,
  type BlogPostSummary,
} from "@/app/lib/blogs";
import { siteName, siteOgImage, siteUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights from Maharishi Center for Leadership on brain-based leadership, resilience, creativity, and executive performance.",
  keywords: [
    "Maharishi Center for Leadership blog",
    "Transcendental Meditation",
    "executive leadership",
    "brain coherence",
    "leadership resilience",
    "sustainable peak performance",
    "stress reduction for leaders",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog | ${siteName}`,
    description:
      "Read practical insights on Transcendental Meditation, leadership performance, resilience, and brain coherence.",
    siteName,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
        alt: "Maharishi Center for Leadership blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteName}`,
    description:
      "Insights on brain-based leadership, resilience, creativity, and executive performance.",
    images: [siteOgImage],
  },
};

function getActiveCategory(category?: string | string[]) {
  return Array.isArray(category) ? category[0] : category;
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="rounded-full bg-gradient-to-r from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] px-3.5 py-2 text-xs font-extrabold text-primary shadow-[0_14px_34px_-22px_hsl(var(--peach-deep)/0.75)]">
      {category}
    </span>
  );
}

function BlogCard({
  post,
  isNewest,
}: {
  post: BlogPostSummary;
  isNewest: boolean;
}) {
  const thumbnail = getBlogThumbnail(post);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex min-h-[37.25rem] flex-col overflow-hidden rounded-[1.25rem] border border-border/80 bg-card/90 shadow-[0_28px_90px_-62px_rgba(7,29,64,0.55)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-[hsl(var(--peach-deep))]/45 hover:shadow-[0_32px_90px_-56px_hsl(var(--peach-deep)/0.36)]">
        <div className="relative h-[15rem] overflow-hidden">
          <Image
            src={thumbnail}
            alt={post.thumbnailAlt}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
            <CategoryPill category={post.category} />
            {isNewest || post.status === "Featured" ? (
              <span className="rounded-full border border-[hsl(var(--peach-deep))]/25 bg-white/86 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[hsl(var(--peach-deep))] backdrop-blur">
                {post.status === "Featured" ? "Featured" : "New"}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-primary/52">
            <span>{formatBlogDate(post.publishedAt)}</span>
            {post.readTime ? (
              <>
                <span className="text-primary/25">&middot;</span>
                <span className="font-bold text-[hsl(var(--peach-deep))]">
                  {post.readTime}
                </span>
              </>
            ) : null}
          </div>

          <h2 className="text-[1.35rem] font-extrabold leading-[1.2] text-primary transition-colors group-hover:text-[hsl(var(--peach-deep))]">
            {post.title}
          </h2>

          <p className="mt-4 line-clamp-3 text-[1.02rem] font-medium leading-[1.68] text-primary/65">
            {post.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-primary/55"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] text-sm font-extrabold text-primary">
                {post.author.charAt(0)}
              </span>
              <span className="truncate text-sm font-semibold text-primary/62">
                {post.author}
              </span>
            </div>
            <span className="shrink-0 text-sm font-extrabold text-[hsl(var(--peach-deep))]">
              Read -&gt;
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const activeCategory = getActiveCategory(category);
  const categories = getBlogCategories();
  const posts = getBlogPostSummaries();
  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteName} Blog`,
    url: new URL("/blog", siteUrl).toString(),
    description:
      "Insights on Transcendental Meditation, brain-based leadership, resilience, and sustainable peak performance.",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      image: new URL(getBlogThumbnail(post), siteUrl).toString(),
      datePublished: post.publishedAt,
      author: {
        "@type": "Organization",
        name: post.author,
      },
    })),
  };

  return (
    <div className="blog-grid-page flex min-h-[100dvh] w-full flex-col text-primary">
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1450px] flex-1 px-5 pb-20 pt-28 sm:px-8 md:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />

        <div className="mb-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
              !activeCategory
                ? "border-[hsl(var(--peach-deep))] bg-gradient-to-r from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] text-primary"
                : "border-border bg-white/80 text-primary/55 hover:border-[hsl(var(--peach-deep))]/45 hover:text-primary"
            }`}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`/blog?category=${encodeURIComponent(item)}`}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                activeCategory === item
                  ? "border-[hsl(var(--peach-deep))] bg-gradient-to-r from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] text-primary"
                  : "border-border bg-white/80 text-primary/55 hover:border-[hsl(var(--peach-deep))]/45 hover:text-primary"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-[1.25rem] border border-border bg-card/90 p-10 text-center shadow-[0_28px_90px_-62px_rgba(7,29,64,0.55)]">
            <h1 className="text-3xl font-extrabold text-primary">
              No posts found
            </h1>
            <p className="mt-3 text-primary/62">
              Choose another topic or return to all articles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} isNewest={index === 0} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
