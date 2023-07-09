import Head from "next/head";
import Home from "./Home";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Ruzpro | The best property listing website in Kerala </title>

        <meta name="description" content="
        
        Ruzpro.com, the most user-friendly real estate listing
            platform available in Kerala. We understand that your time is
            valuable, which is why we've made it incredibly simple for you to
            showcase your property to potential buyers or renters.
            Our website is designed with simplicity in
            mind. Whether you're a seasoned real estate professional or a
            first-time seller, you'll find our platform easy to navigate. You
            can effortlessly list your property and manage your uploads, saving
            you time and frustration.
        " />
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
