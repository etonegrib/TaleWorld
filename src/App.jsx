import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Favorites from "./pages/Favorites";
import TaleWatch from './pages/TaleWatch';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import AuthorDetail from "./pages/AuthorDetail";
import Authors from "./pages/Authors"; // ✅ Импортируем Authors

export default function App() {
  return (
    <Router>
      <div className="app-layout" style={{ display: 'flex', backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <main style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/tale/:id" element={<TaleWatch />} />
              <Route path="/about" element={<About />} />
              <Route path="/authors" element={<Authors />} />  {/* ✅ Новый маршрут */}
              <Route path="/authors/:id" element={<AuthorDetail />} />
              <Route path="/category/:tag" element={<CategoryPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
