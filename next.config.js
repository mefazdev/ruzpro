/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

 

module.exports = { reactStrictMode: true };
const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
    skipWaiting: true,
  },
});

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://ruzpro:h9TgtxA2sdou5Ejn@cluster0.kozruih.mongodb.net/ruzpro?retryWrites=true&w=majority",
  },

  // env:{
  //   MONGO_URI : 'mongodb+srv://salah:wD5wxV3sek4BPTKJ@cluster0.dzvfwsq.mongodb.net/?retryWrites=true&w=majority'

  // }
};
// mongodb+srv://ruzpro:<password>@cluster0.kozruih.mongodb.net/?retryWrites=true&w=majority

// h9TgtxA2sdou5Ejn

// env:{
//   MONGO_URI : 'mongodb+srv://salah:wD5wxV3sek4BPTKJ@cluster0.dzvfwsq.mongodb.net/?retryWrites=true&w=majority'

// }
