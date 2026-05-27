import type { MetadataRoute } from "next";
import { getBlogThumbnail, getVisibleBlogPosts } from "@/app/lib/blogs";
import { siteUrl } from "@/app/lib/site";

const lastModified = new Date("2026-05-21");

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getVisibleBlogPosts();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        new URL("/images/man-leader.webp", siteUrl).toString(),
        new URL("/images/Premise.png", siteUrl).toString(),
        new URL("/images/coherence.jpg", siteUrl).toString(),
      ],
    },
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      images: blogPosts.map((post) =>
        new URL(getBlogThumbnail(post), siteUrl).toString(),
      ),
    },
    ...blogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [new URL(getBlogThumbnail(post), siteUrl).toString()],
    })),
  ];
}
