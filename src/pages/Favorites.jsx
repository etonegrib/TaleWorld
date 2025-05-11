import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import BossOf from "../components/BossOf";

export default function Favorites() {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheKey = user ? `favorites_${user.uid}` : null;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setFavorites(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        const favCollection = collection(db, "users", user.uid, "favorites");
        const favSnapshot = await getDocs(favCollection);
        const favList = favSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favList);
        localStorage.setItem(cacheKey, JSON.stringify(favList));
      } catch (err) {
        console.error("Ошибка загрузки избранного:", err);
        if (!cachedData) {
          setError("⚠ Не удалось загрузить избранное. Проверьте соединение.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();

    // Очистка кэша старше 7 дней
    const now = Date.now();
    const expiry = 1000 * 60 * 60 * 24 * 7; // 7 дней
    const lastSaved = localStorage.getItem(`${cacheKey}_time`);
    if (!lastSaved || now - Number(lastSaved) > expiry) {
      localStorage.removeItem(cacheKey);
      localStorage.setItem(`${cacheKey}_time`, now.toString());
    }
  }, [user]);

  const removeFavorite = async (id) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "favorites", id));
      const updated = favorites.filter(fav => fav.id !== id);
      setFavorites(updated);
      localStorage.setItem(cacheKey, JSON.stringify(updated));
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
      alert("Не удалось удалить из избранного.");
    }
  };

  if (!user) {
    return (
      <div className="text-center text-2xl p-8">
        🚫 Чтобы просматривать избранное, нужно войти в аккаунт!
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-2xl p-8">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-700 p-6">
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center text-3xl p-12">
        ✨ Здесь пока пусто... Добавьте свои любимые сказки!
      </div>
    );
  }

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {favorites.map(fav => (
        <BossOf
          key={fav.id}
          id={fav.id}
          title={fav.title}
          description={fav.description}
          onDelete={() => removeFavorite(fav.id)}
        />
      ))}
    </div>
  );
}
