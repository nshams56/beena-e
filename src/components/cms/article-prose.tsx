export function ArticleProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <article className="lux-prose" aria-label="Article body">
      {paragraphs.map((paragraph, i) => {
        const key = `${i}-${paragraph.slice(0, 32)}`;
        if (paragraph.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="mb-5 mt-12 font-serif text-2xl tracking-[-0.02em] text-forest first:mt-0"
            >
              {paragraph.slice(3)}
            </h2>
          );
        }
        return (
          <p key={key} data-paragraph={i}>
            {paragraph}
          </p>
        );
      })}
    </article>
  );
}
