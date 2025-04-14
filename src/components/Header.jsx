// src/components/Header.jsx
import { useState } from 'react';
import logo from '/logo-name.svg';
import { auth, provider } from '../firebase';  // Исправленный импорт
import { signInWithPopup, signOut } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({ name: user.displayName, email: user.email });
    } catch (err) {
      console.error("Ошибка входа:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#c8a2c8', // лавандовый
        borderBottom: '2px solid #a678a6',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
          <h1 style={{
            fontFamily: "'Titillium Web', 'cursive'",
            fontSize: '1.8rem',
            color: '#fff',
            letterSpacing: '1px',
            margin: 0
          }}>
            TaleWorld
          </h1>
        </div>
      
        {user ? (
          <div>
            <span>👋 Привет, {user.name}!</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Выйти из аккаунта</button>
          </div>
        ) : (
          <button onClick={handleGoogleLogin}>Войти через Google</button>
        )}
      </header>
      
  );
}
