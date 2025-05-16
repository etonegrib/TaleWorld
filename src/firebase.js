import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEuVON-9IAPOwqquS6lEadLlklaAzs_NE",
  authDomain: "skazki-login.firebaseapp.com",
  databaseURL: "https://skazki-login-default-rtdb.firebaseio.com/",
  projectId: "skazki-login",
  storageBucket: "skazki-login.appspot.com",
  messagingSenderId: "551448584147",
  appId: "1:551448584147:web:1febd3dddf357b8571d926",
  measurementId: "G-EF7KF02WF8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const database = getDatabase(app);
