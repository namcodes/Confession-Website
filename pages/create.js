import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/global.module.css";
import { validations } from "../utils";
import Swal from "sweetalert2";
import Link from "next/link";

function create() {
  const inputs = {
    gender: "",
    age: "",
    category: "",
    confession: "",
  };

  const [inputValues, setInputValues] = useState(inputs);
  const [inputErrors, setInputErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [checker, setChecker] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInputErrors(validations(inputValues));
    setSubmit(true);
    setChecker(true);
    setTimeout(() => {
      setChecker(false);
    }, 1500);
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      fetch("/api/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Swal.fire({
              title: "SUCCESS",
              text: "Submitted Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
          } else {
            Swal.fire({
              title: "ERROR",
              text: "May mali lods tawagin mo dev",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [isSubmit, inputErrors, inputValues]);

  return (
    <>
      <Head>
        <title>Confession v1.0 | Create</title>
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
        <div className={styles.contentMainForm}>
          <div className={styles.wrapper}>
            <header>
              <Link href="/">
                <a className={styles.title}>
                  <h1 className={styles.title}>Confession v1.0</h1>
                </a>
              </Link>
              <small className={styles.smallText}>
                Let it go and feel good about it.
              </small>
            </header>
            <form autoComplete="off" onSubmit={onSubmitHandler}>
              {inputErrors.confession ||
              inputErrors.age ||
              inputErrors.gender ||
              inputErrors.category ? (
                <div className={styles.formError}>
                  <p>
                    {inputErrors.confession ||
                      inputErrors.age ||
                      inputErrors.gender ||
                      inputErrors.category}
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className={styles.flex}>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    className={styles.formControl}
                    defaultValue=""
                    onChange={onChangeHandler}
                  >
                    <option value="" disabled>
                      Select Gender...
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    onChange={onChangeHandler}
                    placeholder="Enter your age"
                    className={styles.formControl}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  onChange={onChangeHandler}
                  className={styles.formControl}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Category...
                  </option>
                  <option value="lie">Lie</option>
                  <option value="guilt">Guilt</option>
                  <option value="pain">Pain</option>
                  <option value="truth">Truth</option>
                  <option value="dream">Dream</option>
                  <option value="fantacy">Fantacy</option>
                  <option value="random-feeling">Random Feeling</option>
                  <option value="first-experience">First Experience</option>
                  <option value="wild-experience">Wild Experience</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category">Confess</label>
                <textarea
                  name="confession"
                  cols="50"
                  rows="10"
                  onChange={onChangeHandler}
                  className={styles.formControl}
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                {checker ? (
                  <button className={styles.btnDisabled} disabled={true}>
                    Please wait ...
                  </button>
                ) : (
                  <button className={styles.btnSubmit} type="submit">
                    Submit Confession
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default create;
