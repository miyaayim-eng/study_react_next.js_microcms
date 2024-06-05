import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { LIMIT } from "@/constants";
import { Cards } from "@/components/Cards";
import { getArticlesList } from "@/libs/microcms";

export default async function Home() {
  // ブログ一覧を取得
  const queries = { limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );
  const { contents: articles } = articlesListResponse;
  return (
    <main className={styles.main}>
      <h1>記事一覧</h1>
      <ul className={styles.cards}>
        <Cards articles={articles} />
      </ul>
    </main>
  );
}
