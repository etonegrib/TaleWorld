// src/firebase.js
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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

// Получение экземпляра аутентификации
const auth = getAuth(app);

// Создание провайдера для Google
const provider = new GoogleAuthProvider();

// Экспортируем auth и provider
export { auth, provider };
