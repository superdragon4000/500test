"use client";

import { useEffect, useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import styles from "./FeedbackModal.module.scss";

type FeedbackModalProps = {
  className?: string;
};

export function FeedbackModal({ className }: FeedbackModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <>
      <button className={`${styles.openButton} ${className ?? ""}`.trim()} type="button" onClick={() => setOpen(true)}>
        Связаться с нами
      </button>

      {open && (
        <div className={styles.overlay} role="presentation" onClick={() => setOpen(false)}>
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h2 id="feedback-title">СВЯЗАТЬСЯ С НАМИ</h2>
              <button type="button" aria-label="Закрыть форму" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>

            <FeedbackForm onSubmitted={() => setOpen(false)} />
          </section>
        </div>
      )}
    </>
  );
}
