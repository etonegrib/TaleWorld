import { ways } from "../data/ways";
import BossOf from "../components/BossOf";
import { useEffect, useState } from "react";

export default function Home() {
  const [sortedWays, setSortedWays] = useState([]);
  const [sortBy, setSortBy] = useState("likes");

  useEffect(() => {
    sortTales(sortBy);
  }, [sortBy]);

  const sortTales = (criteria) => {
    const likesData = JSON.parse(localStorage.getItem("likes") || "{}");
    const sorted = [...ways].sort((a, b) => {
      if (criteria === "title") {
        return a.title.localeCompare(b.title, "ru");
      } else if (criteria === "likes") {
        const likesA = likesData[a.id] || 0;
        const likesB = likesData[b.id] || 0;
        return likesB - likesA;
      }
      return 0;
    });

    setSortedWays(sorted);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="home-container">
      {/* Приветствие */}
      <section className="welcome-block">
        <h1>Добро пожаловать в TaleWorld! 🧙‍♂️✨</h1>
        <p>
          Погрузитесь в волшебный мир сказок и легенд. Здесь вы найдёте лучшие
          истории, отсортированные по популярности и алфавиту, сможете ставить лайки
          и сохранять любимые сказки в избранное.
        </p>
      </section>

      {/* Сортировка */}
      <section className="sort-section">
        <label htmlFor="sort">🧭 Сортировать сказки:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="likes">💖 По популярности</option>
          <option value="title">🔠 По названию</option>
        </select>
      </section>

      {/* Список сказок */}
      <ul className="tale-list">
        {sortedWays.map((tale, index) => (
          <li key={tale.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <BossOf id={tale.id} title={tale.title} description={tale.description} />
          </li>
        ))}
      </ul>

      {/* Анимации и стили */}
      <style>{`
        .home-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem;
          font-family: 'UnifrakturCook', cursive;
          background: url('/parchment-bg.jpg') repeat;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          color: #4b2e2e;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .welcome-block {
          text-align: center;
          background: linear-gradient(135deg, #e6e6fa 0%, #d8bfd8 100%);
          padding: 2rem 3rem;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(102, 51, 153, 0.3);
          color: #4b2e2e;
          animation: fadeInDown 1s ease forwards;
          opacity: 0;
        }

        .welcome-block h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px #a88fc7;
        }

        .welcome-block p {
          font-size: 1.2rem;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
          font-family: 'Great Vibes', cursive;
          color: #5b3e5f;
        }

        .sort-section {
          text-align: center;
          background-color: rgba(253, 241, 211, 0.9);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .sort-section label {
          font-size: 1.2rem;
          font-weight: 600;
          margin-right: 0.6rem;
        }

        .sort-section select {
          padding: 10px 16px;
          border-radius: 12px;
          border: 2px solid #d8b0d8;
          background-color: #fff;
          font-size: 1.1rem;
          font-family: 'Great Vibes', cursive;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 160px;
        }

        .sort-section select:hover {
          box-shadow: 0 0 8px #d8b0d8;
        }

        .tale-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tale-list li {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== Адаптивность ===== */
        @media (max-width: 768px) {
          .home-container {
            padding: 1rem;
          }

          .welcome-block h1 {
            font-size: 2rem;
          }

          .welcome-block p {
            font-size: 1rem;
          }

          .sort-section label {
            display: block;
            margin-bottom: 0.5rem;
          }

          .sort-section select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .welcome-block {
            padding: 1.5rem 1rem;
          }

          .welcome-block h1 {
            font-size: 1.8rem;
          }

          .tale-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
