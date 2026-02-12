import fs from "node:fs/promises";
import path from "node:path";
import type { NewsItem } from "@/lib/news-types";

type NewsPayload = {
  news: NewsItem[];
};

export async function getAllNews(): Promise<NewsItem[]> {
  const filePath = path.join(process.cwd(), "public", "data", "news.json");
  const file = await fs.readFile(filePath, "utf-8");
  const payload = JSON.parse(file) as NewsPayload;

  return payload.news.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const news = await getAllNews();
  return news.find((item) => item.slug === slug);
}
