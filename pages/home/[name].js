import { BlobServiceClient } from '@azure/storage-blob';
import parse from 'html-react-parser';

const storageUrl = 'https://jamstackhackathonstorage.blob.core.windows.net/';
const containerName = 'static-site-files';

const blobServiceClient = new BlobServiceClient(storageUrl);
const containerClient = blobServiceClient.getContainerClient(containerName);

function Page({ html }) {
  return parse(html);
}

export async function getStaticPaths() {
  const paths = [];

  let blobs = containerClient.listBlobsFlat(); // get container blobs

  for await (const blob of blobs) {
    paths.push({
      params: { name: blob.name },
    });
  }

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const blobName = params.name;
  const blobClient = containerClient.getBlobClient(blobName);
  const downloadBlockBlobResponse = await blobClient.download();
  const html = (await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();

  return {
    props: {
      pageName: blobName,
      html
    }
  };
}

// [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export default Page