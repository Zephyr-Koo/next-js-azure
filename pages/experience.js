import Head from 'next/head'
import styles from '../styles/main.module.css';
import RoundRobinCookieManager from '../components/round-robin-generator/cookie-manager';
import RoundRobinStateMachine from '../components/round-robin-generator/state-machine';

const stateKey = 'experience';

function Experience({ experience, sessionId }) {
  RoundRobinCookieManager.setCookiesIfNotPresent(sessionId);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sticky Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Experience {experience}</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let sessionId = context.req.cookies[RoundRobinCookieManager.cookieName];
  let experiences = [0, 1, 2, 3, 4, 5];
  
  if (sessionId === undefined) {
    sessionId = RoundRobinStateMachine.next(stateKey);
    console.log(`Next state: ${sessionId}`);
  }

  const experience = experiences[sessionId % experiences.length];

  return {
    props: {
      experience,
      sessionId
    }
  };
}

export default Experience