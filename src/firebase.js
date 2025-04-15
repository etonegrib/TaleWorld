import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Ваши Firebase настройки
const firebaseConfig = {
  apiKey: "AIzaSyAEuVON-9IAPOwqquS6lEadLlklaAzs_NE",
  authDomain: "skazki-login.firebaseapp.com",
  projectId: "skazki-login",
  storageBucket: "skazki-login.firebasestorage.app",
  messagingSenderId: "551448584147",
  appId: "1:551448584147:web:1febd3dddf357b8571d926",
  measurementId: "G-EF7KF02WF8"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)