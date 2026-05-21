import { blogPosts, type BlogPost } from "@/data/blogs";
import { siteUrl } from "@/app/lib/site";

export const fallbackBlogThumbnail = "/images/man-leader.webp";

export type BlogPostSummary = BlogPost & {
  excerpt: string;
};

export type BlogHeading = {
  id: string;
  text: string;
  level: "h2" | "h3";
};

const visibleStatuses = new Set<BlogPost["status"]>(["Published", "Featured"]);

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function prepareBlogHtml(html: string) {
  const headings: BlogHeading[] = [];
  const usedIds = new Map<string, number>();

  const preparedHtml = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: "2" | "3", attributes: string, innerHtml: string) => {
      const text = stripHtml(innerHtml);
      const baseId = slugifyHeading(text) || `section-${headings.length + 1}`;
      const currentCount = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, currentCount + 1);

      const generatedId =
        currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
      const headingLevel = `h${level}` as BlogHeading["level"];
      const existingId = attributes.match(/\sid\s*=\s*["']([^"']+)["']/i)?.[1];
      const id = existingId ?? generatedId;

      headings.push({
        id,
        text,
        level: headingLevel,
      });

      return existingId
        ? `<${headingLevel}${attributes}>${innerHtml}</${headingLevel}>`
        : `<${headingLevel}${attributes} id="${id}">${innerHtml}</${headingLevel}>`;
    },
  );

  return {
    html: preparedHtml,
    headings,
  };
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function getBlogPostUrl(slug: string) {
  return new URL(`/blog/${slug}`, siteUrl).toString();
}

export function getBlogThumbnail(post: Pick<BlogPost, "thumbnail">) {
  return post.thumbnail || fallbackBlogThumbnail;
}

export function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    ...post,
    excerpt: stripHtml(post.description.html),
  };
}

export function getVisibleBlogPosts() {
  return blogPosts
    .filter((post) => visibleStatuses.has(post.status))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPostSummaries() {
  return getVisibleBlogPosts().map(toBlogPostSummary);
}

export function getBlogCategories() {
  return Array.from(new Set(getVisibleBlogPosts().map((post) => post.category)));
}

export function getBlogPostBySlug(slug: string) {
  return getVisibleBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  return getVisibleBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit)
    .map(toBlogPostSummary);
}
