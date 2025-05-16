import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const LOCAL_STORAGE_KEY = "taleLikesCache";

export default function BossOf({ id, title, description }) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  // Загружаем user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Функция загрузки лайков из localStorage
  const loadLikesFromCache = () => {
    try {
      const cache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      return cache[id] || {};
    } catch {
      return {};
    }
  };

  // Сохраняем лайки в localStorage (для всех сказок)
  const saveLikesToCache = (id, likesForId) => {
    try {
      const cache = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      cache[id] = likesForId;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
    } catch {}
  };

  // При монтировании компонента сначала грузим из кеша, потом из Firestore
  useEffect(() => {
    if (!id) return;

    // 1. Из кеша
    const cachedLikes = loadLikesFromCache();
    setLikes(cachedLikes);
    setLiked(user ? Boolean(cachedLikes[user.uid]) : false);

    // 2. Из Firestore (асинхронно)
    const fetchLikes = async () => {
      const docRef = doc(db, "taleLikes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const likesObj = data.likes || {};
        setLikes(likesObj);
        setLiked(user ? Boolean(likesObj[user.uid]) : false);
        saveLikesToCache(id, likesObj);
      }
    };
    fetchLikes();
  }, [id, user]);

  const toggleLike = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы ставить лайки.");
      return;
    }

    const newLikes = { ...likes };
    if (liked) {
      delete newLikes[user.uid];
    } else {
      newLikes[user.uid] = true;
    }

    // Обновляем локально и в кеше сразу, чтобы UI отобразился быстро
    setLikes(newLikes);
    setLiked(!liked);
    saveLikesToCache(id, newLikes);

    // Обновляем Firestore (асинхронно, не блокируем UI)
    try {
      const docRef = doc(db, "taleLikes", id);
      await setDoc(docRef, { likes: newLikes }, { merge: true });
    } catch (error) {
      console.error("Ошибка обновления лайков:", error);
      // Можно попытаться откатить изменения или показать ошибку
    }
  };

  const likesCount = Object.keys(likes).length;

  return (
    <li
      onClick={() => navigate(`/tale/${id}`)}
      style={{
        border: "2px solid #d8b0d8",
        borderRadius: "12px",
        padding: "1.2rem",
        marginBottom: "1.2rem",
        cursor: "pointer",
        backgroundColor: "#faf5f9",
        boxShadow: "0 2px 6px rgba(200, 162, 200, 0.2)",
        transition: "all 0.25s ease-in-out",
        position: "relative",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 10px rgba(200, 162, 200, 0.4)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 6px rgba(200, 162, 200, 0.2)")
      }
    >
      <h3 style={{ margin: 0, color: "#884d9e", fontSize: "1.4rem" }}>{title}</h3>
      <p style={{ marginTop: "0.5rem", color: "#555" }}>{description}</p>

      <button
        onClick={toggleLike}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          backgroundColor: liked ? "#ffd3ec" : "#f2e6f6",
          color: "#a64d79",
          border: "1px solid #e0c3dd",
          borderRadius: "8px",
          padding: "4px 10px",
          cursor: "pointer",
          fontSize: "0.9rem",
          userSelect: "none",
        }}
        aria-pressed={liked}
      >
        {liked ? "💔 Убрать лайк" : "❤️ Лайк"} {likesCount}
      </button>
    </li>
  );
}
