import { ways } from "../data/ways";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Categories() {
  const [search, setSearch] = useState("");

  const allTags = ways.flatMap((tale) => tale.tags);
  const uniqueTags = Array.from(new Set(allTags));

  const tagCounts = uniqueTags.reduce((acc, tag) => {
    acc[tag] = allTags.filter((t) => t === tag).length;
    return acc;
  }, {});

  const tagBackgrounds = {
    "русская": "/backgrounds/russian-folk.jpg",
    "короткая": "/backgrounds/short.jpg",
    "животные": "/backgrounds/animals.jpg",
    "европейская": "/backgrounds/european.jpg",
    "популярная": "/backgrounds/popular.jpg",
  };

  const filteredTags = uniqueTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "'UnifrakturCook', cursive" }}>
      <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>🏷 Категории сказок</h1>

      {/* 🔍 Поиск */}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <input
          type="text"
          placeholder="🔎 Поиск категории..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "2px solid #d8b0d8",
            width: "80%",
            maxWidth: "400px",
            fontSize: "1.1rem",
            outline: "none",
            fontFamily: "'Titillium Web', sans-serif",
          }}
        />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "20px",
        marginTop: "2rem"
      }}>
        {filteredTags.map((tag) => (
          <Link
            key={tag}
            to={`/category/${encodeURIComponent(tag)}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                height: "160px",
                background: `url(${tagBackgrounds[tag] || "/backgrounds/default.jpg"}) center/cover`,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                padding: "10px 14px",
                borderRadius: "10px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4b2e2e" }}>
                  #{tag}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#6b4c4c", marginTop: "4px" }}>
                  📚 {tagCounts[tag]} сказок
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <p style={{ marginTop: "2rem", textAlign: "center", fontSize: "1.2rem", color: "#999" }}>
          😕 Ничего не найдено
        </p>
      )}
    </div>
  );
}
