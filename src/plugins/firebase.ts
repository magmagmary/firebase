import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsaA0_lgvfGOG_EbD3qgTx_Xw7dg2l7_o",
  authDomain: "magmag-455b2.firebaseapp.com",
  projectId: "magmag-455b2",
  storageBucket: "magmag-455b2.appspot.com",
  messagingSenderId: "430933579542",
  appId: "1:430933579542:web:64c2ee609f1736aef6a237",
  measurementId: "G-LFGMNFJ4QW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
