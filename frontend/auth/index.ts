// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoDpz7HAJ1JYXxCV7LLKLH0mDB6Rhm1BM",
  authDomain: "cockoil.firebaseapp.com",
  projectId: "cockoil",
  storageBucket: "cockoil.appspot.com",
  messagingSenderId: "98151276166",
  appId: "1:98151276166:web:f78ce0df2947ffc18c7b07",
  measurementId: "G-VNRHC7TWVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
