import Head from 'next/head'
import { GraphQLClient } from 'graphql-request';
import styles from '../styles/main.module.css'

function Promotions({ promotions }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Promotions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {promotions.map(({ name, description }) => (
        <main className={styles.main} key={name}>
          <h1>{name}</h1>
          <p>{description}</p>
        </main>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-ap-northeast-1.graphcms.com/v2/ckgrow872fa8q01z2d8r04j5s/master'
  );

  const { promotions } = await graphcms.request(
    `
    {
      promotions {
        name
        description
      }
    }
    `
  );

  return {
    props: {
      promotions,
    },
  };
}

export default Promotions