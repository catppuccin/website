import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16 32x32"
          href="favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="favicon-152-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="favicon-144-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="favicon-120-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="favicon-114-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon-180-precomposed.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="favicon-72-precomposed.png"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="favicon-57.png" />
        <link rel="icon" sizes="32x32" href="favicon-32.png" />
        <meta name="msapplication-TileColor" content="#1e1e2e" />
        <meta name="msapplication-TileImage" content="favicon-144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" sizes="192x192" href="favicon-192.png" />
      </Head>
    <Component {...pageProps} />
  </>
  )
    ;
};

export default MyApp;
