import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { toRuDate } from "@/lib/date";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import { Footer } from "@/components/Footer";
import styles from "./page.module.scss";

type NewsPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    return {
      title: "Новость не найдена"
    };
  }

  return {
    title: article.title,
    description: article.excerpt
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.article}>
        <Image src={article.image} alt={article.title} width={800} height={520} className={styles.cover} />

        <div className={styles.content}>
          <h1>{article.title}</h1>
          <time dateTime={article.date}>{toRuDate(article.date)}</time>
          {article.contentTitle && <h2>{article.contentTitle}</h2>}
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <Footer text="КРЕАТИВНОЕ АГЕНТСТВО 500NA700" logoAlt="500 на 700" />
    </main>
  );
}
