import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ways } from "../data/ways";
import { db, auth } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TaleWatch() {
  const { id } = useParams();
  const tale = ways.find(t => t.id === id);
  const [text, setText] = useState("");
  const [user] = useAuthState(auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingText, setLoadingText] = useState(true);
  const cacheKey = user ? `favorites_${user.uid}` : null;

  // Загрузка текста сказки
  useEffect(() => {
    const loadText = async () => {
      if (tale) {
        try {
          const res = await fetch(tale.filePath);
          const data = await res.text();
          setText(data);
        } catch (err) {
          console.error("Ошибка при загрузке текста:", err);
        } finally {
          setLoadingText(false);
        }
      }
    };
    loadText();
  }, [tale]);

  // Проверка избранного (и кэш)
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !tale) return;

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const favorites = JSON.parse(cached);
        const exists = favorites.some(f => f.id === tale.id);
        setIsFavorite(exists);
      }

      try {
        const favRef = doc(db, "users", user.uid, "favorites", tale.id);
        const favSnap = await getDoc(favRef);
        setIsFavorite(favSnap.exists());
      } catch (err) {
        console.error("Ошибка при проверке избранного:", err);
      }
    };
    checkFavorite();
  }, [user, tale]);

  const toggleFavorite = async () => {
    if (!user || !tale) return;
    const favRef = doc(db, "users", user.uid, "favorites", tale.id);
    const cached = localStorage.getItem(cacheKey);
    const favorites = cached ? JSON.parse(cached) : [];

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        const updated = favorites.filter(f => f.id !== tale.id);
        localStorage.setItem(cacheKey, JSON.stringify(updated));
        setIsFavorite(false);
      } else {
        const newFav = {
          id: tale.id,
          title: tale.title,
          description: tale.description || "",
          createdAt: new Date().toISOString(),
        };
        await setDoc(favRef, newFav);
        const updated = [...favorites, newFav];
        localStorage.setItem(cacheKey, JSON.stringify(updated));
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Ошибка при изменении избранного:", err);
    }
  };

  if (!tale) {
    return (
      <div className="p-8 text-center text-2xl text-red-800 font-serif">
        ❌ Сказка не найдена.
      </div>
    );
  }

  const readingTime = Math.ceil(text.split(" ").length / 150);

  return (
    <div
      style={{
        padding: "2rem",
        background: "url('/parchment-bg.jpg') repeat",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "'Great Vibes', cursive",
        color: "#4b2e2e",
        maxWidth: "800px",
        margin: "2rem auto",
      }}
    >
      <h1
        style={{
          fontFamily: "'UnifrakturCook', cursive",
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        📖 {tale.title}
      </h1>

      <p style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>
        ⏱ Примерное время чтения: {readingTime} мин
      </p>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        {tale.tags.map(tag => (
          <span
            key={tag}
            style={{
              margin: "0 8px",
              padding: "4px 10px",
              backgroundColor: "#fdf1d3",
              borderRadius: "8px",
              border: "1px solid #dab57f",
              fontSize: "0.9rem",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {user && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <button
            onClick={toggleFavorite}
            style={{
              backgroundColor: isFavorite ? "#ffd700" : "#e0e0e0",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            {isFavorite ? "⭐ Убрать из избранного" : "☆ Добавить в избранное"}
          </button>
        </div>
      )}

      <hr />

      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "1.3rem",
          lineHeight: "1.8",
          textAlign: "justify",
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        {loadingText ? "Загрузка сказки..." : text}
      </pre>
    </div>
  );
}
