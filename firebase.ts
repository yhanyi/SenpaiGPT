import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKPryjSrEz0k0ZsLrlHoco8ojTwC3oBvk",
  authDomain: "senpaigpt.firebaseapp.com",
  projectId: "senpaigpt",
  storageBucket: "senpaigpt.appspot.com",
  messagingSenderId: "858916345745",
  appId: "1:858916345745:web:9215b882113cc2bfc52c30",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
