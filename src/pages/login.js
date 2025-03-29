import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Login.module.css";

export default function Login() {
    return (
    <>
        <Head>
          <title>Login</title>
          <meta name="description" content="Login to access your projects" />
        </Head>
        <div className={styles.container}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
          <a href="/signup" className={styles.link}>Don't have an account? Sign up</a>
        </div>
    </>
    );
}