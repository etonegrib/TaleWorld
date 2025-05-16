import { useParams } from "react-router-dom";
import { ways } from "../data/ways";
import BossOf from "../components/BossOf";

export default function CategoryPage() {
  const { tag } = useParams();
  const decodedTag = decodeURIComponent(tag);
  const filteredWays = ways.filter((tale) => tale.tags.includes(decodedTag));

  return (
    <div
      style={{
        padding: "3rem 1.5rem",
        background: "url('/parchment-bg.jpg') repeat",
        fontFamily: "'UnifrakturCook', cursive",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "2rem",
          color: "#4b2e2e",
          textShadow: "1px 1px 2px #c9a36b",
        }}
      >
        📚 Сказки по категории «{decodedTag}»
      </h1>

      {filteredWays.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {filteredWays.map((tale) => (
            <li
              key={tale.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                padding: "1.2rem",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <BossOf
                id={tale.id}
                title={tale.title}
                description={tale.description?.slice(0, 80) + "..."}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            color: "#a33",
            marginTop: "2rem",
          }}
        >
          ❌ Ничего не найдено по этому тегу.
        </p>
      )}
    </div>
  );
}
