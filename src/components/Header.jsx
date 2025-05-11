// src/components/Header.jsx
import { useState, useEffect } from 'react';
import logo from '/logo-name.svg';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      setUser({
        name: user.displayName,
        email: user.email,
      });

      const userRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#c8a2c8',
        borderBottom: '2px solid #a678a6',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <h1
          style={{
            fontFamily: "'Titillium Web', cursive",
            fontSize: '1.8rem',
            color: '#fff',
            letterSpacing: '1px',
            margin: 0,
          }}
        >
          TaleWorld
        </h1>
      </div>

      {user ? (
        <div>
          <span>👋 Привет, {user.name}!</span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: '10px',
              padding: '6px 12px',
              backgroundColor: '#a678a6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          style={{
            padding: '6px 12px',
            backgroundColor: '#7a4e7a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Войти через Google
        </button>
      )}
    </header>
  );
}
