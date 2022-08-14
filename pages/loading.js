import React from "react";
import styles from "../styles/global.module.css";
import Head from "next/head";
import Image from "next/image";
import gif from "../public/plugins/loader.gif";

function Loading() {
  return (
    <div className={styles.Loading}>
      <Head>
        <title>Confession | Loading</title>
      </Head>
      <div className={styles.LoadingCenter}>
        <Image priority={true} alt="loading" src={gif} />
        <small>Developed By : Code Nam</small>
      </div>
    </div>
  );
}

export default Loading;
