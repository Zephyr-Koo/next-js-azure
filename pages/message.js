import Head from 'next/head'
import { GraphQLClient } from 'graphql-request';
import styles from '../styles/main.module.css';
import { getPersonalizedThemeByUserAgent } from '../components/personalizer.js';

function Message({ message, themeColor }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Message</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body {
            color: white;
            background: ${themeColor}
          }
        `}
        </style>
      </Head>

      <main className={styles.main}>
        <h1>{message}</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const graphcms = new GraphQLClient(
    'https://api-ap-northeast-1.graphcms.com/v2/ckgrow872fa8q01z2d8r04j5s/master'
  );

  const userAgent = context.req.headers['user-agent'];

  const params = getPersonalizedThemeByUserAgent(userAgent);

  const { secretMessages } = await graphcms.request(
    `
    {
      secretMessages(where: {browserType: "${params.browserType}" }) {
        message
      }
    }
    `
  );

  return {
    props: {
      'message': secretMessages[0].message,
      'themeColor': params.themeColor
    },
  };
}

export default Message