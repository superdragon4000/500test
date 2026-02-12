import { Footer } from "@/components/Footer";
import { NewsSection } from "@/components/NewsSection";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main} id="top">
      <NewsSection />
      <Footer text="КРЕАТИВНОЕ АГЕНТСТВО 500NA700" logoAlt="500 на 700" />
    </main>
  );
}
