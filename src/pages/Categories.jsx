// src/pages/Categories.jsx
import { ways } from "../data/ways";
import { Link } from "react-router-dom";

export default function Categories() {
  const tags = Array.from(new Set(ways.flatMap((tale) => tale.tags)));

  const tagBackgrounds = {
    "русская": "/backgrounds/russian-folk.jpg",
    "короткая": "/backgrounds/short.jpg",
    "животные": "/backgrounds/animals.jpg",
    "европейская": "/backgrounds/european.jpg",
    "популярная": "/backgrounds/popular.jpg",
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "'UnifrakturCook', cursive" }}>
      <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>🏷 Категории сказок</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        marginTop: "2rem"
      }}>
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/category/${encodeURIComponent(tag)}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                height: "150px",
                background: `url(${tagBackgrounds[tag] || "/backgrounds/default.jpg"}) center/cover`,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
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
              <span style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#4b2e2e",
                textAlign: "center"
              }}>
                #{tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
