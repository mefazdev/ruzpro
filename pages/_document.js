import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html>
      <Head>
        <Script
        id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TCLX2LT');`
          }} 
        ></Script>
        <Script id='tag-manager' async src="https://www.googletagmanager.com/gtag/js?id=G-EN0D03D4L3"></Script>
<Script id='analutics-code' strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-EN0D03D4L3');`}}></Script>
        {/* <!-- End Google Tag Manager --> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
      {/* <!-- Google Tag Manager (noscript) --> */}
<noscript dangerouslySetInnerHTML={{ __html:`<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCLX2LT"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
{/* <!-- End Google Tag Manager (noscript) --> */}
        <Main /> <NextScript />
      </body>
    </Html>
  );
}
