import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

export const Card = async ({ article }) => {
  return (
    <li className={styles.card}>
      <Link href={`/articles/${article.id}`} className={styles.link}>
        <p className={styles.thumbnail}>
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            height={article.thumbnail.height}
            width={article.thumbnail.width}
            priority
          />
        </p>
        <div>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.category}>{article.category.name}</p>
        </div>
      </Link>
    </li>
  );
};
