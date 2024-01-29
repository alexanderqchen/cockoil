// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigDev = {
  apiKey: "AIzaSyD1kvCD5O2TkXgHkfSBSXEhZTRr9etIyYw",
  authDomain: "cockoil-dev.firebaseapp.com",
  projectId: "cockoil-dev",
  storageBucket: "cockoil-dev.appspot.com",
  messagingSenderId: "621051650142",
  appId: "1:621051650142:web:95ea4820908857703c14cf",
};

const firebaseConfigProd = {
  apiKey: "AIzaSyDoDpz7HAJ1JYXxCV7LLKLH0mDB6Rhm1BM",
  authDomain: "cockoil.firebaseapp.com",
  projectId: "cockoil",
  storageBucket: "cockoil.appspot.com",
  messagingSenderId: "98151276166",
  appId: "1:98151276166:web:f78ce0df2947ffc18c7b07",
  measurementId: "G-VNRHC7TWVE",
};

const firebaseConfig =
  process.env.ENV === "PROD" ? firebaseConfigProd : firebaseConfigDev;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
