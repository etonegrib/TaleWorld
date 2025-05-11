import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ways } from '../data/ways';

export default function Sidebar() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const filteredTales = search.length > 0
    ? ways.filter(tale =>
        tale.title.toLowerCase().startsWith(search.toLowerCase())
      )
    : [];

  const navItemStyle = (path) => ({
    display: 'block',
    padding: '12px 16px',
    marginBottom: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: location.pathname === path ? '#fff' : '#4b2e83',
    backgroundColor: location.pathname === path ? '#c68fff' : '#f8ecff',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontFamily: "'Marck Script', cursive"
  });

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(to bottom, #f7e6ff, #d9c2ff)',
      padding: '20px',
      borderRight: '4px solid #c68fff',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      borderBottomRightRadius: '30px', // 👈 только нижний правый угол
      boxShadow: '6px 0 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '28px',
        marginBottom: '20px',
        fontFamily: "'Marck Script', cursive",
        color: '#4b2e83'
      }}>
        🧚 Сказочный мир
      </h2>

      <nav>
        <Link to="/" style={navItemStyle('/')}>🏠 Главная</Link>
        <Link to="/categories" style={navItemStyle('/categories')}>📚 Категории</Link>
        <Link to="/favorites" style={navItemStyle('/favorites')}>⭐ Избранное</Link>
        <Link to="/authors" style={navItemStyle('/authors')}>🖋 Авторы</Link>
        <Link to="/about" style={navItemStyle('/about')}>🧾 О нас</Link>
      </nav>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Поиск сказки..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #d0aaff',
            width: '100%',
            fontFamily: "'Marck Script', cursive",
            fontSize: '1rem',
            backgroundColor: '#fffdfd',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
          }}
        />

        {search && filteredTales.length > 0 && (
          <div style={{
            maxHeight: '180px',
            overflowY: 'auto',
            marginTop: '10px'
          }}>
            {filteredTales.map(tale => (
              <Link
                key={tale.id}
                to={`/tale/${tale.id}`}
                onClick={() => setSearch("")}
                style={{
                  display: 'block',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  backgroundColor: '#f9f0ff',
                  color: '#4b2e83',
                  marginBottom: '8px',
                  fontSize: '1rem',
                  fontFamily: "'Marck Script', cursive",
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}
              >
                🔸 {tale.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
