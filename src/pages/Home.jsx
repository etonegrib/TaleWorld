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
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "2rem",
        fontFamily: "'UnifrakturCook', cursive",
        background: "url('/parchment-bg.jpg') repeat",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        color: "#4b2e2e",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Приветствие с анимацией */}
      <section
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #e6e6fa 0%, #d8bfd8 100%)",
          padding: "2rem 3rem",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(102, 51, 153, 0.3)",
          color: "#4b2e2e",
          animation: "fadeInDown 1s ease forwards",
          opacity: 0,
        }}
        className="welcome-block"
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "0.3rem",
            textShadow: "2px 2px 4px #a88fc7",
          }}
        >
          Добро пожаловать в TaleWorld! 🧙‍♂️✨
        </h1>
        <p
          style={{
            fontSize: "1.6rem",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontFamily: "'Great Vibes', cursive",
            color: "#5b3e5f",
          }}
        >
          Погрузитесь в волшебный мир сказок и легенд. Здесь вы найдёте лучшие истории,
          отсортированные по популярности и алфавиту, сможете ставить лайки и сохранять
          любимые сказки в избранное.
        </p>
      </section>

      {/* Секция сортировки */}
      <section
        style={{
          textAlign: "center",
          backgroundColor: "rgba(253, 241, 211, 0.9)",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <label
          htmlFor="sort"
          style={{ marginRight: "0.8rem", fontSize: "1.3rem", fontWeight: "600" }}
        >
          🧭 Сортировать сказки:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            border: "2px solid #d8b0d8",
            backgroundColor: "#fff",
            fontSize: "1.1rem",
            fontFamily: "'Great Vibes', cursive",
            cursor: "pointer",
            transition: "all 0.3s ease",
            minWidth: "180px",
          }}
          onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 8px #d8b0d8")}
          onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
        >
          <option value="likes">💖 По популярности</option>
          <option value="title">🔠 По названию</option>
        </select>
      </section>

      {/* Список сказок */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.8rem",
        }}
      >
        {sortedWays.map((tale, index) => (
          <li
            key={tale.id}
            style={{
              animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <BossOf id={tale.id} title={tale.title} description={tale.description} />
          </li>
        ))}
      </ul>

      {/* Анимации */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .welcome-block {
            opacity: 0;
            animation-fill-mode: forwards;
          }
        `}
      </style>
    </div>
  );
}
