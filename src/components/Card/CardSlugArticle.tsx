import { NextPage } from "next";
import styles from "./CardSlugArticle.module.scss";

export type Props = {
  body: string;
};

export const CardSlugArticle: NextPage<Props> = ({ body }: Props) => {
  return (
    <div className="bg-background1 rounded-md px-4 py-4">
      <div
        className={styles.article}
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
    </div>
  );
};
