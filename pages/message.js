import Head from 'next/head'
import { GraphQLClient } from 'graphql-request';
import styles from '../styles/main.module.css'

function Message({ secretMessages, themeColor }) {
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
        <h1>{secretMessages[0].message}</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const graphcms = new GraphQLClient(
    'https://api-ap-northeast-1.graphcms.com/v2/ckgrow872fa8q01z2d8r04j5s/master'
  );

  const browserThemes = {
    Chrome: '#0F9D58',
    Firefox: '#FF8619'
  };

  const supportedBrowserTypes = Object.keys(browserThemes);
  const userAgent = context.req.headers['user-agent'];
  var browserType;
  var themeColor;

  for (let i = 0; i < supportedBrowserTypes.length; ++i) {
    if (userAgent.includes(supportedBrowserTypes[i])) {
      browserType = supportedBrowserTypes[i];
      break;
    }
  }

  if (browserType === undefined) {
    browserType = 'Others';
    themeColor = 'darkgrey';
  } else {
    themeColor = browserThemes[browserType];
  }

  const { secretMessages } = await graphcms.request(
    `
    {
      secretMessages(where: {browserType: "${browserType}" }) {
        message
      }
    }
    `
  );

  return {
    props: {
      secretMessages,
      themeColor
    },
  };
}

export default Message