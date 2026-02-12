"use client";

import { FormEvent, useState } from "react";
import styles from "./FeedbackForm.module.scss";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FeedbackFormProps = {
  onSubmitted?: () => void;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  consent: false
};

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const raw = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  const normalized = raw.startsWith("7") ? raw : `7${raw}`;
  const body = normalized.slice(1, 11);

  let result = "+7";
  if (body.length > 0) result += ` (${body.slice(0, 3)}`;
  if (body.length >= 4) result += `) ${body.slice(3, 6)}`;
  if (body.length >= 7) result += `-${body.slice(6, 8)}`;
  if (body.length >= 9) result += `-${body.slice(8, 10)}`;

  return result;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Введите имя";
  }

  if (values.phone.replace(/\D/g, "").length < 11) {
    errors.phone = "Введите номер полностью";
  }

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Некорректный email";
  }

  if (!values.consent) {
    errors.consent = "Нужно согласие";
  }

  return errors;
}

export function FeedbackForm({ onSubmitted }: FeedbackFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log("Feedback form data:", values);
    setValues(initialValues);
    onSubmitted?.();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label className={styles.field}>
        <input
          type="text"
          value={values.name}
          onChange={(event) => setValues({ ...values, name: event.target.value })}
          placeholder="Имя"
        />
        {errors.name && <span>{errors.name}</span>}
      </label>

      <label className={styles.field}>
        <input
          type="tel"
          value={values.phone}
          onChange={(event) =>
            setValues({
              ...values,
              phone: formatPhone(event.target.value)
            })
          }
          placeholder="Телефон"
        />
        {errors.phone && <span>{errors.phone}</span>}
      </label>

      <label className={styles.field}>
        <input
          type="email"
          value={values.email}
          onChange={(event) => setValues({ ...values, email: event.target.value })}
          placeholder="E-mail"
        />
        {errors.email && <span>{errors.email}</span>}
      </label>

      <label className={styles.checkboxLine}>
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => setValues({ ...values, consent: event.target.checked })}
        />
        <span>Я согласен(-а) на обработку персональных данных</span>
      </label>
      {errors.consent && <p className={styles.checkboxError}>{errors.consent}</p>}

      <button type="submit">Отправить</button>
    </form>
  );
}
