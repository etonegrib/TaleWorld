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
        padding: "2rem",
        background: "url('/parchment-bg.jpg') repeat",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "'UnifrakturCook', cursive",
        color: "#4b2e2e",
        maxWidth: "900px",
        margin: "2rem auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.5rem",
          fontFamily: "'UnifrakturCook', cursive",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <label htmlFor="sort" style={{ marginRight: "0.8rem" }}>
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
            backgroundColor: "#fdf1d3",
            fontSize: "1.1rem",
            fontFamily: "'Great Vibes', cursive",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.boxShadow = "0 0 8px #d8b0d8")
          }
          onMouseLeave={(e) =>
            (e.target.style.boxShadow = "none")
          }
        >
          <option value="likes">💖 Популярности</option>
          <option value="title">🔠 Названию</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedWays.map((tale, index) => (
          <div
            key={tale.id}
            style={{
              animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
              opacity: 0,
            }}
          >
            <BossOf
              id={tale.id}
              title={tale.title}
              description={tale.description}
            />
          </div>
        ))}
      </ul>

      {/* Анимации */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
