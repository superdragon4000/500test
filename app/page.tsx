import { NewsSection } from "@/components/NewsSection";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main} id="top">
      <NewsSection />
    </main>
  );
}
