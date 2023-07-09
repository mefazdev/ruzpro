// Import the functions you need from the SDKs you need

 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  // apiKey: "AIzaSyB4wYXukv11upvfCgCTKrro4xt10Eh3XGE",
  // authDomain: "real-4478d.firebaseapp.com",
  // projectId: "real-4478d",
  // storageBucket: "real-4478d.appspot.com",
  // messagingSenderId: "1048861832077",
  // appId: "1:1048861832077:web:94cab5e3dd10d537af83c4", 
  // measurementId: "G-H0R3Y322YR"



  apiKey: "AIzaSyAJwboxIBnWyxz7JLjRPVhK1fYqTWsgbv0",
  authDomain: "ruzpro-9b3da.firebaseapp.com",
  projectId: "ruzpro-9b3da",
  storageBucket: "ruzpro-9b3da.appspot.com",
  messagingSenderId: "754171186443",
  appId: "1:754171186443:web:d181d5f586c3d0f8f3e60e",
  measurementId: "G-EN0D03D4L3"
};

 
const app = initializeApp(firebaseConfig);
 const db = getFirestore();
const auth = getAuth();
const storage = getStorage();


export { db, auth, storage};


 
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; 
// const firebaseConfig = {
//   apiKey: "AIzaSyAJwboxIBnWyxz7JLjRPVhK1fYqTWsgbv0",
//   authDomain: "ruzpro-9b3da.firebaseapp.com",
//   projectId: "ruzpro-9b3da",
//   storageBucket: "ruzpro-9b3da.appspot.com",
//   messagingSenderId: "754171186443",
//   appId: "1:754171186443:web:d181d5f586c3d0f8f3e60e",
//   measurementId: "G-EN0D03D4L3"
// };

 
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);