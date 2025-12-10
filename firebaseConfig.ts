// src/config/firebase.ts

// Import the Firebase (modular v9) SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔹 Paste your own config here from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBuauCK0GaMm290rA1xvc-kM-pzNvOn4U4",
  authDomain: "campus-bball-league-manager.firebaseapp.com",
  projectId: "campus-bball-league-manager",
  storageBucket: "campus-bball-league-manager.firebasestorage.app",
  messagingSenderId: "158765765260",
  appId: "1:158765765260:web:4726bc35e1485ae19461a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances so you can use them anywhere in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
