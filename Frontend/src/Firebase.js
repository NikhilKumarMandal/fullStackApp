// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "blog-app-6565d.firebaseapp.com",
  projectId: "blog-app-6565d",
  storageBucket: "blog-app-6565d.appspot.com",
  messagingSenderId: "458049222183",
  appId: "1:458049222183:web:56ecc0cc29ad9a407b4002"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);







// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDc2t0V2FKNfwDi2LLMo23Dc_r2hqXw7Tw",
//   authDomain: "blog-app-ce76e.firebaseapp.com",
//   projectId: "blog-app-ce76e",
//   storageBucket: "blog-app-ce76e.appspot.com",
//   messagingSenderId: "872448266259",
//   appId: "1:872448266259:web:5031d59b1cdc09c99d6fe6",
//   measurementId: "G-60FY68K0P9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);