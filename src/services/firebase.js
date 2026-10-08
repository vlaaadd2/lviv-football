// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIWFYyfnK4OyZ7_Ksi3gQcq_qxaGkIP8Y",
  authDomain: "lviv-amateur-football.firebaseapp.com",
  projectId: "lviv-amateur-football",
  storageBucket: "lviv-amateur-football.firebasestorage.app",
  messagingSenderId: "548519482851",
  appId: "1:548519482851:web:dda829877e62924fd5bcd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);