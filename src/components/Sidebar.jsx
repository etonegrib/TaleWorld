import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const navItemStyle = (path) => ({
    display: 'block',
    padding: '12px 16px',
    marginBottom: '12px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: location.pathname === path ? '#fff' : '#4b2e83',
    backgroundColor: location.pathname === path ? '#b388eb' : '#f2e6ff',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontFamily: "'Titillium Web', sans-serif"
  })

  return (
    <aside style={{
      width: '220px',
      height: '100vh',
      background: 'linear-gradient(to bottom, #e0bbff, #c1d3ff)',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <h2 style={{
        fontSize: '28px',
        marginBottom: '20px',
        fontFamily: "'Titillium Web', cursive",
        color: '#4b2e83'
      }}>
        📖 Сказки
      </h2>

      <nav>
        <Link to="/" style={navItemStyle('/')}>🏠 Главная</Link>
        <Link to="/categories" style={navItemStyle('/categories')}>📚 Категории</Link>
        <Link to="/favorites" style={navItemStyle('/favorites')}>⭐ Избранное</Link>
      </nav>
    </aside>
  )
}
