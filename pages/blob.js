import Head from 'next/head'
import styles from '../styles/main.module.css';
import { BlobServiceClient } from "@azure/storage-blob";

function Blob({ html }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blob</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.main}
        dangerouslySetInnerHTML={ {__html: html} }>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const html = '<h1>Hello!</h1>';
  const storageUrl = 'https://jamstackhackathonstorage.blob.core.windows.net/';
  const containerName = 'static-site-files';
  
  const blobServiceClient = new BlobServiceClient(storageUrl);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const dataSources = [];

  let i = 0;
  let blobs = containerClient.listBlobsFlat();

  for await (const blob of blobs) {
    dataSources.push(`${storageUrl}${containerName}/${blob.name}`);
    console.log(`${dataSources[i++]}`);
  }

  return {
    props: {
      html
    }
  };
}

export default Blob