// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAtqPiHGEHLZ_FbplBcl8OEPhY4AKQ-LKY",
  authDomain: "rb--clone.firebaseapp.com",
  projectId: "rb--clone.appspot.com",
  storageBucket: "rb--clone.firebasestorage.app",
  messagingSenderId: "367410691390",
  appId: "1:367410691390:web:b2bb530d7f3f95073b406f",
  measurementId: "G-4LNEYBQNPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Authentication instances
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
