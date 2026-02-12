import Image from "next/image";
import styles from "./Footer.module.scss";

type FooterProps = {
  text: string;
  logoAlt: string;
};

export function Footer({ text, logoAlt }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Image src="/logo.svg" alt={logoAlt} width={70} height={84} className={styles.footerLogo} />
        <p className={styles.footerText}>{text}</p>
      </div>
    </footer>
  );
}
