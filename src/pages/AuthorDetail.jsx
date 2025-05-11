import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authors } from "../data/authors";

export default function AuthorDetail() {
  const { id } = useParams();
  const author = authors.find((a) => a.id === id);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (author?.bioFile) {
      fetch(author.bioFile)
        .then((res) => res.text())
        .then((text) => {
          setBio(text);
          setLoading(false);
        })
        .catch(() => {
          setBio("Не удалось загрузить биографию.");
          setLoading(false);
        });
    }
  }, [author]);

  if (!author) {
    return (
      <div className="p-8 text-center text-2xl text-red-800 font-serif">
        ❌ Автор не найден.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "url('/parchment-bg.jpg') repeat",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "'Literata', serif",
        color: "#4b2e2e",
        maxWidth: "900px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
      }}
    >
      {/* Фото автора */}
      <div style={{ flex: "0 0 280px", textAlign: "center" }}>
        <img
          src={author.image}
          alt={author.name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            border: "3px solid #d8b0d8",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Текст и имя */}
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontFamily: "'UnifrakturCook', cursive",
            fontSize: "2.5rem",
            color: "#884d9e",
            marginBottom: "1rem",
          }}
        >
          ✒️ {author.name}
        </h1>

        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "1.25rem",
            lineHeight: "1.75",
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: "1.2rem",
            borderRadius: "12px",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? "Загрузка биографии..." : bio}
        </div>
      </div>
    </div>
  );
}
