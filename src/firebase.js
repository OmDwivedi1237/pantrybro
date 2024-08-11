// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Analytics only if supported and in a client-side environment
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { firestore, analytics };
