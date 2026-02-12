export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  contentTitle?: string;
  content: string[];
};
