## Тестовое задание (Next.js)

Реализовано:
- фиксированная шапка;
- блок новостей с асинхронной загрузкой из локального JSON (`fetch + useEffect + setTimeout`);
- детальные страницы новостей;
- форма обратной связи с базовой валидацией и маской телефона;
- SSG/ISR для детальных страниц новостей (`generateStaticParams`, `revalidate = 60`).

## Запуск

```bash
npm install
npm run dev
```

## Проверка

```bash
npm run lint
npm run build
```
