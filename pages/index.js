import Head from 'next/head'
import styles from '../styles/main.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>Home | Page Content</div>
      </main>
    </div>
  )
}
