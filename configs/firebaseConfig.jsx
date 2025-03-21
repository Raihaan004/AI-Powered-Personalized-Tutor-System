// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-141e9.firebaseapp.com",
  projectId: "ai-course-generator-141e9",
  storageBucket: "ai-course-generator-141e9.firebasestorage.app",
  messagingSenderId: "967170443161",
  appId: "1:967170443161:web:02b5f4dc76dbf8994c3508",
  measurementId: "G-MEJL27M42L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)