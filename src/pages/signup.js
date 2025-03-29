import Head from "next/head";
import styles from "@/styles/Signup.module.css";

export default function Signup() {
    return (
    <>
        <Head>
          <title>Sign Up</title>
          <meta name="description" content="Create an account" />
        </Head>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign Up</h1>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
        </div>
    </>
    );
}