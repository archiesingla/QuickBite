// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFdhwvTIW41LSKJD7zqjEYC6cVzuBh-6Q",
  authDomain: "rudys-add62.firebaseapp.com",
  projectId: "rudys-add62",
  storageBucket: "rudys-add62.firebasestorage.app",
  messagingSenderId: "483925516981",
  appId: "1:483925516981:web:56e179bdd1000f56b4d4fc"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);