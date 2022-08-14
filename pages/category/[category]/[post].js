import Head from "next/head";
import mongo_connect from "../../../server/server";
import tbl_confessions from "../../../server/tbl_confessions";
import styles from "../../../styles/global.module.css";
import Header from "../../header";
import {
  format_date,
  categories,
  badge,
  share_facebook,
  share_telegram,
  share_twitter,
  copy_link,
} from "../../../utils";
import Link from "next/link";

function post({ data }) {
  return (
    <div className={styles.content}>
      <Head>
        <title>Confession v1.0</title>
        <meta name="author" content="Noel Mallari" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Confession v1.0" />
        <meta name="description" content={`${data.confess}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://cn-confession.vercel.app/category/${data.category}/${data._id}`}
        />
        <meta property="og:title" content="Confession v1.0" />
        <meta
          property="og:description"
          content="Confession v1.0 - acts as an area that is your personal, anonymous, everyday diary. A place that is fully dedicated to your secret confessions."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/nc4ZWYk/Thumbnail.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://cn-confession.vercel.app/category/${data.category}/${data._id}`}
        />
        <meta property="twitter:title" content="Confession v1.0" />
        <meta
          property="twitter:description"
          content="Confession v1.0 - acts as an area that is your personal, anonymous, everyday diary. A place that is fully dedicated to your secret confessions."
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/nc4ZWYk/Thumbnail.png"
        />
      </Head>
      <Header />
      <div className={styles.contentMain}>
        <div className={`${styles.container} ${styles.flex} ${styles.maxWxl}`}>
          <div className={styles.contentLeft}>
            <header>
              <h1>
                {data.gender} • {data.age} Years Old
              </h1>
              <div className={styles.cardDetails}>
                <p>Date : {format_date(data.created)}</p>
                <Link href={`/category/${data.category}`}>
                  <a className={`badge ${badge(data.category)}`}>
                    {categories(data.category)}
                  </a>
                </Link>
              </div>
            </header>
            <div className={styles.contentDescription}>{data.confess}</div>
            <div className={styles.postFooter}>
              <a
                href={`${share_facebook(data.category, data._id)}`}
                className={styles.facebook}
              >
                <i className="fab fa-facebook"></i>{" "}
                <small>Share on facebook</small>
              </a>
              <a
                href={`${share_twitter(data.category, data._id)}`}
                className={styles.twitter}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href={`${share_telegram(data.category, data._id)}`}
                className={styles.telegram}
              >
                <i className="fab fa-telegram"></i>
              </a>
              <a
                href="#"
                onClick={() => {
                  copy_link(data.category, data._id);
                }}
                className={styles.copy}
              >
                <i className="fa fa-copy"></i>
              </a>
            </div>
          </div>
          <div className={styles.contentRight}>
            <header>
              <h1>Categories</h1>
            </header>
            <ul>
              <li>
                <Link href="/category/lie">
                  <a className="badge-lie">• Lie</a>
                </Link>
              </li>
              <li>
                <Link href="/category/guilt">
                  <a className="badge-guilt">• Guilt</a>
                </Link>
              </li>
              <li>
                <Link href="/category/pain">
                  <a className="badge-pain">• Pain</a>
                </Link>
              </li>
              <li>
                <Link href="/category/truth">
                  <a className="badge-truth">• Truth</a>
                </Link>
              </li>
              <li>
                <Link href="/category/dream">
                  <a className="badge-dream">• Dream</a>
                </Link>
              </li>
              <li>
                <Link href="/category/fantacy">
                  <a className="badge-fantacy">• Fantacy</a>
                </Link>
              </li>
              <li>
                <Link href="/category/random-feeling">
                  <a className="badge-rand-feeling">• Random Feeling</a>
                </Link>
              </li>
              <li>
                <Link href="/category/first-experience">
                  <a className="badge-first-exp">• First Experience</a>
                </Link>
              </li>
              <li>
                <Link href="/category/wild-experience">
                  <a className="badge-wild-exp">• Wild Experience</a>
                </Link>
              </li>
              <li>
                <Link href="/category/others">
                  <a className="badge-others">• Others</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.contentFooter}>
        <p>Created By : Code Nam</p>
        <div className={styles.contentFooterRight}>
          <Link
            href="https://facebook.com/codename"
            className={styles.facebookLink}
          >
            <i className="fab fa-facebook"></i>
          </Link>
          <span>
            Version : <b>1.0</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default post;

export const getServerSideProps = async ({ params }) => {
  try {
    const category = params.category;
    const post_id = params.post;

    const database = await mongo_connect();

    if (!database) {
      const data = await tbl_confessions.findOne({
        _id: post_id,
        category: category,
      });
      if (data) {
        return {
          props: {
            data: JSON.parse(JSON.stringify(data)),
          },
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
