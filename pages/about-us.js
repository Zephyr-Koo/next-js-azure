import Head from 'next/head'
import styles from '../styles/main.module.css'

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Abous Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>About Us | Page Content</div>
    </div>
  )
}
