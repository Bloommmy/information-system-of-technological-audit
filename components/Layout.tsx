import Head from 'next/head'
import styles from './Layout.module.css'
import { AuthData } from "../lib/auth";
import { Button } from "./input";
import { appName } from "../config";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode,
  title: string,
  authData?: AuthData,
};

export default function Layout({ children, title, authData }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} | {appName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <h3>{title}</h3>
        {authData ? (
          <div className={styles.authInfo}>
            <span>{authData.login}</span>
            <a href="/login?logout=1"><Button title="Выход" confirm="Выйти?"/></a>
          </div>
        ) : ''}
        {children}
      </main>
    </div>
  )
}
