import Image from "next/image";
import Link from "next/link";
import { FeedbackModal } from "@/components/FeedbackModal";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="На главную">
          <Image src="/logo.svg" alt="500 на 700" width={38} height={46} priority />
        </Link>
        <FeedbackModal />
      </div>
    </header>
  );
}
