"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toRuDate } from "@/lib/date";
import type { NewsItem } from "@/lib/news-types";
import styles from "./NewsSection.module.scss";

type NewsPayload = {
  news: NewsItem[];
};

const API_DELAY_MS = 700;

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadNews = async () => {
      try {
        const response = await fetch("/data/news.json");

        if (!response.ok) {
          throw new Error("Не удалось загрузить новости");
        }

        const data = (await response.json()) as NewsPayload;

        setTimeout(() => {
          if (cancelled) {
            return;
          }

          const sorted = data.news.sort(
            (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
          );

          setNews(sorted);
          setLoading(false);
        }, API_DELAY_MS);
      } catch {
        if (!cancelled) {
          setError("Ошибка загрузки новостей. Попробуйте обновить страницу.");
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="news" className={styles.section}>
      <div className={styles.inner}>
        <h1>НОВОСТИ</h1>

        {loading && <p className={styles.info}>Загрузка новостей...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <div className={styles.grid}>
            {news.map((item) => (
              <article key={item.id} className={styles.card}>
                <Link href={`/news/${item.slug}`} className={styles.coverLink}>
                  <Image src={item.image} alt={item.title} width={800} height={520} />
                </Link>

                <h2>
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h2>

                <p>{item.excerpt}</p>
                <time dateTime={item.date}>{toRuDate(item.date)}</time>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
