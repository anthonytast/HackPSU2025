import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Login.module.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3001/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      });
      
      const data = response.json();
      console.log(data);
      if(response.ok){
        setMessage(data.message)
        console.log("Button Clicked")
      }else{
        setMessage(data.error);
      }
    }catch(error){
      console.log("Error during login: " + error);
      setMessage("An error occureed. Please try again.");
    } 
      
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to access your projects" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className={styles.button}>Login</button>
          {message && <p>{message}</p>}
        </form>
        <a href="/signup" className={styles.link}>Don't have an account? Sign up</a>
      </div>
    </>
  );
}