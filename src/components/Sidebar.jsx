import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ways } from '../data/ways';

export default function Sidebar() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      {/* Кнопка для мобильного меню */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1001,
          backgroundColor: '#c68fff',
          color: '#fff',
          border: 'none',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '1.2rem',
          display: 'none',
        }}
        className="sidebar-toggle"
      >
        ☰
      </button>

      <aside
        style={{
          width: menuOpen ? '240px' : '0',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          height: '100vh',
          background: 'linear-gradient(to bottom, #f7e6ff, #d9c2ff)',
          padding: menuOpen ? '20px' : '0',
          borderRight: menuOpen ? '4px solid #c68fff' : 'none',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderBottomRightRadius: '30px',
          boxShadow: menuOpen ? '6px 0 12px rgba(0,0,0,0.1)' : 'none',
          position: 'fixed',
          zIndex: 1000,
        }}
        className="sidebar"
      >
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
                  onClick={() => {
                    setSearch("");
                    setMenuOpen(false);
                  }}
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

      {/* Скрыть sidebar на больших экранах */}
      <style>
        {`
          @media (min-width: 768px) {
            .sidebar {
              position: static !important;
              width: 240px !important;
              padding: 20px !important;
              box-shadow: none !important;
            }

            .sidebar-toggle {
              display: none !important;
            }
          }

          @media (max-width: 767px) {
            .sidebar-toggle {
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
}
