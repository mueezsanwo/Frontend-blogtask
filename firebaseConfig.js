// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfUsaK6ReTFIkGY0nT6P26HKShEi64E0w",
  authDomain: "blogger-app-6cb0c.firebaseapp.com",
  projectId: "blogger-app-6cb0c",
  storageBucket: "blogger-app-6cb0c.appspot.com",
  messagingSenderId: "90016826159",
  appId: "1:90016826159:web:b7c2d6f4e3e9bc373897da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);