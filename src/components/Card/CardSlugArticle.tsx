import { NextPage } from "next";
import styles from "./CardSlugArticle.module.scss";

export type Props = {
  body: string;
};

export const CardSlugArticle: NextPage<Props> = ({ body }: Props) => {
  return (
    <div>
      <div
        className={styles.article}
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
    </div>
  );
};
