import Head from "next/head";
import Home from "./Home";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Ruzpro</title>

        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=DynaPuff&family=Plus+Jakarta+
          Sans:wght@300;400&family=Poppins:wght@300&display=swap&apos;); @import
          url(&apos;https://fonts.googleapis.com/css2?family=DynaPuff&family=Plus+Jakarta+Sans:wght@300;400&family=Poppins&display=swap&apos;);
        </style>

        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=DynaPuff&family=Montserrat&family=Plus+Jakarta+Sans:wght@400;400&family=Poppins&display=swap&apos;);
        </style>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap&apos;);
        </style>

        {/* <script src="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"></script> */}
      </Head>

      <main>
        <Home />
      </main>

      {/* <footer></footer> */}
    </div>
  );
}
