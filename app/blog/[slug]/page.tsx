import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/app/components/sections/Footer";
import { Navbar } from "@/app/components/sections/Navbar";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogThumbnail,
  getBlogPostUrl,
  getRelatedBlogPosts,
  getVisibleBlogPosts,
  prepareBlogHtml,
  stripHtml,
  type BlogHeading,
  type BlogPostSummary,
} from "@/app/lib/blogs";
import { siteName, siteUrl } from "@/app/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getVisibleBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const thumbnail = getBlogThumbnail(post);
  const description = post.metaDescription ?? stripHtml(post.description.html);
  const url = `/blog/${post.slug}`;

  return {
    title: post.metaTitle ?? post.title,
    description,
    keywords: [
      post.primaryKeyword,
      ...post.secondaryKeywords,
      ...post.tags,
      siteName,
    ],
    authors: [{ name: post.author }],
    category: post.category,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${post.metaTitle ?? post.title} | ${siteName}`,
      description,
      siteName,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      section: post.category,
      tags: [
        ...post.tags,
        post.primaryKeyword,
        ...(post.secondaryKeywords ?? []),
      ].filter(Boolean) as string[],
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: post.thumbnailAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.metaTitle ?? post.title} | ${siteName}`,
      description,
      images: [thumbnail],
    },
  };
}

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-gradient-to-r from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] px-4 py-2 text-xs font-extrabold text-primary shadow-[0_14px_34px_-22px_hsl(var(--peach-deep)/0.75)]">
      {children}
    </span>
  );
}

function SoftPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-white/76 px-4 py-2 text-sm font-medium text-primary/62 backdrop-blur">
      {children}
    </span>
  );
}

function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-[1.1rem] border border-border/85 bg-card/80 p-6 shadow-[0_28px_90px_-68px_rgba(7,29,64,0.6)] backdrop-blur">
      <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-primary/42">
        On this page
      </p>
      <ol className="space-y-4">
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`grid grid-cols-[1.5rem_1fr] gap-3 text-sm leading-snug transition-colors hover:text-[hsl(var(--peach-deep))] ${
                heading.level === "h3" ? "pl-4" : ""
              }`}
            >
              <span className="font-mono text-[11px] text-primary/38">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-primary/62">
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RelatedPostCard({ post }: { post: BlogPostSummary }) {
  const thumbnail = getBlogThumbnail(post);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[1rem] border border-border/80 bg-card/90 shadow-[0_24px_80px_-64px_rgba(7,29,64,0.5)] backdrop-blur">
        <div className="relative h-44 overflow-hidden">
          <img
            src={thumbnail}
            alt={post.thumbnailAlt}
            sizes="(min-width: 1024px) 28vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <CategoryPill>{post.category}</CategoryPill>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-medium text-primary/52">
            {formatBlogDate(post.publishedAt)}
            {post.readTime ? (
              <>
                <span className="px-1 text-primary/25">&middot;</span>
                <span className="font-bold text-[hsl(var(--peach-deep))]">
                  {post.readTime}
                </span>
              </>
            ) : null}
          </p>
          <h3 className="mt-3 text-xl font-extrabold leading-[1.2] text-primary transition-colors group-hover:text-[hsl(var(--peach-deep))]">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);
  const articleHtml = post.des.html;
  const preparedArticle = prepareBlogHtml(articleHtml);
  const thumbnail = getBlogThumbnail(post);
  const canonicalUrl = getBlogPostUrl(post.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription ?? stripHtml(post.description.html),
      image: new URL(thumbnail, siteUrl).toString(),
      url: canonicalUrl,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      articleSection: post.category,
      keywords: [
        ...post.tags,
        post.primaryKeyword,
        ...(post.secondaryKeywords ?? []),
      ]
        .filter(Boolean)
        .join(", "),
      author: {
        "@type": "Organization",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: new URL("/favicon-512x512.png", siteUrl).toString(),
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: new URL("/blog", siteUrl).toString(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <div className="blog-grid-page flex min-h-[100dvh] w-full flex-col text-primary">
      <Navbar />
      <main className="relative flex-1 pb-24 pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative h-full  sm:h-[30rem] overflow-hidden border-b border-border/75">
          <img
            src={thumbnail}
            alt={post.thumbnailAlt}
            
            className="object-cover w-[94%] mx-auto "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[hsl(var(--cream))/0.38] to-[hsl(var(--cream))]" />
        </section>

        <article className="relative mx-auto -mt-3 w-full max-w-[1450px] px-5 sm:px-8">
          <div className="max-w-[76rem]">
            <Link
              href="/blog"
              className="inline-flex text-sm font-bold text-[hsl(var(--peach-deep))] hover:text-primary"
            >
              &larr; All posts
            </Link>

            <nav className="mt-5 flex flex-wrap items-center gap-2 text-sm font-medium text-primary/52">
              <Link href="/" className="hover:text-[hsl(var(--peach-deep))]">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[hsl(var(--peach-deep))]">
                Blog
              </Link>
              <span>/</span>
              <span className="font-bold text-[hsl(var(--peach-deep))]">{post.category}</span>
              <span>/</span>
              <span className="max-w-[18rem] truncate">{post.title}</span>
            </nav>

            <div className="mt-8 flex flex-wrap gap-3">
              <CategoryPill>{post.category}</CategoryPill>
              <SoftPill>{post.status}</SoftPill>
              {post.tags.slice(0, 2).map((tag) => (
                <SoftPill key={tag}>{tag}</SoftPill>
              ))}
            </div>

            {post.titleHtml ? (
              <div
                className="mt-6 max-w-[76rem]"
                dangerouslySetInnerHTML={{ __html: post.titleHtml.html }}
              />
            ) : (
              <h1 className="mt-6 max-w-[76rem] text-[clamp(2.8rem,4.5vw,5.35rem)] font-black leading-[0.98] tracking-normal text-primary">
                {post.title}
              </h1>
            )}

            <div
              className="blog-description mt-8 max-w-[62rem] text-[1.35rem] font-medium leading-[1.55] text-primary/65"
              dangerouslySetInnerHTML={{ __html: post.description.html }}
            />

            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-y border-border py-6">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] text-base font-extrabold text-primary">
                  {post.author.charAt(0)}
                </span>
                <div>
                  <p className="font-extrabold text-primary">{post.author}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/52">
                    {post.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-base font-medium text-primary/52">
                <span>{formatBlogDate(post.publishedAt)}</span>
                {post.readTime ? (
                  <>
                    <span className="h-5 w-px bg-[hsl(var(--peach-deep))]" />
                    <span className="font-extrabold text-[hsl(var(--peach-deep))]">
                      {post.readTime}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20.5rem]">
            <div className="min-w-0">
              {articleHtml.trim() ? (
                <div
                  className="blog-rich-content rounded-[1.15rem]   backdrop-blur "
                  dangerouslySetInnerHTML={{ __html: preparedArticle.html }}
                />
              ) : null}

              <section className="mt-10 border-t border-border pt-8">
                <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.28em] text-primary/42">
                  Tagged
                </p>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[hsl(var(--peach-deep))]/25 bg-white/70 px-4 py-2 text-sm font-semibold text-[hsl(var(--peach-deep))]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-10 flex gap-5 rounded-[1.15rem] border border-border/80 bg-card/90 p-6 shadow-[0_28px_90px_-72px_rgba(7,29,64,0.5)] backdrop-blur sm:p-8">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[hsl(var(--peach))] to-[hsl(var(--peach-deep))] text-xl font-extrabold text-primary">
                  {post.author.charAt(0)}
                </span>
                <div>
                  <h2 className="text-xl font-black text-primary">
                    {post.author}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-[hsl(var(--peach-deep))]">
                    {post.authorRole} &middot; Maharishi Center for Leadership
                  </p>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-[1.7] text-primary/65">
                    Expert in {post.category.toLowerCase()} and executive
                    development, helping leaders build clarity, coherence, and
                    resilient performance through evidence-based inner training.
                  </p>
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-20 max-h-[calc(100dvh-8rem)] space-y-6">
                <TableOfContents headings={preparedArticle.headings} />

                {/* <div className="rounded-[1.1rem] border border-border/85 bg-card/80 p-6 shadow-[0_28px_90px_-68px_rgba(7,29,64,0.6)] backdrop-blur">
                  <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-primary/42">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[hsl(var(--peach-deep))]/25 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--peach-deep))]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 ? (
            <section className="mt-20 border-t border-border pt-10">
              <div className="mb-8 flex items-center gap-5">
                <h2 className="shrink-0 text-2xl font-black text-primary">
                  Related Articles
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </div>
  );
}
