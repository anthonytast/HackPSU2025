import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import GeneratedComponent from "./GeneratedComponent";

//Pages
import App from "./_app";
import Login from "./login";
import Gemchat from "./gemchat";
import Projects from "./projects";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
     <Login />
     {/* <Gemchat /> */}
     {/* <Projects /> */}
    </>
  );
}
