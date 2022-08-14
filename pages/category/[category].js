import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../../styles/global.module.css";
import mongo_connect from "../../server/server";
import tbl_confessions from "../../server/tbl_confessions";
import Header from "../header";
import Link from "next/link";
import Masonry from "masonry-layout-nextjs";
import {
  format_date,
  badge,
  categories,
  share_telegram,
  share_facebook,
  share_twitter,
  copy_link,
  bottomScroll,
  maxContent,
} from "../../utils";

function category({ data }) {
  bottomScroll();
  // eslint-disable-next-line
  useEffect(() => {
    const grid = document.querySelector(".nam-grid");
    new Masonry(grid, {
      itemSelector: ".post-item",
      fitWidth: true,
      transitionDuration: "0.5s",
    });
  });
  return (
    <>
      <Head>
        <title>Confession v1.0 | Category</title>
        <meta name="author" content="Noel Mallari" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Confession v1.0" />
        <meta
          name="description"
          content="Confession v1.0 - acts as an area that is your personal, anonymous, everyday diary. A place that is fully dedicated to your secret confessions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cn-confession.vercel.app" />
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
          content="https://cn-confession.vercel.app"
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
      <div className={styles.content}>
        <Header />
        <div className={styles.contentMain}>
          <ul className="nam-grid">
            {data.map((data, index) => {
              return (
                <li className="post-item" key={index}>
                  <div className={styles.card}>
                    <header className={styles.cardHeader}>
                      <Link href={`../category/${data.category}/${data._id}`}>
                        <a className={styles.cardTitle}>
                          <h1 className={styles.cardTitle}>
                            {data.gender} • {data.age} Years Old
                          </h1>
                        </a>
                      </Link>
                      <div className={styles.cardDetails}>
                        <p>Date : {format_date(data.created)}</p>
                        <Link href={`/${data.category}`}>
                          <a className={`badge ${badge(data.category)}`}>
                            {categories(data.category)}
                          </a>
                        </Link>
                      </div>
                    </header>
                    <div className={styles.cardContent}>
                      <Link href={`../category/${data.category}/${data._id}`}>
                        <a>{maxContent(data.confess)}</a>
                      </Link>
                    </div>
                    <div className={styles.cardFooter}>
                      <Link href={`${share_facebook(data.category, data._id)}`}>
                        <a className={styles.facebook}>
                          <i className="fab fa-facebook"></i>
                        </a>
                      </Link>
                      <Link href={`${share_twitter(data.category, data._id)}`}>
                        <a className={styles.twitter}>
                          <i className="fab fa-twitter"></i>
                        </a>
                      </Link>
                      <Link href={`${share_telegram(data.category, data._id)}`}>
                        <a className={styles.telegram}>
                          <i className="fab fa-telegram"></i>
                        </a>
                      </Link>
                      <Link
                        href="#"
                        
                      >
                        <a className={styles.copy} onClick={() => {
                          copy_link(data.category, data._id);
                        }}>
                          <i className="fa fa-copy"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
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
      <div className="mobile-btn">
        <Link href="/create">
          <a className={styles.btnCreate}>
            <i className="fa fa-plus"></i> Create your own story
          </a>
        </Link>
      </div>
    </>
  );
}

export default category;

export const getServerSideProps = async ({ params }) => {
  try {
    const category = params.category;
    const database = await mongo_connect();

    if (!database) {
      const data = await tbl_confessions.find({
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
