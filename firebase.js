// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJtNhOIoQsp8Es--gaG6Igg0TCE6v6GCM",
  authDomain: "pantrybro.firebaseapp.com",
  projectId: "pantrybro",
  storageBucket: "pantrybro.appspot.com",
  messagingSenderId: "887454001333",
  appId: "1:887454001333:web:e5bd99e105b5fec44376fc",
  measurementId: "G-TL3CPNHRZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);

export {firestore}