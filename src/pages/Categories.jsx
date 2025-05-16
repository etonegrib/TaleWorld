import { useState } from "react";
import { ways } from "../data/ways";
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const tags = Array.from(new Set(ways.flatMap(tale => tale.tags)));
  const [searchTerm, setSearchTerm] = useState("");

  const tagBackgrounds = {
    "русская": "/backgrounds/russian-folk.jpg",
    "короткая": "/backgrounds/short.png",
    "животные": "/backgrounds/animals.png",
    "европейская": "/backgrounds/european.png",
    "популярная": "/backgrounds/popular.png",
  };

  const tagDescriptions = {
    "русская": "Классические народные сказки России",
    "короткая": "Быстрые и лёгкие сказки для чтения",
    "животные": "Сказки о лисах, волках и других зверях",
    "европейская": "Сказки с европейским колоритом",
    "популярная": "Любимые сказки наших читателей",
  };

  const getRandomTaleForTag = tag => {
    const tales = ways.filter(tale => tale.tags.includes(tag));
    return tales.length ? tales[Math.floor(Math.random() * tales.length)].title : "Не найдено";
  };

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToRandomTale = () => {
    const random = ways[Math.floor(Math.random() * ways.length)];
    navigate(`/tale/${random.id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem",
        fontFamily: "'UnifrakturCook', cursive",
        background: "linear-gradient(135deg, #f8e9f3 0%, #d1bee3 50%, #c9b7d4 100%)",
        borderRadius: "40px 40px 0 0",
        maxWidth: "960px",
        margin: "2rem auto 4rem",
        boxShadow: "0 12px 30px rgba(200, 162, 200, 0.3)",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          color: "#884d9e",
          textShadow: "1.5px 1.5px 3px #d8b0d8",
          marginBottom: "2rem",
        }}
      >
        🏷 Категории сказок
      </h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="🔎 Поиск категории..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: "14px 20px",
            borderRadius: "16px",
            border: "2px solid #d8b0d8",
            fontSize: "1.2rem",
            width: "80%",
            maxWidth: "400px",
            boxShadow: "0 4px 12px rgba(216, 176, 216, 0.4)",
            fontFamily: "'UnifrakturCook', cursive",
            outline: "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = "#884d9e";
            e.currentTarget.style.boxShadow = "0 0 12px #884d9e";
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = "#d8b0d8";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(216, 176, 216, 0.4)";
          }}
        />

        <button
          onClick={goToRandomTale}
          style={{
            marginLeft: "1rem",
            padding: "14px 22px",
            backgroundColor: "#884d9e",
            border: "none",
            borderRadius: "16px",
            fontSize: "1.2rem",
            color: "#faf5f9",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(136, 77, 158, 0.6)",
            transition: "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
            fontFamily: "'UnifrakturCook', cursive",
            userSelect: "none",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#b47fcc";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(180, 127, 204, 0.8)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#884d9e";
            e.currentTarget.style.boxShadow = "0 6px 14px rgba(136, 77, 158, 0.6)";
          }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          🎲 Случайная сказка на сегодня
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 260px)",
          justifyContent: "center",
          gap: "24px",
          marginTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {filteredTags.map(tag => {
          const talesInTag = ways.filter(tale => tale.tags.includes(tag));
          const randomTaleTitle = getRandomTaleForTag(tag);

          return (
            <Link
              key={tag}
              to={`/category/${encodeURIComponent(tag)}`}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <div
                style={{
                  width: "260px",
                  height: "210px",
                  borderRadius: "24px",
                  background: `url(${tagBackgrounds[tag] || "/backgrounds/default.jpg"}) center/cover no-repeat`,
                  boxShadow: "0 6px 15px rgba(200, 162, 200, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.3rem 1.5rem",
                  color: "#f9f1f7",
                  position: "relative",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                  fontFamily: "'UnifrakturCook', cursive",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(200, 162, 200, 0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(200, 162, 200, 0.4)";
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(120, 72, 120, 0.75)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    textShadow: "1px 1px 3px #3b1e3b",
                    userSelect: "none",
                  }}
                >
                  #{tag} ({talesInTag.length})
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(110, 56, 110, 0.5)",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    backdropFilter: "blur(3px)",
                    minHeight: "54px",
                    color: "#e9d8f3",
                    fontStyle: "italic",
                    userSelect: "none",
                    boxShadow: "0 0 5px rgba(230, 190, 230, 0.7)",
                  }}
                >
                  {tagDescriptions[tag] || "Сказки этой категории"}
                </div>

                <div
                  style={{
                    fontSize: "0.9rem",
                    backgroundColor: "rgba(255, 241, 211, 0.85)",
                    padding: "8px 14px",
                    borderRadius: "14px",
                    color: "#4b2e2e",
                    textAlign: "center",
                    fontWeight: "600",
                    userSelect: "none",
                    boxShadow: "0 0 8px rgba(255, 217, 100, 0.9)",
                  }}
                >
                  🎯 Пример: <em>{randomTaleTitle}</em>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
