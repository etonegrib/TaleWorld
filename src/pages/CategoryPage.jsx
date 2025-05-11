// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { ways } from "../data/ways";
import BossOf from "../components/BossOf";

export default function CategoryPage() {
  const { tag } = useParams();
  const decodedTag = decodeURIComponent(tag);
  const filteredWays = ways.filter((tale) => tale.tags.includes(decodedTag));

  return (
    <div style={{ padding: "2rem", fontFamily: "'UnifrakturCook', cursive" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>
        📚 Сказки по категории «{decodedTag}»
      </h1>

      {filteredWays.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
          {filteredWays.map((tale) => (
            <BossOf
              key={tale.id}
              id={tale.id}
              title={tale.title}
              description={tale.description?.slice(0, 80) + "..."}
            />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", fontSize: "1.5rem", color: "darkred" }}>
          ❌ Ничего не найдено.
        </p>
      )}
    </div>
  );
}
