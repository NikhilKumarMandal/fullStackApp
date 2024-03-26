// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "blog-app-ce76e.firebaseapp.com",
  projectId: "blog-app-ce76e",
  storageBucket: "blog-app-ce76e.appspot.com",
  messagingSenderId: "872448266259",
  appId: "1:872448266259:web:5031d59b1cdc09c99d6fe6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);







