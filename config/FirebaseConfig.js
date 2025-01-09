// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "adoptme-30828.firebaseapp.com",
  projectId: "adoptme-30828",
  storageBucket: "adoptme-30828.appspot.com",
  messagingSenderId: "550102726840",
  appId: "1:550102726840:web:bc17e2af94a794a64f1c4d",
  measurementId: "G-PJ6XYYLECP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);