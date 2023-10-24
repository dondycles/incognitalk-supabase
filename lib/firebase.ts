// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALU7zK6YYOdieZNLr0a_DcJXoj5j_hN2I",
  authDomain: "incognitalk-cabin.firebaseapp.com",
  projectId: "incognitalk-cabin",
  storageBucket: "incognitalk-cabin.appspot.com",
  messagingSenderId: "761018792648",
  appId: "1:761018792648:web:1a9f757cb2a612b8bd03fd",
  measurementId: "G-TQEDL5RYTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);
