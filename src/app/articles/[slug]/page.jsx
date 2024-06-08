import Image from "next/image";
import parse from "html-react-parser";
import styles from "./page.module.scss";
import { getArticlesList, getArticlesDetail } from "@/libs/microcms";

export async function generateStaticParams() {
  // ブログ一覧をAPI経由で取得します
  // 取得件数には最大値である`100`を設定（初期値：10）
  const queries = { limit: 100 };
  const articlesListResponse = await getArticlesList(queries);

  // `articlesListResponse`の`contents`を`articles`に代入しています。
  const { contents: articles } = articlesListResponse;
  // 各ブログポストのIDを用いて、必要なパラメータオブジェクトを作成
  // 'articleId'キーに対応する値として'article.id'を設定
  // これにより、各生成されるページに対して、どのブログポストのデータを
  // 取得して表示するかを指定するための情報を提供します
  const paths = articles.map((article) => {
    return {
      slug: article.id,
    };
  });
  return [...paths];
}

export async function generateMetadata({ searchParams }) {
  // 下書きのプレビューページではインデックス無効
  if (searchParams.dk) {
    metadata.robots = {
      index: false,
    };
    return metadata;
  }
  return;
}

export default async function Page({ params, searchParams }) {
  // URLパラメータのIDを参照して、ブログの詳細を取得
  const queries = { draftKey: searchParams.dk };
  const article = await getArticlesDetail(params.slug, queries);
  return (
    <main className={styles.main}>
      <div className={styles.article}>
        <p className={styles.thumbnail}>
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            height={article.thumbnail.height}
            width={article.thumbnail.width}
            priority
          />
        </p>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.category}>{article.category.name}</p>
        <div className={styles.body}>{parse(article.body)}</div>
      </div>
    </main>
  );
}
